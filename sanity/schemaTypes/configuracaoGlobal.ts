import { defineType, defineField } from "sanity";
import type { Rule } from "sanity";

export const configuracaoGlobal = defineType({
  name: "configuracaoGlobal",
  title: "Configuração Global",
  type: "document",
  groups: [
    { name: "identidade", title: "Identidade da Fundação", default: true },
    { name: "contato", title: "Contato e Redes Sociais" },
    { name: "tema", title: "Cores e Aparência" },
  ],
  fields: [
    defineField({
      name: "nomeSite",
      title: "Nome da Fundação",
      type: "string",
      description:
        "Nome oficial da fundação como aparece no site e nas abas do navegador",
      group: "identidade",
    }),

    defineField({
      name: "descricaoSite",
      title: "Descrição Geral",
      type: "text",
      description:
        "Texto curto que descreve a fundação — usado em buscas no Google (SEO)",
      group: "identidade",
    }),

    defineField({
      name: "logo",
      title: "Logo da Fundação",
      type: "image",
      description: "Logotipo exibido no menu e no rodapé do site",
      options: { hotspot: true },
      group: "identidade",
    }),

    defineField({
      name: "contato",
      title: "Contato e Redes Sociais",
      type: "object",
      description:
        "Informações de contato e perfis em redes sociais usados em todo o site",
      group: "contato",
      fields: [
        {
          name: "email",
          title: "E-mail",
          type: "string",
          description: "E-mail de contato principal",
        },
        {
          name: "telefone",
          title: "Telefone",
          type: "string",
          description: "Número com DDD, ex: (11) 2222-3333",
        },
        {
          name: "whatsapp",
          title: "WhatsApp",
          type: "string",
          description:
            "Número padrão para inscrições e contato via WhatsApp. Formato: 5511999999999 (sem espaços ou símbolos)",
          placeholder: "5511999999999",
        },
        {
          name: "endereco",
          title: "Endereço",
          type: "string",
          description: "Endereço completo da fundação",
        },
        {
          name: "facebook",
          title: "Facebook",
          type: "url",
          description: "URL completa da página no Facebook",
        },
        {
          name: "instagram",
          title: "Instagram",
          type: "url",
          description: "URL completa do perfil no Instagram",
        },
        {
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
          description: "URL completa da página no LinkedIn",
        },
      ],
    }),

    defineField({
      name: "tema",
      title: "Cores do Site",
      type: "object",
      description:
        "Configure as cores do site. Use códigos hexadecimais (ex: #00B749). Altere com cuidado — afeta todo o visual do site.",
      group: "tema",
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
