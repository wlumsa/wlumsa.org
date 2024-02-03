
import {
    buildCollection,
    buildProperty,
  
  } from "firecms";

export const ordersCollection = buildCollection({
    name: "Orders",
    path: "Orders",
    group: "Merch",
    permissions: ({ authController }) => {
      const isAdmin = authController.extra?.roles.includes("Admin");
      const isMarketing = authController.extra?.roles.includes("Marketing");
      const isFinance = authController.extra?.roles.includes("Finance");
      return {
        edit: isAdmin || isMarketing || isFinance,
        create: isAdmin || isMarketing || isFinance,
        delete: isAdmin || isMarketing || isFinance,
      };
    },
    properties: {
      Name: buildProperty({
        dataType: "string",
        name: "Name",
        validation: { required: true },
      }),
      delivered: buildProperty({
        dataType: "boolean",
        name: "Delivered",
      }),
      email: buildProperty({
        dataType: "string",
        name: "Email",
        validation: { required: true, email: true },
      }),
      image: buildProperty({
        dataType: "string",
        name: "Image URL",
        config: {
          storageMeta: {
            mediaType: "image",
            storagePath: "path/to/images",
            acceptedFiles: ["image/*"],
          },
        },
      }),
      password: buildProperty({
        dataType: "string",
        name: "Password",
        // Ensure to hash and properly secure passwords in a real application
      }),
      phoneNumber: buildProperty({
        dataType: "string",
        name: "Phone Number",
      }),
      pickuptime: buildProperty({
        dataType: "string",
        name: "Pick-up Time",
      }),
      price: buildProperty({
        dataType: "string",
        name: "Price",
      }),
      products: buildProperty({
        dataType: "array",
        name: "Products",
        of: {
          dataType: "map",
          properties: {
            name: {
              dataType: "string",
              name: "Product Name",
            },
            quantity: {
              dataType: "number",
              name: "Quantity",
            },
            size: {
              dataType: "string",
              name: "Size",
            },
          },
        },
      }),
    },
  });