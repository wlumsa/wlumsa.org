import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body
    const body = await request.json()

    // Get headers
    const headers = Object.fromEntries(request.headers.entries())

    // Print the received data
    console.log('Webhook received:')
    console.log('Headers:', JSON.stringify(headers, null, 2))
    console.log('Body:', JSON.stringify(body, null, 2))

    // You can process the data here as needed

    // Return a success response
    return NextResponse.json({ message: 'Webhook received successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ error: 'Error processing webhook' }, { status: 400 })
  }
}

export async function GET() {
  return NextResponse.json({ message: 'Webhook endpoint is working' }, { status: 200 })
}