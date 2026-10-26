import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Playwright calls the dev server at 127.0.0.1. Next blocks that origin
  // unless it is listed, and the client bundle never hydrates.
  allowedDevOrigins: ["127.0.0.1"],
};

export default nextConfig;
