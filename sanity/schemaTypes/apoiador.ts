import { defineType } from "sanity";

export const apoiador = defineType({
  name: "apoiador",
  title: "Apoiador",
  type: "document",
  fields: [
    {
      name: "nome",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "logo",
      type: "image",
    },
    {
      name: "site",
      type: "url",
    },
    {
      name: "destaque",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "ordem",
      type: "number",
    },
  ],
});
