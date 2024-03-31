/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json", "./tsconfig.scripts.json"],
  },
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "prettier",
  ],
  rules: {
    // variabili dichiarate ma non usate sono seganlate come "waringin" e non come "errore"
    "@typescript-eslint/no-unused-vars": ["off", { varsIgnorePattern: "^_" }],

    // se si importa un elemento da usare solo come tipo, allora deve essere importato come "type"
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],

    // obbliga ad usare "type" anzichè "interface".
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],

    // impedisce di usare import con ".." (è prefribile specificare il
    // percorso partendo da "@/...")
    // "import/no-relative-parent-imports": ["error"],

    // // segnala eventuali cicli creati con gli "import"
    // "import/no-cycle": ["error", { ignoreExternal: true }],
  },
};

module.exports = config;
