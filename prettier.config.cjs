/** @type {import("prettier").Config} */
const config = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  tailwindStylesheet: "./src/styles/globals.css",
  trailingComma: "es5",
};

module.exports = config;
