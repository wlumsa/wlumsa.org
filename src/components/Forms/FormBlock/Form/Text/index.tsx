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
  console.log(errors[name]?.type)
  

  return (
    <div className="mx-auto  min-h-[18rem] ">
    <div className=''>
     
        <label className="label min-w-96 text-3xl font-semibold text-gray-600 " htmlFor={name}>
          {label} {requiredFromProps && <span className='text-red-700'>*</span> }
         </label>
    
        <input
          type="text"
          className="input min-w-96 focus:border-secondary input-bordered my-4 text-lg"
          placeholder={label}
          id={name}
          {...register(name, { required: requiredFromProps })}
 
        />
       

        {requiredFromProps && errors[name]  && errors[name].type &&
          <Error />
        }
      </div>
    </div>
  )
}