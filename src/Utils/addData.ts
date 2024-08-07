// import "server-only";
import { createClient } from "./client";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "@payload-config";
const payload = await getPayloadHMR({ config: configPromise });

export async function createMember(email:string, first:string, last:string, newsletter:boolean, studentId:string) {
try {
    const member = await payload.create({
    collection: 'Members',
    data: {
   
      "First Name": first,
      "Last Name": last,
      "mylaurier email": email,
      "Student Id": studentId,
      "Newsletter": newsletter || null,
    },

  })
} catch(e) {
    console.error("an error occurred :( - ", e);

}

} 