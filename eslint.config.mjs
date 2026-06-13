import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

function withCompatibilityRules(configs) {
  return configs.map((config) => {
    const rules = {};

    if (config.plugins?.["@typescript-eslint"]) {
      Object.assign(rules, {
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-require-imports": "warn",
      });
    }

    if (config.plugins?.["react-hooks"]) {
      Object.assign(rules, {
        "react-hooks/set-state-in-effect": "warn",
        "react-hooks/static-components": "warn",
      });
    }

    if (config.plugins?.react) {
      Object.assign(rules, {
        "react/no-unescaped-entities": "warn",
      });
    }

    if (Object.keys(rules).length === 0) {
      return config;
    }

    return {
      ...config,
      rules: {
        ...config.rules,
        ...rules,
      },
    };
  });
}

const typescriptPlugin = nextTypescript.find(
  (config) => config.plugins?.["@typescript-eslint"],
)?.plugins?.["@typescript-eslint"];
const reactHooksPlugin = nextCoreWebVitals.find(
  (config) => config.plugins?.["react-hooks"],
)?.plugins?.["react-hooks"];
const reactPlugin = nextCoreWebVitals.find(
  (config) => config.plugins?.react,
)?.plugins?.react;

const config = [
  ...withCompatibilityRules(nextCoreWebVitals),
  ...withCompatibilityRules(nextTypescript),
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "coverage/**",
      "src/Utils/supabase.ts",
    ],
  },
  {
    files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
    plugins: {
      ...(typescriptPlugin ? { "@typescript-eslint": typescriptPlugin } : {}),
      ...(reactHooksPlugin ? { "react-hooks": reactHooksPlugin } : {}),
      ...(reactPlugin ? { react: reactPlugin } : {}),
    },
    rules: {
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-require-imports": "warn",
      "prefer-const": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/static-components": "warn",
      "react/no-unescaped-entities": "warn",
    },
  },
];

export default config;
