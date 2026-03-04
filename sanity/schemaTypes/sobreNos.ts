import { defineField, defineType } from "sanity";
import { ICON_OPTIONS } from "@/constants/iconOptions";

export default defineType({
  name: "sobreNos",
  title: "Página Sobre Nós",
  type: "document",
  fields: [
    // Hero Section
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        {
          name: "tag",
          title: "Tag",
          type: "string",
          description: "Texto pequeno acima do título",
        },
        {
          name: "titulo",
          title: "Título",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "subtitulo",
          title: "Subtítulo",
          type: "text",
          rows: 3,
        },
        {
          name: "imagemFundo",
          title: "Imagem de Fundo",
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Texto Alternativo",
            },
          ],
        },
      ],
    }),

    // Impactos Section
    defineField({
      name: "impactos",
      title: "Seção de Impactos",
      type: "object",
      fields: [
        {
          name: "textoIntrodutorio",
          title: "Texto Introdutório",
          type: "array",
          of: [
            {
              type: "block",
              styles: [],
              lists: [],
              marks: {
                decorators: [
                  { title: "Strong", value: "strong" },
                  { title: "Destaque Verde", value: "highlight" },
                ],
                annotations: [],
              },
            },
          ],
        },
        {
          name: "imagem",
          title: "Imagem Ilustrativa",
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Texto Alternativo",
            },
          ],
        },
        {
          name: "items",
          title: "Impactos",
          type: "array",
          validation: (Rule) => Rule.max(4),
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "numero",
                  title: "Número",
                  type: "string",
                  description: "Ex: 500+, 10mil, etc",
                },
                {
                  name: "titulo",
                  title: "Título",
                  type: "string",
                },
                {
                  name: "descricao",
                  title: "Descrição",
                  type: "text",
                  rows: 2,
                },
                {
                  name: "icone",
                  title: "Ícone",
                  type: "string",
                  options: {
                    list: ICON_OPTIONS,
                  },
                  validation: (Rule) => Rule.required(),
                },
              ],
            },
          ],
        },
      ],
    }),

    // Nossa História (Timeline)
    defineField({
      name: "nossaHistoria",
      title: "Nossa História",
      type: "object",
      fields: [
        {
          name: "tagline",
          title: "Tagline",
          type: "string",
        },
        {
          name: "titulo",
          title: "Título",
          type: "string",
        },
        {
          name: "descricao",
          title: "Descrição",
          type: "text",
          rows: 3,
        },
        {
          name: "timeline",
          title: "Timeline",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "ano",
                  title: "Ano",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "tagline",
                  title: "Tagline",
                  type: "string",
                  description: "Texto pequeno acima do título",
                },
                {
                  name: "titulo",
                  title: "Título",
                  type: "string",
                },
                {
                  name: "descricao",
                  title: "Descrição",
                  type: "text",
                  rows: 3,
                },
                {
                  name: "imagem",
                  title: "Imagem",
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    {
                      name: "alt",
                      type: "string",
                      title: "Texto Alternativo",
                    },
                  ],
                },
              ],
              preview: {
                select: {
                  title: "ano",
                  subtitle: "titulo",
                },
              },
            },
          ],
        },
      ],
    }),

    // Nossa Missão
    defineField({
      name: "nossaMissao",
      title: "Nossa Missão",
      type: "object",
      fields: [
        {
          name: "tag",
          title: "Tag",
          type: "string",
        },
        {
          name: "titulo",
          title: "Título",
          type: "string",
        },
        {
          name: "descricao",
          title: "Descrição",
          type: "text",
          rows: 5,
        },
        {
          name: "imagem",
          title: "Imagem",
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Texto Alternativo",
            },
          ],
        },
      ],
    }),

    // Nossa Visão
    defineField({
      name: "nossaVisao",
      title: "Nossa Visão",
      type: "object",
      fields: [
        {
          name: "tag",
          title: "Tag",
          type: "string",
        },
        {
          name: "titulo",
          title: "Título",
          type: "string",
        },
        {
          name: "descricao",
          title: "Descrição",
          type: "text",
          rows: 5,
        },
        {
          name: "imagem",
          title: "Imagem",
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Texto Alternativo",
            },
          ],
        },
      ],
    }),

    // Nosso Time
    defineField({
      name: "nossoTime",
      title: "Nosso Time",
      type: "object",
      fields: [
        {
          name: "tag",
          title: "Tag",
          type: "string",
        },
        {
          name: "titulo",
          title: "Título",
          type: "string",
        },
        {
          name: "descricao",
          title: "Descrição",
          type: "text",
          rows: 3,
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Página Sobre Nós",
      };
    },
  },
});
