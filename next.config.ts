import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: 'c:/Users/ati/.gemini/antigravity/scratch/metal-poster-pro',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'wswlhtglwpyragymrdhl.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
