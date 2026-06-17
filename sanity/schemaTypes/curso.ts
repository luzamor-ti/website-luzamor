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
      name: "descricaoCurta",
      title: "Descrição Curta",
      type: "text",
      group: "informacoes",
    }),

    defineField({
      name: "idadeMinima",
      title: "Idade Mínima",
      type: "number",
      description: "Idade mínima em anos para participar do curso",
      initialValue: 16,
      group: "informacoes",
    }),

    defineField({
      name: "opcoesMensalidade",
      title: "Opções de Mensalidade",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "titulo",
              title: "Título da Opção",
              type: "string",
              description: "Ex: Aula Individual, Aula em Grupo",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "gratuito",
              title: "Gratuito",
              type: "boolean",
              initialValue: false,
            },
            {
              name: "valor",
              title: "Valor da Mensalidade (R$)",
              type: "number",
              hidden: ({ parent }) => parent?.gratuito === true,
            },
            {
              name: "detalhes",
              title: "Detalhes Adicionais",
              type: "string",
              description: "Ex: 1 hora por semana (Opcional)",
            }
          ],
          preview: {
            select: {
              titulo: "titulo",
              gratuito: "gratuito",
              valor: "valor"
            },
            prepare({ titulo, gratuito, valor }) {
              return {
                title: titulo,
                subtitle: gratuito ? "Gratuito" : `R$ ${valor || 0}`
              }
            }
          }
        }
      ],
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
      name: "agendamentoNecessario",
      title: "Aulas Mediante Agendamento",
      type: "boolean",
      description: "Ative se as aulas dependem de agendamento e disponibilidade",
      initialValue: false,
      group: "informacoes",
    }),

    defineField({
      name: "professores",
      title: "Professores",
      type: "array",
      of: [
        {
          type: "object",
          title: "Professor",
          fields: [
            {
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
            },
            {
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
            },
            {
              name: "professorExterno",
              title: "Professor Externo",
              type: "object",
              fields: [
                {
                  name: "nome",
                  title: "Nome",
                  type: "string",
                  validation: (Rule) =>
                    Rule.custom(() => {
                      // Nome is required only when professorExterno is active;
                      // validated at the parent level
                      return true;
                    }),
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
                  const val = value as { nome?: string } | undefined;
                  if (parent?.tipoProfessor === "externo" && !val?.nome) {
                    return "Preencha o nome do professor externo";
                  }
                  return true;
                }),
            },
          ],
          preview: {
            select: {
              tipo: "tipoProfessor",
              nomeExterno: "professorExterno.nome",
              nomeMembro: "professorMembro.nome",
              fotoExterno: "professorExterno.foto",
              fotoMembro: "professorMembro.foto",
            },
            prepare({ tipo, nomeExterno, nomeMembro, fotoExterno, fotoMembro }) {
              const isMembro = tipo === "membro";
              return {
                title: isMembro ? nomeMembro || "Membro não selecionado" : nomeExterno || "Nome não preenchido",
                subtitle: isMembro ? "Membro da Equipe" : "Professor Externo",
                media: isMembro ? fotoMembro : fotoExterno,
              };
            }
          }
        }
      ],
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
      name: "salaAula",
      title: "Sala de Aula",
      type: "reference",
      to: [{ type: "salaAula" }],
      description: "Vincule o curso a uma sala de aula (opcional)",
      group: "informacoes",
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
