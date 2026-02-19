export const configuracaoGlobalQuery = `
  *[_type == "configuracaoGlobal"][0]{
    _id,
    tituloHero,
    subtituloHero,
    logo,
    corPrimaria,
    corSecundaria
  }
`;
