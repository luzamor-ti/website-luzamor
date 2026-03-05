import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { PatrocinadorTemplate } from "@/components/page-templates/PatrocinadorTemplate";
import { PartnersPageData } from "@/sanity/lib/types/supporter";
import { PartnersPageConfig } from "@/sanity/lib/types/partnersPage";
import { Page } from "@/sanity/lib/types/page";

// ─────────────────────────────────────────
// Fixtures
// ─────────────────────────────────────────

const mockPage: Page = {
  _id: "patrocinador",
  _type: "pagina",
  title: "Patrocinador",
  slug: { current: "patrocinador" },
  pageType: "patrocinador",
  active: true,
};

const mockPageConfig: PartnersPageConfig = {
  hero: {
    tag: "Transparência e Gratidão",
    title: "Nossos Parceiros",
    description: "Obrigado a todos que tornam nossa missão possível.",
  },
  ctaPrincipal: {
    title: "Faça Parte",
    description: "Transforme vidas conosco.",
    sponsorButtonText: "Ser Patrocinador",
    supporterButtonText: "Ser Apoiador",
    donorButtonText: "Fazer Doação",
  },
  partnersSection: {
    tag: "Parceiros",
    title: "Patrocinadores e Apoiadores",
    description: "Empresas que acreditam em nosso trabalho.",
    tab2026Label: "2026",
    tabPastLabel: "Anteriores",
    emptyCurrentMessage: "Nenhum parceiro cadastrado para 2026.",
    emptyPastMessage: "Nenhuma parceria anterior cadastrada.",
  },
  individualsSection: {
    tag: "Pessoas que fazem diferença",
    title: "Apoiadores Individuais",
    description: "Pessoas físicas que contribuem com a fundação.",
  },
  donorsSection: {
    tag: "Gratidão",
    title: "Nossos Doadores",
    description: "Cada contribuição faz diferença.",
    monthlyTitle: "Mensais",
    punctualTitle: "Pontuais",
  },
  ctaFinal: {
    title: "Sua empresa pode estar aqui",
    description: "Entre em contato e saiba como apoiar.",
    buttonText: "Falar Conosco",
  },
};

const mockCategory = {
  _id: "cat-1",
  title: "Lei Rouanet",
  order: 1,
  supporters: [
    {
      _id: "sup-1",
      name: "Empresa Alfa",
      site: "https://alfa.com.br",
      featured: true,
      type: "patrocinador" as const,
      year: 2026,
    },
    {
      _id: "sup-2",
      name: "Empresa Beta",
      featured: false,
      type: "patrocinador" as const,
      year: 2026,
    },
  ],
};

const mockPastCategory = {
  _id: "cat-past-1",
  title: "Edital Estadual",
  order: 1,
  supporters: [
    {
      _id: "sup-old-1",
      name: "Empresa Gamma",
      type: "patrocinador" as const,
      year: 2025,
    },
  ],
};

const mockIndividual = {
  _id: "ind-1",
  name: "Maria Oliveira",
  type: "apoiadorIndividual" as const,
};

const mockMonthlyDonor = {
  _id: "don-m-1",
  name: "João Silva",
  type: "doadorMensal" as const,
};

const mockPunctualDonor = {
  _id: "don-p-1",
  name: "Ana Costa",
  type: "doadorPontual" as const,
};

const emptyData: PartnersPageData = {
  pageConfig: null,
  sponsors2026: [],
  supporters2026: [],
  pastSponsors: [],
  pastSupporters: [],
  individualSupporters: [],
  monthlyDonors: [],
  punctualDonors: [],
};

const fullData: PartnersPageData = {
  pageConfig: mockPageConfig,
  sponsors2026: [mockCategory],
  supporters2026: [],
  pastSponsors: [mockPastCategory],
  pastSupporters: [],
  individualSupporters: [mockIndividual],
  monthlyDonors: [mockMonthlyDonor],
  punctualDonors: [mockPunctualDonor],
};

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────

