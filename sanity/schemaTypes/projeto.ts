import { defineType, defineField } from "sanity";

export const projeto = defineType({
  name: "projeto",
  title: "Projeto",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      type: "slug",
      options: { source: "titulo" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "imagemCapa",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "descricaoCurta",
      type: "text",
    }),

    defineField({
      name: "conteudo",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "valorMeta",
      type: "number",
    }),

    defineField({
      name: "valorArrecadado",
      type: "number",
    }),

    defineField({
      name: "categoria",
      type: "string",
      title: "Categoria",
      description:
        "Categoria ou parceiro do projeto (ex: Captação direta, Prefeitura de Maringá)",
    }),

    defineField({
      name: "destaque",
      type: "boolean",
      title: "Destaque na Home",
      description: "Marque para exibir este projeto na página inicial",
      initialValue: false,
    }),

    defineField({
      name: "ativo",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
