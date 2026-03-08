// =============================
// PROJETOS
// =============================

export const projetosHomeQuery = `
  *[_type == "projeto" && ativo == true && destaque == true]
  | order(_createdAt desc)[0...5]{
    _id,
    "title": titulo,
    "slug": slug,
    "coverImage": imagemCapa,
    "shortDescription": descricaoCurta,
    "goalAmount": valorMeta,
    "raisedAmount": valorArrecadado,
    "category": categoria,
    "featured": destaque,
    "futurProject": projetoFuturo,
    "active": ativo
  }
`;

export const projetosPageQuery = `
  *[_type == "projeto" && ativo == true]
  | order(_createdAt desc){
    _id,
    "title": titulo,
    "slug": slug,
    "coverImage": imagemCapa,
    "shortDescription": descricaoCurta,
    "goalAmount": valorMeta,
    "raisedAmount": valorArrecadado,
    "category": categoria,
    "featured": destaque,
    "futurProject": projetoFuturo,
    "active": ativo
  }
`;

export const projetoBySlugQuery = `
  *[_type == "projeto" && slug.current == $slug][0]{
    _id,
    "title": titulo,
    "slug": slug,
    "coverImage": imagemCapa,
    "shortDescription": descricaoCurta,
    "about": sobre,
    "deadline": prazo{
      "inicio": inicio,
      "fim": fim
    },
    "futurProject": projetoFuturo,
    "goalAmount": valorMeta,
    "raisedAmount": valorArrecadado,
    "category": categoria,
    "featured": destaque,
    "active": ativo,
    "realizacao": realizacao->{
      _id,
      "titulo": nome,
      "imagem": logo,
      "site": site
    },
    "incentivadoPor": incentivadoPor->{
      _id,
      "titulo": nome,
      "imagem": logo,
      "site": site
    },
    "supporters": patrocinadores[]->{
      _id,
      "name": nome,
      "logo": logo,
      "site": site,
      "type": tipo
    },
    "events": eventos[]->{
      _id,
      "title": titulo,
      "slug": slug,
      "eventDate": dataEvento,
      "category": categoria,
      "coverImage": imagemCapa,
      "shortDescription": descricaoCurta,
      "cta": cta {
        "enabled": habilitado,
        "buttonText": textoBotao,
        "type": tipo,
        "link": link,
        "whatsapp": whatsapp,
        "whatsappMessage": mensagemWhatsApp,
        "email": email
      },
      "ticketPrice": valorIngresso{
        "free": gratuito,
        "value": valor,
        "additionalInfo": informacoesAdicionais
      },
      "location": local {
        "name": nome,
        "address": endereco,
        "mapLink": linkMapa
      },
    },
    "gallery": galeria
  }
`;
