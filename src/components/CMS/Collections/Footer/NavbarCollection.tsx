import { buildCollection, buildProperty } from "firecms";

interface Navbar {
  Group: string;
  CustomGroup?: string; // Optional property for custom group name
}

interface Links {
  name: string;
  link: string;
}

export const NavbarCollection = buildCollection<Navbar>({
  path: "Navbar",
  name: "Navbar Collection",
  singularName: "Navbar",
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
        Contact: "Contact",
        About: "About",
        Resources: "Resources",
        Other: "Other"
      },
    }),
    CustomGroup: buildProperty(({ values }) => ({
        dataType: "string",
        title: "Custom Group Name",
        name:"Custom Group Name",
        validation: values.Group === "Other" ? { required: true } : undefined,
        description: "Enter the name of your custom group",
        // Assuming you want to disable or hide this field based on certain conditions
        disabled: values.Group !== "Other" && {
            clearOnDisabled: true,
            disabledMessage: "Custom group is only available when certain conditions are met.",
            hidden: true,
        },
    })),
    
    /*
    sendEmail: buildProperty(({ values }) => ({
        name: "Send Email",
        dataType: "boolean",
        validation:
          values.distributionListType == "custom"
            ? { required: true }
            : undefined,
        defaultValue: false,
        // Conditional rendering based on the status
  
        disabled: values.status !== "published" && {
          clearOnDisabled: true,
          disabledMessage: "Sizes are only available if 'Has Sizes' is selected.",
          hidden: true,
        },
      })),*/
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
      },
    }),
  ],
});
