import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: false,
    serverComponentsExternalPackages: ['impit'],
  },
};

export default nextConfig;
