import { defineField, defineType } from "sanity";

export const realizacao = defineType({
  name: "realizacao",
  title: "Realização",
  type: "document",
  fields: [
    defineField({
      name: "nome",
      title: "Nome",
      type: "string",
      description: "Nome da entidade realizadora",
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
  ],
  preview: {
    select: { title: "nome", media: "logo" },
  },
});
