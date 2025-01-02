import type { FieldErrorsImpl, FieldValues, UseFormRegister, UseFormWatch } from 'react-hook-form'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

import { PriceField } from './types'
export const Price: React.FC<
  PriceField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
    watch: UseFormWatch<FieldValues>
    setValue: any
  }
> = ({
  name,
  basePrice,
  arrayField,
  priceConditions,
  errors,
  label,
  register,
  width,
  watch,
  setValue,
}) => {
    const items = watch(arrayField) || []

    const totalPrice = React.useMemo(() => {
      const sortedConditions = [...priceConditions]
        .sort((a, b) => a.itemCount - b.itemCount)

      let price = basePrice
      let remainingItems = items.length

      for (const condition of sortedConditions) {
        if (remainingItems >= condition.itemCount) {
          price += condition.price
        }
      }

      return price
    }, [items.length, basePrice, priceConditions])

    React.useEffect(() => {
      setValue(name, totalPrice)
    }, [totalPrice, name, setValue])

    return (
      <Width width={width}>
        <div className="py-4 text-right">
          <div className='mb-4' />
          <label htmlFor={name} className='font-semibold'>{label}:</label>
          <p>({items.length}) {items.length === 1 ? 'Player' : 'Players'} - <span className="font-bold">${totalPrice}</span></p>

          <div className="min-h-[24px]">
            {errors[name] && <Error />}
          </div>
        </div>
      </Width>
    )
  }