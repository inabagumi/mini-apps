import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Testing Library cleans up automatically only when `globals` is enabled.
afterEach(() => {
  cleanup();
});
