import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const formTitle = searchParams.get('form') ?? 'TestForm'
  const spreadsheetId = searchParams.get('spreadsheetId')
  const sheetName = searchParams.get('sheetName')

  const sampleData = {
    name: 'John Doe',
    email: 'john@example.com',
    age: 25,
    newsletter: ['Yes'],
    contactInfo: {
      first_name: 'John',
      last_name: 'Doe',
      phone: '555-1234',
    },
    preferences: {
      notifications: true,
      theme: 'dark',
    },
  }

  try {
    let webhookUrl = `${request.url.split('/test')[0]}/${encodeURIComponent(formTitle)}`
    
    if (spreadsheetId) {
      webhookUrl += `?spreadsheetId=${spreadsheetId}`
      if (sheetName) {
        webhookUrl += `&sheetName=${sheetName}`
      }
    }

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sampleData),
    })

    const result = await response.json()

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      webhookUrl,
      sentData: sampleData,
      webhookResponse: result,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
