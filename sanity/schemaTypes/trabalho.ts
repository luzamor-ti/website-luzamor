import { defineType } from "sanity";

export const trabalho = defineType({
  name: "trabalho",
  title: "Trabalho",
  type: "document",
  fields: [
    {
      name: "titulo",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      options: { source: "titulo" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "imagem",
      type: "image",
    },
    {
      name: "descricao",
      type: "text",
    },
    {
      name: "conteudo",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "categoria",
      type: "string",
    },
  ],
});
