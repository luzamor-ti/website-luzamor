export const apoiadoresDestaqueQuery = `
  *[_type == "apoiador" && destaque == true]
  | order(ordem asc){
    _id,
    "name": nome,
    "logo": logo,
    "website": site
  }
`;
