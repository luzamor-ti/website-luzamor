import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextBlock } from "next-sanity";

export interface AboutHero {
  tag?: string;
  titulo: string;
  subtitulo?: string;
  imagemFundo?: SanityImageSource;
}

export interface ImpactItem {
  numero: string;
  titulo: string;
  descricao?: string;
  icone: string;
}

export interface ImpactsSection {
  textoIntrodutorio?: PortableTextBlock[];
  imagem?: SanityImageSource;
  items?: ImpactItem[];
}

export interface TimelineItem {
  ano: string;
  tagline?: string;
  titulo?: string;
  descricao?: string;
  imagem?: SanityImageSource;
}

export interface OurHistory {
  tagline?: string;
  titulo?: string;
  descricao?: string;
  timeline?: TimelineItem[];
}

export interface ContentWithImage {
  tag?: string;
  titulo?: string;
  descricao?: PortableTextBlock[];
  imagem?: SanityImageSource;
}

export interface OurTeam {
  tag?: string;
  titulo?: string;
  descricao?: PortableTextBlock[];
}

export interface AboutPage {
  _id: string;
  _type: "sobreNos";
  hero: AboutHero;
  impactos?: ImpactsSection;
  nossaHistoria?: OurHistory;
  nossaMissao?: ContentWithImage;
  nossaVisao?: ContentWithImage;
  nossoTime?: OurTeam;
}
