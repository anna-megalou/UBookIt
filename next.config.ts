import type { NextConfig } from "next";

// Only use basePath when building for production deployment
// This allows dev server to run on localhost:3000 without basePath
const isProductionBuild = process.env.NODE_ENV === 'production';
const basePath = isProductionBuild ? '/ismgroup17/ubookit' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  distDir: 'dist',
  // Set environment variable so components can access basePath
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
