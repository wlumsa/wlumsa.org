import "server-only";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { getDistributionList } from "@/Utils/datafetcher";
import { PayloadRequest } from "payload";

// Lazy initialization of payload to prevent database connection issues
let payloadInstance: any = null;

async function getPayloadInstance() {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config: configPromise });
  }
  return payloadInstance;
}

export async function sendEmail(req: PayloadRequest, distributionListId: string, subject: string, htmlContent: string) {
  const list = await getDistributionList(distributionListId)

  console.log("sending ")
  const payload = await getPayloadInstance();
  const email = await payload.sendEmail({
    to: 'razan4424@gmail.com',
    from: 'onboarding@resend.dev',
    subject: subject,
    html: htmlContent,
  })
  return;
}
