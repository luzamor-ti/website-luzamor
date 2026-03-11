import { defineType, defineField } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "Pergunta Frequente (FAQ)",
  type: "document",
  fields: [
    defineField({
      name: "pergunta",
      title: "Pergunta",
      type: "string",
      description:
        "Escreva a pergunta exatamente como ela deve aparecer no site",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "resposta",
      title: "Resposta",
      type: "array",
      of: [{ type: "block" }],
      description: "Resposta completa para a pergunta acima",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categoria",
      title: "Categoria",
      type: "string",
      description:
        "Agrupa perguntas do mesmo assunto para facilitar a leitura no site",
      options: {
        list: [
          { title: "Cursos e Oficinas", value: "cursos" },
          { title: "Eventos", value: "eventos" },
          { title: "Doações e Apoio", value: "doacoes" },
          { title: "A Fundação", value: "fundacao" },
          { title: "Projetos", value: "projetos" },
          { title: "Geral", value: "geral" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "ordem",
      title: "Ordem de Exibição",
      type: "number",
      description: "Número menor aparece primeiro na lista. Ex: 1, 2, 3…",
    }),
    defineField({
      name: "ativo",
      title: "Visível no Site",
      type: "boolean",
      description:
        "Desmarque para ocultar esta pergunta sem precisar excluí-la",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "pergunta",
      subtitle: "categoria",
    },
    prepare({ title, subtitle }) {
      const categorias: Record<string, string> = {
        cursos: "Cursos e Oficinas",
        eventos: "Eventos",
        doacoes: "Doações e Apoio",
        fundacao: "A Fundação",
        projetos: "Projetos",
        geral: "Geral",
      };
      return {
        title: title || "Pergunta sem texto",
        subtitle: subtitle ? categorias[subtitle] || subtitle : "Sem categoria",
      };
    },
  },
});
