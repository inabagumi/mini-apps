/** @type {import('lint-staged').Config} */
const lintstagedrc = {
  '*.{css,js,json,ts,tsx,md,mdx,yml}': 'biome check --apply',
}

export default lintstagedrc
