import { defineType, defineField } from "sanity";

export const salaAula = defineType({
  name: "salaAula",
  title: "Sala de Aula",
  type: "document",
  groups: [
    { name: "informacoes", title: "Informações", default: true },
    { name: "fotos", title: "Fotos e Galeria" },
    { name: "visibilidade", title: "Visibilidade" },
  ],
  fields: [
    defineField({
      name: "nome",
      title: "Nome da Sala",
      type: "string",
      description:
        "Nome da sala como aparece no site (ex: Sala Azul, Sala das Artes)",
      validation: (Rule) => Rule.required(),
      group: "informacoes",
    }),

    defineField({
      name: "slug",
      title: "URL amigável",
      type: "slug",
      description:
        "Endereço da sala no site — gerado automaticamente a partir do nome. Clique em 'Generate'.",
      options: {
        source: "nome",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: "informacoes",
    }),

    defineField({
      name: "imagemPrincipal",
      title: "Foto Principal",
      type: "image",
      description: "Foto principal da sala exibida no card e no topo da página",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Descrição da Foto",
          type: "string",
          description: "Breve descrição da imagem para acessibilidade",
        },
      ],
      validation: (Rule) => Rule.required(),
      group: "informacoes",
    }),

    defineField({
      name: "descricao",
      title: "Descrição",
      type: "array",
      of: [{ type: "block" }],
      description: "Texto descrevendo a sala, sua finalidade e características",
      validation: (Rule) => Rule.required(),
      group: "informacoes",
    }),

    defineField({
      name: "capacidade",
      title: "Capacidade (pessoas)",
      type: "number",
      description: "Número máximo de pessoas que a sala comporta",
      group: "informacoes",
    }),

    defineField({
      name: "recursos",
      title: "Recursos Disponíveis",
      type: "array",
      of: [{ type: "string" }],
      description:
        "Liste os recursos da sala, um por linha (ex: Projetor, Ar-condicionado, Wi-Fi)",
      group: "informacoes",
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
              title: "Descrição da Foto",
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
      description: "Fotos adicionais da sala exibidas em galeria na página",
      group: "fotos",
    }),

    defineField({
      name: "ativa",
      title: "Visível no Site",
      type: "boolean",
      description: "Desmarque para ocultar esta sala sem precisar excluí-la",
      initialValue: true,
      group: "visibilidade",
    }),

    defineField({
      name: "ordem",
      title: "Ordem de Exibição",
      type: "number",
      description: "Número menor aparece primeiro na listagem. Ex: 1, 2, 3…",
      group: "visibilidade",
    }),
  ],
  preview: {
    select: {
      title: "nome",
      media: "imagemPrincipal",
    },
    prepare({ title, media }) {
      return {
        title: title || "Sala sem nome",
        media,
      };
    },
  },
});
