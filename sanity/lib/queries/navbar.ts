export const navbarQuery = `
  *[_type == "navbar"][0]{
      itens[]{
        tituloPersonalizado,
        slug
      },
      botaoPrincipal{
        titulo
      }
    }
`;
