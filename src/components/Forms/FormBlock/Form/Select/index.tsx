import { SelectField } from './types'
import type { Control, FieldErrorsImpl, FieldValues } from 'react-hook-form'

import React from 'react'
import { Controller } from 'react-hook-form'
import ReactSelect from 'react-select'

import { Error } from '../Error'
import { Width } from '../Width'

export const Select: React.FC<{
  control: Control<FieldValues, any>
  errors: Partial<FieldErrorsImpl<{[x: string]: any}>>
} & SelectField> = ({ name, control, errors, label, options = [], required = false, width }) => {
  const validOptions = React.useMemo(() => {
    const filtered = options?.filter(opt => {
      // Convert limit to number to ensure proper comparison
      const limit = Number(opt.limit);
      return opt.limit===null || limit > 0;
    });
    return filtered;
  }, [options]);

  return (
    <div className="mx-auto min-h-[12rem]">
      <Width width={width || 100}>
        <div className="max-w-3xl">
          <label className="block text-xl md:text-2xl font-semibold text-slate-800" htmlFor={name}>
            {label} {required && <span className="text-red-700">*</span>}
          </label>
          <Controller
            control={control}
            defaultValue=""
            name={name}
            render={({ field: { onChange, value } }) => {
              return (
                <ReactSelect
                  className="mt-4"
                  classNamePrefix="rs"
                  inputId={name}
                  instanceId={name}
                  onChange={(val) => {
                    if (!val || val.value === null || val.value === undefined) {
                      onChange('');
                      return;
                    }

                    const selectedOption = validOptions?.find(opt => opt.value === val.value);

                    if (selectedOption) {
                      onChange(val.value);
                    } else {
                      onChange('');
                    }
                  }}
                  options={validOptions}
                  value={validOptions?.find((s) => s.value === value) || null}
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
              );
            }}
            rules={{ required: required || undefined }}
          />

          {errors[name] && <Error />}
        </div>
      </Width>
    </div>
  )
}