import { PortableTextBlock } from "next-sanity";

export interface AuditoriumGalleryImage {
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
}

export interface Auditorium {
  _id: string;
  heroImage?: {
    asset: { _ref: string; _type: "reference" };
    alt?: string;
  };
  title?: string;
  subtitle?: string;
  description?: PortableTextBlock[];
  capacity?: number;
  area?: number;
  resources?: string[];
  gallery?: AuditoriumGalleryImage[];
  ctaText?: string;
  ctaWhatsapp?: string;
}
