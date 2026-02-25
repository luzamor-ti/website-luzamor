export interface HeroCTA {
  texto: string;
  url: string;
}

export interface Hero {
  _id: string;
  _type: "hero";
  titulo: string;
  tagline?: string;
  subtitulo?: string;
  imagem?: {
    asset: {
      _id: string;
      _ref: string;
      url: string;
    };
    alt?: string;
  };
  ctaPrimario?: HeroCTA;
  ctaSecundario?: HeroCTA;
  ativo?: boolean;
}
