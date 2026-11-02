import type { CollectionConfig } from "payload";

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import {
  getSiteUser,
  isAdmin,
  isCharityEditor,
} from "@/collections/Charity/access";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Miscellaneous",
  },
  access: {
    create: ({ req }) =>
      ["admin", "manager", "charity_editor"].includes(
        getSiteUser(req.user)?.roles ?? ""
      ),
    delete: ({ req }) => {
      if (isAdmin(req.user)) return true;
      if (isCharityEditor(req.user)) {
        return { charityMedia: { equals: true } };
      }
      return false;
    },
    read: () => true,
    update: ({ req }) => {
      if (["admin", "manager"].includes(getSiteUser(req.user)?.roles ?? ""))
        return true;
      if (isCharityEditor(req.user)) {
        return { charityMedia: { equals: true } };
      }
      return false;
    },
  },
  hooks: {
    beforeChange: [
      ({ data, originalDoc, req }) => {
        if (!isCharityEditor(req.user)) return data;
        return {
          ...data,
          charityMedia: true,
          uploadedBy: originalDoc?.uploadedBy || getSiteUser(req.user)?.id,
        };
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "charityMedia",
      type: "checkbox",
      defaultValue: false,
      index: true,
      access: {
        create: ({ req }) => isAdmin(req.user),
        update: ({ req }) => isAdmin(req.user),
      },
      admin: { hidden: true },
    },
    {
      name: "uploadedBy",
      type: "relationship",
      relationTo: "execs",
      index: true,
      access: {
        create: ({ req }) => isAdmin(req.user),
        update: ({ req }) => isAdmin(req.user),
      },
      admin: { hidden: true },
    },
    {
      name: "caption",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
    },
  ],
  upload: true,
};
