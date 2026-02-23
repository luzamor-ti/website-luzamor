import { describe, it, expect } from "vitest";
import {
  REGISTERED_SLUGS,
  isRegisteredSlug,
  type RegisteredSlug,
} from "../routeMapper";

describe("routeMapper", () => {
  it("exports a non-empty list of registered slugs", () => {
    expect(REGISTERED_SLUGS.length).toBeGreaterThan(0);
  });

  it("returns true for every slug in REGISTERED_SLUGS", () => {
    for (const slug of REGISTERED_SLUGS) {
      expect(isRegisteredSlug(slug)).toBe(true);
    }
  });

  it("returns false for a slug that is NOT registered", () => {
    expect(isRegisteredSlug("pagina-inexistente")).toBe(false);
    expect(isRegisteredSlug("")).toBe(false);
    expect(isRegisteredSlug("admin")).toBe(false);
  });

  it("narrows the type to RegisteredSlug when true", () => {
    const slug = "sobre";
    if (isRegisteredSlug(slug)) {
      // TypeScript should narrow the type here
      const _typed: RegisteredSlug = slug;
      expect(_typed).toBe("sobre");
    }
  });
});
