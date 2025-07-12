import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: process.env.API_PROTOCOL as 'http' | 'https',
        hostname: process.env.API_HOSTNAME as string,
      },
    ],
  },
};

export default nextConfig;
