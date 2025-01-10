module.exports = {
  arrowParens: 'always',
  singleQuote: true,
  jsxSingleQuote: true,
  tabWidth: 2,
  semi: true,
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@ianvs/prettier-plugin-sort-imports'),
  ],
  importOrder: ['^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
