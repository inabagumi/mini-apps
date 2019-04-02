const path = require('path')

module.exports = {
  plugins: [
    {
      options: {
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            sizes: '72x72',
            src: '/assets/icon-72x72.png',
            type: 'image/png'
          },
          {
            sizes: '96x96',
            src: '/assets/icon-96x96.png',
            type: 'image/png'
          },
          {
            sizes: '128x128',
            src: '/assets/icon-128x128.png',
            type: 'image/png'
          },
          {
            sizes: '144x144',
            src: '/assets/icon-144x144.png',
            type: 'image/png'
          },
          {
            sizes: '152x152',
            src: '/assets/icon-152x152.png',
            type: 'image/png'
          },
          {
            sizes: '192x192',
            src: '/assets/icon-192x192.png',
            type: 'image/png'
          },
          {
            sizes: '384x384',
            src: '/assets/icon-384x384.png',
            type: 'image/png'
          },
          {
            sizes: '512x512',
            src: '/assets/icon-512x512.png',
            type: 'image/png'
          }
        ],
        name: 'あなたのオタクタイプ診断 by あにまーれ',
        theme_color: '#0588f7',
        short_name: 'あにまーれ診断',
        start_url: '/'
      },
      resolve: 'gatsby-plugin-manifest'
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      options: {
        exclude: ['/questions']
      },
      resolve: 'gatsby-plugin-sitemap'
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-typescript',
    {
      options: {
        ignore: ['**/\\.*'],
        name: 'data',
        path: path.resolve('src', 'data')
      },
      resolve: 'gatsby-source-filesystem'
    },
    {
      options: {
        name: 'images',
        path: path.resolve('src', 'images')
      },
      resolve: 'gatsby-source-filesystem'
    },
    'gatsby-transformer-json',
    'gatsby-transformer-remark',
    'gatsby-transformer-yaml'
  ],
  siteMetadata: {
    description: '好みと推しVTuberを無意識から探る！',
    siteUrl: 'https://shindan.animare.cafe',
    title: 'あなたのオタクタイプ診断 by あにまーれ'
  }
}
