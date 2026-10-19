import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "src/premium/data/**",
      "src/apple-storekit-v9/**",
      "src/gaussian-splatting-v11/**",
      "src/gaussian-splatting-v12/**",
      "src/generative-data-v9/**",
      "src/generative-data-v10/**",
      "src/generative-design/**",
      "src/generative-design/creative-v2/**",
      "src/retail-shopping-v4/**",
      "src/retail-shopping-v5/**",
      "src/cad-bim/**",
      "src/recommendation-engine/**",
      "src/visual-ai-v14/**",
      "src/demo/**",
      "vite.config.ts",
    ],
  },
  {
    files: ["src/**/*.{ts,tsx}", "tests/**/*.ts"],
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    },
  },
);
