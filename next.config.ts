import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent Turbopack from inferring the wrong workspace root when a lockfile
  // exists in a parent directory (the spaces-in-path workspace).
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
