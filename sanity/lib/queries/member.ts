export const membrosHomeQuery = `
  *[_type == "membro"]
  | order(ordem asc)[0...4]{
    _id,
    "name": nome,
    "role": cargo,
    "photo": foto,
    "shortBio": bioCurta
  }
`;

export const membrosPageQuery = `
  *[_type == "membro"]
  | order(ordem asc){
    _id,
    "name": nome,
    "role": cargo,
    "photo": foto,
    "fullBio": bioCompleta
  }
`;
