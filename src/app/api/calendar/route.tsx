
 import { NextResponse } from "next/server";
 export async function GET(request: Request) {
   const calendarId =
     "c_a7b0881ec9f4b1f326560c3e89616406d4b28318abca3a01a7bce0ab92aed3e1@group.calendar.google.com";
   const apiKey = process.env.GOOGLE_API_KEY;

   try {
     const response = await fetch(
       `https:www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
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
