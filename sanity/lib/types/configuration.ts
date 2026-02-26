import { Image as SanityImage } from "sanity";

export interface ThemeColors {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface ContactInfo {
  email?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

export interface GlobalConfiguration {
  _id: string;
  _type: "configuracaoGlobal";
  heroTitle?: string;
  heroSubtitle?: string;
  logo?: SanityImage;
  favicon?: SanityImage;
  theme?: ThemeColors;
  contact?: ContactInfo;
}
