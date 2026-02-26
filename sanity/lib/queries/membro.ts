export const membrosHomeQuery = `
  *[_type == "membro"]
  | order(ordem asc)[0...4]{
    _id,
    nome,
    cargo,
    foto,
    alt,
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
    alt,
    bioCompleta
  }
`;

export const palavraPresidentePageQuery = `
  *[_type == "membro" && cargo == "Presidente"] [0]
  {
    _id,
    nome,
    cargo,
    foto,
    alt,
    bioCompleta,
    palavra
  }
`;
