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
    description: '好みと推しVTuberを無意識から探る！',
    mainVisual: './src/images/main-visual.jpg',
    siteUrl: 'https://shindan.animare.cafe',
    title: 'あなたのオタクタイプ診断 by あにまーれ'
  }
}
