import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { env } from '@/env.mjs'
import { resend } from '@/Utils/resend'

export const runtime = 'nodejs'

type Params = Promise<{ form: string }>

type FlatValue = string | number | boolean | null | undefined

type JsonRecord = Record<string, unknown>

const flattenValues = (input: unknown, prefix = ''): Record<string, FlatValue> => {
  if (input === null || input === undefined) {
    return {}
  }

  if (Array.isArray(input)) {
    return { [prefix]: input.map((value) => String(value)).join(', ') }
  }

  if (typeof input === 'object') {
    return Object.entries(input as Record<string, unknown>).reduce(
      (acc, [key, value]) => {
        const nextPrefix = prefix ? `${prefix}.${key}` : key
        return { ...acc, ...flattenValues(value, nextPrefix) }
      },
      {} as Record<string, FlatValue>,
    )
  }

  return { [prefix]: input as FlatValue }
}

const getValueByPath = (input: JsonRecord, path: string): unknown => {
  return path.split('.').reduce<unknown>((acc, key) => {
    if (!acc || typeof acc !== 'object') {
      return undefined
    }
    return (acc as JsonRecord)[key]
  }, input)
}

const formatDaysList = (value: unknown) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).join(', ')
  }

  if (value === null || value === undefined) {
    return ''
  }

  return String(value)
}

const formatSingleDay = (value: unknown) => {
  if (Array.isArray(value) && value.length > 0) {
    return String(value[0])
  }

  if (value === null || value === undefined) {
    return ''
  }

  return String(value)
}

const normalizeUrl = (value: string) => {
  if (!value) {
    return value
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value
  }

  return `https://${value}`
}

const getSheetsClient = () => {
  const auth = new google.auth.JWT({
    email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  return google.sheets({ version: 'v4', auth })
}

const getHeaderRow = async (
  sheets: ReturnType<typeof getSheetsClient>,
  spreadsheetId: string,
  sheetName: string,
) => {
  const header = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!1:1`,
  })

  return header.data.values?.[0] ?? []
}

const updateHeaderRow = async (
  sheets: ReturnType<typeof getSheetsClient>,
  spreadsheetId: string,
  sheetName: string,
  headers: string[],
) => {
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!1:1`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [headers],
    },
  })
}

export async function POST(request: NextRequest, segmentData: { params: Params }) {
  // Handle CORS preflight
  const origin = request.headers.get('origin')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  
  // Allow requests from localhost during development
  if (origin && (origin.includes('localhost') || origin.includes('wlumsa.org'))) {
    headers['Access-Control-Allow-Origin'] = origin
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'Content-Type'
  }

  try {
    const params = await segmentData.params
    const formTitle = decodeURIComponent(params.form)
    const normalizedForm = formTitle.trim().toLowerCase()
    const { searchParams } = new URL(request.url)
    const spreadsheetId = searchParams.get('spreadsheetId') ?? env.GOOGLE_SHEETS_SPREADSHEET_ID
    const sheetName = searchParams.get('sheetName') ?? env.GOOGLE_SHEETS_SHEET_NAME ?? 'Sheet1'
    const body = await request.json()

    const payload = {
      // _formTitle: formTitle,
      _submittedAt: new Date().toISOString(),
      ...body,
    }

    const flattened = flattenValues(payload)
    const keys = Object.keys(flattened)

    if (!keys.length) {
      return NextResponse.json({ error: 'No fields provided' }, { status: 400 })
    }

    const sheets = getSheetsClient()
    const existingHeader = await getHeaderRow(sheets, spreadsheetId, sheetName)

    const header = [...existingHeader]
    keys.forEach((key) => {
      if (!header.includes(key)) {
        header.push(key)
      }
    })

    if (!existingHeader.length || header.length !== existingHeader.length) {
      await updateHeaderRow(sheets, spreadsheetId, sheetName, header)
    }

    const row = header.map((key) => {
      const value = flattened[key]
      if (value === null || value === undefined) {
        return ''
      }
      return String(value)
    })

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [row],
      },
    })

    if (normalizedForm === 'iftar' || normalizedForm === 'cancel') {
      const emailPath = 'contactInfo.email'
      const firstNamePath = 'contactInfo.first_name'
      const daysPath = 'days'
      const cancelLink = normalizeUrl('wlumsa.org/forms/iftar-cancellation')
      const email = getValueByPath(body, emailPath)
      const firstName = String(getValueByPath(body, firstNamePath) ?? '').trim() || 'there'
      const daysValue = getValueByPath(body, daysPath)
      const daysList = formatDaysList(daysValue)
      const dayText = formatSingleDay(daysValue)

      if (typeof email === 'string' && email) {
        try {
          if (normalizedForm === 'iftar') {
            const text = `Asalamu alaykum ${firstName}\n\nWe have received your request for Iftar this week. You are registered for are the following days: ${daysList || 'N/A'}\n\nIf you need to cancel, please do so using the following link: ${cancelLink}`
            await resend.emails.send({
              from: 'WLU MSA <admin@wlumsa.org>',
              to: email,
              subject: 'Iftar confirmation',
              text,
            })
          } else {
            const text = `Asalamu alaykum ${firstName}\n\nYou have cancelled your iftar for ${daysList || 'the selected day(s)'}.`
            await resend.emails.send({
              from: 'WLU MSA <admin@wlumsa.org>',
              to: email,
              subject: 'Iftar cancellation',
              text,
            })
          }
        } catch (emailError) {
          console.error('Webhook email failed:', emailError)
        }
      } else {
        console.warn('Webhook email skipped: missing contact email', { formTitle })
      }
    }

    return NextResponse.json(
      { message: 'Submission saved to Google Sheets' },
      { status: 200, headers }
    )
  } catch (error) {
    console.error('Google Sheets webhook error:', error)
    return NextResponse.json(
      { error: 'Failed to write to Google Sheets' },
      { status: 500, headers }
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin')
  const headers: Record<string, string> = {}
  
  if (origin && (origin.includes('localhost') || origin.includes('wlumsa.org'))) {
    headers['Access-Control-Allow-Origin'] = origin
    headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'Content-Type'
  }
  
  return new NextResponse(null, { status: 204, headers })
}

export async function GET() {
  return NextResponse.json({ message: 'Google Sheets webhook is running' }, { status: 200 })
}
