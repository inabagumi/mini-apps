const withPWA = require('next-pwa')

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    esmExternals: true
  },
  pwa: {
    dest: '.next/static',
    disable: process.env.NODE_ENV === 'development',
    sw: 'sw.js'
  },
  rewrites() {
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
