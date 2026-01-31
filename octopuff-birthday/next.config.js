/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "source.unsplash.com"],
    unoptimized: false,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
};

module.exports = nextConfig;

