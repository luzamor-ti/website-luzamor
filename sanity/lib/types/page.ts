import { PortableTextBlock } from "sanity";
import { Image as SanityImage } from "sanity";

export type PageType =
  | "projetos"
  | "sobre-nos"
  | "salas-aula"
  | "contato"
  | "auditorio"
  | "diretoria"
  | "palavra-presidente"
  | "patrocinador"
  | "calendario-eventos"
  | "cursos";

export interface PageSection {
  _key: string;
  title: string;
  subtitle?: string;
  content?: PortableTextBlock[];
  image?: SanityImage;
}

export interface Page {
  _id: string;
  _type: "pagina";
  slug: {
    current: string;
  };
  title: string;
  description?: string;
  pageType: PageType;
  featuredImage?: SanityImage;
  content?: PortableTextBlock[];
  sections?: PageSection[];
  active: boolean;
}
