import { getDistributionList, getImageByID } from "@/Utils/datafetcher";
import Newsletter from 'emails/general';
import { Individual } from '@/payload-types';
import { resend } from '@/Utils/resend';

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

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const results = [];

    for (const user of validDistributionList) {
      try {
        const emailPayload = {
          from: `WLU MSA <admin@wlumsa.org>`,
          to: user.email,
          subject: subject,
          react: Newsletter({ firstName: user.firstName, content: content_html}),
          scheduled_at: publishedAt,
        };
        console.log(emailPayload)
        const { data, error } = await resend.emails.send(emailPayload);

        if (error) {
          console.error(`Failed to send email to ${user.email}:`, error);
          results.push({ email: user.email, success: false, error });
        } else {
          console.log(`Email sent to ${user.email}:`, data);
          results.push({ email: user.email, success: true });
        }
      } catch (err) {
        console.error(`Unexpected error for ${user.email}:`, err);
        results.push({ email: user.email, success: false, error: err });
      }

      await delay(1000); // 1-second delay
    }

    const failedResults = results.filter(result => !result.success);
    if (failedResults.length > 0) {
      return new Response(
        JSON.stringify({ message: "Some emails failed to send", failedResults }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({ message: "All emails sent successfully", results }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(`Internal server error ${error}`, {
      status: 500,
    });
  }
}
