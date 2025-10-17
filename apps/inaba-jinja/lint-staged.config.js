/** @type {import('lint-staged').Config} */
const lintstagedrc = {
  '*.{js,ts,tsx}': [
    // 'eslint --fix',
    'prettier --write'
  ]
}

export default lintstagedrc
