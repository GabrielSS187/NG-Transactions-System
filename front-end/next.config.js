/** @type {import('next').NextConfig} */

const rawUrl = process.env.NEXT_PUBLIC_API_URL || "";
const url =
  rawUrl === "http://localhost:8000"
    ? "localhost"
    : rawUrl.replace(/^https?:\/\//, "");

const nextConfig = {
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
  },
  images: {
    domains: [
      url,
      "localhost",          // 👈 novo
      "backend",            // 👈 novo
      "host.docker.internal",
      process.env.NEXT_PUBLIC_AWS_URL,
    ].filter(Boolean),
  },
  compiler: {
    styledComponents: {
      ssr: true,
      cssProp: true,
    },
  },
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
