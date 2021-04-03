const withPWA = require('next-pwa')

const nextConfig = {
  future: {
    webpack5: true
  },
  pwa: {
    dest: '.next/static',
    disable: process.env.NODE_ENV === 'development',
    sw: '/sw.js'
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
  },
  webpack(config, { defaultLoaders }) {
    config.module.rules.push({
      test: /\.(jpg|png)$/,
      use: [
        defaultLoaders.babel,
        {
          loader: 'file-loader',
          options: {
            name: '[name].[contenthash:8].[ext]',
            outputPath: 'static/media',
            publicPath: '/_next/static/media'
          }
        }
      ]
    })

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        defaultLoaders.babel,
        {
          loader: 'url-loader',
          options: {
            limit: 4096,
            name: '[name].[contenthash:8].[ext]',
            outputPath: 'static/media',
            publicPath: '/_next/static/media'
          }
        }
      ]
    })

    return config
  }
}

module.exports = withPWA(nextConfig)
