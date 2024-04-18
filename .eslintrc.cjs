module.exports = {
  root: true,
  env: { browser: true, es2020: true , node:true},
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    // "eslint:recommended",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs',"node_modules/", "public", "*.config.[jt]s", "**/*.md"],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh',"eslint-plugin-simple-import-sort", "unused-imports"],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': ['off'],
    "no-unused-vars": "warn",
    "no-useless-catch": 0,
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "unused-imports/no-unused-imports-ts": ["error"]
  },  
};
