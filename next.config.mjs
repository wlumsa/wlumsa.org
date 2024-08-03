import { withPayload } from '@payloadcms/next/withPayload'


/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

 
  reactCompiler:false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: process.env.S3_HOSTNAME || '',
        port: "",
        pathname: "/**",
      }
      
    ],
  },
  domains: [process.env.NEXT_PUBLIC_SUPABASE_URL],
};
export default withPayload((config));
