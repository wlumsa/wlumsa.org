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
    <div className=" "> 
      <Width width={width}>
        <div className="">
          <label className="label min-w-96  text-md text-3xl font-semibold text-gray-600" htmlFor={name}>
            {label} {requiredFromProps && <span className='text-red-900'>*</span> }
          </label> 
          <input
            type="number"
            className="input min-w-96 focus:border-secondary input-bordered my-4"
            placeholder="5"
            id={name}
            min={0}
            {...register(name, { required: requiredFromProps ? `${label} is required` : false })}
          />

          {requiredFromProps && errors[name] && <Error/>}
        </div>
      </Width>
    </div>
  )
}