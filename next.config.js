/* eslint-disable @typescript-eslint/explicit-function-return-type */

const withImages = require('@inabagumi/next-images')
const withSourceMaps = require('@zeit/next-source-maps')
const withOffline = require('next-offline')
const { name: packageName, version } = require('./package.json')

const nextConfig = {
  env: {
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_RELEASE: `${packageName}@${version}`
  },
  experimental: {
    modern: true,
    plugins: true,
    rewrites: () => [
      {
        destination: '/_next/static/service-worker.js',
        source: '/service-worker.js'
      }
    ]
  },
  generateEtags: false,
  svgrOptions: {
    dimensions: false
  },
  workboxOpts: {
    clientsClaim: true,
    manifestTransforms: [
      originalManifest => {
        const warnings = []

        const manifest = originalManifest.filter(entry =>
          /\/pages\/_.+\.module\.js$/.test(entry.url)
        )

        return { manifest, warnings }
      }
    ],
    skipWaiting: true,
    swDest: 'static/service-worker.js'
  }
}

module.exports = withSourceMaps()(withImages(withOffline(nextConfig)))
