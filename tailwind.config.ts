import { type Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.tsx", "node_modules/flowbite-react/lib/esm/**/*.js"],
  theme: {},
  plugins: [require("flowbite/plugin")],
};

export default config;
