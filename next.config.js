const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DATABASE_URL: 'postgresql://postgres:dlnitCSn7iVdhkIH@db.oupjkvghjrdngplvhyxv.supabase.co:5432/postgres'
  }
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

module.exports = nextConfig
