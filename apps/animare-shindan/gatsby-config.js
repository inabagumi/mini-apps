const path = require('path')

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
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
    'gatsby-transformer-json'
  ],
  siteMetadata: {
    siteUrl: 'https://shindan.animare.cafe'
  }
}
