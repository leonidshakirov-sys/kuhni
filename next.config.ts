import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF can crash older iOS Safari when many photos decode at once.
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 160, 256, 384],
  },
  poweredByHeader: false,
};

export default nextConfig;
