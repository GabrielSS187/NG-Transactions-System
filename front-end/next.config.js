/** @type {import('next').NextConfig} */
const url = process.env.NEXT_PUBLIC_API_URL === "http://localhost:8000"
? "localhost"
:  `${process.env.NEXT_PUBLIC_API_URL}`.replace("https://", "");

const nextConfig = {
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
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
      "host.docker.internal",
      process.env.NEXT_PUBLIC_AWS_URL
    ]
  },
  compiler: {
    styledComponents: {
      ssr: true,
      cssProp: true
    },
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
