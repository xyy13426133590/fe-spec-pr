module.exports = {
  enableESLint: true,
  enableStylelint: false,
  enableMarkdownlint: false,
  enablePrettier: false,
  eslintOptions: {
    useEslintrc: false,
    fix: true,
    baseConfig: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'script',
      },
      rules: {
        semi: ['error', 'always'],
      },
    },
  },
};
