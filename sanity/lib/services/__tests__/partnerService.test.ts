import { describe, it, expect, vi, beforeEach } from "vitest";
import { getPartnersPageData } from "@/sanity/lib/services/partnerService";
import {
  PARTNERS_PAGE_CONFIG_QUERY,
  PARTNER_CATEGORIES_QUERY,
  PAST_PARTNER_CATEGORIES_QUERY,
  INDIVIDUAL_PARTNERS_QUERY,
} from "@/sanity/lib/queries/partner";

// ─────────────────────────────────────────
// Mocks
// ─────────────────────────────────────────

vi.mock("@/sanity/lib/live", () => ({
  sanityFetch: vi.fn(),
}));

import { sanityFetch } from "@/sanity/lib/live";

const CURRENT_YEAR = new Date().getFullYear();

// ─────────────────────────────────────────
// Fixtures
// ─────────────────────────────────────────

const mockPageConfig = {
  hero: { title: "Nossos Parceiros" },
  ctaPrincipal: { title: "Faça Parte" },
};

const mockCategories = [
  { _id: "cat-1", title: "Lei Rouanet", order: 1, supporters: [] },
];

const mockIndividuals = [{ _id: "ind-1", name: "Maria" }];

// ─────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────

function mockFetchSequence(responses: unknown[]) {
  let callIndex = 0;
  vi.mocked(sanityFetch).mockImplementation(async () => {
    const data = responses[callIndex % responses.length];
    callIndex++;
    return { data };
  });
}

async function callWithNullData() {
  vi.mocked(sanityFetch).mockResolvedValue({ data: null });
  return getPartnersPageData();
}

// ─────────────────────────────────────────
// Tests
// ─────────────────────────────────────────

describe("partnerService — getPartnersPageData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retorna todos os campos com dados quando sanityFetch responde", async () => {
    mockFetchSequence([
      mockPageConfig,
      mockCategories, // currentSponsors
      mockCategories, // currentSupporters
      mockCategories, // pastSponsors
      mockCategories, // pastSupporters
      mockIndividuals, // individualSupporters
      mockIndividuals, // monthlyDonors
      mockIndividuals, // punctualDonors
    ]);

    const result = await getPartnersPageData();

    expect(result.pageConfig).toEqual(mockPageConfig);
    expect(result.currentSponsors).toEqual(mockCategories);
    expect(result.currentSupporters).toEqual(mockCategories);
    expect(result.pastSponsors).toEqual(mockCategories);
    expect(result.pastSupporters).toEqual(mockCategories);
    expect(result.individualSupporters).toEqual(mockIndividuals);
    expect(result.monthlyDonors).toEqual(mockIndividuals);
    expect(result.punctualDonors).toEqual(mockIndividuals);
  });

  it("retorna pageConfig null quando sanityFetch lança erro na config", async () => {
    vi.mocked(sanityFetch).mockRejectedValueOnce(new Error("Network error"));
    // demais chamadas retornam vazio
    vi.mocked(sanityFetch).mockResolvedValue({ data: [] });

    const result = await getPartnersPageData();

    expect(result.pageConfig).toBeNull();
    expect(result.currentSponsors).toEqual([]);
  });

  it("retorna arrays vazios quando sanityFetch lança erro nas categorias", async () => {
    vi.mocked(sanityFetch)
      .mockResolvedValueOnce({ data: mockPageConfig }) // pageConfig ok
      .mockRejectedValue(new Error("Network error")); // demais falham

    const result = await getPartnersPageData();

    expect(result.pageConfig).toEqual(mockPageConfig);
    expect(result.currentSponsors).toEqual([]);
    expect(result.currentSupporters).toEqual([]);
    expect(result.pastSponsors).toEqual([]);
    expect(result.pastSupporters).toEqual([]);
    expect(result.individualSupporters).toEqual([]);
    expect(result.monthlyDonors).toEqual([]);
    expect(result.punctualDonors).toEqual([]);
  });

  it("chama sanityFetch exatamente 8 vezes (um por fonte de dados)", async () => {
    await callWithNullData();

    expect(sanityFetch).toHaveBeenCalledTimes(8);
  });

  it("busca a configuração de página com a query correta", async () => {
    await callWithNullData();

    expect(sanityFetch).toHaveBeenCalledWith(
      expect.objectContaining({ query: PARTNERS_PAGE_CONFIG_QUERY }),
    );
  });

  it("busca patrocinadores de 2026 com tipo e ano corretos", async () => {
    await callWithNullData();

    expect(sanityFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        query: PARTNER_CATEGORIES_QUERY,
        params: { tipo: "patrocinador", ano: CURRENT_YEAR },
      }),
    );
  });

  it("busca apoiadores de 2026 com tipo e ano corretos", async () => {
    await callWithNullData();

    expect(sanityFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        query: PARTNER_CATEGORIES_QUERY,
        params: { tipo: "apoiador", ano: CURRENT_YEAR },
      }),
    );
  });

  it("busca patrocinadores anteriores com tipo e ano corretos", async () => {
    await callWithNullData();

    expect(sanityFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        query: PAST_PARTNER_CATEGORIES_QUERY,
        params: { tipo: "patrocinador", currentYear: CURRENT_YEAR },
      }),
    );
  });

  it("busca apoiadores individuais, mensais e pontuais com params corretos", async () => {
    await callWithNullData();

    expect(sanityFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        query: INDIVIDUAL_PARTNERS_QUERY,
        params: { tipo: "apoiadorIndividual" },
      }),
    );
    expect(sanityFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        query: INDIVIDUAL_PARTNERS_QUERY,
        params: { tipo: "doadorMensal" },
      }),
    );
    expect(sanityFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        query: INDIVIDUAL_PARTNERS_QUERY,
        params: { tipo: "doadorPontual" },
      }),
    );
  });

  it("executa todas as buscas em paralelo (Promise.all)", async () => {
    const resolvers: Array<(value: { data: null }) => void> = [];

    vi.mocked(sanityFetch).mockImplementation(
      () => new Promise<{ data: null }>((resolve) => { resolvers.push(resolve); }),
    );

    const servicePromise = getPartnersPageData();

    // Deixa microtasks pendentes resolverem (permite que Promise.all dispare todos)
    await Promise.resolve();
    await Promise.resolve();

    // Todas as 8 chamadas devem ter sido disparadas antes de qualquer resolução
    expect(sanityFetch).toHaveBeenCalledTimes(8);
    expect(resolvers).toHaveLength(8);

    // Resolve todas para que o serviço termine
    resolvers.forEach((resolve) => resolve({ data: null }));
    await servicePromise;
  });
});
