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

  return (
    <Width width={width}>
      <div className="flex flex-col">
        <label className="label cursor-pointer">
          <span className="label-text text-base-100">{label}</span>
        </label>
        {checkboxes.map((option) => {
          // Check if the limit is greater than 0
          if (option.limit === 0) {
            return null; // Do not render if limit is 0
          }

          const isChecked = checkedValues.includes(option.label);

          return (
            <div key={option.label} className="flex items-center space-x-2 my-2">
              <input
                type="checkbox"
                className="hidden"
                {...register(name)}
                checked={isChecked}
                onChange={(e) => handleCheckboxChange(option.label, e.target.checked)}
              />
              <button
                type="button"
                onClick={() => handleCheckboxChange(option.label, !isChecked)}
                className={`w-5 h-5 border-2 rounded flex items-center justify-center 
                  ${isChecked ? 'bg-secondary border-secondary' : 'border-gray-300 bg-white'}`}
              >
                {isChecked && <Check className="w-4 h-4 text-white" />}
              </button>
              <span className="label-text text-secondary">{option.label}</span>
            </div>
          );
        })}
        {requiredFromProps && errors[name] && !checkedValues.length && <Error />}
      </div>
    </Width>
  )
}