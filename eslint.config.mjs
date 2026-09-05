import js from "@eslint/js";
import tsPlugin from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";

export default [
  js.configs.recommended,
  ...tsPlugin.configs.recommended,
  {
    plugins: {
      boundaries,
    },
    settings: {
      "boundaries/include": ["src/**/*"],
      "boundaries/elements": [
        {
          type: "app",
          pattern: "src/app/**",
          mode: "full",
        },
        {
          type: "feature",
          pattern: "src/features/*/**",
          mode: "full",
          capture: ["feature"],
        },
        {
          type: "shared",
          pattern: "src/shared/**",
          mode: "full",
        },
      ],
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          message: "${file.type} is not allowed to import ${target.type} (${target.captured.feature ? target.captured.feature : ''})",
          rules: [
            {
              // Shared can only import other shared files
              from: ["shared"],
              allow: ["shared"],
            },
            {
              // Features can import shared, or within the SAME feature folder
              from: ["feature"],
              allow: [
                "shared",
                ["feature", { feature: "${from.feature}" }],
              ],
            },
            {
              // App can import from both shared and any feature
              from: ["app"],
              allow: ["shared", "feature"],
            },
          ],
        },
      ],
      // Allow unused vars if prefixed with _
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    ignores: ["node_modules/**", "dist/**"],
  },
];
