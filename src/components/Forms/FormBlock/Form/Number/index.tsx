import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Number: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<any & FieldValues>
  } & TextField
> = ({ name, errors, label, register, required: requiredFromProps, width }) => {
  return (
    <Width width={width}>
      <div className="">
        <label className="label text-base-100 text-md" htmlFor={name}>
          {label}
        </label>
        <input
          type="number"
          className="input w-full focus:border-secondary input-bordered"
          placeholder={label}
          id={name}
          {...register(name, { required: requiredFromProps })} />

        {requiredFromProps && errors[name] && <Error />}
      </div>
    </Width>
  )
}