import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";


export default defineConfig([
  {
    files: ["**/*.js"],
    rules: {
      'no-var': 'error',
      'no-console': 'warn',
      'no-unused-vars': 'warn',
    },
  },
  { files: ["**/*.js"], languageOptions: { globals: globals.browser } },
  { files: ["**/*.js"], plugins: { js }, extends: ["js/recommended"] },
  { ignores: ["dist/*"] },
  {
    files: ['**/*.test.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
      },
    },
    rules: {
      'no-undef': 'error',
    }
  },
]);