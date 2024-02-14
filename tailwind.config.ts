import { type Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.tsx",
    // "./src/frontend/lib/flowbite.ts",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {},
  plugins: [require("flowbite/plugin")],
};

export default config;
