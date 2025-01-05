'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import RichText from '@/Utils/RichText'
import { buildInitialFormState } from './buildInitialFormState'
import { fields } from './fields'
import { SelectField, Options } from './Select/types'
import { createCheckoutSession } from '@/plugins/stripe/actions'
import { CheckboxField } from './Checkbox/types'
export type Value = unknown

export interface Property {
  [key: string]: Value
}

export interface Data {
  [key: string]: Property | Property[] | Value
}

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  form: FormType & {
    submissionLimit?: number
    closeDate?: Date,
    releaseDate?: Date,
  }
  introContent?: {
    [k: string]: unknown
  }[]
}

// Update the type to include name
type ExtendedFormFieldBlock = FormFieldBlock & {
  name: string
}
type SelectFieldExtended = SelectField & {
  id: string;
}
type CheckboxFieldExtended = CheckboxField & {
  id: string;
}

export const FormBlock: React.FC<FormBlockType & { id?: string }> = (props) => {
  const {
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel, releaseDate, closeDate } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = formMethods

  const currentTime = new Date(); // Get the current date and time

  // Check if the form is open or closed
  const isBeforeReleaseDate = releaseDate && currentTime < new Date(releaseDate);
  const isAfterCloseDate = closeDate && currentTime > new Date(closeDate);

  // Render messages based on the date checks
  if (isBeforeReleaseDate) {
    return <div className="text-center p-4"><h2 className="mt-20 text-xl font-bold">Sorry, this form isn't open yet.</h2></div>;
  }

  if (isAfterCloseDate) {
    return <div className="text-center p-4"><h2 className="mt-20 text-xl font-bold">Sorry, this form has been closed.</h2></div>;
  }

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    async (data: Data) => {
      setError(undefined)
      setIsLoading(true)

      try {
        // Format the submission data
        const paymentField = formFromProps.fields.find(
          field => field.blockType === 'payment'
        )
        const paymentFieldName = paymentField?.name
        const paymentAmount = paymentFieldName ? data[paymentFieldName] : 0

        const submissionData = Object.entries(data)
          .filter(([name]) => name !== paymentFieldName)
          .reduce(
            (acc, [name, value]) => ({
              ...acc,
              [name]: value,
            }),
            {} as FormData,
          )

        // Get current form data for limits
        const formResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/forms/${formID}`)
        const formData = await formResponse.json()

        // Handle select field limits
        const selectFields = formData.fields.filter(
          (field: SelectFieldExtended) => field.blockType === 'select'
        )

        // Update select field limits
        for (const field of selectFields) {
          const selectedValue = data[field.name]?.toString()
          if (!selectedValue) continue

          const selectedOption = field.options?.find(
            (option: Options) => option.value === selectedValue
          )

          if (selectedOption?.limit) {
            await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/forms/${formID}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                fields: formData.fields.map((f: SelectFieldExtended) =>
                  f.id === field.id
                    ? {
                      ...f,
                      options: f.options.map(opt =>
                        opt.value === selectedValue
                          ? { ...opt, limit: opt.limit! - 1 }
                          : opt
                      )
                    }
                    : f
                )
              }),
            })
          }
        }

        // Handle checkbox field limits
        const checkboxFields = formData.fields.filter(
          (field: CheckboxFieldExtended) => field.blockType === 'checkbox'
        )

        // Only proceed if there are checkbox fields
        if (checkboxFields.length > 0) {
          // Prepare updates for checkboxes
          const updatedFields = formData.fields.map((f: CheckboxFieldExtended) => {
            if (f.blockType === 'checkbox') {
              const selectedValues = data[f.name] as string[]; // Cast to string array
              if (!selectedValues) return f;

              // Update limits for selected checkboxes
              const updatedCheckboxes = f.checkboxes.map(opt => {
                if (selectedValues.includes(opt.label) && opt.limit) {
                  return { ...opt, limit: opt.limit! - 1 }; // Decrement limit
                }
                return opt; 
              });

              return { ...f, checkboxes: updatedCheckboxes };
            }
            return f;
          });

          // Send a single fetch request to update all checkbox limits
          await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/forms/${formID}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fields: updatedFields }),
          });
        }

        // Update submission limit if exists
        if (formData.submissionLimit) {
          await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/forms/${formID}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              'submissionLimit': formData.submissionLimit - 1,
            }),
          })
        }

        // Create the submission
        const req = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/form-submissions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            form: formID,
            submissionData,
            payment: {
              amount: Number(paymentAmount),
              status: 'pending',
            },
          }),
        });

        const textResponse = await req.text(); // Get the raw response as text
        console.log('Raw Response:', textResponse); // Log the raw response

        if (!req.ok) {
          throw new Error(textResponse); // Throw an error with the raw response
        }

        const contentType = req.headers.get('Content-Type');
        let res;
        if (contentType && contentType.includes('application/json')) {
          res = JSON.parse(textResponse); // Parse as JSON if the content type is JSON
        } else {
          throw new Error('Received non-JSON response from server');
        }

        if (req.status >= 400) {
          throw new Error(res.errors?.[0]?.message || 'Failed to create submission')
        }

        const { doc: submission } = res
        const submissionId: string = submission.id

        if (!submissionId) {
          throw new Error('No submission ID received from the server')
        }

        // Set success state before handling payment
        setIsLoading(false)


        // Handle payment if needed
        if (paymentFieldName && data[paymentFieldName] && Number(data[paymentFieldName]) > 0) {
          try {
            const session = await createCheckoutSession(
              submissionId,
              Number(data[paymentFieldName])
            )

            if (!session?.url) {
              throw new Error('No session URL returned from createCheckoutSession')
            }

            router.push(session.url)
            return
          } catch (err) {
            console.error('Payment session creation failed:', err)
            setError({
              message: 'Failed to create payment session. Please try again.',
              status: '500',
            })
          }
        } else if (confirmationType === 'redirect' && redirect?.url) {
          router.push(redirect.url)
        }
        setHasSubmitted(true)

      } catch (err) {
        console.error('Submission error:', err);
        setError({
          message: err instanceof Error ? err.message : 'Something went wrong.',
          status: '500',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="mt-20 flex flex-grow flex-col items-center min-h-screen ">
      <div className="text-center p-4">
        <h1 className="text-2xl font-bold">{formFromProps.title} Form</h1>
      </div>
      <div className="flex items-center">
        {formFromProps.submissionLimit === 0 ? (
          <div className="text-center p-4">
            <h2 className="text-xl font-bold">This form has reached its limit</h2>
          </div>
        ) : (
          <>
            {!isLoading && hasSubmitted && confirmationType === 'message' && (
              <RichText className="" content={confirmationMessage} />
            )}
            {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
            {!hasSubmitted && (
              <div className="w-full rounded-xl bg-primary px-2 md:w-[30rem]">
                <FormProvider {...formMethods}>
                  <form className="card-body" id={formID} onSubmit={handleSubmit(onSubmit)}>
                    {formFromProps?.fields?.map((field: FormFieldBlock, index) => {
                      const Field: React.FC<any> = fields[field.blockType]
                      if (Field) {
                        return (
                          <div className="w-full" key={index}>
                            <Field
                              form={formFromProps}
                              {...field}
                              {...formMethods}
                              control={control}
                              errors={errors}
                              register={register}
                            />
                          </div>
                        )
                      }
                      return null
                    })}
                    <button type="submit" className="btn btn-secondary">
                      {submitButtonLabel || 'Submit'}
                      {isLoading && <span className="loading loading-spinner"></span>}
                    </button>
                  </form>
                </FormProvider>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

