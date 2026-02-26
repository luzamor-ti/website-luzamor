import { defineQuery } from "next-sanity";

export const HERO_QUERY = defineQuery(`*[_type == "hero" && ativo == true][0]{
  _id,
  _type,
  "title": titulo,
  "tagline": tagline,
  "subtitle": subtitulo,
  "image": imagem{
    asset->{
      _id,
      url
    },
    alt
  },
  "primaryCta": ctaPrimario{
    "text": texto,
    "url": url
  },
  "secondaryCta": ctaSecundario{
    "text": texto,
    "url": url
  },
  "active": ativo
}`);
