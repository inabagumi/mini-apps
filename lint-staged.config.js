/** @type {import('lint-staged').Config} */
const lintstagedrc = {
  "*.{css,js,json,jsonc,md,mdx,mjs,ts,tsx,yaml,yml}": "ultracite fix",
};

export default lintstagedrc;
