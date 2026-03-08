import { groq } from "next-sanity";

export const classroomsQuery = groq`
  *[_type == "salaAula" && ativa == true] | order(ordem asc, _createdAt asc) {
    _id,
    "name": nome,
    "slug": slug,
    "mainImage": {
      "asset": imagemPrincipal.asset,
      "alt": imagemPrincipal.alt
    },
    "description": descricao,
    "gallery": galeria[] {
      "asset": asset,
      "alt": alt,
      "caption": legenda
    },
    "capacity": capacidade,
    "resources": recursos,
    "active": ativa,
    "order": ordem
  }
`;
