// eslint.config.js
module.exports = [
  {
    languageOptions: {
      globals: {
        window: 'readonly',
        document: 'readonly',
        event: 'readonly', // Add this if you use 'event'
      },
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    plugins: {
      prettier: require('eslint-plugin-prettier'),
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          trailingComma: 'es5',
          printWidth: 80,
          tabWidth: 2,
        },
      ],
      'no-console': 'warn',
      'no-unused-vars': ['warn'],
      'no-undef': 'error',
    },
    ignores: ['eslint.config.js', 'node_modules/*'],
  },
];
