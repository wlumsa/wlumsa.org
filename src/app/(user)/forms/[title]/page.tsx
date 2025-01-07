import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React, { Fragment } from 'react'
import { FormBlock } from '@/components/Forms/FormBlock/Form'
import configPromise from "@payload-config";
import { RefreshRouteOnSave } from './RefreshRouteOnSave';
type Params = Promise<{ title: string }>

import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'

// eslint-disable-next-line no-restricted-exports
export default async function Page(props: {
    params: Params
}) {
    const payload = await getPayload({ config: configPromise });
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
 
    const page = pageRes.docs[0] as unknown as null | FormType

    if (page === null) {
        return notFound()
    }
    const id = pageRes.docs[0]?.id.toString()
    return (
        <Fragment>
            <RefreshRouteOnSave />
            <FormBlock id={id || ""} form={page} />
        </Fragment>
    )
}

