import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  assetPrefix: '/Yieldly',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