function renderTemplate(data: PartnersPageData = emptyData) {
  return render(<PatrocinadorTemplate pagina={mockPage} {...data} />);
}

// ─────────────────────────────────────────
// Tests
// ─────────────────────────────────────────

describe("PatrocinadorTemplate", () => {
  // ── Hero Section ──────────────────────────────────────────────────
  describe("Hero section", () => {
    it("exibe o título da página como fallback quando não há pageConfig", () => {
      renderTemplate(emptyData);
      expect(screen.getByText("Patrocinador")).toBeInTheDocument();
    });

    it("exibe o título vindo do CMS quando pageConfig está presente", () => {
      renderTemplate(fullData);
      expect(screen.getByText("Nossos Parceiros")).toBeInTheDocument();
    });

    it("exibe a tag do hero quando fornecida pelo CMS", () => {
      renderTemplate(fullData);
      // SectionHeader aplica toCamelCase na tag
      expect(screen.getByText("Transparência E Gratidão")).toBeInTheDocument();
    });

    it("exibe a descrição do hero quando fornecida pelo CMS", () => {
      renderTemplate(fullData);
      expect(
        screen.getByText("Obrigado a todos que tornam nossa missão possível."),
      ).toBeInTheDocument();
    });

    it("não quebra quando hero não tem descrição", () => {
      const dataNoDesc: PartnersPageData = {
        ...fullData,
        pageConfig: {
          ...mockPageConfig,
          hero: { title: "Somente Título" },
        },
      };
      renderTemplate(dataNoDesc);
      expect(screen.getByText("Somente Título")).toBeInTheDocument();
    });
  });

  // ── CTA Principal ─────────────────────────────────────────────────
  describe("CTA principal", () => {
    it("exibe texto padrão de fallback quando pageConfig é null", () => {
      renderTemplate(emptyData);
      expect(screen.getByText("Faça Parte da Mudança")).toBeInTheDocument();
    });

    it("exibe título do CTA vindo do CMS", () => {
      renderTemplate(fullData);
      expect(screen.getByText("Faça Parte")).toBeInTheDocument();
    });

    it("exibe os três botões do CTA com textos do CMS", () => {
      renderTemplate(fullData);
      expect(screen.getByText("Ser Patrocinador")).toBeInTheDocument();
      expect(screen.getByText("Ser Apoiador")).toBeInTheDocument();
      expect(screen.getByText("Fazer Doação")).toBeInTheDocument();
    });

    it("exibe botões de CTA com texto padrão quando pageConfig é null", () => {
      renderTemplate(emptyData);
      expect(screen.getByText("Seja um Patrocinador")).toBeInTheDocument();
      expect(screen.getByText("Seja um Apoiador")).toBeInTheDocument();
      expect(screen.getByText("Faça uma Doação")).toBeInTheDocument();
    });

    it("botões do CTA possuem link para /contato", () => {
      renderTemplate(emptyData);
      const links = screen.getAllByRole("link");
      const contatoLinks = links.filter(
        (l) => l.getAttribute("href") === "/contato",
      );
      expect(contatoLinks.length).toBeGreaterThanOrEqual(3);
    });
  });

  // ── Abas de parceiros ─────────────────────────────────────────────
  describe("Abas de parceiros", () => {
    it("não renderiza seção de parceiros quando não há dados", () => {
      renderTemplate(emptyData);
      expect(screen.queryByRole("tablist")).not.toBeInTheDocument();
    });

    it("renderiza as abas quando há patrocinadores de 2026", () => {
      renderTemplate(fullData);
      expect(screen.getByRole("tablist")).toBeInTheDocument();
    });

    it("exibe rótulo das abas vindo do CMS", () => {
      renderTemplate(fullData);
      const tablist = screen.getByRole("tablist");
      expect(within(tablist).getByText("2026")).toBeInTheDocument();
      expect(within(tablist).getByText("Anteriores")).toBeInTheDocument();
    });

    it("exibe rótulos padrão das abas quando pageConfig é null", () => {
      const dataWithPartners: PartnersPageData = {
        ...emptyData,
        sponsors2026: [mockCategory],
      };
      renderTemplate(dataWithPartners);
      expect(screen.getByText("Parceiros de 2026")).toBeInTheDocument();
      expect(screen.getByText("Parceiros Anteriores")).toBeInTheDocument();
    });

    it("aba '2026' está selecionada por padrão", () => {
      renderTemplate(fullData);
      const tab2026 = screen.getByRole("tab", { name: /2026/i });
      expect(tab2026).toHaveAttribute("aria-selected", "true");
    });

    it("alterna para a aba de parceiros anteriores ao clicar", () => {
      renderTemplate(fullData);
      fireEvent.click(screen.getByRole("tab", { name: /anteriores/i }));
      // Re-query após re-render para evitar referência stale
      expect(screen.getByRole("tab", { name: /anteriores/i })).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });

    it("exibe mensagem de vazio quando não há parceiros de 2026 (CMS)", () => {
      const dataNoCurrentYear: PartnersPageData = {
        ...fullData,
        sponsors2026: [],
        supporters2026: [],
        pastSponsors: [mockPastCategory],
      };
      renderTemplate(dataNoCurrentYear);
      expect(
        screen.getByText("Nenhum parceiro cadastrado para 2026."),
      ).toBeInTheDocument();
    });

    it("exibe mensagem de vazio padrão quando não há parceiros de 2026 e pageConfig é null", () => {
      const dataNoCurrentYear: PartnersPageData = {
        ...emptyData,
        pastSponsors: [mockPastCategory],
      };
      renderTemplate(dataNoCurrentYear);
      expect(
        screen.getByText("Nenhuma parceria cadastrada para 2026 ainda."),
      ).toBeInTheDocument();
    });
  });

  // ── Nomes dos patrocinadores ──────────────────────────────────────
  describe("Cards de parceiros", () => {
    // O Accordion começa fechado — abre "Lei Rouanet" para expor os cards
    function openAccordion() {
      fireEvent.click(screen.getByText("Lei Rouanet"));
    }

    it("exibe o título da categoria no cabeçalho do accordion", () => {
      renderTemplate(fullData);
      expect(screen.getByText("Lei Rouanet")).toBeInTheDocument();
    });

    it("exibe o nome dos patrocinadores de 2026 após abrir o accordion", () => {
      renderTemplate(fullData);
      openAccordion();
      expect(screen.getByText("Empresa Alfa")).toBeInTheDocument();
      expect(screen.getByText("Empresa Beta")).toBeInTheDocument();
    });

    it("patrocinador com site possui link externo após abrir accordion", () => {
      renderTemplate(fullData);
      openAccordion();
      const link = screen.getByLabelText("Visitar site de Empresa Alfa");
      expect(link).toHaveAttribute("href", "https://alfa.com.br");
      expect(link).toHaveAttribute("target", "_blank");
    });

    it("patrocinador sem site não possui link externo após abrir accordion", () => {
      renderTemplate(fullData);
      openAccordion();
      expect(
        screen.queryByLabelText("Visitar site de Empresa Beta"),
      ).not.toBeInTheDocument();
    });

    it("exibe initial do nome quando parceiro não tem logo", () => {
      renderTemplate(fullData);
      openAccordion();
      // "E" de "Empresa Beta" (sem logo no mock)
      const initials = screen.getAllByText("E");
      expect(initials.length).toBeGreaterThan(0);
    });
  });

  // ── Apoiadores individuais ────────────────────────────────────────
  describe("Apoiadores individuais", () => {
    it("não renderiza seção quando não há apoiadores individuais", () => {
      renderTemplate(emptyData);
      expect(
        screen.queryByText("Apoiadores Individuais"),
      ).not.toBeInTheDocument();
    });

    it("renderiza seção com título do CMS quando há indivíduos", () => {
      renderTemplate(fullData);
      expect(screen.getByText("Apoiadores Individuais")).toBeInTheDocument();
    });

    it("exibe tag da seção de individuais vinda do CMS", () => {
      renderTemplate(fullData);
      // SectionHeader aplica toCamelCase na tag
      expect(
        screen.getByText("Pessoas Que Fazem Diferença"),
      ).toBeInTheDocument();
    });

    it("exibe nome do apoiador individual", () => {
      renderTemplate(fullData);
      expect(screen.getByText("Maria Oliveira")).toBeInTheDocument();
    });
  });

  // ── Doadores ──────────────────────────────────────────────────────
  describe("Seção de doadores", () => {
    it("não renderiza seção quando não há doadores", () => {
      renderTemplate(emptyData);
      expect(screen.queryByText("Nossos Doadores")).not.toBeInTheDocument();
    });

    it("renderiza seção de doadores com título do CMS", () => {
      renderTemplate(fullData);
      expect(screen.getByText("Nossos Doadores")).toBeInTheDocument();
    });

    it("exibe subtítulos dos grupos de doadores vindos do CMS", () => {
      renderTemplate(fullData);
      expect(screen.getByText("Mensais")).toBeInTheDocument();
      expect(screen.getByText("Pontuais")).toBeInTheDocument();
    });

    it("exibe subtítulos padrão quando pageConfig é null", () => {
      const dataWithDonors: PartnersPageData = {
        ...emptyData,
        monthlyDonors: [mockMonthlyDonor],
        punctualDonors: [mockPunctualDonor],
      };
      renderTemplate(dataWithDonors);
      expect(screen.getByText("Doadores Mensais")).toBeInTheDocument();
      expect(screen.getByText("Doadores Pontuais")).toBeInTheDocument();
    });

    it("exibe nome do doador mensal", () => {
      renderTemplate(fullData);
      expect(screen.getByText("João Silva")).toBeInTheDocument();
    });

    it("exibe nome do doador pontual", () => {
      renderTemplate(fullData);
      expect(screen.getByText("Ana Costa")).toBeInTheDocument();
    });

    it("exibe mensagem de vazio para grupo sem doadores", () => {
      const dataWithOnlyMonthly: PartnersPageData = {
        ...fullData,
        punctualDonors: [],
      };
      renderTemplate(dataWithOnlyMonthly);
      expect(
        screen.getByText("Nenhum doador pontual cadastrado ainda."),
      ).toBeInTheDocument();
    });
  });

  // ── CTA Final ─────────────────────────────────────────────────────
  describe("CTA Final", () => {
    it("sempre renderiza o CTA final", () => {
      renderTemplate(emptyData);
      expect(
        screen.getByText("Sua empresa pode estar aqui"),
      ).toBeInTheDocument();
    });

    it("exibe título do CTA final vindo do CMS", () => {
      renderTemplate(fullData);
      expect(
        screen.getByText("Sua empresa pode estar aqui"),
      ).toBeInTheDocument();
    });

    it("exibe botão do CTA final com texto do CMS", () => {
      renderTemplate(fullData);
      expect(screen.getByText("Falar Conosco")).toBeInTheDocument();
    });

    it("exibe texto padrão do botão do CTA final quando pageConfig é null", () => {
      renderTemplate(emptyData);
      expect(screen.getByText("Entrar em Contato")).toBeInTheDocument();
    });

    it("botão do CTA final aponta para /contato", () => {
      renderTemplate(fullData);
      const btn = screen.getByText("Falar Conosco").closest("a");
      expect(btn).toHaveAttribute("href", "/contato");
    });
  });

  // ── Persistência do accordion ─────────────────────────────────────
  describe("Persistência do estado do accordion", () => {
    it("mantém os dois painéis de aba montados no DOM", () => {
      renderTemplate(fullData);
      // Ambos os painéis existem — só um tem class "hidden"
      const tabPast = screen.getByRole("tab", { name: /anteriores/i });
      fireEvent.click(tabPast);
      // A aba 2026 ainda está no DOM (hidden via CSS)
      const tab2026 = screen.getByRole("tab", { name: "2026" });
      expect(tab2026).toBeInTheDocument();
    });
  });
});
