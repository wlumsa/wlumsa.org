import { buildCollection, buildProperty } from "firecms";



export const FooterCollection = buildCollection<Footer>({
  path: "Footer",
  name: "Footer Collection",
  group: "Navbar",
  permissions: ({ user, authController }) => {
    const isAdmin = authController.extra?.roles.includes("Admin");
    const isReligiousAffairs = authController.extra?.roles.includes("ReligiousAffairs");
    const isExternal = authController.extra?.roles.includes("External");
    return {
      edit: isAdmin || isReligiousAffairs || isExternal,
      create: isAdmin || isReligiousAffairs || isExternal,
      delete: isAdmin || isReligiousAffairs || isExternal,
    };
  },
  properties: {
    Group: buildProperty({
      dataType: "string",
      title: "Group",
      name: "Navbar Group",
      validation: { required: true },
      description: "Select the Navbar Group",
      enumValues: {
        Forms:"Forms",
        LocalMosques: "LocalMosques",
        Resources: "Resources",
        Other: "Other",
        Custom:"Custom",
      },
    }),
    CustomGroup: buildProperty(({ values }) => ({
        dataType: "string",
        title: "Custom Group Name",
        name:"Custom Group Name",
        validation: values.Group === "Custom" ? { required: true } : undefined,
        description: "Enter the name of your custom group",
        // Assuming you want to disable or hide this field based on certain conditions
        disabled: values.Group !== "Custom" && {
            clearOnDisabled: true,
            disabledMessage: "Custom group is only available when certain conditions are met.",
            hidden: true,
        },
    })),
   
  
  createdAt: buildProperty({
    dataType: "date",
    title: "Created At",
    autoValue: "on_create" || "on_update",
    validation:{required:true}
  }),
  },
  subcollections: [
    buildCollection<Links>({
      path: "Links",
      name: "Links",
      singularName: "Link",
      permissions: ({ user, authController }) => {
        const isAdmin = authController.extra?.roles.includes("Admin");
        return {
          edit: isAdmin,
          create: isAdmin,
          delete: isAdmin,
        };
      },
      properties: {
        name: buildProperty({
          dataType: "string",
          title: "Name",
          validation: { required: true },
          description: "Name of navbar title link (keep short)",
        }),
        link: buildProperty({
          dataType: "string",
          title: "Link",
          validation: { required: true },
          description: "Link to item",
        }),
        createdAt: buildProperty({
          dataType: "date",
          title: "Created At",
          autoValue: "on_create" || "on_update",
          validation:{required:true}
        }),
      },
    }),
  ],
});