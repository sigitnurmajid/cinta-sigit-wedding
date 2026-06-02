/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Self-contained server build for Docker (.next/standalone).
  output: "standalone",
  // Native module — keep it external so it isn't bundled by the server build.
  serverExternalPackages: ["better-sqlite3"],
  images: {
    // Pexels pattern kept for reference — can be removed once all images
    // in public/images/ are real photos and no external URLs are in use.
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
