import { Image as SanityImage } from "sanity";

export interface PartnersPageConfig {
  hero: {
    tag?: string;
    title: string;
    description?: string;
    backgroundImage?: SanityImage & { alt?: string };
  };
  ctaPrincipal: {
    title?: string;
    description?: string;
    sponsorButtonText?: string;
    supporterButtonText?: string;
    donorButtonText?: string;
  };
  partnersSection: {
    tag?: string;
    title?: string;
    description?: string;
    tabCurrentLabel?: string;
    tabPastLabel?: string;
    emptyCurrentMessage?: string;
    emptyPastMessage?: string;
  };
  individualsSection: {
    tag?: string;
    title?: string;
    description?: string;
  };
  donorsSection: {
    tag?: string;
    title?: string;
    description?: string;
    monthlyTitle?: string;
    punctualTitle?: string;
  };
  ctaFinal: {
    title?: string;
    description?: string;
    buttonText?: string;
  };
}
