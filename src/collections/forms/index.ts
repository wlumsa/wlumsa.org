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
const selectField: Field[] = [
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
     
      
    ],
  },
  {
    name: "required",
    label: "required?",
    type: "checkbox",
  },
];


export { textField, textAreaField, stateField, selectField };
