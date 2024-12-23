import type { Field } from "payload";

const textField: Field[] = [
  {
    name: "name",
    label: "Name (lowercase, no special characters)*",
    type: "text",
    required: true,
  },
  {
    name: "label",
    label: "Label",
    type: "text",
    required: true,
  },
  {
    name: "default_value",
    label: "Default Value",
    type: "text",
    required: true,
  },
  {
    name: "required",
    label: "required?",
    type: "checkbox",
  },
];

const textAreaField: Field[] = [
  {
    name: "name",
    label: "Name (lowercase, no special characters)*",
    type: "text",
    required: true,
  },
  {
    name: "label",
    label: "Label",
    type: "text",
    required: true,
  },
  {
    name: "default_value",
    label: "Default Value",
    type: "text",
    required: true,
  },
  {
    name: "required",
    label: "required?",
    type: "checkbox",
  },
];

const stateField: Field[] = [
  {
    name: "name",
    label: "Name (lowercase, no special characters)*",
    type: "text",
    required: true,
  },
  {
    name: "label",
    label: "Label",
    type: "text",
    required: true,
  },
  {
    name: "required",
    label: "required?",
    type: "checkbox",
  },
];
import { FieldConfig } from "@payloadcms/plugin-form-builder/types";
import { fields } from '@payloadcms/plugin-form-builder'
const SelectField: FieldConfig = {
  fields: [{
    name: "name",
    label: "Name (lowercase, no special characters)*",
    type: "text",
    required: true,
  }, {
    name: "label",
    label: "Label",
    type: "text",
    required: false,
  }, {
    name: "width",
    label: "Field Width (percentage)",
    type: "number",
    defaultValue: 0,
    required: false,
  }, {
    name: "default_value",
    label: "Default Value",
    type: "text",
    required: false,
  }, {
    name: "options",
    label: "Select Attribute Options",
    type: "array",
    fields: [
      {
        name: "label",
        type: "text",
      },
      {
        name: "value",
        type: "text",
      },
      {
        name: "limit",
        type: "number",
      },
    ],
  }, {
    name: "required",
    label: "required?",
    type: "checkbox",
  }],
};

const CheckboxField: FieldConfig = {
  fields: [
    {
      name: "name",
      label: "Name (lowercase, no special characters)*",
      type: "text",
      required: true,
    },
    {
      name: "label",
      label: "Label",
      type: "text",
      required: true,
    },
    {
      name: "width",
      label: "Field Width (percentage)",
      type: "number",
      defaultValue: 0,
      required: false,
    },
    {
      name: "default_value",
      label: "Default Value",
      type: "checkbox",
      required: false,
    },
    {
      name: "limit",
      label: "Limit of times this can be checked",
      type: "number",
    },
    {
      name: "required",
      label: "required?",
      type: "checkbox",
    },
  ],
};
export { CheckboxField, SelectField };
