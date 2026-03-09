import { defineType, defineField } from "sanity";

export const rodape = defineType({
  name: "rodape",
  title: "Rodapé",
  type: "document",
  groups: [
    { name: "geral", title: "Texto e Slogan", default: true },
    { name: "contatos", title: "Contatos e Endereço" },
    { name: "apoiador", title: "Seção Seja Apoiador" },
  ],
  fields: [
    defineField({
      name: "slogan",
      title: "Slogan",
      type: "string",
      description: "Frase curta exibida no rodapé, abaixo do logo da fundação",
      group: "geral",
    }),
    defineField({
      name: "contatos",
      title: "Contatos",
      type: "object",
      description: "Informações de contato que aparecem no rodapé do site",
      group: "contatos",
      fields: [
        {
          name: "email",
          type: "string",
          title: "E-mail de Contato",
          description: "E-mail principal de contato da fundação",
        },
        {
          name: "telefone",
          type: "string",
          title: "Telefone / WhatsApp",
          description: "Número com DDD, ex: (11) 99999-9999",
        },
        {
          name: "endereco",
          type: "string",
          title: "Endereço",
          description:
            "Endereço completo da fundação, ex: Rua das Flores, 123 — São Paulo, SP",
        },
        {
          name: "linkMaps",
          type: "string",
          title: "Link Google Maps",
          description:
            "Cole aqui o link do Google Maps para o endereço da fundação",
        },
      ],
    }),
    defineField({
      name: "sejaApoiadorTitulo",
      title: "Título — Seja Apoiador",
      type: "string",
      description: "Título do bloco de chamada para novos apoiadores no rodapé",
      group: "apoiador",
    }),
    defineField({
      name: "sejaApoiadorSubtitulo",
      title: "Subtítulo — Seja Apoiador",
      type: "text",
      description: "Texto de apoio para incentivar novos apoiadores",
      group: "apoiador",
    }),
    defineField({
      name: "emailDestino",
      title: "E-mail que Recebe Inscrições de Apoiadores",
      type: "string",
      description:
        "E-mail para onde vão os formulários de inscrição de novos apoiadores (pode ser diferente do e-mail de contato)",
      group: "apoiador",
    }),
  ],
});
