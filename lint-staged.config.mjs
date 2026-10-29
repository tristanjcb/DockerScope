export default {
  "*.{js,mjs,cjs,ts,tsx,jsx}": ["oxlint --deny-warnings", "oxfmt --write"],
  "*.scss": ["stylelint --fix", "oxfmt --write"],
  "*.{json,jsonc,yml,yaml,md,css,html,svg}": "oxfmt --write",
};
