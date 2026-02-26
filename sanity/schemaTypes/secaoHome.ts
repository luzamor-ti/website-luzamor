import { defineType, defineField } from "sanity";

export default defineType({
  name: "secaoHome",
  title: "Seções da Home",
  type: "document",
  fields: [
    defineField({
      name: "nome",
      title: "Nome da Seção",
      type: "string",
      description: "Identificador interno da seção (não alterar após criar)",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Introdução", value: "intro" },
          { title: "Projetos", value: "projects" },
          { title: "Membros", value: "members" },
          { title: "Apoiadores", value: "supporters" },
          { title: "FAQ", value: "faq" },
          { title: "Contato", value: "contact" },
          { title: "Impacto", value: "impact" },
          { title: "Iniciativas", value: "initiatives" },
          { title: "Como Ajudar", value: "howToHelp" },
        ],
      },
    }),
    defineField({
      name: "tag",
      title: "Tag/Subtítulo",
      type: "string",
      description: "Texto pequeno que aparece acima do título principal",
    }),
    defineField({
      name: "titulo",
      title: "Título Principal",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descricao",
      title: "Descrição",
      type: "text",
      description: "Texto descritivo da seção",
      rows: 3,
    }),
    defineField({
      name: "textoBotao",
      title: "Texto do Botão",
      type: "string",
      description: "Texto que aparece no botão principal (se houver)",
    }),
    defineField({
      name: "urlBotao",
      title: "URL do Botão",
      type: "string",
      description: "Link para onde o botão deve direcionar",
    }),
    defineField({
      name: "textoLink",
      title: "Texto do Link",
      type: "string",
      description: "Texto que aparece em links secundários",
    }),
    defineField({
      name: "urlLink",
      title: "URL do Link",
      type: "string",
      description: "Link para onde o link secundário deve direcionar",
    }),
    defineField({
      name: "cards",
      title: "Cards/Itens da Seção",
      type: "array",
      description: "Cards ou itens que aparecem na seção (se aplicável)",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icone",
              title: "Ícone",
              type: "string",
              description:
                "Nome do ícone Lucide (ex: Handshake, DollarSign, etc)",
            }),
            defineField({
              name: "numero",
              title: "Número/Métrica",
              type: "string",
              description: "Para seções de impacto (ex: 652+)",
            }),
            defineField({
              name: "titulo",
              title: "Título do Card",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subtitulo",
              title: "Subtítulo",
              type: "string",
            }),
            defineField({
              name: "descricao",
              title: "Descrição",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "imagem",
              title: "Imagem",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "string",
              description: "Link do card (se clicável)",
            }),
          ],
          preview: {
            select: {
              title: "titulo",
              subtitle: "descricao",
              media: "imagem",
            },
          },
        },
      ],
    }),
    defineField({
      name: "labels",
      title: "Labels/Rótulos",
      type: "object",
      description: "Rótulos de campos específicos (ex: Email, Telefone)",
      fields: [
        defineField({
          name: "email",
          title: "Label Email",
          type: "string",
        }),
        defineField({
          name: "telefone",
          title: "Label Telefone",
          type: "string",
        }),
        defineField({
          name: "endereco",
          title: "Label Endereço",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "ativa",
      title: "Seção Ativa",
      type: "boolean",
      description: "Define se a seção deve aparecer na página",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "titulo",
      subtitle: "nome",
    },
    prepare({ title, subtitle }) {
      return {
        title: title || "Sem título",
        subtitle: `Seção: ${subtitle}`,
      };
    },
  },
});
