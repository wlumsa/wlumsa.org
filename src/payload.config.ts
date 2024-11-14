import { stripePlugin } from "@payloadcms/plugin-stripe";
import { s3Storage } from "@payloadcms/storage-s3";
import { postgresAdapter } from '@payloadcms/db-postgres'; // Updated to Postgres adapter
// import { payloadCloud } from '@payloadcms/plugin-cloud'
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
// import sharp from 'sharp'

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
import { HalalDirectory } from "./collections/HalalFoodDirectory";
const generateTitle: GenerateTitle = () => {
  return "Laurier's Muslim Students Association";
};

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
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
  ],
  email: resendAdapter({
    defaultFromAddress: "onboarding@resend.dev",
    defaultFromName: "WLU MSA",
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
