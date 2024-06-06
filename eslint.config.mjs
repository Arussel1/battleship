import globals from "globals";

export default {
  ignorePatterns: ["webpack.config.js"],
  overrides: [
    {
      files: ["**/*.js"],
      languageOptions: { globals: globals.browser },
      extends: ["plugin:js/recommended"],
    },
  ],
};