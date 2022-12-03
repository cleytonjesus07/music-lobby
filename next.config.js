const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

const nextConfigDev = {
  reactStrictMode: true,
  env: {
    baseUrl: 'http://127.0.0.1:8090'
  },
  images: {
    domains: ['127.0.0.1']
  }
}

module.exports = PHASE_DEVELOPMENT_SERVER ? nextConfigDev : nextConfig
