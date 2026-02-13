import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // port: '',
        // pathname: '/account123/**',
        // search: '',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb', // Increase from default 1MB to 10MB
    },
  },
};

export default nextConfig;
