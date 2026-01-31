"use client"
import { CheckboxField } from './types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import React, { useEffect, useState } from 'react'
import { Check } from 'lucide-react'
import { Error } from '../Error'
import { Width } from '../Width'

export const Checkbox: React.FC<
  {
    errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>
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
  checkboxes, // Array of checkbox options
  isMultipleChoice, // Indicates if multiple checkboxes can be selected
}) => {
    const [checkedValues, setCheckedValues] = useState<string[]>([]);

    // Effect to sync checked values with form state
    useEffect(() => {
      const currentValues = getValues(name) || [];
      setCheckedValues(currentValues);
    }, [getValues, name]);

    const handleCheckboxChange = (optionLabel: string, isChecked: boolean) => {
      let newValues;
      if (isMultipleChoice) {
        newValues = isChecked
          ? [...checkedValues, optionLabel]
          : checkedValues.filter((value) => value !== optionLabel);
      } else {
        newValues = isChecked ? [optionLabel] : [];
      }
      setCheckedValues(newValues);
      setValue(name, newValues);
    };

    // Check if at least one checkbox is selected when required
    const isError = requiredFromProps && errors[name] && !checkedValues.length;


  return (
    <div className="mx-auto min-h-[12rem]">
    <Width width={width}>
      <div className="flex flex-col text-slate-700 max-w-3xl">
        <label className="block text-xl md:text-2xl font-semibold text-slate-800">
          {label} {requiredFromProps && <span className="text-red-700">*</span>}
        </label>
        {checkboxes.map((option) => {
          // Check if the limit is greater than 0
          if (option.limit === 0) {
            return null; // Do not render if limit is 0
          }

              const isChecked = checkedValues.includes(option.label);

          return (
            <div key={option.label} className="mt-3 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white/80 px-5 py-3.5 shadow-sm">
              <input
                type="checkbox"
                className="hidden"

                {...register(name, { required: checkedValues.length <= 0 })}
                checked={isChecked}
                onChange={(e) => handleCheckboxChange(option.label, e.target.checked)}

              />
              <button
                type="button"
                onClick={() => handleCheckboxChange(option.label, !isChecked)}
                className={`h-5 w-5 rounded-md border-2 flex items-center justify-center transition
                  ${isChecked ? 'bg-primary border-primary' : 'border-slate-300 bg-white'}`}
              >
                {isChecked && <Check className="w-4 h-4 text-secondary" />}
              </button>
              <span className="text-base md:text-lg font-normal text-slate-900">{option.label}</span>
            </div>
          );
        })}
           {requiredFromProps && errors[name] && <Error />}

        </div>
    </Width>
    </div>
  )
}
