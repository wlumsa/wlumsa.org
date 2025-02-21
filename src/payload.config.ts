import { stripePlugin } from "@payloadcms/plugin-stripe";
import { s3Storage } from "@payloadcms/storage-s3";
import { postgresAdapter } from "@payloadcms/db-postgres"; // Updated to Postgres adapter
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import { link } from "./collections/Link";
import { Execs } from "./collections/Users/Execs";
import Nav from "./globals/Navbar";
import individuals from "./collections/Newsletter/Individual";
import Footer from "./globals/Footer";
import { Instagram } from "./collections/UI/Instagram";
import Resources from "./collections/UI/Resources";
import { Media } from "./collections/Media";
import Members from "./collections/Newsletter/Members";
import Socials from "./collections/UI/Socials";
import Products from "./collections/Products";
import { Posts } from "./collections/Blog";
import { Categories } from "./collections/Categories";
import { Tags } from "./collections/Tags";
import { resendAdapter } from "@payloadcms/email-resend";
import { seoPlugin } from "@payloadcms/plugin-seo";
import type { GenerateTitle } from "@payloadcms/plugin-seo/types";
import { Sizes } from "./collections/Products/sizes";
import WeeklyEvents from "./collections/UI/WeeklyEvents";
import PrayerTimings from "./collections/UI/PrayerInfo/PrayerTimings";
import Jummah from "./collections/UI/PrayerInfo/JummahTimings";
import PrayerRooms from "./collections/UI/PrayerInfo/PrayerRoom";
import Services from "./collections/UI/Services";
import { EmailCollection } from "./collections/EmailCollection";
import DistributionList from "./collections/Newsletter/Distribution-List";
import IIAServices from "./collections/IIA";
import FrequentlyAskedQuestions from "./collections/FAQ";
import sharp from "sharp";
import { Recording } from "./collections/Recordings";
import { HalalDirectory } from "./collections/HalalFoodDirectory";
import { formBuilderPlugin } from "@payloadcms/plugin-form-builder";
import RoommatePosts from "./collections/RoommatePosts";
import { Comments } from "./collections/Comment";

