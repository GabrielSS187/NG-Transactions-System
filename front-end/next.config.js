/** @type {import('next').NextConfig} */
const url = process.env.NEXT_PUBLIC_API_URL === "http://localhost:8000"
? "localhost"
:  `${process.env.NEXT_PUBLIC_API_URL}`.replace("https://", "");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_DOCKER_API_URL: process.env.NEXT_PUBLIC_DOCKER_API_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
  },
  images: {
    domains: [
      url,
      "host.docker.internal",
    ]
  },
  compiler: {
    styledComponents: {
      ssr: true,
      cssProp: true
    },
  },
}

module.exports = nextConfig
