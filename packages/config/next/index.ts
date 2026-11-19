import type { NextConfig } from "next";

type TurbopackRules = NonNullable<
  NonNullable<NextConfig["turbopack"]>["rules"]
>;

/**
 * Turbopack rules shared by all apps.
 */
export const turbopackRules = {
  "*.css": {
    loaders: ["@tailwindcss/turbopack"],
  },
} satisfies TurbopackRules;

/**
 * Creates a Next.js config with the settings shared by all apps.
 *
 * Nested objects such as `turbopack.rules` are merged with the shared
 * settings, so app-specific rules can be added without losing them.
 */
export const defineNextConfig = (config: NextConfig = {}): NextConfig => ({
  ...config,
  turbopack: {
    ...config.turbopack,
    rules: {
      ...turbopackRules,
      ...config.turbopack?.rules,
    },
  },
});
