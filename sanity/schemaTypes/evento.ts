import { defineType, defineField } from "sanity";

export const evento = defineType({
  name: "evento",
  title: "Evento",
  type: "document",
  groups: [
    { name: "informacoes", title: "Informações Básicas" },
    { name: "detalhes", title: "Detalhes do Evento" },
    { name: "configuracoes", title: "Configurações" },
  ],
  fields: [
    defineField({
      name: "titulo",
      title: "Título do Evento",
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
      name: "imagemCapa",
      title: "Imagem de Capa",
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
      name: "categoria",
      title: "Categoria do Evento",
      type: "string",
      options: {
        list: [
          { title: "🎭 Cultural", value: "cultural" },
          { title: "🎓 Educacional", value: "educacional" },
          { title: "🤝 Social", value: "social" },
          { title: "💰 Arrecadação", value: "arrecadacao" },
          { title: "🎉 Celebração", value: "celebracao" },
          { title: "🏃 Esportivo", value: "esportivo" },
          { title: "🎨 Arte", value: "arte" },
          { title: "🎵 Musical", value: "musical" },
          { title: "📚 Literário", value: "literario" },
          { title: "🌟 Outro", value: "outro" },
        ],
      },
      validation: (Rule) => Rule.required(),
      group: "informacoes",
    }),

    defineField({
      name: "dataEvento",
      title: "Data do Evento",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      group: "detalhes",
    }),

    defineField({
      name: "valorIngresso",
      title: "Valor do Ingresso",
      type: "object",
      fields: [
        {
          name: "gratuito",
          title: "Evento Gratuito",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "valor",
          title: "Valor (R$)",
          type: "number",
          hidden: ({ parent }) => parent?.gratuito === true,
          validation: (Rule) =>
            Rule.custom((value, context) => {
              const parent = context.parent as { gratuito?: boolean };
              if (parent?.gratuito === false && !value) {
                return "Informe o valor do ingresso";
              }
              return true;
            }),
        },
        {
          name: "informacoesAdicionais",
          title: "Informações Adicionais",
          type: "string",
          description: "Ex: Meia-entrada disponível, desconto para grupos",
        },
      ],
      group: "detalhes",
    }),

    defineField({
      name: "cta",
      title: "Call-to-Action",
      type: "object",
      fields: [
        {
          name: "habilitado",
          title: "CTA Habilitado",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "textoBotao",
          title: "Texto do Botão",
          type: "string",
          initialValue: "Garantir meu lugar",
          hidden: ({ parent }) => parent?.habilitado === false,
        },
        {
          name: "tipo",
          title: "Tipo de Ação",
          type: "string",
          options: {
            list: [
              { title: "Link Externo", value: "link" },
              { title: "WhatsApp", value: "whatsapp" },
              { title: "Email", value: "email" },
            ],
            layout: "radio",
          },
          initialValue: "link",
          hidden: ({ parent }) => parent?.habilitado === false,
        },
        {
          name: "link",
          title: "URL do Link",
          type: "url",
          hidden: ({ parent }) => parent?.tipo !== "link",
        },
        {
          name: "whatsapp",
          title: "WhatsApp",
          type: "string",
          description: "Formato: 5511999999999",
          hidden: ({ parent }) => parent?.tipo !== "whatsapp",
        },
        {
          name: "mensagemWhatsApp",
          title: "Mensagem WhatsApp",
          type: "text",
          description: "Mensagem pré-preenchida",
          hidden: ({ parent }) => parent?.tipo !== "whatsapp",
        },
        {
          name: "email",
          title: "Email",
          type: "string",
          hidden: ({ parent }) => parent?.tipo !== "email",
        },
      ],
      group: "detalhes",
    }),

    defineField({
      name: "local",
      title: "Local do Evento",
      type: "object",
      fields: [
        {
          name: "nome",
          title: "Nome do Local",
          type: "string",
        },
        {
          name: "endereco",
          title: "Endereço",
          type: "string",
        },
        {
          name: "linkMapa",
          title: "Link do Google Maps",
          type: "url",
        },
      ],
      group: "detalhes",
    }),

    defineField({
      name: "destaque",
      title: "Evento em Destaque",
      type: "boolean",
      description:
        "Eventos em destaque aparecem com maior proeminência na home",
      initialValue: false,
      group: "configuracoes",
    }),

    defineField({
      name: "ativo",
      title: "Evento Ativo",
      type: "boolean",
      initialValue: true,
      description: "Desative para ocultar o evento do site",
      group: "configuracoes",
    }),

    defineField({
      name: "corDestaque",
      title: "Cor de Destaque",
      type: "string",
      description:
        "Cor em hexadecimal para destacar o evento (opcional). Ex: #FF6B6B",
      placeholder: "#FF6B6B",
      group: "configuracoes",
    }),
  ],

  preview: {
    select: {
      titulo: "titulo",
      media: "imagemCapa",
      data: "dataEvento",
      categoria: "categoria",
      destaque: "destaque",
    },
    prepare({ titulo, media, data, categoria, destaque }) {
      const dataFormatada = data
        ? new Date(data).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "Data não definida";

      return {
        title: `${destaque ? "⭐ " : ""}${titulo}`,
        subtitle: `${dataFormatada} • ${categoria || "Sem categoria"}`,
        media,
      };
    },
  },

  orderings: [
    {
      title: "Data do Evento (Mais Recente)",
      name: "dataDesc",
      by: [{ field: "dataEvento", direction: "desc" }],
    },
    {
      title: "Data do Evento (Mais Antigo)",
      name: "dataAsc",
      by: [{ field: "dataEvento", direction: "asc" }],
    },
  ],
});
