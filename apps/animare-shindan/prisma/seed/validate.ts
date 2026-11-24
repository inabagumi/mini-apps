import { findContentProblems, findDuplicates } from "../../lib/content.ts";
import type { SeedData } from "./seed.ts";

/**
 * Returns the problems of the seed data that would make the seed fail, break
 * the diagnosis, or overwrite one item with another: the problems of the
 * content (see `findContentProblems`) and duplicate slugs of the releases.
 */
export const findSeedDataProblems = (data: SeedData): string[] => [
  ...findContentProblems(data),
  ...findDuplicates(data.releases.map((release) => release.slug)).map(
    (slug) => `Duplicate release slug: ${slug}`
  ),
];

/**
 * Throws an error that lists all the problems of the seed data, if any.
 */
export const validateSeedData = (data: SeedData): void => {
  const problems = findSeedDataProblems(data);

  if (problems.length > 0) {
    throw new Error(
      ["The seed data is inconsistent:", ...problems].join("\n- ")
    );
  }
};
