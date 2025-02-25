import type { MessageField } from '@payloadcms/plugin-form-builder/types'

import React from 'react'

import RichText from '@/Utils/RichText'
import { Width } from '../Width'

export const Message: React.FC<MessageField> = ({ message }) => {
  return (
    <Width width={100}>
      <div className="min-h-[18rem]  md:text-center justify-center text-2xl my-4">
      <RichText className=" my-2 text-gray-700 " content={message} />
      </div>  
    </Width>
  )
}