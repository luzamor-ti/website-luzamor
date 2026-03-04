import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/**/*",
      },
    ],
  },
  transpilePackages: ["next-sanity", "@sanity/vision"],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
