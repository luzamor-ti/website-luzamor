import { defineField, defineType } from "sanity";

export const categoriaParceria = defineType({
  name: "categoriaParceria",
  title: "Categoria de Parceria",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      description:
        "Ex: Lei Rouanet, Edital da Prefeitura, Patrocínio Ouro, Apoio Institucional",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ordem",
      title: "Ordem de Exibição",
      type: "number",
      description: "Número menor aparece primeiro",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "titulo",
      subtitle: "ordem",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle !== undefined ? `Ordem: ${subtitle}` : undefined,
      };
    },
  },
});
