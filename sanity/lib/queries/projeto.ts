// =============================
// PROJETOS
// =============================

export const projetosHomeQuery = `
  *[_type == "projeto" && ativo == true]
  | order(_createdAt desc)[0...3]{
    _id,
    titulo,
    "slug": slug.current,
    imagemCapa,
    descricaoCurta,
    valorMeta,
    valorArrecadado
  }
`;

export const projetosPageQuery = `
  *[_type == "projeto" && ativo == true]
  | order(_createdAt desc){
    _id,
    titulo,
    "slug": slug.current,
    imagemCapa,
    descricaoCurta,
    valorMeta,
    valorArrecadado
  }
`;

export const projetoBySlugQuery = `
  *[_type == "projeto" && slug.current == $slug][0]{
    _id,
    titulo,
    imagemCapa,
    conteudo,
    valorMeta,
    valorArrecadado
  }
`;
