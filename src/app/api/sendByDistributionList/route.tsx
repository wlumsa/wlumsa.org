import { getDistributionList, getImageByID } from "@/Utils/datafetcher";
import Newsletter from 'emails/general';
import CharityWeek from 'emails/charity_week';
import { Individual } from '@/payload-types';
import { resend } from '@/Utils/resend';
import { getPublicURL } from '@/Utils/datafetcher';
import { convertRichTextToMarkdown } from '@/Utils/converter';

function chunkArray(array: Individual[], chunkSize: number) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export async function POST(req: Request) {
  try {
    const response = await req.json();
    const { title, subject, headerImage, publishedAt, content, distributionListId, content_html } = response;
    console.log(content_html);
    const distributionList: (number | Individual)[] | null | undefined = await getDistributionList(distributionListId);
    
    if (!distributionList || !Array.isArray(distributionList)) {
      throw new Error('Invalid distribution list');
    }
    
    const validDistributionList: Individual[] = distributionList.filter((item): item is Individual => {
      return typeof item === 'object' && 'email' in item;
    });
    
    console.log(validDistributionList);
    const chunks = chunkArray(validDistributionList, 100);
    
    const results = await Promise.all(chunks.map(async (chunk) => {
      const batch = chunk.map((user) => ({
        from: 'admin@wlumsa.org',
        to: [user.email],
        subject: subject,
        react: Newsletter({ firstName: user.firstName, content: content_html }),
      }));
      
      console.log(batch);
      const { data, error } = await resend.batch.send(batch);
      
      if (error) {
        console.log(error);
        return { error };
      }
      
      console.log(data);
      return { data };
    }));

    const errors = results.filter(result => result.error);
    if (errors.length > 0) {
      return Response.json({ errors }, { status: 500 });
    }

    return Response.json({ message: "Emails sent successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(`Internal server error ${error}`, {
      status: 500,
    });
  }
}