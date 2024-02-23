import { buildCollection, buildProperty } from "firecms";

export const ProductsCollection = buildCollection<Product>({
  name: "Products",
  singularName: "Product",
  path: "Products",
  group: "Merch",
  permissions: ({ authController }) => {
    const isAdmin = authController.extra?.roles.includes("Admin");
    const isMarketing = authController.extra?.roles.includes("Marketing");
    const isFinance = authController.extra?.roles.includes("Finance");
    const isExternal = authController.extra?.roles.includes("External");
    return {
      edit: isAdmin || isMarketing || isFinance || isExternal,
      create: isAdmin || isMarketing || isFinance || isExternal,
      delete: isAdmin || isMarketing || isFinance || isExternal,
    };
  },
  properties: {
    name: buildProperty({
      dataType: "string",
      name: "Name",
      description: "The name of the product.",
      validation: { required: true },
    }),
    price: buildProperty({
      dataType: "number",
      name: "Price",
      description: "The price of the product in your preferred currency.",
      validation: { required: true, min: 0 },
    }),
    description: buildProperty({
      dataType: "string",
      name: "Description",
      description: "A detailed description of the product.",
      validation: { required: true },
    }),
    image: buildProperty({
      dataType: "string",
      title: "Image",
      description: "Upload an image for the product.",
      storage: {
        storagePath: "images/products",
        acceptedFiles: ["image/png", "image/jpg", "image/jpeg"],
        maxSize: 1920 * 1080,
        metadata: {
          cacheControl: "max-age=1000000",
        },
      },
    }),
    tags: buildProperty({
      dataType: "array",
      name: "Tags",
      description:
        "Tags for categorizing the product. Can include multiple tags.",
      of: {
        dataType: "string",
      },
    }),

    hasSizes: buildProperty({
      dataType: "boolean",
      name: "Has Sizes",
      description: "Does this product come in different sizes?",
    }),

    quantity: buildProperty(({ values }) => ({
      dataType: "number",
      name: "Quantity",
      description: "Total quantity available for this product.",
      disabled: values.hasSizes && {
        clearOnDisabled: true,
        disabledMessage: "Quantity is not applicable for products with sizes.",
      },
      validation: { required: !values.hasSizes, min: 0 },
    })),
    date: buildProperty({
      dataType: "date",
      name: "Created at",
      autoValue:  "on_update",
    }),

    sizes: buildProperty(({ values }) => ({
      dataType: "map",
      name: "Sizes",
      description: "Quantities for each size.",
      properties: {
        S: {
          dataType: "number",
          name: "Small",
          validation: { required: false, min: 0 },
        },
        M: {
          dataType: "number",
          name: "Medium",
          validation: { required: false, min: 0 },
        },
        L: {
          dataType: "number",
          name: "Large",
          validation: { required: false, min: 0 },
        },
      },
      disabled: !values.hasSizes && {
        clearOnDisabled: true,
        disabledMessage: "Sizes are only available if 'Has Sizes' is selected.",
        hidden: true,
      },

      validation: values.hasSizes ? { required: true } : undefined,
    })),
  },
});
