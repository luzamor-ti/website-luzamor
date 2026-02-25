import { defineQuery } from "next-sanity";

export const NAVBAR_QUERY = defineQuery(`
  *[_type == "navbar"][0]{
    _id,
    itens[]{
      _key,
      pagina,
      titulo,
      subItens[]{
        _key,
        pagina,
        titulo
      }
    },
    botaoPrincipal{
      titulo,
      url
    }
  }
`);
