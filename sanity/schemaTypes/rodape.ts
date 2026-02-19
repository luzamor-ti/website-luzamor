import { defineType, defineField } from "sanity";

export const rodape = defineType({
  name: "rodape",
  title: "Rodapé",
  type: "document",
  fields: [
    defineField({
      name: "slogan",
      title: "Slogan",
      type: "string",
    }),
    defineField({
      name: "sejaApoiadorTitulo",
      title: "Título Seja Apoiador",
      type: "string",
    }),
    defineField({
      name: "sejaApoiadorSubtitulo",
      title: "Subtítulo Seja Apoiador",
      type: "text",
    }),
    defineField({
      name: "emailDestino",
      title: "Email que recebe inscrições",
      type: "string",
    }),
    defineField({
      name: "contatos",
      title: "Contatos",
      type: "object",
      fields: [
        { name: "email", type: "string", title: "Email" },
        { name: "telefone", type: "string", title: "Telefone / WhatsApp" },
        { name: "endereco", type: "string", title: "Endereço" },
        { name: "linkMaps", type: "string", title: "Link Google Maps" },
      ],
    }),
  ],
});
