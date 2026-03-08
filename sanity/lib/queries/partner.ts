import { groq } from "next-sanity";

// Campos base de um apoiador
const supporterFields = groq`
  _id,
  "name": nome,
  logo,
  "site": site,
  "year": ano,
  "type": tipo
`;

/**
 * Busca a configuração textual/visual da página de parceiros (singleton)
 */
export const PARTNERS_PAGE_CONFIG_QUERY = groq`
  *[_type == "paginaParceiros"][0] {
    "hero": {
      "tag": hero.tag,
      "title": hero.titulo,
      "description": hero.descricao,
      "backgroundImage": hero.imagemFundo
    },
    "ctaPrincipal": {
      "title": ctaPrincipal.titulo,
      "description": ctaPrincipal.descricao,
      "sponsorButtonText": ctaPrincipal.botaoPatrocinador,
      "supporterButtonText": ctaPrincipal.botaoApoiador,
      "donorButtonText": ctaPrincipal.botaoDoador
    },
    "partnersSection": {
      "tag": secaoParceiros.tag,
      "title": secaoParceiros.titulo,
      "description": secaoParceiros.descricao,
      "tabCurrentLabel": secaoParceiros.labelAbaAnoAtual,
      "tabPastLabel": secaoParceiros.labelAbaAnteriores,
      "emptyCurrentMessage": secaoParceiros.mensagemVazioAtual,
      "emptyPastMessage": secaoParceiros.mensagemVazioAnteriores
    },
    "individualsSection": {
      "tag": secaoIndividuais.tag,
      "title": secaoIndividuais.titulo,
      "description": secaoIndividuais.descricao
    },
    "donorsSection": {
      "tag": secaoDoadores.tag,
      "title": secaoDoadores.titulo,
      "description": secaoDoadores.descricao,
      "monthlyTitle": secaoDoadores.tituloMensais,
      "punctualTitle": secaoDoadores.tituloPontuais
    },
    "ctaFinal": {
      "title": ctaFinal.titulo,
      "description": ctaFinal.descricao,
      "buttonText": ctaFinal.textoBotao
    }
  }
`;

/**
 * Busca categorias com seus apoiadores, filtrados por tipo e ano exato
 * Parâmetros: $tipo (string), $ano (number)
 */
export const PARTNER_CATEGORIES_QUERY = groq`
  *[_type == "incentivador"] | order(ordem asc) {
    _id,
    "title": nome,
    "order": ordem,
    "supporters": *[
      _type == "apoiador" &&
      references(^._id) &&
      tipo == $tipo &&
      ano == $ano
    ] | order(ordem asc, nome asc) {
      ${supporterFields}
    }
  }[count(supporters) > 0]
`;

/**
 * Busca categorias com seus apoiadores de anos anteriores ao ano corrente
 * Parâmetros: $tipo (string), $currentYear (number)
 */
export const PAST_PARTNER_CATEGORIES_QUERY = groq`
  *[_type == "incentivador"] | order(ordem asc) {
    _id,
    "title": nome,
    "order": ordem,
    "supporters": *[
      _type == "apoiador" &&
      references(^._id) &&
      tipo == $tipo &&
      ano < $currentYear
    ] | order(ano desc, ordem asc, nome asc) {
      ${supporterFields}
    }
  }[count(supporters) > 0]
`;

/**
 * Busca apoiadores sem categoria (individuais, mensais e pontuais)
 * Parâmetro: $tipo (string)
 */
export const INDIVIDUAL_PARTNERS_QUERY = groq`
  *[_type == "apoiador" && tipo == $tipo] | order(nome asc) {
    ${supporterFields}
  }
`;
