import { Resend } from 'resend';
import { getDistributionList, getImageByID } from "@/Utils/datafetcher";
import WelcomeEmail from 'emails/signup';
import {  Individual } from '@/payload-types';
const resend = new Resend(process.env.RESEND_API_KEY);
import { getPublicURL } from '@/Utils/datafetcher';

//const resend = new Resend("re4Chuui1_5MzcEdVbdi5d626LGU3gWVyr" );
import { convertRichTextToMarkdown } from '@/Utils/converter';


function chunkArray(array: Individual[], chunkSize: number) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}


export const POST = async (req: Request) => {
  try {
    const response = await req.json();
    const { title, subject, headerImage, publishedAt, content, distributionListId, content_html } = response;
    console.log(content_html)
    const distributionList: (number | Individual)[] | null | undefined = await getDistributionList(distributionListId);
    //checks to make sure distributionList is not a number
    if (!distributionList || !Array.isArray(distributionList)) {
      throw new Error('Invalid distribution list');
    }
    const validDistributionList: Individual[] = distributionList.filter((item): item is Individual=> {
      return typeof item === 'object' && 'email' in item;
    });
    const chunks = chunkArray(validDistributionList, 100);
    chunks.forEach(async (chunk) => {
      const batch = chunk.map((user) => ({
        from: 'admin@wlumsa.org',
        to: [user.email],
        subject: subject,
        html: content_html
        // react: WelcomeEmail({ firstName: user.firstName, url: publicUrl}),
      }));
      const res = await resend.batch.send(batch);
      console.log(res)
    });

    return new Response("Success!", {
      status: 200,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(`Internal server error ${error}`, {
      status: 500,
    });
  }
};