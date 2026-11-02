import type { Access, GlobalConfig } from "payload";

type SiteRole = "admin" | "charity_editor" | "editor" | "manager";

type SiteUser = {
  id: number | string;
  roles?: SiteRole | null;
};

export function getSiteUser(user: unknown) {
  return user as SiteUser | null | undefined;
}

export function isAdmin(user: unknown) {
  return getSiteUser(user)?.roles === "admin";
}

export function isCharityEditor(user: unknown) {
  return getSiteUser(user)?.roles === "charity_editor";
}

function canManageCharity(user: unknown) {
  return isAdmin(user) || isCharityEditor(user);
}

export const charityManagers: Access = ({ req }) => canManageCharity(req.user);

export const publishedOrCharityManager: Access = ({ req }) => {
  if (canManageCharity(req.user)) return true;

  return {
    _status: {
      equals: "published",
    },
  };
};

export const charityGlobalAccess: NonNullable<GlobalConfig["access"]> = {
  read: ({ req }) => {
    if (canManageCharity(req.user)) return true;
    const draft = req.query?.draft;
    return draft !== true && draft !== "true";
  },
  readVersions: ({ req }) => canManageCharity(req.user),
  update: ({ req }) => canManageCharity(req.user),
};

export function isSafeExternalURL(value: unknown) {
  if (value === null || value === undefined || value === "") return true;
  if (typeof value !== "string") return "Enter a valid URL.";

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? true
      : "Use an http:// or https:// URL.";
  } catch {
    return "Enter a complete URL beginning with https://.";
  }
}
