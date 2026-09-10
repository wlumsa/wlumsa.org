import { DefaultTemplate } from "@payloadcms/next/templates";
import type { AdminViewServerProps } from "payload";
import type { ReactNode } from "react";

export function PlanningAdminShell({
  children,
  viewProps,
}: {
  children: ReactNode;
  viewProps: AdminViewServerProps;
}) {
  const { initPageResult } = viewProps;
  const { req } = initPageResult;

  return (
    <DefaultTemplate
      className="planning-admin-shell"
      i18n={req.i18n}
      locale={initPageResult.locale}
      params={viewProps.params}
      payload={req.payload}
      permissions={initPageResult.permissions}
      req={req}
      searchParams={viewProps.searchParams}
      user={req.user ?? undefined}
      viewActions={viewProps.viewActions}
      viewType={viewProps.viewType}
      visibleEntities={{
        collections: initPageResult.visibleEntities.collections,
        globals: initPageResult.visibleEntities.globals,
      }}
    >
      {children}
    </DefaultTemplate>
  );
}
