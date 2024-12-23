import type { SelectField } from '@/payload-types'
import type { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'

import React from 'react'
import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

import { Error } from '../Error'
import { Width } from '../Width'

export const Select: React.FC<
  {
    control: Control<FieldValues, any>
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
  } & SelectField
> = ({ name, control, errors, label, options = [], required = false, width }) => {
  return (
    <Width width={width || 100}>
      <div className="">
        <label className="label text-base-100 text-md" htmlFor={name}>
          {label}
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
              options={options || []}
              value={options?.find((s) => s.value === value) || null}
            />
          )}
          rules={{ required: required || undefined }}  // Ensure required is not null
        />

        
        {required && errors[name] && <Error />}
      </div>
    </Width>
  )
}