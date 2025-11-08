import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'dbagut2mvh0lo.cloudfront.net', 'images.unsplash.com'],
  },
};

export default nextConfig;
