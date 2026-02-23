export const configuracaoGlobalQuery = `
  *[_type == "configuracaoGlobal"][0]{
    _id,
    tituloHero,
    subtituloHero,
    logo,
    tema{
      corPrimaria,
      corSecundaria,
      corDestaque,
      corFundo,
      corTexto
    },
    contato{
      email,
      telefone,
      endereco,
      facebook,
      instagram,
      linkedin
    }
  }
`;
