const path = require('path')

const resultTemplate = path.resolve('src', 'templates', 'result', 'index.tsx')

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allResultsJson {
        edges {
          node {
            id
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  result.data.allResultsJson.edges.forEach(edge => {
    const { id } = edge.node

    createPage({
      component: resultTemplate,
      context: { id },
      path: `/s/${id}`
    })
  })
}

exports.onCreatePage = ({ actions, page }) => {
  const { createPage, deletePage } = actions

  return new Promise(resolve => {
    const newPage = {
      ...page,
      path: page.path === `/` ? page.path : page.path.replace(/\/$/, ``)
    }

    if (newPage.path !== page.path) {
      deletePage(page)
      createPage(newPage)
    }

    resolve()
  })
}
