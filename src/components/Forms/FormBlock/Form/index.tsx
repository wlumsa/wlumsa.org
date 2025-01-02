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
  form: FormType
  introContent?: {
    [k: string]: unknown
  }[]
}

// Update the type to include name
type ExtendedFormFieldBlock = FormFieldBlock & {
  name: string
}
type FormField = SelectField & {
  id: string;
}

export const FormBlock: React.FC<FormBlockType & { id?: string }> = (props) => {
  const {
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
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
        const submissionData = Object.entries(data)
          .filter(([name]) => !['price', 'paymentStatus'].includes(name))
          .reduce(
            (acc, [name, value]) => ({
              ...acc,
              [name]: value,
            }),
            {} as FormData,
          )

        // Get current form data for limits
        const formResponse = await fetch(`http://localhost:3000/api/forms/${formID}`)
        const formData = await formResponse.json()

        // Handle select field limits
        const selectFields = formData.fields.filter(
          (field: FormField) => field.blockType === 'select'
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
                fields: formData.fields.map((f: FormField) =>
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

        // Update submission limit if exists
        if (formData['submission-limit']) {
          await fetch(`http://localhost:3000/api/forms/${formID}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              'submission-limit': formData['submission-limit'] - 1,
            }),
          })
        }

        // Create the submission
        const req = await fetch(`http://localhost:3000/api/form-submissions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            form: formID,
            submissionData,
            payment: {
              amount: data.price,
              status: 'pending',
            },
          }),
        })

        const res = await req.json()
        
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
        setHasSubmitted(true)

        // Handle payment if needed
        if (data.price && Number(data.price) > 0) {
          try {
            const session = await createCheckoutSession(submissionId, Number(data.price))

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

      } catch (err) {
        console.error(err)
        setIsLoading(false)
        setError({
          message: err instanceof Error ? err.message : 'Something went wrong.',
          status: '500',
        })
      }
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="mt-20 flex flex-grow flex-col items-center">
      <div className="flex items-center">
        {!isLoading && hasSubmitted && confirmationType === 'message' && (
          <RichText className="" content={confirmationMessage} />
        )}
        {isLoading && <p>Loading, please wait...</p>}
        {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
        {!hasSubmitted && (
          <div className="w-full rounded-xl bg-primary px-2 md:w-[30rem]">
            <FormProvider {...formMethods}>
              <form className="card-body" id={formID} onSubmit={handleSubmit(onSubmit)}>
                <div className="">
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
                </div>
                <button
                  type="submit"
                  className="btn border-0 bg-secondary text-primary shadow duration-200 hover:scale-105 hover:text-base-100"
                  form={formID}
                >
                  {submitButtonLabel || 'Submit'} ➜
                </button>
              </form>
            </FormProvider>
          </div>
        )}
      </div>
    </div>
  )
}

// import { getPayload } from 'payload'
// import config from '@payload-config'
// const payload = await getPayload({ config })

// export async function updateFormLimitPayload(id:string){

// }