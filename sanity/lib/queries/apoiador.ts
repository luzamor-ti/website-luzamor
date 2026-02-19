export const apoiadoresDestaqueQuery = `
  *[_type == "apoiador" && destaque == true]
  | order(ordem asc){
    _id,
    nome,
    logo,
    site
  }
`;
