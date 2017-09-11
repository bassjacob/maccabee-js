module.exports = {
  extends: ['eslint-config-airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prefer-promise-reject-errors': 'off',
    'prettier/prettier': ['error', {singleQuote: true, trailingComma: 'es5' }]
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    node: true,
  },
};
