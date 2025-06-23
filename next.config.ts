import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.API_PORTOCOL as 'http' | 'https',
        hostname: process.env.API_HASTNAME as string,
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
