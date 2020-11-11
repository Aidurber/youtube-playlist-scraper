module.exports = {
  hooks: {
    "pre-push": "npm run test",
    "pre-commit": "yarn lint && pretty-quick --staged",
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
  },
};
