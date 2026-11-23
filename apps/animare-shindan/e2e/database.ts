// The database for the E2E tests.

/**
 * The name of the database that the E2E tests create on the server of
 * `TEST_DATABASE_URL`. It is dropped and created again on every run, so do not
 * use the name for anything else.
 */
export const E2E_DATABASE_NAME = "animare_shindan_e2e";

/** Returns the URL of the database for the E2E tests. */
export const getE2EDatabaseURL = (): string => {
  const testDatabaseURL = process.env.TEST_DATABASE_URL;

  if (!testDatabaseURL) {
    throw new Error("TEST_DATABASE_URL is required to run the E2E tests.");
  }

  const url = new URL(testDatabaseURL);
  url.pathname = `/${E2E_DATABASE_NAME}`;
  // The tables are created in the default schema of the new database.
  url.searchParams.delete("schema");

  return url.toString();
};
