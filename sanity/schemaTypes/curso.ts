import { defineType, defineField } from "sanity";

export const curso = defineType({
  name: "curso",
  title: "Curso",
  type: "document",
  groups: [
    { name: "informacoes", title: "Informações Básicas" },
    { name: "professor", title: "Professor" },
    { name: "inscricao", title: "Inscrição" },
  ],
  fields: [
    defineField({
      name: "titulo",
      title: "Título do Curso",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "informacoes",
    }),

    defineField({
      name: "slug",
      title: "URL amigável",
      type: "slug",
      options: {
        source: "titulo",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      group: "informacoes",
    }),

    defineField({
      name: "fotoCapa",
      title: "Foto de Capa",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Texto Alternativo",
          type: "string",
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
      validation: (Rule) => Rule.required(),
      group: "informacoes",
    }),

    defineField({
      name: "datasHorarios",
      title: "Datas e Horários das Aulas",
      type: "string",
      description: "Ex: Toda segunda-feira às 19h",
      validation: (Rule) => Rule.required(),
      group: "informacoes",
    }),

    defineField({
      name: "tipoProfessor",
      title: "Tipo de Professor",
      type: "string",
      options: {
        list: [
          { title: "Membro da Equipe", value: "membro" },
          { title: "Professor Externo", value: "externo" },
        ],
        layout: "radio",
      },
      initialValue: "membro",
      validation: (Rule) => Rule.required(),
      group: "professor",
    }),

    defineField({
      name: "professorMembro",
      title: "Professor (Membro)",
      type: "reference",
      to: [{ type: "membro" }],
      hidden: ({ parent }) => parent?.tipoProfessor !== "membro",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { tipoProfessor?: string };
          if (parent?.tipoProfessor === "membro" && !value) {
            return "Selecione um membro da equipe";
          }
          return true;
        }),
      group: "professor",
    }),

    defineField({
      name: "professorExterno",
      title: "Professor Externo",
      type: "object",
      fields: [
        {
          name: "nome",
          title: "Nome",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "foto",
          title: "Foto",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Texto Alternativo",
              type: "string",
            },
          ],
        },
      ],
      hidden: ({ parent }) => parent?.tipoProfessor !== "externo",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { tipoProfessor?: string };
          if (parent?.tipoProfessor === "externo" && !value?.nome) {
            return "Preencha os dados do professor externo";
          }
          return true;
        }),
      group: "professor",
    }),

    defineField({
      name: "inscricao",
      title: "Configuração de Inscrição",
      type: "object",
      fields: [
        {
          name: "ativa",
          title: "Inscrições Ativas",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "textoMensagem",
          title: "Texto da Mensagem WhatsApp",
          type: "text",
          description:
            "Mensagem que será enviada ao WhatsApp. Use {nome} para inserir o nome do inscrito.",
          placeholder:
            "Olá! Gostaria de me inscrever no curso {curso}. Meu nome é {nome}.",
        },
        {
          name: "whatsapp",
          title: "WhatsApp Específico",
          type: "string",
          description:
            "Número de WhatsApp específico para este curso (opcional). Formato: 5511999999999",
          placeholder: "5511999999999",
        },
        {
          name: "textoBotao",
          title: "Texto do Botão",
          type: "string",
          initialValue: "Inscreva-se agora",
        },
      ],
      group: "inscricao",
    }),

    defineField({
      name: "ativo",
      title: "Curso Ativo",
      type: "boolean",
      initialValue: true,
      description: "Desative para ocultar o curso do site",
    }),

    defineField({
      name: "ordem",
      title: "Ordem de Exibição",
      type: "number",
      description: "Número menor aparece primeiro",
    }),
  ],

  preview: {
    select: {
      titulo: "titulo",
      media: "fotoCapa",
      ativo: "ativo",
    },
    prepare({ titulo, media, ativo }) {
      return {
        title: titulo,
        subtitle: ativo ? "✅ Ativo" : "❌ Inativo",
        media,
      };
    },
  },
});
