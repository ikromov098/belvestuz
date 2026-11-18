import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: { unoptimized: true },
  // Old and mistyped investor URLs go to the English investor page. `statusCode: 301` is used
  // instead of `permanent: true`, which would send 308.
  async redirects() {
    return ['/en/investor', '/investor', '/investors'].map((source) => ({
      source,
      destination: '/en/investors/',
      statusCode: 301,
    }));
  },
};

export default nextConfig;
