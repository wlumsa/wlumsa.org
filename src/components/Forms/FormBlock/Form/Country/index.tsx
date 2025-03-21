import type { CountryField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'

import React from 'react'
import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

import { Error } from '../Error'
import { Width } from '../Width'
import { countryOptions } from './options'

export const Country: React.FC<
  {
    control: Control<FieldValues, any>
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
  } & CountryField
> = ({ name, control, errors, label, required, width }) => {
  return (
    <Width width={width}>
      <div className="">
        <label className="" htmlFor={name}>
          {label} {required && <span className='text-red-900'>*</span> }
        </label>
        <Controller
          control={control}
          defaultValue=""
          name={name}
          render={({ field: { onChange, value } }) => (
            <ReactSelect
              className=""
              classNamePrefix="rs"
              inputId={name}
              instanceId={name}
              onChange={(val) => onChange(val ? val.value : '')}
              options={countryOptions}
              value={countryOptions.find((c) => c.value === value)}
            />
          )}
          rules={{ required }}
        />
        {required && errors[name] && <Error />}
      </div>
    </Width>
  )
}