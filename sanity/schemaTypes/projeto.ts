import { defineType, defineField } from "sanity";

export const projeto = defineType({
  name: "projeto",
  title: "Projeto",
  type: "document",
  groups: [
    { name: "informacoes", title: "Informações Básicas", default: true },
    { name: "financeiro", title: "Financeiro e Período" },
    { name: "vinculos", title: "Parceiros e Vínculos" },
    { name: "midia", title: "Galeria e Mídia" },
    { name: "visibilidade", title: "Visibilidade no Site" },
  ],
  fields: [
    defineField({
      name: "titulo",
      title: "Título do Projeto",
      type: "string",
      description: "Nome principal do projeto como aparecerá no site",
      validation: (Rule) => Rule.required(),
      group: "informacoes",
    }),

    defineField({
      name: "slug",
      title: "URL amigável",
      type: "slug",
      description:
        "Endereço do projeto no site — gerado automaticamente a partir do título. Clique em 'Generate'.",
      options: { source: "titulo" },
      validation: (Rule) => Rule.required(),
      group: "informacoes",
    }),

    defineField({
      name: "imagemCapa",
      title: "Imagem de Capa",
      type: "image",
      description:
        "Imagem principal exibida na listagem e no topo da página do projeto",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Descrição da Imagem",
          type: "string",
          description:
            "Breve descrição da imagem para acessibilidade (ex: 'Crianças participando do projeto')",
        }),
      ],
      group: "informacoes",
    }),

    defineField({
      name: "descricaoCurta",
      title: "Descrição Curta",
      type: "text",
      rows: 3,
      description: "Resumo de 1–3 linhas exibido na listagem de projetos",
      group: "informacoes",
    }),

    defineField({
      name: "sobre",
      title: "Sobre o Projeto",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Descrição completa do projeto, exibida na página individual",
      group: "informacoes",
    }),

    defineField({
      name: "prazo",
      title: "Período de Execução",
      type: "object",
      description: "Datas de início e término do projeto",
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
      group: "financeiro",
    }),

    defineField({
      name: "projetoFuturo",
      title: "Projeto Futuro",
      type: "boolean",
      description:
        "Marque quando o projeto ainda não está em andamento — ele aparecerá como 'em breve'",
      initialValue: false,
      group: "financeiro",
    }),

    defineField({
      name: "valorMeta",
      title: "Valor Meta (R$)",
      type: "number",
      description: "Valor total necessário para realizar o projeto",
      group: "financeiro",
    }),

    defineField({
      name: "valorArrecadado",
      title: "Valor Arrecadado (R$)",
      type: "number",
      description: "Valor já arrecadado até o momento",
      group: "financeiro",
    }),

    defineField({
      name: "realizacao",
      title: "Realização",
      type: "reference",
      to: [{ type: "realizacao" }],
      description:
        "Entidade responsável pela realização. Deixe em branco para exibir a própria Fundação.",
      group: "vinculos",
    }),

    defineField({
      name: "incentivadoPor",
      title: "Incentivado Por",
      type: "reference",
      to: [{ type: "incentivador" }],
      description:
        "Lei de incentivo, edital ou organismo que viabiliza financeiramente o projeto (ex: Lei Rouanet)",
      group: "vinculos",
    }),

    defineField({
      name: "patrocinadores",
      title: "Patrocinadores e Apoiadores",
      type: "array",
      of: [{ type: "reference", to: [{ type: "apoiador" }] }],
      description:
        "Empresas, pessoas e entidades que apoiam este projeto — vínculo com registros de Apoiadores",
      group: "vinculos",
    }),

    defineField({
      name: "eventos",
      title: "Eventos Relacionados",
      type: "array",
      of: [{ type: "reference", to: [{ type: "evento" }] }],
      description: "Eventos que fazem parte ou estão associados a este projeto",
      group: "vinculos",
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
              title: "Descrição da Foto",
              type: "string",
              description: "Breve descrição da imagem",
            }),
          ],
        },
      ],
      description: "Fotos adicionais do projeto exibidas em galeria",
      group: "midia",
    }),

    defineField({
      name: "destaque",
      title: "Destacar na Página Inicial",
      type: "boolean",
      description: "Marque para exibir este projeto na página inicial do site",
      initialValue: false,
      group: "visibilidade",
    }),

    defineField({
      name: "ativo",
      title: "Ativo (visível no site)",
      type: "boolean",
      description: "Desmarque para ocultar este projeto sem precisar excluí-lo",
      initialValue: true,
      group: "visibilidade",
    }),
  ],
  preview: {
    select: {
      title: "titulo",
      subtitle: "descricaoCurta",
      media: "imagemCapa",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Projeto sem título",
        subtitle: subtitle || "Sem descrição",
        media,
      };
    },
  },
});
