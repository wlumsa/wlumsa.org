import { withPayload } from '@payloadcms/next/withPayload'


/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  experimental: {
    reactCompiler: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.S3_HOSTNAME || "http://localhost:3000",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol:"https",
        hostname:"mrucujpvbprmpznsgmfr.supabase.co",
        port:"",
        pathname:"/**"
      }
      
      
    ],
  },
  //domains: [process.env.NEXT_PUBLIC_SUPABASE_URL],
};
export default withPayload(config);
