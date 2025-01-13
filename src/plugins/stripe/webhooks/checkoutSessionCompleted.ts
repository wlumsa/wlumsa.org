import type { StripeWebhookHandler } from '@payloadcms/plugin-stripe/types'
import type Stripe from 'stripe'
import { APIError } from 'payload'

export const checkoutSessionCompleted: StripeWebhookHandler<{
  data: {
    object: Stripe.Checkout.Session
  }
}> = async ({ event, payload }) => {
  const { id: sessionId, metadata, amount_total, payment_status } = event.data.object
  const submissionId = metadata?.submissionId

  payload.logger.info(`🪝 Processing checkout session completed for session ID: ${sessionId}`)

  if (!submissionId) {
    throw new APIError('No submissionId found in checkout session metadata')
  }

  if (payment_status === 'paid') {
    try {
      await payload.update({
        collection: 'form-submissions',
        id: submissionId,
        data: {
          payment: {
            status: 'paid',
          },
        },
      })
    } catch (error) {
      throw new APIError(`Error updating submission: ${error}`)
    }

    try {
      const submission = await payload.findByID({
        collection: 'form-submissions',
        id: submissionId,
      })

      const form = await payload.findByID({
        collection: 'forms',
        id: typeof submission.form === 'string' ? submission.form : submission.id,
      })
      const { emails } = form

      emails?.map(async (email) => {
        await payload.sendEmail({
          to: email.emailTo,
          cc: email.cc,
          bcc: email.bcc,
          replyTo: email.replyTo,
          from: email.emailFrom,
          subject: `Payment Confirmed from ${submission.id}`,
          html: `
            <h2>Payment Confirmation</h2>
            <p>A payment has been successfully processed for submission: ${submission.id}</p>
            <hr/>
            <h3>Payment Details:</h3>
            <ul>
              <li>Amount: $${amount_total ? (amount_total / 100).toFixed(2) : '0.00'}</li>
              <li>Status: ${payment_status}</li>
              <li>Session ID: ${sessionId}</li>
            </ul>
            <hr/>
            <p>Submission ID: ${submissionId}</p>
            <p><small>This is an automated message.</small></p>
          `,
        })
      })
    } catch (error) {
      throw new APIError(`Error sending email: ${error}`)
    }
  }
}

// try {
//   const submission = await payload.findByID({
//     collection: 'form-submissions',
//     id: submissionId,
//   })

//   const enhancedSubmissionData = {
//     ...JSON.parse(JSON.stringify(submission.submissionData)),
//     paymentStatus: payment_status,
//     amount: amount_total ? `$${amount_total / 100}` : '$0.00',
//   }

//   await sendPaymentConfirmationEmail({
//     submission,
//     enhancedSubmissionData,
//     payment_status,
//     payload,
//   })
// } catch (error) {
//   throw new APIError(`Error sending confirmation email: ${error}`)
// }
// async function sendPaymentConfirmationEmail({
//   submission,
//   enhancedSubmissionData,
//   payment_status,
//   payload,
// }) {
//   const message = {
//     root: {
//       children: [
//         {
//           children: [
//             {
//               text:
//                 payment_status === 'paid'
//                   ? '✅ Payment Successfully Processed!'
//                   : '❌ Payment Failed',
//               version: 1,
//             },
//           ],
//           type: 'p',
//           version: 1,
//         },
//       ],
//       direction: null,
//       format: 'left' as const,
//       indent: 0,
//       type: 'root',
//       version: 1,
//     },
//   }

//   const html = await serializeLexical(message, enhancedSubmissionData)
//   const form = await payload.findByID({
//     id: typeof submission.form === 'string' ? submission.form : submission.form.id,
//     collection: 'forms',
//   })

//   if (form.emails?.length) {
//     const firstEmail = form.emails[0]
//     await payload.sendEmail({
//       to: firstEmail.emailTo,
//       cc: firstEmail.cc,
//       bcc: firstEmail.bcc,
//       replyTo: firstEmail.replyTo,
//       from: firstEmail.emailFrom,
//       subject: payment_status === 'paid' ? 'Payment Confirmed' : 'Payment Failed',
//       html,
//     })
//   }
// }