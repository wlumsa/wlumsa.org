import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Email: React.FC<
  {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<any & FieldValues>
  } & EmailField
> = ({ name, errors, label, register, required: requiredFromProps, width }) => {
  return (
    <Width width={width}>
      <div className="">
        <label className="label text-base-100 text-md" htmlFor={name}>
          {label}
        </label>
        <input
          className="input input-bordered w-full  focus:border-secondary"
          id={name}
          placeholder="Email"
          type="text"
          {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required: requiredFromProps })}
        />
        {requiredFromProps && errors[name] && <Error />}
      </div>
    </Width>
  )
}