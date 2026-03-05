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
  site?: string;
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
  sponsors2026: SupporterCategory[];
  supporters2026: SupporterCategory[];
  pastSponsors: SupporterCategory[];
  pastSupporters: SupporterCategory[];
  individualSupporters: Supporter[];
  monthlyDonors: Supporter[];
  punctualDonors: Supporter[];
}
