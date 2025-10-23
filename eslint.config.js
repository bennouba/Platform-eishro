import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // TypeScript relaxations (kept) and targeted quality improvements
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-var-requires": "off",

      // Stricter, yet safe, best-practice rules (warnings)
      "@typescript-eslint/consistent-type-definitions": ["warn", "interface"],
      "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
      "eqeqeq": ["warn", "smart"],
      "prefer-const": "warn",
      "no-var": "warn",
      "object-shorthand": ["warn", "always"],
      // Helps keep named imports members sorted (doesn't reorder import statements)
      "sort-imports": ["warn", { "ignoreDeclarationSort": true, "ignoreCase": false }],

      "react-hooks/exhaustive-deps": "warn",
      "no-console": "off",
    },
  }
);
