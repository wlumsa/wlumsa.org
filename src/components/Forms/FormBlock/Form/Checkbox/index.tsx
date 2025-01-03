import { CheckboxField } from './types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import React, { useState } from 'react'
import { Error } from '../Error'
import { Width } from '../Width'

export const Checkbox: React.FC<
  {
    errors: Partial<FieldErrorsImpl<{[x: string]: any}>>
    getValues: any
    register: UseFormRegister<any & FieldValues>
    setValue: any
  } & CheckboxField
> = ({
  name,
  errors,
  getValues,
  label,
  register,
  required: requiredFromProps,
  setValue,
  width,
  limit,
}) => {
  const isCheckboxChecked = getValues(name)

  if (limit === 0) {
    return null;
  }

  return (
    <Width width={width}>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text text-base-100">{label}</span>
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            {...register(name, { required: requiredFromProps })}
            checked={isCheckboxChecked}
            onChange={(e) => {
              setValue(name, e.target.checked);
            }}
          />
        </label>
        {requiredFromProps && errors[name] && !isCheckboxChecked && <Error />}
      </div>
    </Width>
  )
}