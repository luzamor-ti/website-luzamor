export const membersHomeQuery = `
  *[_type == "membro" && isDiretoria == true]
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
  *[_type == "membro" && isDiretoria == true]
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

export const boardMembersQuery = `
  *[_type == "membro" && isDiretoria == true]
  | order(ordem asc){
    _id,
    "name": nome,
    "role": cargo,
    "roleType": tipoCargo,
    "isDiretoria": isDiretoria,
    "photo": foto,
    alt,
    "shortBio": bioCurta,
    "fullBio": bioCompleta,
    "order": ordem
  }
`;
