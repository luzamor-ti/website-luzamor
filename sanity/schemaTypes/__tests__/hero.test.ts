import { describe, it, expect, vi } from "vitest";

// Mock sanity to avoid styled-components/React dependency
vi.mock("sanity", () => ({
  defineType: (config: Record<string, unknown>) => config,
  defineField: (config: Record<string, unknown>) => config,
}));

import hero from "@/sanity/schemaTypes/hero";
import { paginasInternas } from "@/sanity/schemaTypes/paginasInternas";

// ─────────────────────────────────────────
// Tests for hero.ts Sanity schema
// Validates CTA URL fields use paginasInternas dropdown
// ─────────────────────────────────────────

type FieldDef = {
  name: string;
  type?: string;
  fields?: FieldDef[];
  options?: { list: { value: string }[]; layout?: string };
  validation?: unknown;
};

function getField(name: string): FieldDef {
  const field = (hero.fields as FieldDef[]).find((f) => f.name === name);
  if (!field) throw new Error(`Field '${name}' not found in hero schema`);
  return field;
}

function getNestedField(parentName: string, childName: string): FieldDef {
  const parent = getField(parentName);
  const child = (parent.fields ?? []).find((f) => f.name === childName);
  if (!child)
    throw new Error(`Nested field '${childName}' not found in '${parentName}'`);
  return child;
}

describe("hero schema — estrutura básica", () => {
  it("tem name 'hero' e type 'document'", () => {
    expect(hero.name).toBe("hero");
    expect(hero.type).toBe("document");
  });

  it("possui campos obrigatórios: titulo, tagline, subtitulo, imagem, ctaPrimario, ctaSecundario, ativo", () => {
    const fieldNames = (hero.fields as FieldDef[]).map((f) => f.name);
    expect(fieldNames).toContain("titulo");
    expect(fieldNames).toContain("tagline");
    expect(fieldNames).toContain("subtitulo");
    expect(fieldNames).toContain("imagem");
    expect(fieldNames).toContain("ctaPrimario");
    expect(fieldNames).toContain("ctaSecundario");
    expect(fieldNames).toContain("ativo");
  });
});

describe("hero schema — ctaPrimario.url (dropdown de páginas)", () => {
  it("ctaPrimario é um campo do tipo 'object'", () => {
    const cta = getField("ctaPrimario");
    expect(cta.type).toBe("object");
  });

  it("ctaPrimario.url tem type 'string'", () => {
    const urlField = getNestedField("ctaPrimario", "url");
    expect(urlField.type).toBe("string");
  });

  it("ctaPrimario.url usa layout dropdown", () => {
    const urlField = getNestedField("ctaPrimario", "url");
    expect(urlField.options?.layout).toBe("dropdown");
  });

  it("ctaPrimario.url contém todas as páginas internas como opções", () => {
    const urlField = getNestedField("ctaPrimario", "url");
    const listValues = urlField.options?.list.map((item) => item.value) ?? [];
    for (const pagina of paginasInternas) {
      expect(listValues).toContain(pagina.value);
    }
  });

  it("ctaPrimario.url inclui rota home '/'", () => {
    const urlField = getNestedField("ctaPrimario", "url");
    const listValues = urlField.options?.list.map((item) => item.value) ?? [];
    expect(listValues).toContain("/");
  });
});

describe("hero schema — ctaSecundario.url (dropdown de páginas)", () => {
  it("ctaSecundario é um campo do tipo 'object'", () => {
    const cta = getField("ctaSecundario");
    expect(cta.type).toBe("object");
  });

  it("ctaSecundario.url tem type 'string'", () => {
    const urlField = getNestedField("ctaSecundario", "url");
    expect(urlField.type).toBe("string");
  });

  it("ctaSecundario.url usa layout dropdown", () => {
    const urlField = getNestedField("ctaSecundario", "url");
    expect(urlField.options?.layout).toBe("dropdown");
  });

  it("ctaSecundario.url contém todas as páginas internas como opções", () => {
    const urlField = getNestedField("ctaSecundario", "url");
    const listValues = urlField.options?.list.map((item) => item.value) ?? [];
    for (const pagina of paginasInternas) {
      expect(listValues).toContain(pagina.value);
    }
  });

  it("ctaPrimario e ctaSecundario usam as MESMAS opções de páginas", () => {
    const primaryUrl = getNestedField("ctaPrimario", "url");
    const secondaryUrl = getNestedField("ctaSecundario", "url");
    const primaryValues =
      primaryUrl.options?.list.map((i) => i.value).sort() ?? [];
    const secondaryValues =
      secondaryUrl.options?.list.map((i) => i.value).sort() ?? [];
    expect(primaryValues).toEqual(secondaryValues);
  });
});
