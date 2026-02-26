import { PortableTextBlock } from "next-sanity";

export interface Membro {
  _id: string;
  nome: string;
  cargo: string;
  foto: {
    asset: {
      _id: string;
      _ref: string;
      url: string;
    };
    alt?: string;
  };
  alt: string;
  bioCurta?: string;
  bioCompleta?: PortableTextBlock[];
  palavra?: PortableTextBlock[];
  ordem?: number;
}
