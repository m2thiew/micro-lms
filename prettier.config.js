/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').options} */
const config =  {
  plugins: ["prettier-plugin-tailwindcss", "prettier-plugin-prisma"],
  tailwindFunctions: ["clsx"],
};

module.exports = config;
