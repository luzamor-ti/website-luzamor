import { groq } from "next-sanity";

export const ABOUT_PAGE_QUERY = groq`
  *[_type == "sobreNos"][0] {
    _id,
    _type,
    hero {
      tag,
      titulo,
      subtitulo,
      imagemFundo {
        asset->,
        alt
      }
    },
    impactos {
      textoIntrodutorio,
      imagem {
        asset->,
        alt
      },
      items[] {
        numero,
        titulo,
        descricao,
        icone
      }
    },
    nossaHistoria {
      tagline,
      titulo,
      descricao,
      timeline[] {
        ano,
        tagline,
        titulo,
        descricao,
        imagem {
          asset->,
          alt
        }
      }
    },
    nossaMissao {
      tag,
      titulo,
      descricao,
      imagem {
        asset->,
        alt
      }
    },
    nossaVisao {
      tag,
      titulo,
      descricao,
      imagem {
        asset->,
        alt
      }
    },
    nossoTime {
      tag,
      titulo,
      descricao
    }
  }
`;
