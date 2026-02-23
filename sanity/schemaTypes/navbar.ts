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
              title: "Título",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "slug",
              title: "Slug (URL)",
              type: "string",
              description:
                "Caminho da página, ex: 'sobre', 'projetos', 'contato'",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: "tituloPersonalizado", subtitle: "slug" },
          },
        },
      ],
    }),
    defineField({
      name: "botaoPrincipal",
      title: "Botão Principal (CTA)",
      type: "object",
      fields: [
        {
          name: "titulo",
          title: "Título",
          type: "string",
        },
        {
          name: "slug",
          title: "Slug (URL)",
          type: "string",
          description: "Caminho da página, ex: 'contato' ou 'doacoes'",
        },
      ],
    }),
  ],
});
