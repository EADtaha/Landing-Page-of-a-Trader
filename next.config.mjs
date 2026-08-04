/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow cross-origin requests from local network IPs during development.
  // Prevents the "cross-origin request blocked" warning when accessing the
  // dev server from other devices on the same network (e.g. mobile testing).
  allowedDevOrigins: [
    "192.168.1.18",
  ],
};

export default nextConfig;
