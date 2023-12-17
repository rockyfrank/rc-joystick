module.exports = {
  extends: ['eslint-config-ali/typescript', 'plugin:storybook/recommended'],
  plugins: ['simple-import-sort', 'react-hooks'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
