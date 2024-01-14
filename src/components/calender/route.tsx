
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const calendarId =
    "ffaee011120fab396c40cef55e2b049696a3a50bca3229a50002368451799595@group.calendar.google.com";
  const apiKey = process.env.GOOGLE_API_KEY;

  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
        calendarId
      )}/events?key=${apiKey}`
    );
    if (!response.ok) {
      const errorResponse = await response.text();
      console.error(errorResponse);
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const data = await response.json();
    return NextResponse.json(data)
    
  } catch (error) {
    console.error(error);
    return  NextResponse.json(error)
  }
};
