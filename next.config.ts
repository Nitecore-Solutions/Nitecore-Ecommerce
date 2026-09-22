import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "cdn11.bigcommerce.com" },
      { hostname: "upload.wikimedia.org" },
      { hostname: "commons.wikimedia.org" },
      { hostname: "placehold.co" },
      { hostname: "m.media-amazon.com" },
      { hostname: "encrypted-tbn0.gstatic.com" },
      { hostname: "cdn.shopify.com" },
      { hostname: "5.imimg.com" },
      { hostname: "cpimg.tistatic.com" },
    ],
  },
};

export default nextConfig;
