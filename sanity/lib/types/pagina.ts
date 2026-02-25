import { PortableTextBlock } from "sanity";

export type TipoPagina =
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

export interface PaginaSecao {
  _key: string;
  titulo?: string;
  subtitulo?: string;
  conteudo?: PortableTextBlock[];
  imagem?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
}

export interface Pagina {
  _id: string;
  _type: "pagina";
  titulo: string;
  slug: {
    current: string;
  };
  tipoPagina: TipoPagina;
  descricao?: string;
  conteudo?: PortableTextBlock[];
  imagemDestaque?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  secoes?: PaginaSecao[];
  ativo: boolean;
}
