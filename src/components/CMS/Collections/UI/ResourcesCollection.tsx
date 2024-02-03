import { buildCollection, buildProperty } from "firecms";

export const ResourcesCollection = buildCollection<Resources>({
  path: "Resources",
  name: "Resources Collection",
  singularName: "Resources",
  group: "UI",
  permissions: ({ user, authController }) => {
    const isAdmin = authController.extra?.roles.includes("Admin");
    const isReligiousAffairs =
      authController.extra?.roles.includes("ReligiousAffairs");
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
      name: "Resource Category",
      validation: { required: true },
      description: "Select the Navbar Group",
      enumValues: {
        Campus: "Campus",
        Other: "Other",
        Religious: "Religious",
        Custom: "Custom",
        SingleLink: "No Group",
      },
    }),
    CustomGroup: buildProperty(({ values }) => ({
      dataType: "string",
      title: "Custom Group Name",
      name: "Custom Group Name",
      validation: values.Group === "Custom" ? { required: true } : undefined,
      description: "Enter the name of your custom group",

      disabled: values.Group !== "Custom" && {
        clearOnDisabled: true,
        disabledMessage:
          "Custom group is only available when certain conditions are met.",
        hidden: true,
      },
    })),
    NoGroup: buildProperty(({ values }) => ({
      dataType: "string",
      title: "Single Link Name",
      name: "NoGroup Group Link",
      validation:
        values.Group === "Single Link" ? { required: true } : undefined,
      description: "Enter the name of the navbar item without a group",

      disabled: values.Group !== "Single Link" && {
        clearOnDisabled: true,
        disabledMessage:
          "Custom group is only available when certain conditions are met.",
        hidden: true,
      },
    })),
    NoGroupLink: buildProperty(({ values }) => ({
      dataType: "string",
      title: " Link",
      name: "Link",
      validation:
        values.Group === "Single Link" ? { required: true } : undefined,
      description: "Enter the of the navbar item without a group",

      disabled: values.Group !== "Single Link" && {
        clearOnDisabled: true,
        disabledMessage:
          "Custom group is only available when certain conditions are met.",
        hidden: true,
      },
    })),
    index: buildProperty({
      dataType: "number",
      name: "Index for ordering purposes (0 = first item on the left or top)",
      validation: {
        min: 0,
      },
    }),
  },
  subcollections: [
    buildCollection<Links>({
      path: "Links",
      name: "Links",
      singularName: "Link",

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
        index: buildProperty({
          dataType: "number",
          name: "Index for ordering purposes (0 = first item on the left or top)",
          validation: {
            min: 0,
          },
        }),
      },
    }),
  ],
});
