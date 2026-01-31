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
      <div className="max-w-2xl">
        <label className="block text-lg font-semibold text-slate-700" htmlFor={name}>
          {label} {requiredFromProps && <span className="text-red-700">*</span>}
        </label>
        <input
          className="mt-3 w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-base shadow-sm transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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