module.exports = {
    env: {
      node: true,
      es2022: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended' // Integra Prettier com ESLint
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    rules: {
      indent: ['error', 4], // 4 espaços de indentação
      '@typescript-eslint/no-explicit-any': 'warn',
    }
  }