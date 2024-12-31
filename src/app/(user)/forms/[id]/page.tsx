import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import { FormBlock } from '@/components/Forms/FormBlock/Form'
import configPromise from "@payload-config";

type Params = Promise<{ slug: string }>

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

// eslint-disable-next-line no-restricted-exports
export default async function Page(props: {
    params: Params
 
  }) {
   const payload = await getPayload({ config: configPromise });
    const params = await props.params

    const slug = params.slug
    const pageRes = await payload.find({
        collection: 'forms',
        draft: false,
        limit: 1,
        overrideAccess: false,
    
    })
    console.log(pageRes)
    console.log(slug)

    const page = pageRes?.docs?.[0] as unknown as null | FormType
    console.log(page)

    if (page === null) {
        return notFound()
    }

    return (
        <React.Fragment>
            <FormBlock id={slug || ""} form={page} />
        </React.Fragment>
    )
}

