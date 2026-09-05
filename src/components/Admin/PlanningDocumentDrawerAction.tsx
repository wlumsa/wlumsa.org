"use client";

import { useDocumentDrawer } from "@payloadcms/ui";
import { useRouter } from "next/navigation";
import type { Data, DefaultDocumentIDType } from "payload";
import type { ReactNode } from "react";

type PlanningDocumentDrawerActionProps = {
  children: ReactNode;
  className?: string;
  closeOnSave?: boolean;
  collectionSlug: string;
  id?: DefaultDocumentIDType;
  initialData?: Data;
};

export function PlanningDocumentDrawerAction({
  children,
  className,
  closeOnSave = false,
  collectionSlug,
  id,
  initialData,
}: PlanningDocumentDrawerActionProps) {
  const router = useRouter();
  const [DocumentDrawer, DocumentDrawerToggler, { closeDrawer }] =
    useDocumentDrawer({ collectionSlug, id });

  return (
    <>
      <DocumentDrawerToggler className={className}>
        {children}
      </DocumentDrawerToggler>
      <DocumentDrawer
        initialData={initialData}
        onSave={() => {
          router.refresh();
          if (closeOnSave) closeDrawer();
        }}
      />
    </>
  );
}
