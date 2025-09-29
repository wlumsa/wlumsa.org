import { CollectionConfig } from "payload";

export const HalalGroceryStores: CollectionConfig = {
  slug: "halal-grocery-stores",
  admin: {
    useAsTitle: "name",
    group: "Admin",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Store Name",
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Full Grocery Store", value: "full-grocery" },
        { label: "Halal Meat Shop", value: "halal-meat" },
        { label: "International Market", value: "international" },
        { label: "Specialty Store", value: "specialty" },
        { label: "Convenience Store", value: "convenience" },
        { label: "Bakery", value: "bakery" },
        { label: "Spice Shop", value: "spice" },
        { label: "Frozen Foods", value: "frozen" },
      ],
      required: true,
      label: "Store Type",
    },
    {
      name: "halalCertification",
      type: "select",
      options: [
        { label: "Halal Certified", value: "certified" },
        { label: "Muslim Owned", value: "muslim-owned" },
        { label: "Halal Friendly", value: "halal-friendly" },
        { label: "Not Specified", value: "not-specified" },
      ],
      required: true,
      label: "Halal Certification",
    },
    {
      name: "shortDescription",
      type: "textarea",
      required: true,
      label: "Description",
    },
    {
      name: "location",
      type: "text",
      required: true,
      label: "Address",
    },
    {
      name: "googleMapsLink",
      type: "text",
      required: true,
      label: "Google Maps Link",
    },
    {
      name: "website",
      type: "text",
      label: "Website",
    },
    {
      name: "phone",
      type: "text",
      label: "Phone Number",
    },
    {
      name: "hours",
      type: "textarea",
      label: "Store Hours",
    },
    {
      name: "specialties",
      type: "array",
      label: "Specialties",
      fields: [
        {
          name: "specialty",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "image",
      type: "relationship",
      label: "Store Image",
      relationTo: "media",
    },
    {
      name: "is_on_campus",
      label: "On Campus?",
      type: "checkbox",
      defaultValue: false,
      required: true,
    },
    {
      name: "priceRange",
      type: "select",
      options: [
        { label: "$", value: "1" },
        { label: "$$", value: "2" },
        { label: "$$$", value: "3" },
        { label: "$$$$", value: "4" },
      ],
      label: "Price Range",
    },
  ],
};