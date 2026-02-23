import { defineType, defineField } from "sanity";

export const navbar = defineType({
  name: "navbar",
  title: "Navbar",
  type: "document",
  fields: [
    defineField({
      name: "itens",
      title: "Itens do Menu",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "tituloPersonalizado",
              title: "Título Personalizado (opcional)",
              type: "string",
              description:
                "Se vazio, usa automaticamente o título da página vinculada",
            },
            {
              name: "slug",
              title: "Slug da Página",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "botaoPrincipal",
      title: "Botão Principal",
      type: "object",
      fields: [
        {
          name: "titulo",
          title: "Título do Botão",
          type: "string",
        },
      ],
    }),
  ],
});
