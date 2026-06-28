import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  assetPrefix: '/Yieldly',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
