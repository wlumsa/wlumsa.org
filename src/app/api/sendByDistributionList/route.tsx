import { Resend } from 'resend';
import { getDistributionList, getImageByID } from "@/Utils/datafetcher";
import WelcomeEmail from 'emails/signup';
import { DistributionList } from '@/payload-types';
const resend = new Resend(process.env.RESEND_API_KEY);
import { getPublicURL } from '@/Utils/datafetcher';

//const resend = new Resend("re4Chuui1_5MzcEdVbdi5d626LGU3gWVyr" );
import { convertRichTextToMarkdown } from '@/Utils/converter';
interface DistributionListItem {
  id: string;
  'First Name': string;
  'Last Name': string;
  email: string;
}

function chunkArray(array:DistributionList['list'], chunkSize:number) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

export const POST = async (req: Request) => {
  try {
    const response = await req.json();
    const { title, subject, headerImage, publishedAt, content, distributionListId,content_html} = response;
    
    
    const distributionList: DistributionList['list'] = await getDistributionList(distributionListId);
    const image = await getImageByID(headerImage);
    console.log(image)
 
   
    const {publicUrl} = await getPublicURL(image.prefix,image.filename);
 
    //Check if this works on 
    
   
    // Split distributionList into chunks of 100 and use resend.batch.send to send emails at once, instead of one by one
    const chunks = chunkArray(distributionList, 100);
    chunks.forEach(async (chunk) => {
      const batch = chunk.map((user) => ({
        from: 'admin@wlumsa.org',
        to: [user.email],
        subject: subject,
        react: WelcomeEmail({ firstName: user.firstName, url: publicUrl}),
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