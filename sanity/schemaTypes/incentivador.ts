import { defineField, defineType } from "sanity";

/**
 * Incentivador substitui categoriaParceria.
 * Representa a lei de incentivo, edital, prefeitura ou organismo
 * que viabiliza projetos e agrupa apoiadores na página de parceiros.
 */
export const incentivador = defineType({
  name: "incentivador",
  title: "Incentivador",
  type: "document",
  fields: [
    defineField({
      name: "nome",
      title: "Nome",
      type: "string",
      description:
        "Ex: Lei Rouanet, Edital da Prefeitura, Patrocínio Ouro, Apoio Institucional",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo / Imagem",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "site",
      title: "Site (opcional)",
      type: "url",
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
    select: { title: "nome", subtitle: "ordem", media: "logo" },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle !== undefined ? `Ordem: ${subtitle}` : undefined,
      };
    },
  },
});
