import { Image as SanityImage } from "sanity";
import { PortableTextBlock } from "next-sanity";
import { Event } from "./event";

export interface ProjectOrganization {
  _id?: string;
  titulo?: string;
  imagem?: SanityImage;
  site?: string;
}

export interface ProjectSupporter {
  _id: string;
  name: string;
  logo?: SanityImage;
  site?: string;
  type?:
    | "patrocinador"
    | "apoiador"
    | "apoiadorIndividual"
    | "doadorMensal"
    | "doadorPontual";
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  coverImage?: SanityImage & { alt?: string };
  shortDescription?: string;
  about?: PortableTextBlock[];
  deadline?: {
    inicio?: string;
    fim?: string;
  };
  futurProject?: boolean;
  goalAmount?: number;
  raisedAmount?: number;
  realizacao?: ProjectOrganization | null;
  incentivadoPor?: ProjectOrganization | null;
  supporters?: ProjectSupporter[];
  events?: Partial<Event>[];
  gallery?: (SanityImage & { alt?: string })[];
  featured?: boolean;
  active: boolean;
}
