import { defineVitestConfig } from "@inabagumi/config/vitest";

export default defineVitestConfig({
  test: {
    env: {
      NEXT_PUBLIC_BASE_URL: "https://774.test",
    },
  },
});
