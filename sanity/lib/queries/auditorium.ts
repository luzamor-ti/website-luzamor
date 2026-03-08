import { groq } from "next-sanity";

export const auditoriumQuery = groq`
  *[_type == "auditorio"][0] {
    _id,
    "heroImage": {
      "asset": imagemHero.asset,
      "alt": imagemHero.alt
    },
    "title": titulo,
    "subtitle": subtitulo,
    "description": descricao,
    "capacity": capacidade,
    "area": area,
    "resources": recursos,
    "gallery": galeria[] {
      "asset": asset,
      "alt": alt,
      "caption": legenda
    },
    "ctaText": ctaTexto,
    "ctaWhatsapp": ctaWhatsapp
  }
`;
