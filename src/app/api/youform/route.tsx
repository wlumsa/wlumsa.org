import { NextRequest, NextResponse } from 'next/server'
import { isMember, addMember, addIndividualToList } from '@/Utils/datafetcher'
import { Resend } from 'resend';
import WelcomeEmail from 'emails/signup';
const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(request: NextRequest) {
    
        // Parse the JSON body
        const body = await request.json()

        // Get headers
        const headers = Object.fromEntries(request.headers.entries())

        // Print the received data

        const { email, company, last_name, first_name } = body['Please fill the following']
        const { newsletter } = body['Would you like to signup to our newsletter?']

        console.log('Webhook received:')
        console.log('Headers:', JSON.stringify(headers, null, 2))
        console.log('Body:', JSON.stringify(body, null, 2))
        console.log('Email:', email)

        // You can process the data here as needed
        try {
            const isMemberRes = await isMember(company);
            if (isMemberRes) {
                return { message: 'You are already a member!', errors: true }
            }
            const addMemberRes = await addMember(first_name, last_name, email, company, newsletter)
            if (!addMemberRes) {
                return { message: 'Failed to sign up. Please try again.', errors: true }
            }
            if (newsletter) {
                await addIndividualToList("Newsletter", { email: email, first_name: first_name, last_name: last_name, });
                await resend.contacts.create({
                    email: email,
                    first_name: first_name,
                    last_name: last_name,
                    audience_id: "151a3c8b-5d3d-4f3d-a0a5-cc2e5663574b",
                    unsubscribed: false
                })
            }
            await resend.emails.send({
                from: `WLUMSA <admin@wlumsa.org>`,
                to: email,
                subject: "Here is a free gift!",
                react: WelcomeEmail({ firstName: first_name, content: "" }),
            });


            // Return a success response
            return NextResponse.json({ message: 'Webhook received successfully' }, { status: 200 })
        } catch (error) {
            console.error('Error processing webhook:', error)
            return NextResponse.json({ error: 'Error processing webhook' }, { status: 400 })
        }

    }



/*
Body: {
  "Please fill the following": {
    "email": "ahme2085@mylaurier.ca",
"company": "200720850",
    "last_name": "Ahmed",
    "first_name": "Syed"
  },
  "What year of study are you in?": "4",
  "What is your Major": "Computer Science",
  "Are you a brother or a sister?": "Brother",
  "Would you like to signup to our newsletter?": "Yes of course!"
}

*/