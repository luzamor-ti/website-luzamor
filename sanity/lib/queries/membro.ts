export const membrosHomeQuery = `
  *[_type == "membro"]
  | order(ordem asc)[0...4]{
    _id,
    nome,
    cargo,
    foto,
    bioCurta
  }
`;

export const membrosPageQuery = `
  *[_type == "membro"]
  | order(ordem asc){
    _id,
    nome,
    cargo,
    foto,
    bioCompleta
  }
`;
