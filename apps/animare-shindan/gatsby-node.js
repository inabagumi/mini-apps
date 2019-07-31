const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const resultTemplate = path.resolve(
    __dirname,
    'src',
    'templates',
    'analysis-result.tsx'
  )
  const result = await graphql(
    `
      {
        allResultsYaml {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) throw result.errors

  result.data.allResultsYaml.edges.forEach(({ node }) => {
    createPage({
      component: resultTemplate,
      context: {
        slug: node.fields.slug
      },
      path: node.fields.slug
    })
  })
}

exports.onCreateNode = ({ actions, getNode, node }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'ResultsYaml') {
    const filePath = createFilePath({ node, getNode })
    const [, , id] = filePath.split('/')

    createNodeField({
      name: 'slug',
      node,
      value: `/s/${id}`
    })
  }
}
