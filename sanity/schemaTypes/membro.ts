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
      title: "Cargo",
      description:
        "Cargo específico (ex: Conselheiro de Educação, Diretora Financeira)",
    },
    {
      name: "tipoCargo",
      title: "Tipo de Cargo (Diretoria)",
      type: "string",
      description:
        "Categoria hierárquica usada para agrupar na página de Diretoria",
      options: {
        list: [
          { title: "Presidente", value: "presidente" },
          { title: "Vice-Presidente", value: "vice-presidente" },
          { title: "Diretor(a)", value: "diretor" },
          { title: "Secretário(a)", value: "secretario" },
          { title: "Tesoureiro(a)", value: "tesoureiro" },
          { title: "Conselheiro(a)", value: "conselheiro" },
          { title: "Outro", value: "outro" },
        ],
      },
    },
    {
      name: "diretoria",
      title: "Membro da Diretoria",
      type: "boolean",
      description: "Marque para exibir este membro na página de Diretoria",
      initialValue: false,
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
