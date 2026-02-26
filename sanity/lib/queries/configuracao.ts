export const configuracaoGlobalQuery = `
  *[_type == "configuracaoGlobal"][0]{
    _id,
    "heroTitle": tituloHero,
    "heroSubtitle": subtituloHero,
    "logo": logo,
    "theme": tema{
      "primaryColor": corPrimaria,
      "secondaryColor": corSecundaria,
      "accentColor": corDestaque,
      "backgroundColor": corFundo,
      "textColor": corTexto
    },
    "contact": contato{
      "email": email,
      "phone": telefone,
      "address": endereco,
      "facebook": facebook,
      "instagram": instagram,
      "linkedin": linkedin
    }
  }
`;
