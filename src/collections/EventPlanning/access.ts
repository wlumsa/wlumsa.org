import type {
  Access,
  CollectionConfig,
  FieldAccess,
  PayloadRequest,
} from "payload";

export type PlanningRole = "admin" | "editor" | "manager";

type PlanningUser = {
  id: number | string;
  roles?: PlanningRole | null;
};

function getPlanningUser(user: unknown) {
  return user as PlanningUser | null | undefined;
}

export function hasPlanningManagementRole(user: unknown) {
  const role = getPlanningUser(user)?.roles;
  return role === "admin" || role === "manager";
}

export const authenticated: Access = ({ req }) => Boolean(req.user);

export const adminsOnly: Access = ({ req }) =>
  getPlanningUser(req.user)?.roles === "admin";

export const managersAndAdmins: Access = ({ req }) => {
  return hasPlanningManagementRole(req.user);
};

export const managersOrAssigned: Access = ({ req }) => {
  const user = getPlanningUser(req.user);
  if (!user) return false;
  if (user.roles === "admin" || user.roles === "manager") return true;

  return {
    assignees: {
      contains: user.id,
    },
  };
};

export const adminOrSelf: Access = ({ req }) => {
  const user = getPlanningUser(req.user);
  if (!user) return false;
  if (user.roles === "admin") return true;

  return {
    id: {
      equals: user.id,
    },
  };
};

export const adminsOnlyField: FieldAccess = ({ req }) =>
  getPlanningUser(req.user)?.roles === "admin";

export const managersAndAdminsField: FieldAccess = ({ req }) =>
  hasPlanningManagementRole(req.user);

export const adminOrSelfField: FieldAccess = ({ doc, id, req }) => {
  const user = getPlanningUser(req.user);
  if (!user) return false;
  const documentID = id ?? doc?.id;
  return (
    user.roles === "admin" ||
    (documentID !== undefined && String(user.id) === String(documentID))
  );
};

export const adminsOnlyAdmin = ({ req }: { req: PayloadRequest }) =>
  getPlanningUser(req.user)?.roles === "admin";

export const managedCollectionAccess = {
  create: managersAndAdmins,
  delete: adminsOnly,
  update: managersAndAdmins,
} satisfies NonNullable<CollectionConfig["access"]>;

export const managerPrivateCollectionAccess = {
  ...managedCollectionAccess,
  read: managersAndAdmins,
} satisfies NonNullable<CollectionConfig["access"]>;
