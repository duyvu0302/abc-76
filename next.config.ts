import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [
      440, 540, 640, 828, 1080, 1280, 1400, 1536, 1700, 1920, 2560, 3840,
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320, 374],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  typescript: {
    ignoreBuildErrors: true, // Tắt kiểm tra kiểu TypeScript
  },
};

export default nextConfig;
