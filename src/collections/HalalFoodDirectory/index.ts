import { CollectionConfig } from "payload";

// Configuration for the Halal Directory collection in Payload CMS
export const HalalDirectory: CollectionConfig = {
  slug: 'halal-directory', // Unique identifier for the collection
  admin: {
    useAsTitle: 'name', // Field used as the display title in the admin panel
  },
  fields: [
    // Name field for the restaurant
    {
      name: 'name',
      type: 'text',
      required: true, // Marked as required, must be provided
      label: 'Name',
    },
    // Category field with predefined options
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
      required: true, // This field is mandatory
      label: 'Category',
    },
    // Slaughter method field with select options
    {
      name: "slaughtered",
      type: "select",
      options: [
        { label: 'Hand', value: 'hand' },
        { label: 'Machine', value: 'machine' },
        { label: 'Both', value: 'both' },
        { label: 'N/A', value: 'n/a' }
      ],
      label: "Slaughter",
    },
    // Short description field for additional details
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true, // Required field
      label: 'Description',
    },
    // Location field for specifying the restaurant's location
    {
      name: 'location',
      type: 'text',
      required: true, // Must be provided
      label: 'Location',
    },
    // Google Maps link field for providing a map URL
    {
      name: 'googleMapsLink',
      type: 'text',
      required: true, // Required for location details
      label: 'Map',
    },
    // Website field for the restaurant's official site
    {
      name: 'website',
      type: 'text',
      label: 'Website',
    },
    // Image field as a relationship to the media collection
    {
      name: 'image',
      type: 'relationship',
      label: 'Image',
      relationTo: 'media', // References the 'media' collection
    },
    // Campus location field to specify whether the restaurant is on or off-campus
    {
      name:"is_on_campus",
      label:"On Campus?",
      type:"checkbox",
      defaultValue: false,
      required: true,
    }
  ],
};

