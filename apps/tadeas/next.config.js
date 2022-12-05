/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // Disabling image optimization because is not supported by "next export"
    unoptimized: true,
  },
  // Disabling x-powered-by header
  poweredByHeader: false,
};

module.exports = nextConfig;
