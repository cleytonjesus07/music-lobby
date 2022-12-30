/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["pt-BR", "en-US"],
    defaultLocale: "pt-BR",

  },
  trailingSlash: false,
  env: {
    DATABASE_URL: 'postgresql://postgres:dlnitCSn7iVdhkIH@db.oupjkvghjrdngplvhyxv.supabase.co:5432/postgres',
    SUPABASE_URL: 'https://oupjkvghjrdngplvhyxv.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91cGprdmdoanJkbmdwbHZoeXh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzAwMjgxOTIsImV4cCI6MTk4NTYwNDE5Mn0.P_aOO3DCZdaEYzVbgelkN8yG2to4mwKQ9q7OokfEdz4'

  },
  images: {
    domains: ['music-lobby.pockethost.io', 'upload.pockethost.io', 'images.pockethost.io']
  }
}


module.exports = nextConfig
