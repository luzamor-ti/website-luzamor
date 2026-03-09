import { describe, it, expect, vi } from "vitest";

// Mock sanity to avoid styled-components/React dependency
vi.mock("sanity", () => ({
  defineType: (config: Record<string, unknown>) => config,
  defineField: (config: Record<string, unknown>) => config,
}));

import { evento } from "@/sanity/schemaTypes/evento";

// ─────────────────────────────────────────
// Tests for the Sanity "evento" schema
// Validates the "projeto" reference field
// ─────────────────────────────────────────

describe("Sanity evento schema — projeto reference field", () => {
  const fields = evento.fields;
  const projetoField = fields.find((f) => f.name === "projeto");

  it("has a 'projeto' field defined", () => {
    expect(projetoField).toBeDefined();
  });

  it("projeto field is of type 'reference'", () => {
    expect(projetoField!.type).toBe("reference");
  });

  it("projeto field references the 'projeto' document type", () => {
    const toArray = (projetoField as { to?: { type: string }[] }).to;
    expect(toArray).toBeDefined();
    expect(toArray).toHaveLength(1);
    expect(toArray![0].type).toBe("projeto");
  });

  it("projeto field is in the 'configuracoes' group", () => {
    expect(projetoField!.group).toBe("configuracoes");
  });

  it("projeto field does NOT have required validation (optional)", () => {
    // The field should not have a validation rule that makes it required
    // We verify by checking that the field exists without required validation
    expect(projetoField!.validation).toBeUndefined();
  });

  it("projeto field has a descriptive title in Portuguese", () => {
    expect(projetoField!.title).toBe("Projeto Relacionado");
  });

  it("projeto field has a description in Portuguese", () => {
    expect(projetoField!.description).toContain("opcional");
  });

  it("schema preview includes project title selection", () => {
    const preview = evento.preview as {
      select: Record<string, string>;
    };
    expect(preview.select.projetoTitulo).toBe("projeto.titulo");
  });
});
