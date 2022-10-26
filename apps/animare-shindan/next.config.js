const nextPWA = require('next-pwa')

const withPWA = nextPWA({
  dest: '.next/static',
  disable: process.env.NODE_ENV === 'development',
  sw: 'sw.js'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true
  },
  eslint: {
    dirs: ['components', 'lib', 'pages', 'prisma']
  },
  experimental: {
    esmExternals: true
  },
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja']
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
