module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: ['babel-eslint', '@typescript-eslint/parser']
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/vue',
    'plugin:vue/essential',
    '@typescript-eslint/recommended'
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error'
  }
}
