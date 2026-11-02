import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

import {
  charityGlobalAccess,
  isSafeExternalURL,
} from "@/collections/Charity/access";

const CharityHub: GlobalConfig = {
  slug: "charity-hub",
  label: "Charity hub",
  admin: {
    group: "Charity",
    description:
      "Evergreen copy and contact details for /charity. Campaign-specific details belong in Charity campaigns.",
    livePreview: {
      url: `${
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
      }/charity`,
    },
  },
  access: charityGlobalAccess,
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: true,
    },
  },
  hooks: {
    afterChange: [
      async () => {
        revalidatePath("/charity");
      },
    ],
  },
  fields: [
    {
      name: "eyebrow",
      type: "text",
      defaultValue: "WLU MSA Charity",
      maxLength: 60,
    },
    {
      name: "title",
      type: "text",
      defaultValue: "Care in action, all year long.",
      required: true,
      maxLength: 100,
    },
    {
      name: "introduction",
      type: "textarea",
      required: true,
      maxLength: 650,
      admin: {
        description:
          "Explain the charity team's purpose without campaign-specific claims.",
      },
    },
    {
      name: "heroImage",
      type: "relationship",
      relationTo: "media",
    },
    {
      name: "volunteerHeading",
      type: "text",
      defaultValue: "Help move the work forward",
      maxLength: 90,
    },
    {
      name: "volunteerText",
      type: "textarea",
      maxLength: 500,
    },
    {
      name: "volunteerURL",
      label: "Volunteer application URL",
      type: "text",
      validate: isSafeExternalURL,
    },
    {
      name: "collaborationText",
      type: "textarea",
      maxLength: 500,
    },
    {
      name: "contactEmail",
      type: "email",
    },
    {
      name: "instagramURL",
      label: "Charity Instagram URL",
      type: "text",
      required: true,
      defaultValue: "https://www.instagram.com/wlumsa.charity/",
      validate: isSafeExternalURL,
    },
  ],
};

export default CharityHub;
