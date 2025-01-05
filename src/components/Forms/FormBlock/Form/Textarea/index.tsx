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
    <Width width={width}>
      <div className="">

        <label className="label text-base-100 text-md" htmlFor={name}>
          {label}
        </label>

        <textarea
          className="textarea textarea-bordered w-full focus:border-secondary  "
          placeholder={label}
          id={name}
          rows={rows}
          {...register(name, { required: requiredFromProps })} />

        {requiredFromProps && errors[name] && <Error />}
      </div>
    </Width>
  )
}