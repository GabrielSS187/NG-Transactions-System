/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
