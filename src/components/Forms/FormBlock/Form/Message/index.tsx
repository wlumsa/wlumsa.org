import type { MessageField } from '@payloadcms/plugin-form-builder/types'

import React from 'react'

import RichText from '@/Utils/RichText'
import { Width } from '../Width'

export const Message: React.FC<MessageField> = ({ message }) => {
  return (
    <Width width={100}>
      <div className="min-h-[16rem] text-left text-lg md:text-xl leading-relaxed my-4 md:px-8 text-slate-700">
        <RichText className="my-2" content={message} />
      </div>
    </Width>
  )
}