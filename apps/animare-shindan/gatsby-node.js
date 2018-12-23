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
