import { describe, it, expect, vi } from "vitest";

// Mock sanity to avoid styled-components/React dependency
vi.mock("sanity", () => ({
  defineType: (config: Record<string, unknown>) => config,
  defineField: (config: Record<string, unknown>) => config,
}));

// Mock lucide-react icons used in the schema preview
vi.mock("lucide-react", () => ({
  Users: "Users",
  DollarSign: "DollarSign",
  Clock: "Clock",
  Heart: "Heart",
  Handshake: "Handshake",
  GraduationCap: "GraduationCap",
  Target: "Target",
  TrendingUp: "TrendingUp",
  Award: "Award",
  MessageCircle: "MessageCircle",
  Mail: "Mail",
  Phone: "Phone",
  MapPin: "MapPin",
  Calendar: "Calendar",
  CheckCircle: "CheckCircle",
  Star: "Star",
  Sparkles: "Sparkles",
  Zap: "Zap",
}));

import secaoHome from "@/sanity/schemaTypes/secaoHome";

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────

type FieldDef = {
  name: string;
  hidden?: (ctx: { parent?: Record<string, unknown> }) => boolean;
  of?: Array<{ fields?: CardFieldDef[] }>;
};

type CardFieldDef = {
  name: string;
  hidden?: (ctx: { document?: Record<string, unknown> }) => boolean;
};

function getField(name: string): FieldDef {
  const field = (secaoHome.fields as FieldDef[]).find((f) => f.name === name);
  if (!field) throw new Error(`Field '${name}' not found in secaoHome`);
  return field;
}

function getCardField(name: string): CardFieldDef {
  const cardsField = getField("cards");
  const cardDef = (cardsField.of as Array<{ fields?: CardFieldDef[] }>)[0];
  const field = (cardDef.fields ?? []).find((f) => f.name === name);
  if (!field) throw new Error(`Card field '${name}' not found`);
  return field;
}

/** Retorna true se o campo está oculto para o tipo de seção informado. */
function isHidden(fieldName: string, sectionNome: string): boolean {
  const field = getField(fieldName);
  if (!field.hidden) return false;
  return field.hidden({ parent: { nome: sectionNome } });
}

/** Retorna true se o campo dentro do card está oculto para o tipo de seção. */
function isCardHidden(fieldName: string, sectionNome: string): boolean {
  const field = getCardField(fieldName);
  if (!field.hidden) return false;
  return field.hidden({ document: { nome: sectionNome } });
}

const ALL_SECTIONS = [
  "intro",
  "projects",
  "members",
  "supporters",
  "faq",
  "contact",
  "impact",
  "initiatives",
  "howToHelp",
] as const;

// ─────────────────────────────────────────
// Estrutura básica do schema
// ─────────────────────────────────────────

describe("secaoHome — estrutura do schema", () => {
  it("tem name 'secaoHome' e type 'document'", () => {
    expect(secaoHome.name).toBe("secaoHome");
    expect(secaoHome.type).toBe("document");
  });

  it("possui os 9 tipos de seção no seletor 'nome'", () => {
    const nomeField = getField("nome");
    const sectionValues = (
      nomeField as unknown as { options: { list: { value: string }[] } }
    ).options.list.map((item) => item.value);

    expect(sectionValues).toContain("intro");
    expect(sectionValues).toContain("projects");
    expect(sectionValues).toContain("members");
    expect(sectionValues).toContain("supporters");
    expect(sectionValues).toContain("faq");
    expect(sectionValues).toContain("contact");
    expect(sectionValues).toContain("impact");
    expect(sectionValues).toContain("initiatives");
    expect(sectionValues).toContain("howToHelp");
    expect(sectionValues).toHaveLength(9);
  });

  it("campo 'nome' usa layout dropdown", () => {
    const nomeField = getField("nome") as unknown as {
      options: { layout: string };
    };
    expect(nomeField.options.layout).toBe("dropdown");
  });

  it("campo 'urlBotao' usa layout dropdown com paginasInternas", () => {
    const field = getField("urlBotao") as unknown as {
      options: { layout: string; list: { value: string }[] };
    };
    expect(field.options.layout).toBe("dropdown");
    expect(field.options.list.length).toBeGreaterThan(0);
    expect(field.options.list.some((item) => item.value === "/")).toBe(true);
  });

  it("campo 'urlLink' usa layout dropdown com paginasInternas", () => {
    const field = getField("urlLink") as unknown as {
      options: { layout: string; list: { value: string }[] };
    };
    expect(field.options.layout).toBe("dropdown");
    expect(field.options.list.length).toBeGreaterThan(0);
  });
});

