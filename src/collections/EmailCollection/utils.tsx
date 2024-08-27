 import "server-only";
import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from "@payload-config";
const payload = await getPayloadHMR({ config: configPromise });
import { getDistributionList } from "@/Utils/datafetcher";
import { PayloadRequest } from "payload";



export async function sendEmail(req:PayloadRequest, distributionListId:string, subject:string, htmlContent:string){
    const list = await getDistributionList(distributionListId)
   
    console.log("sending ")
    const email = await payload.sendEmail({
      to:  'razan4424@gmail.com',
      from: 'onboarding@resend.dev',
      subject: subject,
      html: htmlContent,
      })
    return;
} 