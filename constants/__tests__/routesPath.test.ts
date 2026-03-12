import { describe, it, expect } from "vitest";

import { routesPath } from "@/constants/routesPath";

// ─────────────────────────────────────────
// Tests for routesPath constants
// Guard against accidental route regressions
// ─────────────────────────────────────────

describe("routesPath — valores das rotas estáticas", () => {
  it("home é '/'", () => {
    expect(routesPath.home).toBe("/");
  });

  it("about é '/sobre-nos'", () => {
    expect(routesPath.about).toBe("/sobre-nos");
  });

  it("projects é '/projetos' (listagem, sem slug)", () => {
    // Não deve ser '/projeto' (singular) — essa rota é para um único projeto
    expect(routesPath.projects).toBe("/projetos");
    expect(routesPath.projects).not.toBe("/projeto");
  });

  it("contact é '/contato'", () => {
    expect(routesPath.contact).toBe("/contato");
  });

  it("courses é '/cursos'", () => {
    expect(routesPath.courses).toBe("/cursos");
  });

  it("events é '/calendario-eventos' (não '/eventos')", () => {
    // Regressão: a rota antiga '/eventos' foi removida — sempre usar '/calendario-eventos'
    expect(routesPath.events).toBe("/calendario-eventos");
    expect(routesPath.events).not.toBe("/eventos");
  });

  it("classrooms é '/salas-aula'", () => {
    expect(routesPath.classrooms).toBe("/salas-aula");
  });

  it("auditorium é '/auditorio'", () => {
    expect(routesPath.auditorium).toBe("/auditorio");
  });

  it("board é '/diretoria'", () => {
    expect(routesPath.board).toBe("/diretoria");
  });

  it("presidentWord é '/palavra-presidente'", () => {
    expect(routesPath.presidentWord).toBe("/palavra-presidente");
  });

  it("sponsor é '/patrocinador'", () => {
    expect(routesPath.sponsor).toBe("/patrocinador");
  });
});

describe("routesPath.project — rotas dinâmicas de projeto", () => {
  it("gera rota '/projeto/:slug' com slug informado", () => {
    expect(routesPath.project("meu-projeto")).toBe("/projeto/meu-projeto");
  });

  it("rota individual usa singular '/projeto' (não '/projetos')", () => {
    // Regressão: bug antigo usava '/projetos/slug' causando 404
    const url = routesPath.project("teste");
    expect(url).toMatch(/^\/projeto\//);
    expect(url).not.toMatch(/^\/projetos\//);
  });

  it("aceita slug com hífens e números", () => {
    expect(routesPath.project("projeto-2024-especial")).toBe(
      "/projeto/projeto-2024-especial",
    );
  });

  it("aceita slug vazio (edge case)", () => {
    expect(routesPath.project("")).toBe("/projeto/");
  });
});
