export const configuracaoGlobalQuery = `
  *[_type == "configuracaoGlobal"][0]{
    _id,
    "heroTitle": tituloHero,
    "heroSubtitle": subtituloHero,
    "logo": logo,
    "theme": tema{
      "primaryColor": primaryColor,
      "secondaryColor": secondaryColor,
      "accentColor": accentColor,
      "backgroundColor": backgroundColor,
      "textColor": textColor
    },
    "contact": contato{
      "email": email,
      "phone": telefone,
      "whatsapp": whatsapp,
      "address": endereco,
      "facebook": facebook,
      "instagram": instagram,
      "linkedin": linkedin
    }
  }
`;