// ─────────────────────────────────────────
// Campo: titulo
// Oculto apenas para 'supporters'
// ─────────────────────────────────────────

describe("secaoHome — campo 'titulo'", () => {
  it("visível para 'intro'", () => {
    expect(isHidden("titulo", "intro")).toBe(false);
  });

  it("visível para 'projects'", () => {
    expect(isHidden("titulo", "projects")).toBe(false);
  });

  it("visível para 'contact'", () => {
    expect(isHidden("titulo", "contact")).toBe(false);
  });

  it("visível para 'faq'", () => {
    expect(isHidden("titulo", "faq")).toBe(false);
  });

  it("OCULTO para 'supporters'", () => {
    expect(isHidden("titulo", "supporters")).toBe(true);
  });
});

// ─────────────────────────────────────────
// Campo: descricao
// Oculto apenas para 'contact'
// ─────────────────────────────────────────

describe("secaoHome — campo 'descricao'", () => {
  it("visível para 'intro'", () => {
    expect(isHidden("descricao", "intro")).toBe(false);
  });

  it("visível para 'projects'", () => {
    expect(isHidden("descricao", "projects")).toBe(false);
  });

  it("visível para 'supporters'", () => {
    expect(isHidden("descricao", "supporters")).toBe(false);
  });

  it("visível para 'impact'", () => {
    expect(isHidden("descricao", "impact")).toBe(false);
  });

  it("OCULTO para 'contact'", () => {
    expect(isHidden("descricao", "contact")).toBe(true);
  });
});

// ─────────────────────────────────────────
// Campo: imagem
// Visível SOMENTE para 'intro'
// ─────────────────────────────────────────

describe("secaoHome — campo 'imagem'", () => {
  it("visível para 'intro'", () => {
    expect(isHidden("imagem", "intro")).toBe(false);
  });

  const sectionsWithoutImagem = ALL_SECTIONS.filter((s) => s !== "intro");
  for (const section of sectionsWithoutImagem) {
    it(`OCULTO para '${section}'`, () => {
      expect(isHidden("imagem", section)).toBe(true);
    });
  }
});

// ─────────────────────────────────────────
// Campo: textoBotao
// Visível para: intro, initiatives, howToHelp
// ─────────────────────────────────────────

describe("secaoHome — campo 'textoBotao'", () => {
  const withButton = ["intro", "initiatives", "howToHelp"] as const;
  const withoutButton = ALL_SECTIONS.filter(
    (s) => !withButton.includes(s as (typeof withButton)[number]),
  );

  for (const section of withButton) {
    it(`visível para '${section}'`, () => {
      expect(isHidden("textoBotao", section)).toBe(false);
    });
  }

  for (const section of withoutButton) {
    it(`OCULTO para '${section}'`, () => {
      expect(isHidden("textoBotao", section)).toBe(true);
    });
  }
});

// ─────────────────────────────────────────
// Campo: urlBotao
// Visível SOMENTE para 'intro' E quando textoBotao está preenchido
// ─────────────────────────────────────────

describe("secaoHome — campo 'urlBotao'", () => {
  it("visível para 'intro' com textoBotao preenchido", () => {
    const field = getField("urlBotao");
    const result = field.hidden!({
      parent: { nome: "intro", textoBotao: "Conheça" },
    });
    expect(result).toBe(false);
  });

  it("OCULTO para 'intro' sem textoBotao", () => {
    const field = getField("urlBotao");
    const result = field.hidden!({ parent: { nome: "intro", textoBotao: "" } });
    expect(result).toBe(true);
  });

  it("OCULTO para 'intro' quando textoBotao é undefined", () => {
    const field = getField("urlBotao");
    const result = field.hidden!({ parent: { nome: "intro" } });
    expect(result).toBe(true);
  });

  const otherSections = ALL_SECTIONS.filter((s) => s !== "intro");
  for (const section of otherSections) {
    it(`OCULTO para '${section}' mesmo com textoBotao preenchido`, () => {
      const field = getField("urlBotao");
      const result = field.hidden!({
        parent: { nome: section, textoBotao: "Texto" },
      });
      expect(result).toBe(true);
    });
  }
});

