/* eslint-disable @typescript-eslint/camelcase */

const path = require('path')

module.exports = {
  plugins: [
    'gatsby-plugin-emotion',
    {
      options: {
        trackingId: 'UA-138698330-1'
      },
      resolve: 'gatsby-plugin-google-analytics'
    },
    {
      options: {
        background_color: '#fff',
        cache_busting_mode: 'none',
        display: 'standalone',
        icon: 'src/assets/icon.png',
        name: 'あなたのオタクタイプ診断 by あにまーれ',
        short_name: 'あにまーれ診断',
        start_url: '/',
        theme_color: '#0588f7'
      },
      resolve: 'gatsby-plugin-manifest'
    },
    {
      options: {
        color: '#000'
      },
      resolve: 'gatsby-plugin-nprogress'
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      options: {
        exclude: ['/questions'],
        serialize: ({ allSitePage, site }) =>
          allSitePage.edges.map((edge) => {
            const path = edge.node.path.startsWith('/s/')
              ? `${edge.node.path}?s=true`
              : edge.node.path

            return {
              changefreq: 'daily',
              priority: 0.7,
              url: site.siteMetadata.siteUrl + path
            }
          })
      },
      resolve: 'gatsby-plugin-sitemap'
    },
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-plugin-typescript',
    {
      options: {
        name: 'assets',
        path: path.resolve(__dirname, 'src', 'assets')
      },
      resolve: 'gatsby-source-filesystem'
    },
    {
      options: {
        ignore: ['**/\\.*'],
        name: 'data',
        path: path.resolve(__dirname, 'src', 'data')
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
