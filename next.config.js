/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/map',
        destination: '/map/u1hcy',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
