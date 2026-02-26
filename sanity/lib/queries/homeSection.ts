import { defineQuery } from "next-sanity";

export const secaoHomeQuery = defineQuery(`
  *[_type == "secaoHome" && nome == $nome && ativa == true][0] {
    _id,
    _type,
    "name": nome,
    "tag": tag,
    "title": titulo,
    "description": descricao,
    "image": imagem {
      asset -> {
        _id,
        url
      },
      alt
    },
    "buttonText": textoBotao,
    "buttonUrl": urlBotao,
    "linkText": textoLink,
    "linkUrl": urlLink,
    "cards": cards[] {
      "icon": icone,
      "number": numero,
      "title": titulo,
      "subtitle": subtitulo,
      "description": descricao,
      "image": imagem {
        asset -> {
          _id,
          url
        }
      },
      "url": url
    },
    "labels": labels {
      "email": email,
      "phone": telefone,
      "address": endereco
    },
    "active": ativa
  }
`);

export const todasSecoesHomeQuery = defineQuery(`
  *[_type == "secaoHome" && ativa == true] {
    _id,
    _type,
    "name": nome,
    "tag": tag,
    "title": titulo,
    "description": descricao,
    "image": imagem {
      asset -> {
        _id,
        url
      },
      alt
    },
    "buttonText": textoBotao,
    "buttonUrl": urlBotao,
    "linkText": textoLink,
    "linkUrl": urlLink,
    "cards": cards[] {
      "icon": icone,
      "number": numero,
      "title": titulo,
      "subtitle": subtitulo,
      "description": descricao,
      "image": imagem {
        asset -> {
          _id,
          url
        }
      },
      "url": url
    },
    "labels": labels {
      "email": email,
      "phone": telefone,
      "address": endereco
    },
    "active": ativa
  }
`);
