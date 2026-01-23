import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  // ✅ ย้ายออกจาก experimental
  serverExternalPackages: ["impit"],

  experimental: {
    optimizeCss: false,
  },
};

export default nextConfig;
