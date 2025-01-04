import { State } from "../../components/Forms/FormBlock/Form/State/index";
import type { Block, Field } from "payload";

import type {
  FieldConfig,
  PaymentFieldConfig,
} from "@payloadcms/plugin-form-builder/types";
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
export const SelectBlock: Block = {
  slug: "select",
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
      required: false,
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
      type: "text",
      required: false,
    },
    {
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
    },
    {
      name: "required",
      label: "required?",
      type: "checkbox",
    },
  ],
};

export const CheckboxBlock: Block = {
  slug: "checkbox",
  fields: [{
    name: "name",
    label: "Name (lowercase, no special characters)*",
    type: "text",
    required: true,
  }, {
    name: "label",
    label: "Label",
    type: "text",
    required: true,
  }, {
    name: "width",
    label: "Field Width (percentage)",
    type: "number",
    defaultValue: 0,
    required: false,
  }, {
    name: "isMultipleChoice",
    type: "checkbox",
    defaultValue: "false",
  }, {
    name: "checkboxes",
    label: "Checkbox options",
    type: "array",
    fields: [
      {
        name: "label",
        type: "text",
        admin:{
          width:"50",
        }
      },
      {
        name: "limit",
        type: "number",
        admin:{
          width:"50",
        }
      },
      {
        name: "value",
        type: "checkbox",
        admin:{
          hidden:true,
        }
      },
    ],
  }, {
    name: "required",
    label: "required?",
    type: "checkbox",
  }],
};


