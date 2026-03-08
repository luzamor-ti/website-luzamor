import { defineType, defineField } from "sanity";

export const auditorio = defineType({
  name: "auditorio",
  title: "Auditório",
  type: "document",
  fields: [
    defineField({
      name: "imagemHero",
      title: "Imagem do Hero",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Texto Alternativo",
          type: "string",
        },
      ],
    }),

    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
    }),

    defineField({
      name: "subtitulo",
      title: "Subtítulo",
      type: "text",
      rows: 2,
    }),

    defineField({
      name: "descricao",
      title: "Descrição",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "capacidade",
      title: "Capacidade (pessoas)",
      type: "number",
    }),

    defineField({
      name: "area",
      title: "Área (m²)",
      type: "number",
    }),

    defineField({
      name: "recursos",
      title: "Recursos e Diferenciais",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Liste os recursos disponíveis (ex: Projetor HD, Ar condicionado...)",
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
      name: "ctaTexto",
      title: "Texto do Botão de Reserva",
      type: "string",
      initialValue: "Reservar o Auditório",
    }),

    defineField({
      name: "ctaWhatsapp",
      title: "WhatsApp para Reserva",
      type: "string",
      description: "Número com DDI (ex: 5511999999999)",
    }),
  ],

  preview: {
    select: { title: "titulo", media: "imagemHero" },
    prepare({ title, media }) {
      return { title: title || "Auditório", media };
    },
  },
});
