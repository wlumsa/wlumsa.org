import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

import {
  charityManagers,
  isSafeExternalURL,
  publishedOrCharityManager,
} from "@/collections/Charity/access";

const externalURLField = {
  type: "text" as const,
  validate: isSafeExternalURL,
};

export const CharityCampaigns: CollectionConfig = {
  slug: "charity-campaigns",
  labels: {
    singular: "Charity campaign",
    plural: "Charity campaigns",
  },
  admin: {
    useAsTitle: "title",
    group: "Charity",
    defaultColumns: ["title", "campaignType", "phase", "year", "_status"],
    description:
      "Year-round and Charity Week campaigns. Save as draft until dates, totals, causes, and links have been reviewed.",
    livePreview: {
      url: ({ data }) =>
        data.campaignType === "charity-week"
          ? `${
              process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
            }/charityweek/${data.year || ""}`
          : `${
              process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"
            }/charity`,
    },
  },
  access: {
    create: charityManagers,
    delete: charityManagers,
    read: publishedOrCharityManager,
    readVersions: charityManagers,
    update: charityManagers,
  },
  versions: {
    drafts: {
      autosave: true,
      schedulePublish: true,
    },
    maxPerDoc: 20,
  },
  hooks: {
    afterChange: [
      async () => {
        revalidatePath("/charity");
        revalidatePath("/charityweek");
        revalidatePath("/charityweek/[year]", "page");
      },
    ],
    afterDelete: [
      async () => {
        revalidatePath("/charity");
        revalidatePath("/charityweek");
        revalidatePath("/charityweek/[year]", "page");
      },
    ],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Campaign",
          fields: [
            {
              name: "title",
              type: "text",
              required: true,
              maxLength: 100,
              admin: { description: "Public campaign name." },
            },
            {
              name: "campaignType",
              label: "Campaign type",
              type: "select",
              required: true,
              defaultValue: "year-round",
              options: [
                { label: "Year-round campaign", value: "year-round" },
                { label: "Charity Week", value: "charity-week" },
              ],
            },
            {
              name: "year",
              type: "number",
              min: 2020,
              max: 2100,
              admin: {
                condition: (_, siblingData) =>
                  siblingData.campaignType === "charity-week",
                description:
                  "Required for Charity Week. This creates the archive URL, such as /charityweek/2026.",
              },
              validate: (
                value: unknown,
                { siblingData }: { siblingData: Record<string, unknown> }
              ) =>
                siblingData.campaignType !== "charity-week" || value
                  ? true
                  : "A campaign year is required for Charity Week.",
            },
            {
              name: "phase",
              label: "Campaign phase",
              type: "select",
              required: true,
              defaultValue: "upcoming",
              options: [
                { label: "Upcoming", value: "upcoming" },
                { label: "Active", value: "active" },
                { label: "Completed", value: "completed" },
              ],
              admin: {
                description:
                  "Completed campaigns never show donation, registration, or volunteer urgency.",
              },
            },
            {
              name: "summary",
              type: "textarea",
              required: true,
              maxLength: 420,
              admin: {
                description:
                  "A concise explanation of the campaign and where support goes.",
              },
            },
            {
              name: "heroImage",
              label: "Campaign image",
              type: "relationship",
              relationTo: "media",
              admin: {
                description:
                  "Use an image with accurate alternative text in the Media Library.",
              },
            },
            {
              name: "startDate",
              type: "date",
              admin: { date: { pickerAppearance: "dayOnly" } },
            },
            {
              name: "endDate",
              type: "date",
              admin: { date: { pickerAppearance: "dayOnly" } },
              validate: (value, { siblingData }) => {
                const values = siblingData as { startDate?: string };
                if (!value || !values.startDate) return true;
                return new Date(value) >= new Date(values.startDate)
                  ? true
                  : "End date must be on or after the start date.";
              },
            },
            {
              name: "featured",
              label: "Feature on the charity hub",
              type: "checkbox",
              defaultValue: false,
              admin: { position: "sidebar" },
            },
            {
              name: "displayOrder",
              type: "number",
              defaultValue: 100,
              admin: {
                position: "sidebar",
                description: "Lower numbers appear first.",
              },
            },
          ],
        },
        {
          label: "Fundraising",
          fields: [
            {
              name: "fundraising",
              type: "group",
              fields: [
                {
                  name: "currency",
                  type: "select",
                  defaultValue: "CAD",
                  required: true,
                  options: [
                    { label: "Canadian dollars (CAD)", value: "CAD" },
                    { label: "US dollars (USD)", value: "USD" },
                  ],
                },
                {
                  name: "goal",
                  label: "Fundraising goal",
                  type: "number",
                  min: 0,
                  admin: {
                    description:
                      "Leave blank when no approved goal has been set.",
                  },
                },
                {
                  name: "amountState",
                  label: "Amount raised status",
                  type: "select",
                  required: true,
                  defaultValue: "unknown",
                  options: [
                    { label: "Unknown / not verified", value: "unknown" },
                    { label: "Verified amount", value: "verified" },
                  ],
                  admin: {
                    description:
                      "Choose Verified amount to distinguish a confirmed $0 from an unknown total.",
                  },
                },
                {
                  name: "amountRaised",
                  type: "number",
                  min: 0,
                  admin: {
                    condition: (_, siblingData) =>
                      siblingData.amountState === "verified",
                  },
                  validate: (
                    value: unknown,
                    { siblingData }: { siblingData: Record<string, unknown> }
                  ) =>
                    siblingData.amountState !== "verified" ||
                    typeof value === "number"
                      ? true
                      : "Enter the verified amount, including 0 when appropriate.",
                },
                {
                  name: "lastVerifiedAt",
                  label: "Amount last verified",
                  type: "date",
                  admin: {
                    condition: (_, siblingData) =>
                      siblingData.amountState === "verified",
                    date: { pickerAppearance: "dayOnly" },
                  },
                  validate: (value, { siblingData }) =>
                    (siblingData as { amountState?: string }).amountState !==
                      "verified" || value
                      ? true
                      : "Add the date this amount was verified.",
                },
                {
                  name: "donationURL",
                  label: "Approved donation URL",
                  ...externalURLField,
                  admin: {
                    description:
                      "External checkout only. Confirm ownership and destination before publishing.",
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Causes & partners",
          fields: [
            {
              name: "causes",
              type: "array",
              labels: { singular: "Cause", plural: "Causes" },
              fields: [
                { name: "name", type: "text", required: true },
                {
                  name: "description",
                  type: "textarea",
                  required: true,
                  maxLength: 500,
                },
                {
                  name: "image",
                  type: "relationship",
                  relationTo: "media",
                },
              ],
            },
            {
              name: "partners",
              type: "array",
              labels: { singular: "Partner", plural: "Partners" },
              fields: [
                { name: "name", type: "text", required: true },
                { name: "description", type: "textarea", maxLength: 300 },
                {
                  name: "url",
                  label: "Partner website",
                  ...externalURLField,
                },
              ],
            },
          ],
        },
        {
          label: "Events & involvement",
          fields: [
            {
              name: "events",
              type: "relationship",
              relationTo: "events",
              hasMany: true,
              admin: {
                description:
                  "Select charity-scoped events. Registration uses the link stored on each event.",
              },
              filterOptions: ({ user }) =>
                user?.roles === "charity_editor"
                  ? { charityManaged: { equals: true } }
                  : true,
            },
            {
              name: "volunteerText",
              type: "textarea",
              maxLength: 500,
            },
            {
              name: "volunteerURL",
              label: "Volunteer application URL",
              ...externalURLField,
            },
            {
              name: "contactEmail",
              type: "email",
              admin: {
                description:
                  "Use a role address that can be handed over, not a personal account.",
              },
            },
          ],
        },
        {
          label: "Results & recap",
          fields: [
            {
              name: "resultsSummary",
              type: "textarea",
              maxLength: 1000,
              admin: {
                description:
                  "For completed campaigns: what happened and what was verified.",
              },
            },
            {
              name: "impactItems",
              type: "array",
              labels: { singular: "Impact item", plural: "Impact items" },
              fields: [
                { name: "label", type: "text", required: true },
                {
                  name: "value",
                  type: "text",
                  required: true,
                  admin: {
                    description:
                      "Only enter a result supported by the campaign records.",
                  },
                },
              ],
            },
            {
              name: "recapURL",
              label: "Recap or report URL",
              ...externalURLField,
            },
          ],
        },
      ],
    },
  ],
};
