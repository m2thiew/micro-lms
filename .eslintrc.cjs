/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json", "./tsconfig.scripts.json"],
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier",
  ],
  rules: {
    // variabili dichiarate ma non usate sono seganlate come "waringin" e non come "errore"
    "@typescript-eslint/no-unused-vars": ["warn", { varsIgnorePattern: "^_" }],

    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    // "@typescript-eslint/array-type": "off",
    // "@typescript-eslint/consistent-type-definitions": "off",
    // "@typescript-eslint/consistent-type-imports": [
    //   "warn",
    //   {
    //     prefer: "type-imports",
    //     fixStyle: "inline-type-imports",
    //   },
    // ],
    // "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    // "@typescript-eslint/no-misused-promises": [
    //   2,
    //   {
    //     checksVoidReturn: { attributes: false },
    //   },
    // ],
  },
};

module.exports = config;
