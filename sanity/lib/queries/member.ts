export const membersHomeQuery = `
  *[_type == "membro"]
  | order(ordem asc)[0...4]{
    _id,
    "name": nome,
    "role": cargo,
    "photo": foto,
    alt,
    "shortBio": bioCurta
  }
`;

export const membersPageQuery = `
  *[_type == "membro"]
  | order(ordem asc){
    _id,
    "name": nome,
    "role": cargo,
    "photo": foto,
    alt,
    "shortBio": bioCurta,
    "fullBio": bioCompleta,
    "words": palavra
  }
`;

export const wordsOfPresidentPageQuery = `
  *[_type == "membro" && cargo == "Presidente"] [0]
  {
    _id,
    "name": nome,
    "role": cargo,
    "photo": foto,
    alt,
    "fullBio": bioCompleta,
    "words": palavra
  }
`;
