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
export const ContactInformation: Block = {
  slug: "contact",
  fields: [
    {
      name: "first_name_array",
      label: "First Name",
      type: "array",
      required: true,
      fields: [
        {
          name: "label",
          label: "Label",
          type: "text",
          required: true,
          defaultValue: "John",
        },
        {
          name: "first_name",
          label: "First Name",
          type: "text",
          required: true,
          defaultValue: "John",
        },
      ],
    },
    {
      name: "last_name",
      label: "last name",
      type: "text",
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
    required: true,
    fields: [
      {
        name: "label",
        type: "text",
        admin: {
          width: "50%",
        },
      },
      {
        name: "limit",
        type: "number",
        admin: {
          width: "50%",
        },
      },
      {
        name: "value",
        type: "checkbox",
        admin: {
          hidden: true,
        },
      },
    ],
  }, {
    name: "required",
    label: "required?",
    type: "checkbox",
  }],
};

export const ContactInfoBlock: Block = {
  slug: "contactInfo",
  fields: [
    {
      name: "name",
      label: "Name (lowercase, no special characters)*",
      type: "text",
      defaultValue:"contactInfo",
      required: true,
    },
    {
      name: "label",
      label: "Label",
      defaultValue: "Please fill the following",
      type: "text",
    },
    {
      name: "width",
      label: "Field Width (percentage)",
      type: "number",
      defaultValue: 100,
      required: false,
    },
    {
      name: "first_name",
      label: "First Name",
      type: "text",
      admin: {
        width: "50%",
      },
    },
    {
      name: "first_name_placeholder",
      label: "Placeholder",
      defaultValue: "First",
      type: "text",
      admin: {
        width: "50%",
      },
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "text",
      admin: {
        width: "50%",
      },
    },
    {
      name: "last_name_placeholder",
      label: "Placeholder",
      defaultValue: "Last",
      type: "text",
      admin: {
        width: "50%",
      },
    },
    {
      name: "email",
      label: "Email",
      type: "text",
      admin: {
        width: "50%",
      },
    },
    {
      name: "email_placeholder",
      label: "Placeholder",
      defaultValue: "abcd@mylaurier.ca",
      type: "text",
      admin: {
        width: "50%",
      },
    },

    {
      name: "studentID",
      label: "Student ID",
      type: "text",
      admin: {
        width: "50%",
      },
    },
    {
      name: "studentID_placeholder",
      label: "Placeholder",
      defaultValue: "123456789",
      type: "text",
      admin: {
        width: "50%",
      },
    },
     {
      name: "required",
      label: "required?",
      type: "checkbox",
     }
  ],
};
