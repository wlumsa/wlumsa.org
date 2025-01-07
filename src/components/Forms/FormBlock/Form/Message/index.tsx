import type { MessageField } from '@payloadcms/plugin-form-builder/types'

import React from 'react'

import RichText from '@/Utils/RichText'
import { Width } from '../Width'

export const Message: React.FC<MessageField> = ({ message }) => {
  return (
    <Width width={100}>
      <RichText className=" my-2  text-lg" content={message} />
    </Width>
  )
}