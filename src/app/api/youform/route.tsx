import { NextRequest, NextResponse } from 'next/server'
import { isMember, addMember, addIndividualToList } from '@/Utils/datafetcher'
import { Resend } from 'resend';
import WelcomeEmail from 'emails/signup';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const headers = Object.fromEntries(request.headers.entries())

        console.log('Webhook received:')
        console.log('Headers:', JSON.stringify(headers, null, 2))
        console.log('Body:', JSON.stringify(body, null, 2))

        const { email, company, last_name, first_name } = body['Please fill the following']
        const newsletter = body['Would you like to signup to our newsletter?'] === 'Yes of course!'

        console.log('Email:', email)

        const isMemberRes = await isMember(company);
        if (isMemberRes) {
            return NextResponse.json({ message: 'You are already a member!', errors: true }, { status: 400 })
        }

        const addMemberRes = await addMember(first_name, last_name, email, company, newsletter)
        if (!addMemberRes) {
            return NextResponse.json({ message: 'Failed to sign up. Please try again.', errors: true }, { status: 400 })
        }

        if (newsletter) {
            await addIndividualToList("Newsletter", { email, first_name, last_name });
            await resend.contacts.create({
                email,
                first_name,
                last_name,
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

        return NextResponse.json({ message: 'Webhook received successfully' }, { status: 200 })
    } catch (error) {
        console.error('Error processing webhook:', error)
        return NextResponse.json({ error: 'Error processing webhook' }, { status: 400 })
    }
}

export async function GET() {
    return NextResponse.json({ message: 'Webhook endpoint is working' }, { status: 200 })
}