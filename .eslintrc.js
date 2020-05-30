module.exports = {
  extends: ['airbnb-base', 'plugin:react/recommended'],
  env: {
    browser: true,
    node: true,
  },
  globals: {},
  rules: {
    'max-len': [
      'error',
      {
        code: 80,
      },
    ],
  },
};
