/** @type {import('next').NextConfig} */

// To transpile other packages in the monorepo
const withTM = require('next-transpile-modules')(['@tadeas/firestore-converters']);

// General Next configurations
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

module.exports = withTM({
  ...nextConfig,
});
