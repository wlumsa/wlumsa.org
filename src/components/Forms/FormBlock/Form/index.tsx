'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState, useEffect } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useMutlistepForm } from './useMultiStepForm'
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

type SelectFieldExtended = SelectField & {
  id: string;
}
type CheckboxFieldExtended = CheckboxField & {
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
    trigger,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  // Define steps based on form fields
  const steps = formFromProps.fields.map((field: FormFieldBlock, index: number) => {
    const Field: React.FC<any> = fields[field.blockType]
    return (
      <div className="w-full flex flex-grow" key={index}>
        {Field ? (
          <Field
            form={formFromProps}
            {...field}
            {...formMethods}
            control={control}
            errors={errors}
            register={register}
          />
        ) : null}
      </div>
    )
  });

  // Use the multi-step form hook
  const { currStepIndex, step, next, back } = useMutlistepForm(steps);

  const onSubmit = useCallback(
    async (data: Data) => {
      console.log("Submit triggered")
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

  // Function to handle the next step
  const handleNext = async () => {
    const isValid = await trigger(); // Trigger validation for all fields
    if (isValid) {
      next(); // Proceed to the next step if valid
    }
  };

  // Automatically trigger submission when on the last step
  useEffect(() => {
    if (currStepIndex === steps.length) {
      handleSubmit(onSubmit)(); // Trigger the submit function
    }
  }, [currStepIndex, handleSubmit, onSubmit]);


  return (
    <div className="mt-20 flex min-h-screen flex-grow flex-col items-center">
      <h1 className='my-4 text-3xl text-bold'>{formFromProps.title} Form</h1>

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
              <div className="card w-96 min-h-[18rem] mx-4 rounded-xl border-primary border flex flex-col justify-between">
                <FormProvider {...formMethods}>
                  <form className="flex flex-col h-full card-body" id={formID} onSubmit={handleSubmit(onSubmit)} >
                    {currStepIndex === steps.length ? (
                      <div className="flex items-center justify-center flex-grow">
                        <span className="loading loading-spinner loading-lg"></span>
                      </div>
                    ) :
                      <div className='flex-grow'>
                        {step}
                      </div>}


                    <div className="card-actions justify-between mt-4">
                      <button type="button" className='btn btn-sm' onClick={back} disabled={currStepIndex === 0 || currStepIndex === steps.length} >
                        Back
                      </button>
                      {currStepIndex === steps.length - 1 ? (
                        <button type="button"  onClick={handleNext} className="btn btn-sm btn-secondary">
                          {submitButtonLabel || "submit"}
                          {isLoading && <span className="loading loading-spinner"></span>}
                        </button>
                      ) : (
                        <button type="button" className='btn btn-sm border border-neutral' onClick={handleNext} disabled={currStepIndex === steps.length}>
                          Next
                        </button>
                      )}
                    </div>
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

