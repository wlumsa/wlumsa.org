import { CollectionConfig } from "payload";

// Configuration for the Halal Directory collection in Payload CMS
export const HalalDirectory: CollectionConfig = {
<<<<<<< HEAD
  slug: 'halal-directory', // Unique identifier for the collection
  admin: {
    useAsTitle: 'name', // Field used as the display title in the admin panel
=======
  slug: "halal-directory",
  admin: {
    useAsTitle: "name",
    group: "Admin",
>>>>>>> 5b507b9c7e3a436df0c683af3dc5b8dae08dfd32
  },
  fields: [
    // Name field for the restaurant
    {
<<<<<<< HEAD
      name: 'name',
      type: 'text',
      required: true, // Marked as required, must be provided
      label: 'Name',
=======
      name: "name",
      type: "text",
      required: true,
      label: "Name", 
>>>>>>> 5b507b9c7e3a436df0c683af3dc5b8dae08dfd32
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
<<<<<<< HEAD
      required: true, // This field is mandatory
      label: 'Category',
    },
    // Slaughter method field with select options
=======
      required: true,
      label: "Category",
    },

>>>>>>> 5b507b9c7e3a436df0c683af3dc5b8dae08dfd32
    {
      name: "slaughtered",
      type: "select",
      options: [
<<<<<<< HEAD
        { label: 'Hand', value: 'hand' },
        { label: 'Machine', value: 'machine' },
        { label: 'Both', value: 'both' },
        { label: 'N/A', value: 'n/a' }
=======
        { label: "Hand", value: "hand" },
        { label: "Machine", value: "machine" },
        { label: "Both", value: "both" },
        { label: "N/A", value: "n/a" },
>>>>>>> 5b507b9c7e3a436df0c683af3dc5b8dae08dfd32
      ],
      label: "Slaughter",
    },
    // Short description field for additional details
    {
<<<<<<< HEAD
      name: 'shortDescription',
      type: 'textarea',
      required: true, // Required field
      label: 'Description',
=======
      name: "shortDescription",
      type: "textarea",
      required: true,
      label: "Description", // Matches 'description' from spreadsheet
>>>>>>> 5b507b9c7e3a436df0c683af3dc5b8dae08dfd32
    },
    // Location field for specifying the restaurant's location
    {
<<<<<<< HEAD
      name: 'location',
      type: 'text',
      required: true, // Must be provided
      label: 'Location',
=======
      name: "location",
      type: "text",
      required: true,
      label: "Location", // Matches 'location' from spreadsheet
>>>>>>> 5b507b9c7e3a436df0c683af3dc5b8dae08dfd32
    },
    // Google Maps link field for providing a map URL
    {
<<<<<<< HEAD
      name: 'googleMapsLink',
      type: 'text',
      required: true, // Required for location details
      label: 'Map',
=======
      name: "googleMapsLink",
      type: "text",
      required: true,
      label: "Map", // Matches 'map' from spreadsheet
>>>>>>> 5b507b9c7e3a436df0c683af3dc5b8dae08dfd32
    },
    // Website field for the restaurant's official site
    {
<<<<<<< HEAD
      name: 'website',
      type: 'text',
      label: 'Website',
=======
      name: "website",
      type: "text",
      label: "Website", // Matches 'website' from spreadsheet
>>>>>>> 5b507b9c7e3a436df0c683af3dc5b8dae08dfd32
    },
    // Image field as a relationship to the media collection
    {
<<<<<<< HEAD
      name: 'image',
      type: 'relationship',
      label: 'Image',
      relationTo: 'media', // References the 'media' collection
    },
    // Campus location field to specify whether the restaurant is on or off-campus
    {
      name: 'campusLocation',
      type: 'select',
      options: [
        { label: 'On Campus', value: 'on-campus' },
        { label: 'Off Campus', value: 'off-campus' },
      ],
      label: 'Campus Location',
      required: true, // Required field
=======
      name: "image",
      type: "relationship",
      label: "Image",
      relationTo: "media",
>>>>>>> 5b507b9c7e3a436df0c683af3dc5b8dae08dfd32
    },
  ],
};

