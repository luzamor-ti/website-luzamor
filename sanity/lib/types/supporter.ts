import { Image as SanityImage } from "sanity";
import { PartnersPageConfig } from "./partnersPage";

export type SupporterType =
  | "patrocinador"
  | "apoiador"
  | "apoiadorIndividual"
  | "doadorMensal"
  | "doadorPontual";

export interface Supporter {
  _id: string;
  name: string;
  logo?: SanityImage;
  /** Campo normalizado pelo GROQ (queries/partner.ts). */
  site?: string;
  /** Campo legado retornado por queries/supporter.ts. */
  website?: string;
  featured?: boolean;
  type?: SupporterType;
  year?: number;
}

export interface SupporterCategory {
  _id: string;
  title: string;
  order: number;
  supporters: Supporter[];
}

export interface PartnersPageData {
  pageConfig: PartnersPageConfig | null;
  currentSponsors: SupporterCategory[];
  currentSupporters: SupporterCategory[];
  pastSponsors: SupporterCategory[];
  pastSupporters: SupporterCategory[];
  individualSupporters: Supporter[];
  monthlyDonors: Supporter[];
  punctualDonors: Supporter[];
}
