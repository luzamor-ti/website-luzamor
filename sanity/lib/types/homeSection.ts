import { Image as SanityImage } from "sanity";

export interface HomeSectionCard {
  icon?: string;
  number?: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: SanityImage;
  url?: string;
}

export interface HomeSectionLabels {
  email?: string;
  phone?: string;
  address?: string;
}

export interface HomeSection {
  _id: string;
  _type: "secaoHome";
  name: string;
  tag?: string;
  title: string;
  description?: string;
  image?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  buttonText?: string;
  buttonUrl?: string;
  linkText?: string;
  linkUrl?: string;
  cards?: HomeSectionCard[];
  labels?: HomeSectionLabels;
  active: boolean;
}

export type SectionName =
  | "hero"
  | "intro"
  | "metrics"
  | "projects"
  | "members"
  | "supporters"
  | "faq"
  | "contact"
  | "impact"
  | "initiatives"
  | "howToHelp"
  | "courses"
  | "events";