// ─────────────────────────────────────────
// Campo: textoLink
// Visível para: projects, supporters, initiatives, howToHelp
// ─────────────────────────────────────────

describe("secaoHome — campo 'textoLink'", () => {
  const withLink = [
    "projects",
    "supporters",
    "initiatives",
    "howToHelp",
  ] as const;
  const withoutLink = ALL_SECTIONS.filter(
    (s) => !withLink.includes(s as (typeof withLink)[number]),
  );

  for (const section of withLink) {
    it(`visível para '${section}'`, () => {
      expect(isHidden("textoLink", section)).toBe(false);
    });
  }

  for (const section of withoutLink) {
    it(`OCULTO para '${section}'`, () => {
      expect(isHidden("textoLink", section)).toBe(true);
    });
  }
});

// ─────────────────────────────────────────
// Campo: urlLink
// Visível para: projects, supporters, initiatives, howToHelp E quando textoLink preenchido
// ─────────────────────────────────────────

describe("secaoHome — campo 'urlLink'", () => {
  const withLink = [
    "projects",
    "supporters",
    "initiatives",
    "howToHelp",
  ] as const;

  for (const section of withLink) {
    it(`visível para '${section}' com textoLink preenchido`, () => {
      const field = getField("urlLink");
      const result = field.hidden!({
        parent: { nome: section, textoLink: "Ver todos" },
      });
      expect(result).toBe(false);
    });

    it(`OCULTO para '${section}' sem textoLink`, () => {
      const field = getField("urlLink");
      const result = field.hidden!({
        parent: { nome: section, textoLink: "" },
      });
      expect(result).toBe(true);
    });
  }

  const withoutLink = ALL_SECTIONS.filter(
    (s) => !withLink.includes(s as (typeof withLink)[number]),
  );
  for (const section of withoutLink) {
    it(`OCULTO para '${section}'`, () => {
      const field = getField("urlLink");
      const result = field.hidden!({
        parent: { nome: section, textoLink: "Texto" },
      });
      expect(result).toBe(true);
    });
  }
});

// ─────────────────────────────────────────
// Campo: cards (array)
// Visível para: impact, initiatives, howToHelp
// ─────────────────────────────────────────

describe("secaoHome — campo 'cards'", () => {
  const withCards = ["impact", "initiatives", "howToHelp"] as const;
  const withoutCards = ALL_SECTIONS.filter(
    (s) => !withCards.includes(s as (typeof withCards)[number]),
  );

  for (const section of withCards) {
    it(`visível para '${section}'`, () => {
      expect(isHidden("cards", section)).toBe(false);
    });
  }

  for (const section of withoutCards) {
    it(`OCULTO para '${section}'`, () => {
      expect(isHidden("cards", section)).toBe(true);
    });
  }
});

// ─────────────────────────────────────────
// Campo: labels
// Visível SOMENTE para 'contact'
// ─────────────────────────────────────────

describe("secaoHome — campo 'labels'", () => {
  it("visível para 'contact'", () => {
    expect(isHidden("labels", "contact")).toBe(false);
  });

  const sectionsWithoutLabels = ALL_SECTIONS.filter((s) => s !== "contact");
  for (const section of sectionsWithoutLabels) {
    it(`OCULTO para '${section}'`, () => {
      expect(isHidden("labels", section)).toBe(true);
    });
  }
});

// ─────────────────────────────────────────
// Sub-campo cards.descricao
// Visível para: impact, howToHelp
// ─────────────────────────────────────────

describe("secaoHome — card.descricao", () => {
  const withDescricao = ["impact", "howToHelp"] as const;
  const withoutDescricao = ALL_SECTIONS.filter(
    (s) => !withDescricao.includes(s as (typeof withDescricao)[number]),
  );

  for (const section of withDescricao) {
    it(`visível para seção '${section}'`, () => {
      expect(isCardHidden("descricao", section)).toBe(false);
    });
  }

  for (const section of withoutDescricao) {
    it(`OCULTO para seção '${section}'`, () => {
      expect(isCardHidden("descricao", section)).toBe(true);
    });
  }
});

// ─────────────────────────────────────────
// Sub-campo cards.icone
// Visível SOMENTE para: howToHelp
// ─────────────────────────────────────────

