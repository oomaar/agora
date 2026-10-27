import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Uploaded photos are served from the Vercel Blob store.
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
};

export default nextConfig;
