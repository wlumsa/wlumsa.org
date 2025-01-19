'use server'

import { z } from 'zod'
import { addIndividualToList, addMember, isMember, removeIndividualFromList, updateNewsletterStatus } from './datafetcher'
import { resend } from './resend';
const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email").endsWith("@mylaurier.ca", "Must be a mylaurier email"),
    studentId: z.string().regex(/^\d+$/, "Student ID must be a number").length(9, "Student ID must be 9 digits"),
    newsLetter: z.boolean(),
})
import WelcomeEmail from 'emails/signup';

export async function removeMemberFromNewsletter(email: string) {
    //check if they are apart of newsletter collection
const updateStatus = await updateNewsletterStatus(email);
if (!updateStatus) {
    return { message: 'You are not subscribed to the newsletter', errors: true }
}

    const remove = await removeIndividualFromList("Newsletter",  email );
    if (!remove) {
        return { message: 'You are not subscribed to the newsletter', errors: true }
    } 
   
    return { message: 'You have been removed from the newsletter' }

}

export async function memberSignup(formData: FormData) {
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
            message: `Failed to sign up. ${Object.values(validatedFields.error.flatten().fieldErrors).join(", ")}`,
        }
    }

    const { firstName, lastName, email, studentId, newsLetter } = validatedFields.data

    try {
        const isMemberRes = await isMember(studentId);
        if (isMemberRes) {
            return { message: 'You are already a member!', errors: true }
        }
        const addMemberRes = await addMember(firstName, lastName, email, studentId, newsLetter)
        if(!addMemberRes) {
            return { message: 'Failed to sign up. Please try again.', errors: true }
        }
        if (newsLetter) {
            await addIndividualToList("Newsletter", { email: email, first_name: firstName, last_name: lastName, });
            await resend.contacts.create({
                email:email,
                first_name:firstName,
                last_name:lastName,
                audience_id:"151a3c8b-5d3d-4f3d-a0a5-cc2e5663574b",
                unsubscribed:false
            })
        }
        await resend.emails.send({
            from: `WLU MSA <admin@wlumsa.org>`,
            to: email,
            subject: "Here is a free gift!",
            react: WelcomeEmail({ firstName: firstName, content: "" }),
        });
       

        return { message: 'Thanks for signing up!' }
    } catch (error) {
        return { message: `An error occurred. ${error instanceof Error ? error.message : String(error)}` }
    }
}


