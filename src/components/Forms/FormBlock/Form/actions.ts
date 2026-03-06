'use server'

import { decrementFormSubmissionLimit } from '@/Utils/datafetcher'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function decrementSubmissionLimit(formID: string): Promise<number> {
  const payload = await getPayload({ config: configPromise })
  try {
    return await decrementFormSubmissionLimit(formID)
  } catch (err) {
    payload.logger.error(
      `[decrementSubmissionLimit] Failed to decrement submission limit for form ${formID}: ${err}`,
    )
    throw err
  }
}
