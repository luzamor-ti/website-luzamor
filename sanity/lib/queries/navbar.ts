import { defineQuery } from "next-sanity";

export const NAVBAR_QUERY = defineQuery(`
  *[_type == "navbar"][0]{
    _id,
    "items": itens[]{
      _key,
      "page": pagina,
      "title": titulo,
      "subItems": subItens[]{
        _key,
        "page": pagina,
        "title": titulo
      }
    },
    "primaryButton": botaoPrincipal{
      "title": titulo,
      "url": url
    }
  }
`);
