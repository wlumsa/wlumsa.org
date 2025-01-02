'use server'

import { getPaymentTotal } from '@payloadcms/plugin-form-builder'

export async function getPaymentPrice({
  basePrice,
  priceConditions,
  fieldValues,
}: {
  basePrice: number
  priceConditions: any // Update this type based on your actual price conditions type
  fieldValues: Record<string, any>
}) {
  const modifiedFieldValues = { ...fieldValues }

  // Modify the fieldValues for array fields referenced in conditions
  priceConditions?.forEach((condition: { fieldToUse: string | number }) => {
    const fieldValue = fieldValues[condition.fieldToUse]
    if (Array.isArray(fieldValue)) {
      modifiedFieldValues[condition.fieldToUse] = fieldValue.length.toString()
    }
  })

  return getPaymentTotal({
    basePrice,
    priceConditions,
    fieldValues: modifiedFieldValues,
  })
}