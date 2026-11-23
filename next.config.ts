import type { NextConfig } from "next";
import { blobHostname } from "./utils/blobHostname";
import { SECURITY_HEADERS } from "./lib/site/securityHeaders";

const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Uploaded photos are served from our Vercel Blob store only, so the image
    // optimizer can't be used for anyone else's files.
    remotePatterns: blobToken
      ? [{ protocol: "https", hostname: blobHostname(blobToken) }]
      : [],
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
};

export default nextConfig;
