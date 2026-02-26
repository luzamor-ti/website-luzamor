// Placeholder para queries de trabalho
export const trabalhosQuery = `
  *[_type == "trabalho"]
  | order(_createdAt desc){
    _id,
    "title": titulo,
    "description": descricao
  }
`;
