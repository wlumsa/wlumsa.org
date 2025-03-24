import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<any & FieldValues>
    rows?: number
  } & TextField
> = ({ name, errors, label, register, required: requiredFromProps, rows = 3, width, }) => {
  return (
    <div className=" ">
    <Width width={width}>
     

        <label className=" text-3xl  font-semibold text-gray-600" htmlFor={name}>
          {label} {requiredFromProps && <span className='text-red-900'>*</span> }
        </label>

        <textarea
          className="textarea textarea-bordered w-full focus:border-secondary text-lg "
          placeholder={label}
          id={name}
          rows={rows}
          {...register(name, { required: requiredFromProps })} />

        {requiredFromProps && errors[name] && <Error />}
    </Width>
    </div>  
  )
}