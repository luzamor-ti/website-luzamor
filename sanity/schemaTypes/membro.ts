import { defineType, defineField } from "sanity";

export const membro = defineType({
  name: "membro",
  title: "Equipe",
  type: "document",
  groups: [
    { name: "dadosPessoais", title: "Dados Pessoais", default: true },
    { name: "equipe", title: "Cargo e Equipe" },
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
      group: "equipe",
    }),
    defineField({
      name: "tipoCargo",
      title: "Tipo de Cargo",
      type: "string",
      description:
        "Categoria ou área de atuação (ex: Direção, Comunicação, Projetos). Campo livre.",
      group: "equipe",
    }),
    defineField({
      name: "isDiretoria",
      title: "Membro da Diretoria?",
      type: "boolean",
      description:
        "Marque como ativo para que este membro apareça na página de Diretoria e na seção 'Nosso Time' do Sobre Nós.",
      initialValue: false,
      group: "equipe",
    }),
    defineField({
      name: "ordem",
      title: "Ordem de Exibição",
      type: "number",
      description:
        "Define a posição na listagem — número menor aparece primeiro (ex: 1, 2, 3…)",
      group: "equipe",
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
      isDiretoria: "isDiretoria",
    },
    prepare({ title, subtitle, media, isDiretoria }) {
      return {
        title: title || "Membro sem nome",
        subtitle: isDiretoria
          ? `⭐ Diretoria · ${subtitle || "Sem cargo"}`
          : subtitle || "Equipe",
        media,
      };
    },
  },
});
