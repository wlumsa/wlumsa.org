'use server'

import { z } from 'zod'
import { addIndividualToList, addMember } from './datafetcher'
import { createClient } from './server'
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email").endsWith("@mylaurier.ca", "Must be a MyLaurier email"),
    studentId: z.string().regex(/^\d+$/, "Student ID must be a number").length(9, "Student ID must be 9 digits"),
    newsLetter: z.boolean(),
})
import WelcomeEmail from 'emails/signup';
export type State = {
    errors?: {
        firstName?: string[]
        lastName?: string[]
        email?: string[]
        studentId?: string[]
        newsLetter?: string[]
    }
    message?: string | null
}

export async function memberSignup(prevState: State, formData: FormData) {
    const validatedFields = schema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        studentId: formData.get('studentId'),
        newsLetter: formData.get('newsLetter') === 'on',
    })

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Failed to sign up.',
        }
    }

    const { firstName, lastName, email, studentId, newsLetter } = validatedFields.data
    //TODO: Add error checking logi for each fetcchw
    try {

        // TODO, perform check to make sure member is not already in the database
        const response = await addMember(firstName, lastName, email, studentId, newsLetter)

        if (newsLetter) {
            await addIndividualToList("Newsletter", {email: email,first_name: firstName,last_name: lastName,});
        }
        const data = await resend.emails.send({
            from: `WLUMSA <admin@wlumsa.org>`,
            to: email,
            subject: "Here is a free gift!",
            react: WelcomeEmail({ firstName: firstName, url: "https://wlumsa.org" }),
        });
        console.log(data)

        if (!response) {
            return { message: 'Failed to sign up. Please try again.' }
        }

        return { message: 'Thanks for signing up!' }
    } catch (error) {
        return { message: 'An error occurred. Please try again.' }
    }
}