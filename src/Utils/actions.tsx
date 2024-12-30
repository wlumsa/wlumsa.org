'use server'

import { z } from 'zod'
import { addIndividualToList, addMember, isMember, createComment, deleteCommentById, createRoommatePost, getRoommateImageURL } from './datafetcher'
import { resend } from './resend';
const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email").endsWith("@mylaurier.ca", "Must be a mylaurier email"),
    studentId: z.string().regex(/^\d+$/, "Student ID must be a number").length(9, "Student ID must be 9 digits"),
    newsLetter: z.boolean(),
})
import WelcomeEmail from 'emails/signup';
import { supabase } from '@/lib/supabaseClient';

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
            from: `WLUMSA <admin@wlumsa.org>`,
            to: email,
            subject: "Here is a free gift!",
            react: WelcomeEmail({ firstName: firstName, content: "" }),
        });
       

        return { message: 'Thanks for signing up!' }
    } catch (error) {
        return { message: `An error occurred. ${error instanceof Error ? error.message : String(error)}` }
    }
}

//Roommate service functions

export async function postComment(comment: string, postId: number) {
    try {
        const res = await createComment(comment, postId);
        if (!res) {
            return { message: 'Failed to post comment. Please try again.', errors: true }
        }
        return { res, message: 'Comment posted!' }
    } catch (error) {
        return { message: `An error occurred. ${error instanceof Error ? error.message : String(error)}` }
    }
}

export async function deleteComment(commentId:string) {
    try {
         const res = await deleteCommentById(commentId);
        return { res, message: 'Comment deleted!' }
    } catch (error) {
        return { message: `An error occurred. ${error instanceof Error ? error.message : String(error)}` }
    }
}

//Roommate service functions

    interface RoommatePost {
        title: string;
        address: string;
        propertyType: string;
        furnishingType: string;
        deposit: string;
        rent: string;
        gender: string;
        availableDate: string;
        description: string
        images:  string[];
        firstName: string;
        lastName: string;
        contactEmail: string;
        phone: string;
        facebook: string;
        instagram: string;
        whatsapp: string;
    }

export async function createPost(formData: RoommatePost) {
    try {
        const res = await createRoommatePost(formData);
        return { res, message: 'Post created!' }
    } catch (error) {
        return { message: `An error occurred. ${error instanceof Error ? error.message : String(error)}` }
    }
}



