/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ,
    NEXT_PUBLIC_HOST_NAME_API: process.env.NEXT_PUBLIC_HOST_NAME_API,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  images: {
    domains: ["localhost", `${process.env.NEXT_PUBLIC_API_URL}`.replace("https://", "")],
  },
  compiler: {
    styledComponents: {
      ssr: true,
      cssProp: true
    },
  },
}

module.exports = nextConfig
