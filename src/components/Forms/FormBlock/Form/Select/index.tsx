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
  // Add console.log to debug options
  console.log('Original options:', options);
  
  const validOptions = React.useMemo(() => {
    const filtered = options?.filter(opt => {
      // Convert limit to number to ensure proper comparison
      const limit = Number(opt.limit);
      return opt.limit===null || limit > 0;
    });
    console.log('Filtered options:', filtered);
    return filtered;
  }, [options]);

  return (
    <div className="mx-auto min-h-[18rem]  ">
    <Width width={width || 100}>
    
        <label className="label min-w-96  text-md text-3xl font-semibold text-gray-600" htmlFor={name}>
          {label} {required&& <span className='text-red-900'>*</span> }
        </label>
        <Controller
          control={control}
          defaultValue=""
          name={name}
          render={({ field: { onChange, value } }) => {
            // Debug current value
            console.log('Current value:', value);
            
            return (
              <ReactSelect
                className=" min-w-96 my-4"
                classNamePrefix="rs"
                inputId={name}
                instanceId={name}
                onChange={(val) => {
                  // Debug onChange value
                  console.log('onChange val:', val);
                  
                  if (!val || val.value === null || val.value === undefined) {
                    onChange('');
                    return;
                  }

                  const selectedOption = validOptions?.find(opt => opt.value === val.value);
                  console.log('Selected option:', selectedOption);

                  if (selectedOption) {
                    onChange(val.value);
                  } else {
                    onChange('');
                  }
                }}
                options={validOptions}
                value={validOptions?.find((s) => s.value === value) || null}
                
              />
            );
          }}
          rules={{ required: required || undefined }}
        />
        
        {required && errors[name] && <Error />}
   
    </Width>
    </div>
  )
}