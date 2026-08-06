/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow cross-origin requests from local network IPs during development.
  allowedDevOrigins: ["192.168.1.18"],

  images: {
    // Testimonial WebP images are served from /public — no remote domains needed.
    // Explicitly list the formats so Next.js optimises them at build time.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
