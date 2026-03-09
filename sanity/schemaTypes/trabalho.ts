import { defineType, defineField } from "sanity";

export const trabalho = defineType({
  name: "trabalho",
  title: "Trabalho / Iniciativa",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      description: "Nome do trabalho ou iniciativa",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL amigável",
      type: "slug",
      description:
        "Endereço no site — gerado automaticamente a partir do título. Clique em 'Generate'.",
      options: { source: "titulo" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "imagem",
      title: "Imagem de Capa",
      type: "image",
      description: "Imagem principal exibida no card e no topo da página",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Descrição da Imagem",
          type: "string",
          description: "Descrição breve da imagem para acessibilidade",
        },
      ],
    }),
    defineField({
      name: "descricao",
      title: "Descrição Curta",
      type: "text",
      rows: 3,
      description: "Resumo exibido em listagens e cards",
    }),
    defineField({
      name: "conteudo",
      title: "Conteúdo Completo",
      type: "array",
      of: [{ type: "block" }],
      description: "Texto completo exibido na página do trabalho",
    }),
    defineField({
      name: "categoria",
      title: "Categoria",
      type: "string",
      description: "Classifica o tipo de trabalho para organização interna",
    }),
  ],
  preview: {
    select: {
      title: "titulo",
      subtitle: "categoria",
      media: "imagem",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Trabalho sem título",
        subtitle: subtitle || "Sem categoria",
        media,
      };
    },
  },
});
