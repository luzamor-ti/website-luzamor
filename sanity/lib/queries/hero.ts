import { defineQuery } from "next-sanity";

export const HERO_QUERY = defineQuery(`*[_type == "hero" && ativo == true][0]{
  _id,
  _type,
  titulo,
  tagline,
  subtitulo,
  imagem{
    asset->{
      _id,
      url
    },
    alt
  },
  ctaPrimario{
    texto,
    url
  },
  ctaSecundario{
    texto,
    url
  },
  ativo
}`);
