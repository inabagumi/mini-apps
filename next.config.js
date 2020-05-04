/* eslint-disable @typescript-eslint/explicit-function-return-type */

const SentryWebpackPlugin = require('@sentry/webpack-plugin')
const cspBuilder = require('content-security-policy-builder')

const withMDX = require('@next/mdx')()
const withSourceMaps = require('@zeit/next-source-maps')()
const withOffline = require('next-offline')

const release = [
  process.env.npm_package_name,
  process.env.NOW_GITHUB_COMMIT_SHA || process.env.npm_package_version
].join('@')

const nextConfig = {
  env: {
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    GA_TRACKING_ID: process.env.GA_TRACKING_ID,
    SENTRY_DSN: process.env.SENTRY_DSN,
    SENTRY_RELEASE: release
  },
  experimental: {
    headers: () => [
      {
        headers: [
          {
            key: 'cache-control',
            value:
              'max-age=600, public, s-maxage=120, stale-if-error=600, stale-while-revalidate=300'
          },
          {
            key: 'content-security-policy',
            value: cspBuilder({
              directives: {
                baseUri: ["'none'"],
                blockAllMixedContent: true,
                connectSrc: [
                  "'self'",
                  'https://images.ctfassets.net',
                  'https://www.google-analytics.com',
                  'https://*.imgix.net',
                  'https://*.ingest.sentry.io'
                ],
                defaultSrc: ["'self'"],
                fontSrc: ["'none'"],
                formAction: ["'none'"],
                frameAncestors: ["'none'"],
                imgSrc: [
                  "'self'",
                  'data:',
                  'https://images.ctfassets.net',
                  'https://www.google-analytics.com',
                  'https://www.googletagmanager.com',
                  'https://*.imgix.net'
                ],
                manifestSrc: ["'self'"],
                objectSrc: ["'none'"],
                ...(process.env.CSP_REPORT_URL
                  ? {
                      reportUri: process.env.CSP_REPORT_URL
                    }
                  : {}),
                scriptSrc: [
                  "'self'",
                  "'unsafe-inline'",
                  "'unsafe-eval'",
                  'https://www.google-analytics.com',
                  'https://www.googletagmanager.com'
                ],
                styleSrc: ["'self'", "'unsafe-inline'"],
                workerSrc: ["'self'"]
              }
            })
          },
          {
            key: 'referrer-policy',
            value: 'same-origin, strict-origin-when-cross-origin'
          }
        ],
        source: '/((?!_next).*)'
      },
      {
        headers: [
          {
            key: 'cache-control',
            value: 'max-age=0'
          },
          {
            key: 'service-worker-allowed',
            value: '/'
          }
        ],
        source: '/service-worker.js'
      },
      {
        headers: [
          {
            key: 'content-type',
            value: 'application/manifest+json'
          }
        ],
        source: '/manifest.webmanifest'
      }
    ],
    measureFid: true,
    modern: true,
    plugins: true,
    rewrites: () => [
      {
        destination: '/_next/static/service-worker.js',
        source: '/service-worker.js'
      },
      {
        destination: '/_next/static/service-worker.js.map',
        source: '/service-worker.js.map'
      }
    ]
  },
  generateEtags: false,
  pageExtensions: ['mdx', 'tsx'],
  reactRefresh: true,
  webpack(config, { defaultLoaders, dev }) {
    const urlLoader = {
      loader: 'url-loader',
      options: {
        esModule: false,
        limit: 8192,
        name: dev
          ? '[name].[ext]?[contenthash:8]'
          : '[name].[contenthash:8].[ext]',
        outputPath: 'static/media',
        publicPath: '/_next/static/media'
      }
    }

    config.module.rules.push({
      test: /\.jpg$/,
      use: [
        defaultLoaders.babel,
        {
          loader: '@docusaurus/lqip-loader',
          options: {
            base64: true,
            pallete: false
          }
        },
        urlLoader
      ]
    })

    config.module.rules.push({
      test: /\.png$/,
      use: [defaultLoaders.babel, urlLoader]
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        defaultLoaders.babel,
        {
          loader: '@svgr/webpack',
          options: {
            babel: false,
            dimensions: false
          }
        }
      ]
    })

    if (
      process.env.SENTRY_AUTH_TOKEN &&
      process.env.SENTRY_ORG &&
      process.env.SENTRY_PROJECT
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          ignore: ['node_modules'],
          include: '.next',
          release,
          urlPrefix: '~/_next'
        })
      )
    }

    return config
  },
  workboxOpts: {
    clientsClaim: true,
    include: [
      /\/pages\/(?:_[^.]+)\.module\.js$/,
      /\/runtime\/(?:webpack|main)-[0-9a-f]{20}\.module\.js$/,
      /\/chunks\/(?:commons|framework)\.[0-9a-f]{20}\.module\.js$/
    ],
    runtimeCaching: [
      {
        handler: 'NetworkFirst',
        urlPattern: /\/(?:disclaimer|kuji\/\w|lottery|privacy|share\/\w+)?$/
      },
      {
        handler: 'NetworkFirst',
        urlPattern: /\/_next\/data\/[^/]+\/lottery\.json$/
      },
      {
        handler: 'CacheFirst',
        urlPattern: /\.(?:ico|jpe?g|js|json|png|webp)$/i
      },
      {
        handler: 'CacheFirst',
        options: {
          cacheableResponse: {
            statuses: [0, 200]
          }
        },
        urlPattern: /^https:\/\/(?:[^.]+\.imgix\.net|images\.ctfassets\.net)\//i
      }
    ],
    skipWaiting: true,
    swDest: 'static/service-worker.js'
  }
}

module.exports = [withSourceMaps, withMDX, withOffline].reduce(
  (config, plugin) => plugin(config),
  nextConfig
)
