// =============================
// PROJETOS
// =============================

export const projetosHomeQuery = `
  *[_type == "projeto" && ativo == true]
  | order(_createdAt desc)[0...3]{
    _id,
    "title": titulo,
    "slug": slug.current,
    "coverImage": imagemCapa,
    "shortDescription": descricaoCurta,
    "goalAmount": valorMeta,
    "raisedAmount": valorArrecadado
  }
`;

export const projetosPageQuery = `
  *[_type == "projeto" && ativo == true]
  | order(_createdAt desc){
    _id,
    "title": titulo,
    "slug": slug.current,
    "coverImage": imagemCapa,
    "shortDescription": descricaoCurta,
    "goalAmount": valorMeta,
    "raisedAmount": valorArrecadado
  }
`;

export const projetoBySlugQuery = `
  *[_type == "projeto" && slug.current == $slug][0]{
    _id,
    "title": titulo,
    "coverImage": imagemCapa,
    "content": conteudo,
    "goalAmount": valorMeta,
    "raisedAmount": valorArrecadado
  }
`;
