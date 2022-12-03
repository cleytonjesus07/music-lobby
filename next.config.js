const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    DATABASE_URL: 'postgresql://postgres:dlnitCSn7iVdhkIH@db.oupjkvghjrdngplvhyxv.supabase.co:5432/postgres',
    SUPABASE_URL: 'https://oupjkvghjrdngplvhyxv.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91cGprdmdoanJkbmdwbHZoeXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAwMjgxOTIsImV4cCI6MTk4NTYwNDE5Mn0.P_aOO3DCZdaEYzVbgelkN8yG2to4mwKQ9q7OokfEdz4'

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
