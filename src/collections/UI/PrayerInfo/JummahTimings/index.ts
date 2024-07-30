import { CollectionConfig } from "payload";

const Jummah: CollectionConfig = {
  slug: "jummah-timings",
  
  fields: [
    {
      name: "building",
      type: "text",
      required: true,
    },
    {
      name: "room number",
      type: "number",
      max: 1000,
      required: false,
    },
    {
      name: "timing",
      type: "date",
      required: true,
      admin:{
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: 'h:mm aa',
          timeIntervals:30,
        },
      }
    },
  ],
};

export default Jummah;
