import type { FormFieldBlock } from '@payloadcms/plugin-form-builder/types'
import type { SelectField } from './Select/types'
import { CheckboxField } from './Checkbox/types'


export const buildInitialFormState = (fields: (FormFieldBlock | SelectField | CheckboxField)[]) => {
    return fields.reduce((initialSchema, field) => {
    
    if (field.blockType === 'checkbox') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'country') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'email') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'text') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    if (field.blockType === 'select') {
      return {
        ...initialSchema,
        [field.name]: ''
      }
    }
    if (field.blockType === 'state') {
      return {
        ...initialSchema,
        [field.name]: '',
      }
    }
    return initialSchema;
  }, {})
}