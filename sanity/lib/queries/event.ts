import { groq } from "next-sanity";

export const eventsQuery = groq`
  *[_type == "evento" && ativo == true] | order(dataEvento desc) {
    _id,
    "title": titulo,
    "slug": { "current": slug.current },
    "coverImage": {
      "asset": imagemCapa.asset,
      "alt": imagemCapa.alt
    },
    "shortDescription": descricaoCurta,
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
    "project": projeto-> {
      _id,
      "title": titulo,
      "slug": slug.current
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
    "slug": { "current": slug.current },
    "coverImage": {
      "asset": imagemCapa.asset,
      "alt": imagemCapa.alt
    },
    "shortDescription": descricaoCurta,
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
    "project": projeto-> {
      _id,
      "title": titulo,
      "slug": slug.current
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
    "slug": { "current": slug.current },
    "coverImage": {
      "asset": imagemCapa.asset,
      "alt": imagemCapa.alt
    },
    "shortDescription": descricaoCurta,
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
    "project": projeto-> {
      _id,
      "title": titulo,
      "slug": slug.current
    },
    "project": projeto-> {
      _id,
      "title": titulo,
      "slug": slug.current
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
    "slug": { "current": slug.current },
    "coverImage": {
      "asset": imagemCapa.asset,
      "alt": imagemCapa.alt
    },
    "shortDescription": descricaoCurta,
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
    "gallery": galeria[] {
      "asset": asset,
      "alt": alt,
      "caption": legenda
    },
    "project": projeto-> {
      _id,
      "title": titulo,
      "slug": slug.current,
      "realizacao": realizacao-> {
        _id,
        "titulo": nome,
        "imagem": logo,
        "site": site
      },
      "incentivadoPor": incentivadoPor-> {
        _id,
        "titulo": nome,
        "imagem": logo,
        "site": site
      },
      "supporters": patrocinadores[]-> {
        _id,
        "name": nome,
        "logo": logo,
        "site": site,
        "type": tipo
      }
    },
    "featured": destaque,
    "active": ativo,
    "highlightColor": corDestaque
  }
`;

// Query for all upcoming events (future events ordered by date ascending)
export const allUpcomingEventsQuery = groq`
  *[_type == "evento" && ativo == true && dateTime(dataEvento) > dateTime(now())] | order(dataEvento asc) {
    _id,
    "title": titulo,
    "slug": { "current": slug.current },
    "coverImage": {
      "asset": imagemCapa.asset,
      "alt": imagemCapa.alt
    },
    "shortDescription": descricaoCurta,
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
    "project": projeto-> {
      _id,
      "title": titulo,
      "slug": slug.current
    },
    "featured": destaque,
    "active": ativo,
    "highlightColor": corDestaque
  }
`;

// Query for all past events (past events ordered by date descending - most recent first)
export const allPastEventsQuery = groq`
  *[_type == "evento" && ativo == true && dateTime(dataEvento) <= dateTime(now())] | order(dataEvento desc) {
    _id,
    "title": titulo,
    "slug": { "current": slug.current },
    "coverImage": {
      "asset": imagemCapa.asset,
      "alt": imagemCapa.alt
    },
    "shortDescription": descricaoCurta,
    "description": descricao,
    "category": categoria,
    "eventDate": dataEvento,
    "ticketPrice": valorIngresso {
      "free": gratuito,
      "value": valor,
      "additionalInfo": informacoesAdicionais
    },
    "location": local {
      "name": nome,
      "address": endereco,
      "mapLink": linkMapa
    },
    "gallery": galeria[] {
      "asset": asset,
      "alt": alt,
      "caption": legenda
    },
    "project": projeto-> {
      _id,
      "title": titulo,
      "slug": slug.current
    },
    "featured": destaque,
    "active": ativo,
    "highlightColor": corDestaque
  }
`;

// Query for events by project ID
export const eventsByProjectQuery = groq`
  *[_type == "evento" && ativo == true && projeto._ref == $projectId] | order(dataEvento desc) {
    _id,
    "title": titulo,
    "slug": { "current": slug.current },
    "coverImage": {
      "asset": imagemCapa.asset,
      "alt": imagemCapa.alt
    },
    "shortDescription": descricaoCurta,
    "category": categoria,
    "eventDate": dataEvento,
    "ticketPrice": valorIngresso {
      "free": gratuito,
      "value": valor
    },
    "location": local {
      "name": nome,
      "address": endereco
    },
    "project": projeto-> {
      _id,
      "title": titulo,
      "slug": slug.current
    },
    "featured": destaque,
    "active": ativo
  }
`;