import { GeneralUser } from "./collections/Users/Users";
import { CheckboxBlock, ContactInfoBlock, SelectBlock } from "./blocks/forms";
import { checkoutSessionCompleted } from "./plugins/stripe/webhooks/checkoutSessionCompleted";
import { updateSheetData } from "./plugins/form-builder/google-sheets/actions";
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const generateTitle: GenerateTitle = () => {
  return "Laurier's Muslim Students Association";
};
export default buildConfig({
  admin: {
    user: Execs.slug,
  },

  collections: [
    Execs,
    link,
    Instagram,
    Resources,
    Media,
    Members,
    Socials,
    Products,
    Posts,
    Categories,
    Tags,
    Sizes,
    Recording,
    WeeklyEvents,
    Jummah,
    PrayerRooms,
    Services,
    EmailCollection,
    DistributionList,
    individuals,
    IIAServices,
    FrequentlyAskedQuestions,
    HalalDirectory,
    RoommatePosts,
    Comments,
    GeneralUser,
  ],
  globals: [Nav, Footer, PrayerTimings],
  editor: lexicalEditor({}),
  // plugins: [payloadCloud()], // TODO: Re-enable when cloud supports 3.0

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  plugins: [
    seoPlugin({
      collections: ["Posts"],
      generateTitle,
      generateDescription: ({ doc }) => doc.description,
      uploadsCollection: "media",
    }),
    stripePlugin({
      isTestKey: process.env.STRIPE_SECRET_KEY?.includes("sk_test") ?? true,
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
      stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_ENDPOINT_SECRET,
      webhooks: {
        "checkout.session.completed": checkoutSessionCompleted,
      },

      logs: true,
    }),
    s3Storage({
      collections: {
        media: {
          prefix: "media",
          generateFileURL: ({ prefix, filename }) => {
            if (prefix !== undefined) {
              return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.S3_BUCKET}/${prefix}/${filename}`;
            }
            return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.S3_BUCKET}/${filename}`;
          },
        },
      },
      bucket: process.env.S3_BUCKET || "default_bucket",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "default_access_key_id",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ||
            "default_secret_access_key",
        },
        region: process.env.S3_REGION || "default_region",
        endpoint: process.env.S3_ENDPOINT || "default_endpoint",
      },
    }),
    formBuilderPlugin(
      {
        formOverrides: {
          slug: "forms",
          admin: {
            group: "Forms",
            livePreview: {
              url: ({ data }) => {
                const isHomePage = data.title === "";
                return `${process.env.NEXT_PUBLIC_SERVER_URL}/forms${
                  !isHomePage ? `/${data.slug}` : ""
                }`;
              },
            },
          },
          access: {
            update: () => true,
          },

          fields: ({ defaultFields }) => {
            return [
              ...defaultFields,
              {
                name: "submissionLimit",
                label: "Submission Limit",
                type: "number",
                admin: {
                  position: "sidebar",
                },
              },
              {
                name: "releaseDate",
                label: "Form Release Date",
                type: "date",
                admin: {
                  position: "sidebar",
                  date: {
                    pickerAppearance: "dayAndTime",
                  },
                },
              },
              {
                name: "closeDate",
                label: "Form Auto Close Date (leave empty to never close)",
                type: "date",
                admin: {
                  position: "sidebar",
                  date: {
                    pickerAppearance: "dayAndTime",
                  },
                },
              },
              {
                name: "slug",
                label: "slug",
                type: "text",
                admin: {
                  position: "sidebar",
                },
              },
              {
                name: "googleSheet",
                label: "Google Sheet ID (Must be shared with admin@wlumsa.org)",
                type: "text",
                admin: {
                  position: "sidebar",
                },
                required: false,
              },
            ];
          },
        },
        beforeEmail: (emailsToSend, beforeChangeParams) => {
          const { data } = beforeChangeParams;
          console.log(data);
          return emailsToSend;
        },
        formSubmissionOverrides: {
          admin: {
            group: "Forms",
          },
          hooks: {
            afterChange: [
              async ({ doc, operation }) => {
                if (operation === "update") {
                  console.log("Updated Doc", doc);
                } else {
                  console.log("Created Doc", doc);
                }
                const res = await updateSheetData(doc)
                console.log(res)
              },
            ],
          },
          fields: ({ defaultFields }) => {
            const formField = defaultFields.find((field) =>
              "name" in field && field.name === "form"
            );
            return [
              ...(formField ? [formField] : []),
              {
                name: "submissionData",
                type: "json",
                admin: {
                  components: {
                    Field: "@/plugins/form-builder/FormData",
                  },
                },
              },
              {
                name: "payment",
                type: "group",
                admin: {
                  position: "sidebar",
                },
                fields: [
                  {
                    name: "amount",
                    type: "number",
                  },
                  {
                    name: "status",
                    type: "select",
                    defaultValue: "pending",
                    options: [
                      { label: "Pending", value: "pending" },
                      { label: "Paid", value: "paid" },
                      { label: "Cancelled", value: "cancelled" },
                      { label: "Refunded", value: "refunded" },
                    ],
                  },
                ],
              },
            ];
          },
        },
        fields: {
          text: true,
          textarea: true,
          CustomSelect: SelectBlock,
          select: false,
          email: true,
          state: true,
          country: true,
          checkbox: CheckboxBlock,
          contactInfo: ContactInfoBlock,
          number: true,
          message: true,
          payment: true,
        },
      },
    ),
  ],
  email: resendAdapter({
    defaultFromAddress: "onboarding@resend.dev",
    defaultFromName: "WLUMSA",
    apiKey: process.env.RESEND_API_KEY || "",
  }),

  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable
  secret: process.env.PAYLOAD_SECRET || "",
  sharp,
});
