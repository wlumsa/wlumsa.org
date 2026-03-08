'use server'

import { decrementFormSubmissionLimit } from '@/Utils/datafetcher'
import { decrementFormCheckboxLimits } from '@/Utils/datafetcher'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function decrementSubmissionLimit(formID: string): Promise<number> {
  const payload = await getPayload({ config: configPromise })
  console.log("Decrementing submission limit for form ID: ", formID)
  try {
    return await decrementFormSubmissionLimit(formID)
  
  } catch (err) {
    payload.logger.error(
      `[decrementSubmissionLimit] Failed to decrement submission limit for form ${formID}: ${err}`,
    )
    throw err
  }
}

export async function decrementCheckboxLimits(
  formID: string,
  submissionData: Record<string, unknown>,
): Promise<void> {
  const payload = await getPayload({ config: configPromise })
  try {
    await decrementFormCheckboxLimits(formID, submissionData)
  } catch (err) {
    payload.logger.error(
      `[decrementCheckboxLimits] Failed to decrement checkbox limits for form ${formID}: ${err}`,
    )
    throw err
  }
}
