export const paginaBySlugQuery = `
  *[
    _type in ["paginaHome", "paginaSobre", "paginaProjetos", "paginaContato"]
    && slug.current == $slug
  ][0]
`;
