import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

describe("Sanity schemas", () => {
  it("sobreNos schema contains descricao field (Portable Text)", () => {
    const schemaPath = resolve(__dirname, "..", "schemaTypes", "sobreNos.ts");
    const content = readFileSync(schemaPath, "utf8");
    // Expect the schema file to contain the field name 'descricao' and 'type: "array"' for Portable Text
    expect(content.includes("descricao")).toBe(true);
    expect(
      content.includes("type: 'array'") || content.includes('type: "array"'),
    ).toBe(true);
  });
});
