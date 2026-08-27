import type { Access } from "payload";

type PlanningUser = {
  roles?: "admin" | "editor" | null;
};

export const authenticated: Access = ({ req }) => Boolean(req.user);

export const adminsOnly: Access = ({ req }) =>
  (req.user as PlanningUser | null)?.roles === "admin";
