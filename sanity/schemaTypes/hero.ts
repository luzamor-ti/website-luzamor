import { defineField, defineType } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      description:
        "Título principal do hero (ex: Transformando cultura em experiências reais)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description:
        "Texto pequeno acima do título (ex: Juntos nós criamos impacto)",
    }),
    defineField({
      name: "subtitulo",
      title: "Subtítulo",
      type: "text",
      description: "Texto descritivo abaixo do título",
      rows: 3,
    }),
    defineField({
      name: "imagem",
      title: "Imagem de Fundo",
      type: "image",
      description: "Imagem de fundo do hero",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto Alternativo",
        },
      ],
    }),
    defineField({
      name: "ctaPrimario",
      title: "CTA Primário",
      type: "object",
      description: "Botão primário (verde)",
      fields: [
        {
          name: "texto",
          title: "Texto",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "url",
          title: "URL",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "ctaSecundario",
      title: "CTA Secundário",
      type: "object",
      description: "Botão secundário (outline)",
      fields: [
        {
          name: "texto",
          title: "Texto",
          type: "string",
        },
        {
          name: "url",
          title: "URL",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "ativo",
      title: "Ativo",
      type: "boolean",
      description: "Marque para exibir este hero na página inicial",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "titulo",
      tagline: "tagline",
      media: "imagem",
    },
    prepare({ title, tagline }) {
      return {
        title: title || "Hero sem título",
        subtitle: tagline || "Sem tagline",
      };
    },
  },
});
