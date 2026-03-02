import type { CollectionAfterOperationHook } from 'payload'
import type { FormSubmission } from '@/payload-types'

export const afterSubmissionHook: CollectionAfterOperationHook = async ({
  operation,
  req,
  result,
}) => {
  if (operation !== 'create') return result

  const submission = result as FormSubmission
  const form = submission.form
  const formId = typeof form === 'number' ? form : form?.id
  if (!formId) return result

  const raw = submission.submissionData
  const submissionData =
    raw !== null && typeof raw === 'object' && !Array.isArray(raw)
      ? (raw as Record<string, unknown>)
      : null
  if (!submissionData) return result

  // Defer to the next event loop tick so the create transaction is fully
  // committed and its row locks on `forms` are released before we try to
  // acquire our own exclusive lock for the UPDATE.
  setImmediate(async () => {
    try {
      const form = await req.payload.findByID({
        collection: 'forms',
        id: formId,
        overrideAccess: true,
        depth: 0,
      })

      if (!form?.fields) return

      const updatedFields = (form.fields as any[]).map((field: any) => {
        if (field.blockType !== 'checkbox') return field

        const selectedValues = submissionData[field.name]
        if (!Array.isArray(selectedValues)) return field

        return {
          ...field,
          checkboxes: (field.checkboxes as any[])?.map((opt: any) => {
            if (
              selectedValues.includes(opt.label) &&
              typeof opt.limit === 'number' &&
              opt.limit > 0
            ) {
              return { ...opt, limit: opt.limit - 1 }
            }
            return opt
          }),
        }
      })

      const currentLimit = form.submissionLimit as number | null | undefined
      const updatedLimit =
        typeof currentLimit === 'number' ? Math.max(0, currentLimit - 1) : undefined

      await req.payload.update({
        collection: 'forms',
        id: formId,
        overrideAccess: true,
        data: {
          fields: updatedFields,
          ...(updatedLimit !== undefined ? { submissionLimit: updatedLimit } : {}),
        },
      })
    } catch (err) {
      req.payload.logger.error({ err, msg: 'afterSubmissionHook: failed to update form limits' })
    }
  })

  return result
}
