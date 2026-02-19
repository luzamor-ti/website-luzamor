// Placeholder para queries de contato
export const contatoQuery = `
  *[_type == "contato"][0]{
    _id,
    email,
    telefone,
    endereco
  }
`;

export const contatosQuery = `
  *[_type == "contato"]{
    _id,
    email,
    telefone,
    endereco
  }
`;
