export const footerQuery = `
  *[_type == "rodape"][0]{
    _id,
    slogan,
    sejaApoiadorTitulo,
    sejaApoiadorSubtitulo,
    whatsapp,
    email,
  }
`;
