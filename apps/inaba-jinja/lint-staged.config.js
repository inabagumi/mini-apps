/** @type {import('lint-staged').Config} */
const lintstagedrc = {
  '*.{js,ts,tsx}': 'eslint --fix'
}

export default lintstagedrc
