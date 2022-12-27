/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
  },
  images: {
    domains: ["localhost"],
  },
  compiler: {
    styledComponents: {
      ssr: true,
      cssProp: true
    },
  },
}

module.exports = nextConfig
