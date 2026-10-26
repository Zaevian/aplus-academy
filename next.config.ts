import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Playwright calls the dev server at 127.0.0.1. Next blocks that origin
  // unless it is listed, and the client bundle never hydrates.
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      {
        // The "What CompTIA A+ is" overview lesson was removed. Send old
        // bookmarks and saved locations to Foundation lesson 1.
        source: "/course/foundation/what-a-plus-is",
        destination: "/course/foundation/how-the-academy-works",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
