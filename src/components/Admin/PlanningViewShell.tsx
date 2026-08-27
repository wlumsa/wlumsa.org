import { DefaultTemplate } from "@payloadcms/next/templates";
import type { AdminViewServerProps } from "payload";

type PlanningViewShellProps = {
  children: React.ReactNode;
  props: AdminViewServerProps;
};

export function PlanningViewShell({ children, props }: PlanningViewShellProps) {
  const { initPageResult } = props;

  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={props.params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={props.searchParams}
      user={initPageResult.req.user || undefined}
      viewType={props.viewType}
      visibleEntities={initPageResult.visibleEntities}
    >
      {children}
    </DefaultTemplate>
  );
}
