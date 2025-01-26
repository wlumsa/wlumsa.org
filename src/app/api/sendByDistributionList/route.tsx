import { getDistributionList, getImageByID } from "@/Utils/datafetcher";
import Newsletter from 'emails/general';
import { Individual } from '@/payload-types';
import { resend } from '@/Utils/resend';

export const maxDuration = 60; // This function can run for a maximum of 60 seconds


const EMAILS_PER_SECOND = 2; // Rate limit
const DELAY_MS = 1000 / EMAILS_PER_SECOND; // Delay in milliseconds

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

    const results = [];

    for (const user of validDistributionList) {
      try {
        const emailPayload = {
          from: `WLU MSA <admin@wlumsa.org>`,
          to: user.email,
          subject: subject,
          react: Newsletter({ firstName: user.firstName, content: content_html }),
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

      // Delay to respect the rate limit
      await new Promise(resolve => setTimeout(resolve, DELAY_MS));
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
