import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Playwright calls the dev server at 127.0.0.1. Next blocks that origin
  // unless it is listed, and the client bundle never hydrates.
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      {
        // The "What CompTIA A+ is" overview lesson was removed. Send old
        // bookmarks and saved locations to lesson 1 (Core 1 objective 1.1).
        // Keep in sync with FIRST_LESSON_HREF in src/lib/study-path.ts.
        // /course/foundation/how-the-academy-works is still a live optional
        // lesson, so it is not redirected.
        source: "/course/foundation/what-a-plus-is",
        destination: "/course/core-1/domain-1/1-1-laptop-hardware/laptop-battery-keyboard",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
