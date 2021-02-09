module.exports = {
  extends: [
    "airbnb-base",
  ],
  plugins: ['jest'],
  parserOptions: {
    parser: "babel-eslint",
    parserOptions: {
      ecmaVersion: 7,
    },
  },
  env: {
    "jest/globals": true,
  },
  rules: {
    'import/prefer-default-export': 'off',
  },
}
