import type { ContactInfoField } from './types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const ContactInfo: React.FC<{
  errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>
  register: UseFormRegister<any & FieldValues>
} & ContactInfoField> = ({
  name,
  first_name,
  first_name_placeholder,
  last_name,
  last_name_placeholder,
  studentID,
  studentID_placeholder,
  email,
  email_placeholder,
  errors,
  label,
  register,
  required: requiredFromProps,
  width,
}) => {
    return (
      <div className='flex flex-col mx-auto'>
        <div className='items-center justify-center'>
          <div>
            <label className="label cursor-pointer">
              <span className="label-text text-3xl font-semibold text-gray-600">
                {label} {requiredFromProps && <span className='text-red-900'>*</span>}
              </span>
            </label>
          </div>
          <div className="flex flex-row text-gray-600 gap-8">
            <div className='flex flex-col py-2'>
              <label className="label text-lg" htmlFor={first_name}>
                First Name
              </label>
              <input
                type="text"
                className="input w-full focus:border-secondary input-bordered"
                placeholder={first_name_placeholder}
                id={first_name}
                {...register(`${name}.first_name`, { required: requiredFromProps })} />
            </div>
            <div className='flex flex-col py-2'>
              <label className="label text-lg" htmlFor={last_name}>
                Last Name
              </label>
              <input
                type="text"
                className="input w-full focus:border-secondary input-bordered"
                placeholder={last_name_placeholder}
                id={last_name}
                {...register(`${name}.last_name`, { required: requiredFromProps })}
              />
            </div>
            
          </div>
          <div className='flex flex-col text-gray-700'>
            <div className='flex flex-col py-2'>
              <label className="label text-lg" htmlFor={studentID}>
                Student ID
              </label>
              <input
                type="text"
                className="input w-full focus:border-secondary input-bordered"
                placeholder={studentID_placeholder}
                id={studentID}
                {...register(`${name}.studentID`, { required: requiredFromProps })}
              />
            </div>
            <div className='flex flex-col py-2'>
              <label className="label text-lg" htmlFor={email}>
                Email
              </label>
              <input
                type="text"
                className="input w-full focus:border-secondary input-bordered"
                placeholder={email_placeholder}
                id={email}
                {...register(`${name}.email`, { required: requiredFromProps })}
              />
            </div>
          </div>
        </div>
        {requiredFromProps && errors[name] && <Error />}
      </div>
    )
  }