describe("secaoHome — card.icone", () => {
  it("visível para seção 'howToHelp'", () => {
    expect(isCardHidden("icone", "howToHelp")).toBe(false);
  });

  const sectionsWithoutIcone = ALL_SECTIONS.filter((s) => s !== "howToHelp");
  for (const section of sectionsWithoutIcone) {
    it(`OCULTO para seção '${section}'`, () => {
      expect(isCardHidden("icone", section)).toBe(true);
    });
  }
});

// ─────────────────────────────────────────
// Sub-campo cards.url
// Visível para: initiatives, howToHelp
// ─────────────────────────────────────────

describe("secaoHome — card.url", () => {
  const withUrl = ["initiatives", "howToHelp"] as const;
  const withoutUrl = ALL_SECTIONS.filter(
    (s) => !withUrl.includes(s as (typeof withUrl)[number]),
  );

  for (const section of withUrl) {
    it(`visível para seção '${section}'`, () => {
      expect(isCardHidden("url", section)).toBe(false);
    });
  }

  for (const section of withoutUrl) {
    it(`OCULTO para seção '${section}'`, () => {
      expect(isCardHidden("url", section)).toBe(true);
    });
  }
});

// ─────────────────────────────────────────
// Sub-campo cards.subtitulo
// Visível SOMENTE para: initiatives
// ─────────────────────────────────────────

describe("secaoHome — card.subtitulo", () => {
  it("visível para seção 'initiatives'", () => {
    expect(isCardHidden("subtitulo", "initiatives")).toBe(false);
  });

  const sectionsWithoutSubtitulo = ALL_SECTIONS.filter(
    (s) => s !== "initiatives",
  );
  for (const section of sectionsWithoutSubtitulo) {
    it(`OCULTO para seção '${section}'`, () => {
      expect(isCardHidden("subtitulo", section)).toBe(true);
    });
  }
});

// ─────────────────────────────────────────
// Sub-campo cards.numero
// Visível SOMENTE para: impact
// ─────────────────────────────────────────

describe("secaoHome — card.numero", () => {
  it("visível para seção 'impact'", () => {
    expect(isCardHidden("numero", "impact")).toBe(false);
  });

  const sectionsWithoutNumero = ALL_SECTIONS.filter((s) => s !== "impact");
  for (const section of sectionsWithoutNumero) {
    it(`OCULTO para seção '${section}'`, () => {
      expect(isCardHidden("numero", section)).toBe(true);
    });
  }
});

// ─────────────────────────────────────────
// Preview da seção: prepare()
// ─────────────────────────────────────────

type SectionPreview = {
  select: Record<string, string>;
  prepare: (args: { title?: string; subtitle?: string; active?: boolean }) => {
    title: string;
    subtitle: string;
  };
};

function getSectionPrepare() {
  return (secaoHome.preview as unknown as SectionPreview).prepare;
}

