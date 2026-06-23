module.exports = {
  extends: [
    '../react',
    '../rules/react',
  ].map(require.resolve),
};