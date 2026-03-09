import { defineType, defineField } from "sanity";

export const salaAula = defineType({
  name: "salaAula",
  title: "Sala de Aula",
  type: "document",
  fields: [
    defineField({
      name: "nome",
      title: "Nome da Sala",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "URL amigável",
      type: "slug",
      options: {
        source: "nome",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "imagemPrincipal",
      title: "Imagem Principal",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Texto Alternativo",
          type: "string",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "descricao",
      title: "Descrição",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "galeria",
      title: "Galeria de Fotos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              title: "Texto Alternativo",
              type: "string",
            },
            {
              name: "legenda",
              title: "Legenda",
              type: "string",
            },
          ],
        },
      ],
    }),

    defineField({
      name: "capacidade",
      title: "Capacidade (pessoas)",
      type: "number",
    }),

    defineField({
      name: "recursos",
      title: "Recursos Disponíveis",
      type: "array",
      of: [{ type: "string" }],
      description: "Ex: Projetor, Ar-condicionado, Wi-Fi...",
    }),

    defineField({
      name: "ativa",
      title: "Ativa",
      type: "boolean",
      initialValue: true,
    }),

    defineField({
      name: "ordem",
      title: "Ordem de Exibição",
      type: "number",
    }),
  ],

  preview: {
    select: {
      title: "nome",
      media: "imagemPrincipal",
    },
  },
});
