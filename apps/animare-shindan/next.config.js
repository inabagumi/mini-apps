const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['components', 'lib', 'pages', 'prisma', 'utils']
  },
  experimental: {
    esmExternals: true
  },
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja']
  },
  pwa: {
    dest: '.next/static',
    disable: process.env.NODE_ENV === 'development',
    sw: 'sw.js'
  },
  async rewrites() {
    return [
      {
        destination: '/_next/static/sw.js',
        source: '/sw.js'
      },
      {
        destination: '/_next/static/workbox-:hash.js',
        source: '/workbox-:hash.js'
      },
      {
        destination: '/api/manifest',
        source: '/manifest.webmanifest'
      }
    ]
  }
}

module.exports = withPWA(nextConfig)
