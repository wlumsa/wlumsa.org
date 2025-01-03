import type { PaymentField } from '@payloadcms/plugin-form-builder/types'
import {
  useFormContext,
  useWatch,
  type FieldErrorsImpl,
  type FieldValues,
  type UseFormRegister,
  type UseFormWatch,
  Control,
} from 'react-hook-form'

import React, { useState } from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { getPaymentPrice } from './actions/getPaymentPrice'
// Create a new component for watching arrays and calculating price
const PriceWatcher: React.FC<{
  control: Control<FieldValues>
  basePrice: number
  priceConditions: any
  name: string
  setValue: any
}> = ({ control, basePrice, priceConditions, name, setValue }) => {
  const arrayFields = useWatch({
    control,
    name: ['parents', 'players'],
  })

  React.useEffect(() => {
    const updatePrice = async () => {
      const calculatedPrice = await getPaymentPrice({
        basePrice,
        priceConditions,
        fieldValues: {
          parents: arrayFields[0],
          players: arrayFields[1],
        },
      })
      setValue(name, calculatedPrice)
    }
    updatePrice()
  }, [basePrice, priceConditions, name, setValue, arrayFields])

  return null
}

// Main Payment component
export const Payment: React.FC<
  PaymentField & {
    errors: Partial<FieldErrorsImpl<{ [x: string]: any }>>
    register: UseFormRegister<FieldValues>
    watch: UseFormWatch<FieldValues>
    setValue: any
  }
> = ({
  name,
  basePrice,
  errors,
  label,
  register,
  required: requiredFromProps,
  width,
  watch,
  priceConditions,
  setValue,
}) => {
    const { control } = useFormContext()

    // Watch only the price field for display
    const price = useWatch({
      control,
      name,
      defaultValue: basePrice,
    })

    return (
      <div className=''>
        <Width width={width}>
          <label htmlFor={name} className='text-xl font-semibold text-white'>{label}</label>
          <div className="text-base text-white">${price}</div>

          <PriceWatcher
            control={control}
            basePrice={basePrice}
            priceConditions={priceConditions}
            name={name}
            setValue={setValue}
          />

          {requiredFromProps && errors[name] && <Error />}
        </Width>
      </div>
    )
  }