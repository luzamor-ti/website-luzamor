import { sanityFetch } from "../live";
import {
  PARTNERS_PAGE_CONFIG_QUERY,
  PARTNER_CATEGORIES_QUERY,
  PAST_PARTNER_CATEGORIES_QUERY,
  INDIVIDUAL_PARTNERS_QUERY,
} from "../queries/partner";
import {
  Supporter,
  SupporterCategory,
  PartnersPageData,
} from "../types/supporter";
import { PartnersPageConfig } from "../types/partnersPage";

const CURRENT_YEAR = 2026;

async function fetch<T>(
  query: string,
  params?: Record<string, unknown>,
  fallback?: T
): Promise<T> {
  const { data } = await sanityFetch({ query, params }).catch(() => ({
    data: fallback ?? null,
  }));
  return (data ?? fallback ?? null) as T;
}

export async function getPartnersPageData(): Promise<PartnersPageData> {
  const [
    pageConfig,
    sponsors2026,
    supporters2026,
    pastSponsors,
    pastSupporters,
    individualSupporters,
    monthlyDonors,
    punctualDonors,
  ] = await Promise.all([
    fetch<PartnersPageConfig | null>(PARTNERS_PAGE_CONFIG_QUERY),
    fetch<SupporterCategory[]>(PARTNER_CATEGORIES_QUERY, { tipo: "patrocinador", ano: CURRENT_YEAR }, []),
    fetch<SupporterCategory[]>(PARTNER_CATEGORIES_QUERY, { tipo: "apoiador", ano: CURRENT_YEAR }, []),
    fetch<SupporterCategory[]>(PAST_PARTNER_CATEGORIES_QUERY, { tipo: "patrocinador", currentYear: CURRENT_YEAR }, []),
    fetch<SupporterCategory[]>(PAST_PARTNER_CATEGORIES_QUERY, { tipo: "apoiador", currentYear: CURRENT_YEAR }, []),
    fetch<Supporter[]>(INDIVIDUAL_PARTNERS_QUERY, { tipo: "apoiadorIndividual" }, []),
    fetch<Supporter[]>(INDIVIDUAL_PARTNERS_QUERY, { tipo: "doadorMensal" }, []),
    fetch<Supporter[]>(INDIVIDUAL_PARTNERS_QUERY, { tipo: "doadorPontual" }, []),
  ]);

  return {
    pageConfig,
    sponsors2026,
    supporters2026,
    pastSponsors,
    pastSupporters,
    individualSupporters,
    monthlyDonors,
    punctualDonors,
  };
}
