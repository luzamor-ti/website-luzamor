// Placeholder para queries de contato
export const contatoQuery = `
  *[_type == "contato"][0]{
    _id,
    "email": email,
    "phone": telefone,
    "address": endereco
  }
`;

export const contatosQuery = `
  *[_type == "contato"]{
    _id,
    "email": email,
    "phone": telefone,
    "address": endereco
  }
`;
