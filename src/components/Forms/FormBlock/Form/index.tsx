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
import { ContactInfoField } from './ContactInfo/types'
import { MoveLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
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
    webhook?: string,
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
type ContactInfoFieldExtended = ContactInfoField & {
  id: string;
}
const containerVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, type: "spring", stiffness: 50 } },
  exit: { opacity: 0, x: 50, transition: { duration: 0.3 } }
};
export const FormBlock: React.FC<FormBlockType & { id?: string }> = (props) => {
  const {
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
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
    const Field: React.FC<any> | undefined = fields[field.blockType as keyof typeof fields]
    return (
      <div className="w-full flex flex-grow" key={index}>
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full h-[18rem-full] rounded-xl flex flex-col justify-between px-8"
          >
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
          </motion.div>
        </AnimatePresence>
      </div>
    )
  });

  // Use the multi-step form hook
  const { currStepIndex, step, next, back } = useMutlistepForm(steps);
  const totalSteps = steps.length;

  const onSubmit = useCallback(
    async (data: Data) => {
      console.log("Submit triggered")
     // setError(undefined)
      setIsLoading(true)
      console.log("Form from Field", formFromProps)
      console.log("Submit triggered")
      console.log("Contact Info Data:", data.contactInfo); // Accessing Contact Info data
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
        console.log("Submission Data", submissionData)

        console.log(formFromProps.webhook)
        if (formFromProps.webhook) {
          try {
            // Convert absolute URL to relative path to avoid CORS issues in development
            let webhookUrl = formFromProps.webhook
            if (webhookUrl.includes('wlumsa.org')) {
              const url = new URL(webhookUrl)
              webhookUrl = url.pathname + url.search
            }
            
            const webhookResponse = await fetch(webhookUrl, {
              body: JSON.stringify(submissionData),
              method: "POST",
              headers: { 'Content-Type': 'application/json' },
            })

            if (!webhookResponse.ok) {
              console.error('Webhook request failed:', webhookResponse.status)
            }
          } catch (webhookError) {
            console.error('Webhook request error:', webhookError)
            // Do not fail the entire form submission if the webhook fails.
          }
        }

        // Handle newsletter signup if newsletter checkbox is checked
        const newsletterField = formFromProps.fields.find(
          field => field.blockType === 'checkbox' && 'name' in field && field.name === 'newsletter'
        );

        if (newsletterField && 'name' in newsletterField) {
          const newsletterValue = data[newsletterField.name];
          const isNewsletterChecked = Array.isArray(newsletterValue) && newsletterValue.length > 0;

          if (isNewsletterChecked) {
            // Extract name and email from the form data
            const nameField = formFromProps.fields.find(field =>
              field.blockType === 'text' && 'name' in field && (field.name === 'name' || field.name === 'firstName')
            );
            const emailField = formFromProps.fields.find(field =>
              field.blockType === 'email' && 'name' in field && field.name === 'email'
            );

            if (nameField && emailField && 'name' in nameField && 'name' in emailField) {
              const name = data[nameField.name];
              const email = data[emailField.name];

              if (name && email) {
                try {
                  await fetch('/api/addContact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      name: name,
                      email: email,
                      newsletter: true
                    }),
                  });
                  console.log('Successfully added to newsletter');
                } catch (err) {
                  console.error('Failed to add to newsletter:', err);
                  // Don't fail the entire form submission if newsletter signup fails
                }
              }
            }
          }
        }


        // Get current form data for limits
        let formData = null
        try {
          const formResponse = await fetch(`/api/forms/${formID}`)
          if (!formResponse.ok) {
            console.error('Failed to fetch form data:', formResponse.status)
          } else {
            formData = await formResponse.json()
          }
        } catch (err) {
          console.error('Error fetching form data:', err)
          // Continue with form submission even if we can't fetch form data for limits
        }

        // Handle select field limits
        const selectFields = formData?.fields?.filter(
          (field: SelectFieldExtended) => field.blockType === 'select'
        ) || []


        // Update select field limits
        for (const field of selectFields) {
          const selectedValue = data[field.name]?.toString()
          if (!selectedValue) continue

          const selectedOption = field.options?.find(
            (option: Options) => option.value === selectedValue
          )

          if (selectedOption?.limit) {
            try {
              const updateResponse = await fetch(`/api/forms/${formID}`, {
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
              if (!updateResponse.ok) {
                console.error('Failed to update select field limits:', updateResponse.status)
              }
            } catch (err) {
              console.error('Error updating select field limits:', err)
            }
          }
        }

        // Handle checkbox field limits
        const checkboxFields = formData?.fields?.filter(
          (field: CheckboxFieldExtended) => field.blockType === 'checkbox'
        ) || []
        let updatedCheckboxes: CheckboxFieldExtended['checkboxes'] = []

        // Only proceed if there are checkbox fields
        if (checkboxFields.length > 0 && formData?.fields) {
          // Prepare updates for checkboxes
          const updatedFields = formData.fields.map((f: CheckboxFieldExtended) => {
            if (f.blockType === 'checkbox') {
              const selectedValues = data[f.name] as string[]; // Cast to string array
              if (!selectedValues) return f;

              // Update limits for selected checkboxes
               updatedCheckboxes = f.checkboxes.map(opt => {
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
          try {
            const updateResponse = await fetch(`/api/forms/${formID}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ fields: updatedFields }),
            })
            if (!updateResponse.ok) {
              console.error('Failed to update checkbox field limits:', updateResponse.status)
            }
          } catch (err) {
            console.error('Error updating checkbox field limits:', err)
          }
        }
        //check checkbox limit
        const closeForm = formData?.fields?.some(
          (field: CheckboxFieldExtended) =>
            field.blockType === 'checkbox' &&
            updatedCheckboxes.every((opt) => opt.limit === 0)
        ) || false;
        console.log("Close Form", closeForm)
        if(formData?.submissionLimit) {
          try {
            const limitUpdate = closeForm ? 0 : formData.submissionLimit - 1
            const updateResponse = await fetch(`/api/forms/${formID}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                'submissionLimit': limitUpdate,
              }),
            })
            if (!updateResponse.ok) {
              console.error('Failed to update submission limit:', updateResponse.status)
            }
          } catch (err) {
            console.error('Error updating submission limit:', err)
          }
        }




        // Create the submission
        let req, textResponse, res, submissionId;
        try {
          req = await fetch(`/api/form-submissions`, {
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

          textResponse = await req.text(); // Get the raw response as text

          if (!req.ok) {
            throw new Error(textResponse); // Throw an error with the raw response
          }

          const contentType = req.headers.get('Content-Type');
          if (contentType && contentType.includes('application/json')) {
            res = JSON.parse(textResponse); // Parse as JSON if the content type is JSON
          } else {
            throw new Error('Received non-JSON response from server');
          }

          if (req.status >= 400) {
            throw new Error(res.errors?.[0]?.message || 'Failed to create submission')
          }

          const { doc: submission } = res
          submissionId = submission.id

          if (!submissionId) {
            throw new Error('No submission ID received from the server')
          }
        } catch (fetchError) {
          console.error('Form submission fetch error:', fetchError)
          throw new Error(
            fetchError instanceof Error 
              ? fetchError.message 
              : 'Network error: Unable to connect to the server. Please check your connection and try again.'
          )
        }

        // Set success state before handling payment
        setIsLoading(false)


        // Handle payment if needed
        if (paymentFieldName && data[paymentFieldName] && Number(data[paymentFieldName]) > 0) {
          try {
            const session = await createCheckoutSession(
              submissionId,
              Number(data[paymentFieldName]),
              formFromProps.title
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
    <div className="flex min-h-[80vh] w-full flex-col items-center justify-center bg-gradient-to-b from-white via-slate-50 to-white dark:from-base-100 dark:via-base-200 dark:to-base-100 px-4 py-10 mt-8">
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-base-content tracking-tight">
          {formFromProps.title}
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-base-content/70">
          {Math.min(currStepIndex + 1, totalSteps)} / {totalSteps}
        </p>
        <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100 dark:bg-base-300">
          <div
            className="h-1.5 rounded-full bg-primary transition-all duration-300"
            style={{ width: `${totalSteps ? (Math.min(currStepIndex + 1, totalSteps) / totalSteps) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="flex items-center w-full justify-center">
        {formFromProps.submissionLimit === 0 ? (
          <div className="text-center p-4">
            <h2 className="text-xl font-bold text-base-content">This form has reached its limit</h2>
          </div>
        )  : formFromProps.releaseDate && new Date() < new Date(formFromProps.releaseDate) ? (
          <div className="text-center p-4">
            <h2 className="text-xl font-bold text-base-content">This form will be releasing at {new Date(formFromProps.releaseDate).toLocaleString('en-US', { timeZone: 'America/New_York' })}</h2>
          </div>
        ) : formFromProps.closeDate && new Date() > new Date(formFromProps.closeDate) ? (
          <div className="text-center p-4">
            <h2 className="text-xl font-bold text-base-content">This was closed at {new Date(formFromProps.closeDate).toLocaleString('en-US', { timeZone: 'America/New_York' })}</h2>
          </div>
        ) : (
          <>
            {!isLoading && hasSubmitted && confirmationType === 'message' && (
              <div>
                <RichText className="" content={confirmationMessage} />
              </div>
            )}
            {error && <div className="text-error">{`${error.status || '500'}: ${error.message || ''}`}</div>}
            {!hasSubmitted && (
              <div className="w-full max-w-5xl min-w-0">
                <FormProvider {...formMethods}>
                  <form
                    className="flex flex-col h-[427640px] md:h-[480px] rounded-3xl border border-slate-200 dark:border-base-300 bg-white/80 dark:bg-base-200/90 shadow-2xl shadow-slate-200/40 dark:shadow-base-300/20 backdrop-blur w-full"
                    id={formID}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {currStepIndex === steps.length ? (
                      <div className="flex flex-grow items-center justify-center py-20">
                        <span className="loading loading-spinner loading-lg"></span>
                      </div>
                    ) :
                      <div className="flex-grow h-fit overflow-y-auto p-2 md:p-8">
                        {step}
                      </div>}


                    <div className="flex items-center justify-between border-t border-slate-100 dark:border-base-300 px-6  md:px-8">
                      <button
                        type="button"
                        className="btn btn-md text-lg btn-ghost"
                        onClick={back}
                        disabled={currStepIndex === 0 || currStepIndex === steps.length}
                      >
                        <MoveLeft className="w-6 h-6" />
                      </button>
                      {currStepIndex === steps.length - 1 ? (

                        <button type="button" onClick={handleNext} className="btn btn-secondary px-10 text-lg">
                          {submitButtonLabel || "Submit"}
                          {isLoading && <span className="loading loading-spinner items-center justify-center"></span>}
                        </button>
                      ) : (
                        <button type="button" className="btn btn-secondary text-lg px-10" onClick={handleNext} disabled={currStepIndex === steps.length}>
                          {currStepIndex === steps.length ? (submitButtonLabel || "Submit") : 'Next'}
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

