import { defineType, defineField } from "sanity";

export const projeto = defineType({
  name: "projeto",
  title: "Projeto",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "titulo" },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "imagemCapa",
      title: "Imagem de Capa",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto Alternativo",
          type: "string",
        }),
      ],
    }),

    defineField({
      name: "descricaoCurta",
      title: "Descrição Curta",
      type: "text",
      description: "Resumo exibido na listagem de projetos",
    }),

    defineField({
      name: "sobre",
      title: "Sobre o Projeto",
      type: "array",
      of: [{ type: "block" }],
      description: "Descrição completa do projeto",
    }),

    defineField({
      name: "prazo",
      title: "Prazo",
      type: "object",
      description: "Período de execução do projeto",
      fields: [
        defineField({
          name: "inicio",
          title: "Data de Início",
          type: "date",
          options: { dateFormat: "DD/MM/YYYY" },
        }),
        defineField({
          name: "fim",
          title: "Data de Término",
          type: "date",
          options: { dateFormat: "DD/MM/YYYY" },
        }),
      ],
    }),

    defineField({
      name: "projetoFuturo",
      title: "Projeto Futuro",
      type: "boolean",
      description: "Marque quando o projeto ainda não está em andamento",
      initialValue: false,
    }),

    defineField({
      name: "valorMeta",
      title: "Valor Meta",
      type: "number",
      description: "Valor total necessário para o projeto",
    }),

    defineField({
      name: "valorArrecadado",
      title: "Valor Arrecadado",
      type: "number",
      description: "Valor já arrecadado até o momento",
    }),

    defineField({
      name: "realizacao",
      title: "Realização",
      type: "reference",
      to: [{ type: "realizacao" }],
      description:
        "Entidade responsável pela realização do projeto. Quando vazio, será exibido a própria instituição.",
    }),

    defineField({
      name: "incentivadoPor",
      title: "Incentivado Por",
      type: "reference",
      to: [{ type: "incentivador" }],
      description:
        "Lei de incentivo, edital ou organismo que viabiliza o projeto",
    }),

    defineField({
      name: "patrocinadores",
      title: "Patrocinadores e Apoiadores",
      type: "array",
      of: [{ type: "reference", to: [{ type: "apoiador" }] }],
      description:
        "Patrocinadores, apoiadores e pessoas físicas vinculados a este projeto",
    }),

    defineField({
      name: "eventos",
      title: "Eventos Relacionados",
      type: "array",
      of: [{ type: "reference", to: [{ type: "evento" }] }],
      description: "Eventos associados a este projeto",
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
            defineField({
              name: "alt",
              title: "Texto Alternativo",
              type: "string",
            }),
          ],
        },
      ],
    }),

    defineField({
      name: "destaque",
      title: "Destaque na Home",
      type: "boolean",
      description: "Marque para exibir este projeto na página inicial",
      initialValue: false,
    }),

    defineField({
      name: "ativo",
      title: "Ativo",
      type: "boolean",
      initialValue: true,
    }),
  ],
});
