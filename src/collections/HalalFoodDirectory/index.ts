import { CollectionConfig } from "payload";

export const HalalDirectory: CollectionConfig = {
  slug: "halal-directory",
  admin: {
    useAsTitle: "name",
    group: "Admin",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Name",
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Chinese", value: "chinese" },
        { label: "Persian", value: "persian" },
        { label: "Shawarma", value: "shawarma" },
        { label: "Burgers", value: "burgers" },
        { label: "Bangladeshi", value: "bangladeshi" },
        { label: "Chinese Indo Fusion", value: "chinese-indo-fusion" },
        { label: "Pakistani Food", value: "pakistani-food" },
        { label: "Chicken and Waffles", value: "chicken-and-waffles" },
        { label: "Kabob", value: "kabob" },
        { label: "Uyghur", value: "uyghur" },
        { label: "Chicken", value: "chicken" },
        { label: "Indian Fusion Food", value: "indian-fusion-food" },
        { label: "Pizza", value: "pizza" },
      ],
      required: true,
      label: "Category",
    },

    {
      name: "slaughtered",
      type: "select",
      options: [
        { label: "Hand", value: "hand" },
        { label: "Machine", value: "machine" },
        { label: "Both", value: "both" },
        { label: "N/A", value: "n/a" },
      ],
      label: "Slaughter",
    },
    {
      name: "shortDescription",
      type: "textarea",
      required: true,
      label: "Description", // Matches 'description' from spreadsheet
    },
    {
      name: "location",
      type: "text",
      required: true,
      label: "Location", // Matches 'location' from spreadsheet
    },
    {
      name: "googleMapsLink",
      type: "text",
      required: true,
      label: "Map", // Matches 'map' from spreadsheet
    },
    {
      name: "website",
      type: "text",
      label: "Website", // Matches 'website' from spreadsheet
    },
    {
      name: "image",
      type: "relationship",
      label: "Image",
      relationTo: "media",
    },
    // Campus location field to specify whether the restaurant is on or off-campus
    {
      name: "is_on_campus",
      label: "On Campus?",
      type: "checkbox",
      defaultValue: false,
      required: true,
    },
  ],
};
