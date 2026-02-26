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
    additionalInfo?: string;
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
  featured: boolean;
  active: boolean;
  highlightColor?: string;
}
