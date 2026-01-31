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
      <div className="max-w-3xl">
        <label className="block text-xl md:text-2xl font-semibold text-slate-800" htmlFor={name}>
          {label} {required && <span className="text-red-700">*</span>}
        </label>
        <Controller
          control={control}
          defaultValue=""
          name={name}
          render={({ field: { onChange, value } }) => (
            <ReactSelect
              className="mt-4"
              classNamePrefix="rs"
              inputId={name}
              instanceId={name}
              onChange={(val) => onChange(val ? val.value : '')}
              options={countryOptions}
              value={countryOptions.find((c) => c.value === value)}
              styles={{
                control: (base, state) => ({
                  ...base,
                  minHeight: '2.75rem',
                  borderRadius: '0.75rem',
                  borderColor: state.isFocused ? '#0f766e' : '#e2e8f0',
                  boxShadow: 'none',
                  '&:hover': { borderColor: state.isFocused ? '#0f766e' : '#cbd5e1' },
                  backgroundColor: 'transparent',
                  borderWidth: '0 0 2px 0',
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused ? 'rgba(14,116,144,0.08)' : 'white',
                  color: '#0f172a',
                  padding: '10px 14px',
                }),
                placeholder: (base) => ({
                  ...base,
                  color: '#94a3b8',
                }),
                singleValue: (base) => ({
                  ...base,
                  fontSize: '1.25rem',
                  fontWeight: 300,
                }),
                menu: (base) => ({
                  ...base,
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                }),
              }}
            />
          )}
          rules={{ required }}
        />
        {required && errors[name] && <Error />}
      </div>
    </Width>
  )
}