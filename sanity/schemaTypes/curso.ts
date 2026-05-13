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
      name: "valor",
      title: "Valor do Curso (R$)",
      type: "number",
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
      name: "professores",
      title: "Professores (Novo)",
      type: "array",
      of: [
        {
          type: "object",
          name: "professorMembro",
          title: "Professor - Membro da Equipe",
          fields: [
            {
              name: "tipo",
              title: "Tipo",
              type: "string",
              options: {
                list: [{ title: "Membro", value: "membro" }],
              },
              initialValue: "membro",
              hidden: true,
            },
            {
              name: "professorMembro",
              title: "Selecionar Membro",
              type: "reference",
              to: [{ type: "membro" }],
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "professorMembro.nome",
              subtitle: "professorMembro.cargo",
            },
          },
        },
        {
          type: "object",
          name: "professorExterno",
          title: "Professor - Externo",
          fields: [
            {
              name: "tipo",
              title: "Tipo",
              type: "string",
              options: {
                list: [{ title: "Externo", value: "externo" }],
              },
              initialValue: "externo",
              hidden: true,
            },
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
          preview: {
            select: {
              title: "nome",
              media: "foto",
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).error("Adicione pelo menos um professor"),
      group: "professor",
    }),

    defineField({
      name: "idadeMinima",
      title: "Idade Mínima",
      type: "number",
      description: "Idade mínima recomendada para o curso (0-120)",
      validation: (Rule) =>
        Rule.min(0)
          .max(120)
          .warning("Idade mínima deve estar entre 0 e 120 anos"),
      group: "informacoes",
    }),

    defineField({
      name: "precos",
      title: "Preços e Modalidades",
      type: "array",
      of: [
        {
          type: "object",
          name: "precoCurso",
          title: "Preço",
          fields: [
            {
              name: "tier",
              title: "Modalidade",
              type: "string",
              options: {
                list: [
                  { title: "Aulas Individuais", value: "individual" },
                  { title: "Aulas em Grupo", value: "group" },
                  { title: "Aula Experimental Individual", value: "free_individual" },
                  { title: "Aula Experimental em Grupo", value: "free_group" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "value",
              title: "Valor (R$)",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            },
            {
              name: "description",
              title: "Descrição",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              tier: "tier",
              value: "value",
            },
            prepare({ tier, value }) {
              return {
                title: `${tier} - ${value === 0 ? "Gratuito" : `R$ ${value}/mês`}`,
              };
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error("Adicione pelo menos um preço")
          .custom((precos: unknown) => {
            if (!Array.isArray(precos)) return true;
            const tiers = precos.map((p: { tier?: string }) => p.tier);
            const uniqueTiers = new Set(tiers);
            if (uniqueTiers.size !== tiers.length) {
              return "Não pode ter modalidades duplicadas";
            }
            return true;
          }),
      group: "informacoes",
    }),

    defineField({
      name: "tipoProfessor",
      title: "Tipo de Professor (Deprecated)",
      type: "string",
      options: {
        list: [
          { title: "Membro da Equipe", value: "membro" },
          { title: "Professor Externo", value: "externo" },
        ],
        layout: "radio",
      },
      initialValue: "membro",
      hidden: true,
      description: "Campo descontinuado. Use 'Professores (Novo)' em vez disso.",
    }),

    defineField({
      name: "professorMembro",
      title: "Professor (Membro) (Deprecated)",
      type: "reference",
      to: [{ type: "membro" }],
      hidden: true,
      description: "Campo descontinuado. Use 'Professores (Novo)' em vez disso.",
    }),

    defineField({
      name: "professorExterno",
      title: "Professor Externo (Deprecated)",
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
      hidden: true,
      description: "Campo descontinuado. Use 'Professores (Novo)' em vez disso.",
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
