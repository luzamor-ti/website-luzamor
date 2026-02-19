import { defineType, defineField } from "sanity";

export const configuracaoGlobal = defineType({
  name: "configuracaoGlobal",
  title: "Configuração Global",
  type: "document",
  fields: [
    defineField({
      name: "nomeSite",
      title: "Nome do Site",
      type: "string",
    }),

    defineField({
      name: "descricaoSite",
      title: "Descrição do Site",
      type: "text",
    }),

    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),

    defineField({
      name: "contato",
      title: "Contato",
      type: "object",
      fields: [
        {
          name: "email",
          type: "string",
        },
        {
          name: "telefone",
          type: "string",
        },
        {
          name: "endereco",
          type: "string",
        },
        {
          name: "facebook",
          type: "url",
        },
        {
          name: "instagram",
          type: "url",
        },
        {
          name: "linkedin",
          type: "url",
        },
      ],
    }),

    defineField({
      name: "tema",
      title: "Tema Visual",
      type: "object",
      fields: [
        {
          name: "corPrimaria",
          title: "Cor Primária",
          type: "string",
          description: "Ex: #0D3B66",
        },
        {
          name: "corSecundaria",
          title: "Cor Secundária",
          type: "string",
        },
        {
          name: "corDestaque",
          title: "Cor de Destaque",
          type: "string",
        },
        {
          name: "corFundo",
          title: "Cor de Fundo",
          type: "string",
        },
        {
          name: "corTexto",
          title: "Cor de Texto",
          type: "string",
        },
      ],
    }),
  ],
});
