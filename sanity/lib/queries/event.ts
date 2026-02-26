import { groq } from "next-sanity";

export const eventsQuery = groq`
  *[_type == "evento" && ativo == true] | order(dataEvento desc) {
    _id,
    "title": titulo,
    "slug": slug.current,
    "coverImage": {
      "asset": imagemCapa.asset,
      "alt": imagemCapa.alt
    },
    "description": descricao,
    "category": categoria,
    "eventDate": dataEvento,
    "ticketPrice": valorIngresso {
      "free": gratuito,
      "value": valor,
      "additionalInfo": informacoesAdicionais
    },
    "cta": cta {
      "enabled": habilitado,
      "buttonText": textoBotao,
      "type": tipo,
      "link": link,
      "whatsapp": whatsapp,
      "whatsappMessage": mensagemWhatsApp,
      "email": email
    },
    "location": local {
      "name": nome,
      "address": endereco,
      "mapLink": linkMapa
    },
    "featured": destaque,
    "active": ativo,
    "highlightColor": corDestaque
  }
`;

export const upcomingEventsQuery = groq`
  *[_type == "evento" && ativo == true && dateTime(dataEvento) > dateTime(now())] | order(dataEvento asc) [0...3] {
    _id,
    "title": titulo,
    "slug": slug.current,
    "coverImage": {
      "asset": imagemCapa.asset,
      "alt": imagemCapa.alt
    },
    "description": descricao,
    "category": categoria,
    "eventDate": dataEvento,
    "ticketPrice": valorIngresso {
      "free": gratuito,
      "value": valor,
      "additionalInfo": informacoesAdicionais
    },
    "cta": cta {
      "enabled": habilitado,
      "buttonText": textoBotao,
      "type": tipo,
      "link": link,
      "whatsapp": whatsapp,
      "whatsappMessage": mensagemWhatsApp,
      "email": email
    },
    "featured": destaque,
    "active": ativo,
    "highlightColor": corDestaque
  }
`;

export const featuredEventsQuery = groq`
  *[_type == "evento" && ativo == true && destaque == true && dateTime(dataEvento) > dateTime(now())] | order(dataEvento asc) [0...2] {
    _id,
    "title": titulo,
    "slug": slug.current,
    "coverImage": {
      "asset": imagemCapa.asset,
      "alt": imagemCapa.alt
    },
    "description": descricao,
    "category": categoria,
    "eventDate": dataEvento,
    "ticketPrice": valorIngresso {
      "free": gratuito,
      "value": valor,
      "additionalInfo": informacoesAdicionais
    },
    "cta": cta {
      "enabled": habilitado,
      "buttonText": textoBotao,
      "type": tipo,
      "link": link,
      "whatsapp": whatsapp,
      "whatsappMessage": mensagemWhatsApp,
      "email": email
    },
    "featured": destaque,
    "active": ativo,
    "highlightColor": corDestaque
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "evento" && slug.current == $slug && ativo == true][0] {
    _id,
    "title": titulo,
    "slug": slug.current,
    "coverImage": {
      "asset": imagemCapa.asset,
      "alt": imagemCapa.alt
    },
    "description": descricao,
    "category": categoria,
    "eventDate": dataEvento,
    "ticketPrice": valorIngresso {
      "free": gratuito,
      "value": valor,
      "additionalInfo": informacoesAdicionais
    },
    "cta": cta {
      "enabled": habilitado,
      "buttonText": textoBotao,
      "type": tipo,
      "link": link,
      "whatsapp": whatsapp,
      "whatsappMessage": mensagemWhatsApp,
      "email": email
    },
    "location": local {
      "name": nome,
      "address": endereco,
      "mapLink": linkMapa
    },
    "featured": destaque,
    "active": ativo,
    "highlightColor": corDestaque
  }
`;
