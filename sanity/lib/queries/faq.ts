// Placeholder para queries de FAQ
export const faqQuery = `
  *[_type == "faq"]
  | order(ordem asc){
    _id,
    "question": pergunta,
    "answer": resposta
  }
`;

export const faqResumoQuery = `
  *[_type == "faq"]
  | order(ordem asc)[0...6]{
    _id,
    "question": pergunta,
    "answer": resposta
  }
`;
