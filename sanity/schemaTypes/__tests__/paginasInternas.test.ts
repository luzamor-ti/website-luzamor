import { describe, it, expect } from "vitest";

import { paginasInternas } from "@/sanity/schemaTypes/paginasInternas";
import { routesPath } from "@/constants/routesPath";

// ─────────────────────────────────────────
// Tests for the shared internal pages list
// Validates structure and value consistency
// ─────────────────────────────────────────

describe("paginasInternas — estrutura e valores", () => {
  it("exporta um array não vazio", () => {
    expect(Array.isArray(paginasInternas)).toBe(true);
    expect(paginasInternas.length).toBeGreaterThan(0);
  });

  it("cada item possui 'title' e 'value' do tipo string", () => {
    for (const pagina of paginasInternas) {
      expect(typeof pagina.title).toBe("string");
      expect(typeof pagina.value).toBe("string");
      expect(pagina.title.length).toBeGreaterThan(0);
      expect(pagina.value.length).toBeGreaterThan(0);
    }
  });

  it("contém exatamente 11 páginas internas", () => {
    expect(paginasInternas).toHaveLength(11);
  });

  it("todos os values começam com '/'", () => {
    for (const pagina of paginasInternas) {
      expect(pagina.value).toMatch(/^\//);
    }
  });

  it("não há values duplicados", () => {
    const values = paginasInternas.map((p) => p.value);
    const uniques = new Set(values);
    expect(uniques.size).toBe(values.length);
  });
});

describe("paginasInternas — consistência com routesPath", () => {
  const values = paginasInternas.map((p) => p.value);

  it("contém a rota home '/'", () => {
    expect(values).toContain(routesPath.home);
  });

  it("contém a rota sobre-nos", () => {
    expect(values).toContain(routesPath.about);
  });

  it("contém a rota projetos (listagem)", () => {
    expect(values).toContain(routesPath.projects);
  });

  it("contém a rota eventos (calendario-eventos)", () => {
    expect(values).toContain(routesPath.events);
  });

  it("contém a rota cursos", () => {
    expect(values).toContain(routesPath.courses);
  });

  it("contém a rota salas de aula", () => {
    expect(values).toContain(routesPath.classrooms);
  });

  it("contém a rota auditório", () => {
    expect(values).toContain(routesPath.auditorium);
  });

  it("contém a rota contato", () => {
    expect(values).toContain(routesPath.contact);
  });

  it("contém a rota diretoria", () => {
    expect(values).toContain(routesPath.board);
  });

  it("contém a rota palavra do presidente", () => {
    expect(values).toContain(routesPath.presidentWord);
  });

  it("contém a rota patrocinador", () => {
    expect(values).toContain(routesPath.sponsor);
  });

  it("NÃO contém a rota de projeto individual (slug dinâmico)", () => {
    // Apenas a listagem de projetos deve aparecer, não rotas dinâmicas
    const hasProjectSlug = values.some(
      (v) => v.includes(":") || v.includes("["),
    );
    expect(hasProjectSlug).toBe(false);
  });
});
