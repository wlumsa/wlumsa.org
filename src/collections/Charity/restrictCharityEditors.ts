import type { Access, CollectionConfig, GlobalConfig } from "payload";

import { isCharityEditor } from "./access";

const charityCollections = new Set([
  "charity-campaigns",
  "events",
  "execs",
  "media",
]);

function denyCharityEditor(existing?: Access): Access {
  return (args) => {
    if (isCharityEditor(args.req.user)) return false;
    return existing ? existing(args) : true;
  };
}

export function restrictCollectionFromCharityEditors(
  collection: CollectionConfig
): CollectionConfig {
  if (charityCollections.has(collection.slug)) return collection;
  const existingHidden = collection.admin?.hidden;

  return {
    ...collection,
    admin: {
      ...collection.admin,
      hidden: (args) => {
        if (isCharityEditor(args.user)) return true;
        return typeof existingHidden === "function"
          ? existingHidden(args)
          : Boolean(existingHidden);
      },
    },
    access: {
      ...collection.access,
      create: denyCharityEditor(collection.access?.create),
      delete: denyCharityEditor(collection.access?.delete),
      read: denyCharityEditor(collection.access?.read),
      update: denyCharityEditor(collection.access?.update),
    },
  };
}

export function restrictGlobalFromCharityEditors(
  global: GlobalConfig
): GlobalConfig {
  if (global.slug === "charity-hub") return global;
  const existingHidden = global.admin?.hidden;

  return {
    ...global,
    admin: {
      ...global.admin,
      hidden: (args) => {
        if (isCharityEditor(args.user)) return true;
        return typeof existingHidden === "function"
          ? existingHidden(args)
          : Boolean(existingHidden);
      },
    },
    access: {
      ...global.access,
      read: denyCharityEditor(global.access?.read),
      update: denyCharityEditor(global.access?.update),
    },
  };
}
