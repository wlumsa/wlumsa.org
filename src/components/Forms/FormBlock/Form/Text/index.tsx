import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Text: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<any & FieldValues>
  } & TextField
> = ({ name, errors, label, register, required: requiredFromProps, width, }) => {
  return (
    <Width width={width}>
      <div className="">
        <label className="label  text-md" htmlFor={name}>
          {label}
        </label>
        <input
          type="text"
          className="input w-full focus:border-secondary input-bordered"
          placeholder={label}
          id={name}
          {...register(name, { required: requiredFromProps })} />

        {requiredFromProps && errors[name] && <Error />}
      </div>
    </Width>
  )
}