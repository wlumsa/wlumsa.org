import type { MessageField } from '@payloadcms/plugin-form-builder/types'

import React from 'react'

import RichText from '@/Utils/RichText'
import { Width } from '../Width'

export const Message: React.FC<MessageField> = ({ message }) => {
  return (
    <Width width={100}>
      <div className="w-full h-fit max-w-full overflow-hidden text-left text-sm md:text-lg leading-relaxed my-4  md:px-8 text-slate-700 dark:text-base-content">
        <RichText enableGutter={false} enableProse={false} content={message} />
      </div>
    </Width>
  )
}