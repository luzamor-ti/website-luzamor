import { PortableTextBlock } from "next-sanity";

export interface Event {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  coverImage: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
  };
  shortDescription: string;
  description: PortableTextBlock[];
  category:
    | "cultural"
    | "educacional"
    | "social"
    | "arrecadacao"
    | "celebracao"
    | "esportivo"
    | "arte"
    | "musical"
    | "literario"
    | "outro";
  eventDate: string;
  ticketPrice: {
    free: boolean;
    value?: number;
  };
  cta: {
    enabled: boolean;
    buttonText?: string;
    type?: "link" | "whatsapp" | "email";
    link?: string;
    whatsapp?: string;
    whatsappMessage?: string;
    email?: string;
  };
  location?: {
    name?: string;
    address?: string;
    mapLink?: string;
  };
  gallery?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
  }[];
  project?: {
    _id: string;
    title: string;
    slug: string;
    realizacao?: {
      _id?: string;
      titulo?: string;
      imagem?: {
        asset: { _ref: string; _type: "reference" };
        alt?: string;
      };
      site?: string;
    } | null;
    incentivadoPor?: {
      _id?: string;
      titulo?: string;
      imagem?: {
        asset: { _ref: string; _type: "reference" };
        alt?: string;
      };
      site?: string;
    } | null;
    supporters?: {
      _id: string;
      name: string;
      logo?: {
        asset: { _ref: string; _type: "reference" };
        alt?: string;
      };
      site?: string;
      type?: string;
    }[];
  } | null;
  featured: boolean;
  active: boolean;
}
