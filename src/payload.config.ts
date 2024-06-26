import { s3Storage } from '@payloadcms/storage-s3';
import { postgresAdapter } from '@payloadcms/db-postgres'
// import { payloadCloud } from '@payloadcms/plugin-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload/config'
// import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { link } from './collections/Link'
import { Execs } from './collections/Users/Execs'
import Nav from './globals/Navbar'
import Footer from './globals/Footer'
import { Instagram } from './collections/UI/Instagram'
import Resources from './collections/UI/Resources'
import { Media } from './collections/Media'
import Emails from './collections/Newsletter/Emails';
import Members from './collections/Newsletter/Members';
import Socials from './collections/UI/Socials';
import Products from './collections/Products';
import { Posts } from './collections/Blog';
import { Categories } from './collections/Categories';
import { Tags } from './collections/Tags';
import { seoPlugin } from '@payloadcms/plugin-seo'

import type { GenerateTitle } from '@payloadcms/plugin-seo/types'
import { Sizes } from './collections/Products/sizes';
import WeeklyEvents from './collections/UI/WeeklyEvents';
const generateTitle: GenerateTitle = () => {
  return 'Laurier\'s Muslim Students Association'
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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
    Emails,
    Members,
    Socials,
    Products,
    Posts,
    Categories,
    Tags,
    Sizes,
    WeeklyEvents,
  ],
  globals: [Nav, Footer],
  editor: lexicalEditor({}),
  // plugins: [payloadCloud()], // TODO: Re-enable when cloud supports 3.0
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [
    seoPlugin({

      collections: ['posts',],
      generateTitle,
      uploadsCollection: 'media',

    }),
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        }
      },
      bucket: process.env.S3_BUCKET || 'default_bucket',
      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || 'default_access_key_id',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || 'default_secret_access_key',
        },
        region: process.env.S3_REGION || 'default_region',
        endpoint: process.env.S3_ENDPOINT || 'default_endpoint',
      },
    }),
  ],



  // Sharp is now an optional dependency -
  // if you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.

  // This is temporary - we may make an adapter pattern
  // for this before reaching 3.0 stable

  // sharp,
})
