'use server'

import { z } from 'zod'
import { addIndividualToList } from './datafetcher'
import { createClient } from './server'
const supabase = createClient()
const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email").endsWith("@mylaurier.ca", "Must be a MyLaurier email"),
    studentId: z.string().regex(/^\d+$/, "Student ID must be a number").length(9, "Student ID must be 9 digits"),
    newsLetter: z.boolean(),
})

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

    try {
        const response = await fetch('http://localhost:3000/api/members', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "First Name": firstName,
                "Last Name": lastName,
                "mylaurier email": email,
                "Student Id": studentId,
                "Newsletter": newsLetter,
            }),
        })


        const res = await addIndividualToList("Newsletter", {
            email: email,
            first_name: firstName,
            last_name: lastName,
        });
        
        if (!response.ok) {
            return { message: 'Failed to sign up. Please try again.' }
        }

        return { message: 'Thanks for signing up!' }
    } catch (error) {
        return { message: 'An error occurred. Please try again.' }
    }
}