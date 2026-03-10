import { defineType, defineField } from "sanity";

export const membro = defineType({
  name: "membro",
  title: "Membro da Equipe",
  type: "document",
  groups: [
    { name: "dadosPessoais", title: "Dados Pessoais", default: true },
    { name: "diretoria", title: "Cargo e Diretoria" },
    { name: "conteudo", title: "Textos e Publicações" },
  ],
  fields: [
    defineField({
      name: "nome",
      title: "Nome Completo",
      type: "string",
      description: "Nome completo que será exibido no site",
      validation: (Rule) => Rule.required(),
      group: "dadosPessoais",
    }),
    defineField({
      name: "foto",
      title: "Foto",
      type: "image",
      description:
        "Foto do membro (preferencialmente quadrada, com boa resolução)",
      options: { hotspot: true },
      group: "dadosPessoais",
    }),
    defineField({
      name: "alt",
      title: "Descrição da Foto",
      type: "string",
      description:
        "Breve descrição da imagem para acessibilidade (ex: 'Foto de João Silva sorrindo')",
      group: "dadosPessoais",
    }),
    defineField({
      name: "bioCurta",
      title: "Bio Curta",
      type: "text",
      rows: 2,
      description: "Resumo em 1–2 linhas exibido em cards e listagens do site",
      group: "dadosPessoais",
    }),
    defineField({
      name: "cargo",
      title: "Cargo ou Função",
      type: "string",
      description:
        "Cargo específico exibido no site (ex: Conselheira de Educação, Diretora Financeira)",
      group: "diretoria",
    }),
    defineField({
      name: "diretoria",
      title: "Faz parte da Diretoria?",
      type: "boolean",
      description:
        "Marque caso este membro deva aparecer na página de Diretoria",
      initialValue: false,
      group: "diretoria",
    }),
    defineField({
      name: "tipoCargo",
      title: "Tipo de Cargo",
      type: "string",
      description:
        "Categoria hierárquica usada para agrupar membros na página de Diretoria",
      options: {
        list: [
          { title: "Presidente", value: "presidente" },
          { title: "Vice-Presidente", value: "vice-presidente" },
          { title: "Diretor(a)", value: "diretor" },
          { title: "Secretário(a)", value: "secretario" },
          { title: "Tesoureiro(a)", value: "tesoureiro" },
          { title: "Conselheiro(a)", value: "conselheiro" },
          { title: "Outro", value: "outro" },
        ],
      },
      hidden: ({ parent }: { parent?: { diretoria?: boolean } }) =>
        !parent?.diretoria,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const ctx = context as { parent?: { diretoria?: boolean } };
          if (ctx?.parent?.diretoria && !value) {
            return "Selecione o tipo de cargo para membros da Diretoria.";
          }
          return true;
        }),
      group: "diretoria",
    }),
    defineField({
      name: "ordem",
      title: "Ordem de Exibição",
      type: "number",
      description:
        "Define a posição na listagem — número menor aparece primeiro (ex: 1, 2, 3…)",
      group: "diretoria",
    }),
    defineField({
      name: "bioCompleta",
      title: "Biografia Completa",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Texto mais detalhado sobre o membro, exibido na página individual",
      group: "conteudo",
    }),
    defineField({
      name: "palavra",
      title: "Palavra do Membro",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Mensagem ou depoimento pessoal — aparece na página 'Palavra do Presidente'",
      group: "conteudo",
    }),
  ],
  preview: {
    select: {
      title: "nome",
      subtitle: "cargo",
      media: "foto",
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || "Membro sem nome",
        subtitle: subtitle || "Sem cargo informado",
        media,
      };
    },
  },
});