describe("secaoHome — preview.prepare()", () => {
  it("retorna título correto quando titulo está preenchido", () => {
    const result = getSectionPrepare()({
      title: "Meu Título",
      subtitle: "intro",
      active: true,
    });
    expect(result.title).toBe("Meu Título");
  });

  it("retorna '⚠️ Sem título' quando titulo está ausente", () => {
    const result = getSectionPrepare()({ subtitle: "projects", active: true });
    expect(result.title).toBe("⚠️ Sem título");
  });

  it("retorna subtítulo com emoji para 'intro'", () => {
    const result = getSectionPrepare()({ subtitle: "intro", active: true });
    expect(result.subtitle).toContain("📝 Introdução");
  });

  it("retorna subtítulo com emoji para 'projects'", () => {
    const result = getSectionPrepare()({ subtitle: "projects", active: true });
    expect(result.subtitle).toContain("🎯 Projetos");
  });

  it("retorna subtítulo com emoji para 'members'", () => {
    const result = getSectionPrepare()({ subtitle: "members", active: true });
    expect(result.subtitle).toContain("👥 Membros");
  });

  it("retorna subtítulo com emoji para 'supporters'", () => {
    const result = getSectionPrepare()({
      subtitle: "supporters",
      active: true,
    });
    expect(result.subtitle).toContain("🤝 Apoiadores");
  });

  it("retorna subtítulo com emoji para 'faq'", () => {
    const result = getSectionPrepare()({ subtitle: "faq", active: true });
    expect(result.subtitle).toContain("❓ FAQ");
  });

  it("retorna subtítulo com emoji para 'contact'", () => {
    const result = getSectionPrepare()({ subtitle: "contact", active: true });
    expect(result.subtitle).toContain("📧 Contato");
  });

  it("retorna subtítulo com emoji para 'impact'", () => {
    const result = getSectionPrepare()({ subtitle: "impact", active: true });
    expect(result.subtitle).toContain("📊 Impacto");
  });

  it("retorna subtítulo com emoji para 'initiatives'", () => {
    const result = getSectionPrepare()({
      subtitle: "initiatives",
      active: true,
    });
    expect(result.subtitle).toContain("🌟 Iniciativas");
  });

  it("retorna subtítulo com emoji para 'howToHelp'", () => {
    const result = getSectionPrepare()({ subtitle: "howToHelp", active: true });
    expect(result.subtitle).toContain("🙋 Como Ajudar");
  });

  it("usa o valor raw quando subtitle não é um tipo conhecido", () => {
    const result = getSectionPrepare()({
      subtitle: "desconhecido",
      active: true,
    });
    expect(result.subtitle).toContain("desconhecido");
  });

  it("adiciona '⚫ Inativa' quando active é false", () => {
    const result = getSectionPrepare()({ subtitle: "intro", active: false });
    expect(result.subtitle).toContain("⚫ Inativa");
  });

  it("NÃO adiciona '⚫ Inativa' quando active é true", () => {
    const result = getSectionPrepare()({ subtitle: "intro", active: true });
    expect(result.subtitle).not.toContain("⚫ Inativa");
  });
});

// ─────────────────────────────────────────
// Preview do card: prepare()
// ─────────────────────────────────────────

type CardPreview = {
  prepare: (args: {
    title?: string;
    subtitle?: string;
    media?: object;
    icon?: string;
  }) => {
    title: string;
    subtitle: string;
    media: unknown;
  };
};

function getCardPrepare() {
  const cardsField = getField("cards");
  const cardDef = (cardsField.of as Array<{ preview?: CardPreview }>)[0];
  if (!cardDef.preview) throw new Error("Card preview not found");
  return cardDef.preview.prepare;
}

describe("secaoHome — card preview prepare()", () => {
  it("retorna 'Card sem título' quando titulo está ausente", () => {
    const result = getCardPrepare()({});
    expect(result.title).toBe("Card sem título");
  });

  it("retorna o título quando está preenchido", () => {
    const result = getCardPrepare()({ title: "Faça uma doação" });
    expect(result.title).toBe("Faça uma doação");
  });

  it("retorna 'Sem descrição' quando subtitle está ausente", () => {
    const result = getCardPrepare()({});
    expect(result.subtitle).toBe("Sem descrição");
  });

  it("trunca subtitle com '...' quando está preenchido", () => {
    const result = getCardPrepare()({ subtitle: "Texto curto" });
    expect(result.subtitle).toBe("Texto curto...");
  });

  it("trunca subtitle em 60 caracteres + '...'", () => {
    const longText = "a".repeat(80);
    const result = getCardPrepare()({ subtitle: longText });
    expect(result.subtitle).toBe("a".repeat(60) + "...");
  });

  it("usa o ícone quando icone é um valor válido do mapa", () => {
    const result = getCardPrepare()({ icon: "Users" });
    // lucide-react foi mockado como string "Users"
    expect(result.media).toBe("Users");
  });

  it("retorna undefined para media quando icone não está no mapa e não há imagem", () => {
    const result = getCardPrepare()({ icon: "IconeInexistente" });
    expect(result.media).toBeUndefined();
  });

  it("usa media (imagem) quando icone não está definido", () => {
    const fakeImage = { _type: "image", asset: { _ref: "abc" } };
    const result = getCardPrepare()({ media: fakeImage });
    expect(result.media).toBe(fakeImage);
  });

  it("usa media (imagem) em vez do ícone quando ambos estão presentes", () => {
    const fakeImage = { _type: "image", asset: { _ref: "abc" } };
    const result = getCardPrepare()({ media: fakeImage, icon: "Users" });
    expect(result.media).toBe(fakeImage);
  });
});
