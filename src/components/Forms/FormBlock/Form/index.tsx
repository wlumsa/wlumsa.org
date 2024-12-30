
'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'


import RichText from '@/Utils/RichText'
import { buildInitialFormState } from './buildInitialFormState'
import { fields } from './fields'

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

export const FormBlock: React.FC<
  FormBlockType & {
    id?: string
  }
> = (props) => {
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
    getValues,
    handleSubmit,
    register,
    setValue,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: Data) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)
        console.log(data)
        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))
        console.log(dataToSend)
        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`http://localhost:3000/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          console.log("Data",dataToSend)


          const res = await req.json()

          clearTimeout(loadingTimerID)


          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    /*
        <div>
      <div className="flex items-center">
        <div className="w-full rounded-xl bg-primary px-2 md:w-[30rem]">
    */
    <div className="mt-20 flex flex-grow flex-col items-center">
      <div className="flex items-center">
        {!isLoading && hasSubmitted && confirmationType === 'message' && (
          <RichText className="" content={confirmationMessage} />
        )}
        {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
        {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
        {!hasSubmitted && (
          <div className="w-full rounded-xl bg-primary px-2 md:w-[30rem]">

            <form className="card-body" id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                {formFromProps &&
                  
                  formFromProps.fields &&
                  formFromProps.fields.map((field, index) => {
                    const Field: React.FC<any> = fields?.[field.blockType]
                    if (Field) {
                      return (
                        <React.Fragment key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </React.Fragment>
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
                Submit ➜
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
import { createClient } from '@/Utils/client'

const supabase = createClient();

export async function updateFormLimit(id: string, currentLimit: number) {
  const { data, error } = await supabase
    .from("forms")
    .update({ "submission_limit": currentLimit-1 })
    .eq("id", id)
    .gt("submission_limit", 0)
    .select();
  console.log(data)
  console.log(error)
  return;
}