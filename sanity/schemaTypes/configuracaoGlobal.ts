import { defineType, defineField } from "sanity";
import type { Rule } from "sanity";

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
          name: "whatsapp",
          title: "WhatsApp",
          type: "string",
          description: "Número padrão para inscrições. Formato: 5511999999999",
          placeholder: "5511999999999",
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
      description:
        "Configure as cores do site. Use códigos hexadecimais (ex: #00B749)",
      fields: [
        {
          name: "primaryColor",
          title: "Cor Primária",
          type: "string",
          description:
            "Cor principal do site (ex: #00B749). Usada em botões, links e destaques.",
          placeholder: "#00B749",
          validation: (Rule: Rule) =>
            Rule.custom((value: string) => {
              if (!value) return true;
              return (
                /^#[0-9A-Fa-f]{6}$/.test(value) ||
                "Use formato hexadecimal: #000000"
              );
            }),
        },
        {
          name: "secondaryColor",
          title: "Cor Secundária",
          type: "string",
          description: "Cor secundária para elementos de apoio.",
          placeholder: "#8b5cf6",
          validation: (Rule: Rule) =>
            Rule.custom((value: string) => {
              if (!value) return true;
              return (
                /^#[0-9A-Fa-f]{6}$/.test(value) ||
                "Use formato hexadecimal: #000000"
              );
            }),
        },
        {
          name: "accentColor",
          title: "Cor de Destaque",
          type: "string",
          description: "Cor para chamar atenção em elementos específicos.",
          placeholder: "#10b981",
          validation: (Rule: Rule) =>
            Rule.custom((value: string) => {
              if (!value) return true;
              return (
                /^#[0-9A-Fa-f]{6}$/.test(value) ||
                "Use formato hexadecimal: #000000"
              );
            }),
        },
        {
          name: "backgroundColor",
          title: "Cor de Fundo",
          type: "string",
          description: "Cor de fundo padrão do site.",
          placeholder: "#ffffff",
          validation: (Rule: Rule) =>
            Rule.custom((value: string) => {
              if (!value) return true;
              return (
                /^#[0-9A-Fa-f]{6}$/.test(value) ||
                "Use formato hexadecimal: #000000"
              );
            }),
        },
        {
          name: "textColor",
          title: "Cor de Texto",
          type: "string",
          description: "Cor padrão do texto.",
          placeholder: "#1f2937",
          validation: (Rule: Rule) =>
            Rule.custom((value: string) => {
              if (!value) return true;
              return (
                /^#[0-9A-Fa-f]{6}$/.test(value) ||
                "Use formato hexadecimal: #000000"
              );
            }),
        },
      ],
    }),
  ],
});
