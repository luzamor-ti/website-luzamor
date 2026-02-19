import { defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "Pergunta Frequente",
  type: "document",
  fields: [
    {
      name: "pergunta",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "resposta",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "categoria",
      type: "string",
    },
    {
      name: "ordem",
      type: "number",
    },
    {
      name: "ativo",
      type: "boolean",
      initialValue: true,
    },
  ],
});
