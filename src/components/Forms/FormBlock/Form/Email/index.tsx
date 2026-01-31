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
      <div className="max-w-3xl">
        <label className="block text-xl md:text-2xl font-semibold text-slate-800" htmlFor={name}>
          {label} {requiredFromProps && <span className="text-red-700">*</span>}
        </label>
        <input
          className="mt-4 w-full border-b-2 border-slate-200 bg-transparent px-1 py-2.5 text-xl md:text-2xl font-light text-slate-900 outline-none transition focus:border-primary"
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