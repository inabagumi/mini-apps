import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { cn } from "./cn";

/**
 * A class from the default theme for each namespace of the theme variables.
 * A custom class in the same namespace must replace it when merged.
 */
const defaultClasses: Record<string, (name: string) => [string, string]> = {
  animate: (name) => ["animate-spin", `animate-${name}`],
  color: (name) => ["bg-white", `bg-${name}`],
};

const readThemeVariables = async (): Promise<[string, string][]> => {
  const css = await readFile(
    path.join(import.meta.dirname, "../app/globals.css"),
    "utf-8"
  );
  const theme =
    /^@theme\s*\{$(?<body>[\s\S]*?)^\}$/mu.exec(css)?.groups?.body ?? "";

  return [
    ...theme.matchAll(/^\s*--(?<namespace>[a-z]+)-(?<name>[\w-]+)\s*:/gmu),
  ].map(({ groups }) => [groups?.namespace ?? "", groups?.name ?? ""]);
};

describe(cn, () => {
  it("finds theme variables in app/globals.css", async () => {
    await expect(readThemeVariables()).resolves.not.toHaveLength(0);
  });

  it("knows every theme variable in app/globals.css", async () => {
    for (const [namespace, name] of await readThemeVariables()) {
      const createClasses = defaultClasses[namespace];

      expect(
        createClasses,
        `--${namespace}-${name}: add a test case for the namespace`
      ).toBeDefined();

      const [defaultClass, customClass] = createClasses(name);

      expect(cn(defaultClass, customClass), `--${namespace}-${name}`).toBe(
        customClass
      );
    }
  });

  it("does not merge custom classes with other groups", () => {
    expect(cn("animate-dash", "opacity-75")).toBe("animate-dash opacity-75");
    expect(cn("text-sm", "text-highlight")).toBe("text-sm text-highlight");
  });
});
