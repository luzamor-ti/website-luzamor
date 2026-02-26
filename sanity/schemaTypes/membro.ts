import { defineType } from "sanity";

export const membro = defineType({
  name: "membro",
  title: "Membro da Equipe",
  type: "document",
  fields: [
    {
      name: "nome",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "cargo",
      type: "string",
    },
    {
      name: "foto",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "alt",
      type: "string",
      title: "texto alternativo",
    },
    {
      name: "bioCurta",
      type: "text",
    },
    {
      name: "bioCompleta",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "palavra",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "ordem",
      type: "number",
    },
  ],
});
