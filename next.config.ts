import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL(
        "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/U6Plt0N.png",
      ),
      new URL(
        "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/TDs5Gpg.png",
      ),
      new URL(
        "https://storage.googleapis.com/qvault-webapp-dynamic-assets/course_assets/3elNhQu.png",
      ),
    ],
  },
};

export default nextConfig;
