import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React, { Fragment } from 'react'
import { FormBlock } from '@/components/Forms/FormBlock/Form'
import configPromise from "@payload-config";
import { RefreshRouteOnSave } from './RefreshRouteOnSave';
type Params = Promise<{ title: string }>

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

// Lazy initialization of payload to prevent database connection issues
let payloadInstance: any = null;

async function getPayloadInstance() {
  if (!payloadInstance) {
    payloadInstance = await getPayload({ config: configPromise });
  }
  return payloadInstance;
}

// eslint-disable-next-line no-restricted-exports
export default async function Page(props: {
    params: Params
}) {
    const payload = await getPayloadInstance();
    const params = await props.params

    const slug = params.title

    const pageRes = await payload.find({
        collection: 'forms',
        where: {
            "slug": {
                equals: slug
            },
        },
        draft: false,
        overrideAccess: false,
    })
    console.log(pageRes)
    const page = pageRes.docs[0] as unknown as null | FormType
    console.log(page)
    if (page === null) {
        return notFound()
    }
    const id = pageRes.docs[0]?.id.toString()
    console.log(id)
    return (
        <Fragment>
            <RefreshRouteOnSave />
            <div className='min-h-screen mt-4 '>
                <FormBlock id={id || ""} form={page} />
            </div>
        </Fragment>
    )
}

