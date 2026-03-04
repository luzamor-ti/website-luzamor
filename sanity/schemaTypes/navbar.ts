import { defineType, defineField } from "sanity";
import type { Rule } from "sanity";

const paginasDisponiveis = [
  { title: "Home", value: "home" },
  { title: "Projetos", value: "projetos" },
  { title: "Sobre Nós", value: "sobre-nos" },
  { title: "Salas de Aula", value: "salas-aula" },
  { title: "Contato", value: "contato" },
  { title: "Auditório", value: "auditorio" },
  { title: "Diretoria", value: "diretoria" },
  { title: "Palavra do Presidente", value: "palavra-presidente" },
  { title: "Patrocinador", value: "patrocinador" },
  { title: "Calendário de Eventos", value: "calendario-eventos" },
  { title: "Cursos", value: "cursos" },
];

export const navbar = defineType({
  name: "navbar",
  title: "Navbar",
  type: "document",
  fields: [
    defineField({
      name: "itens",
      title: "Itens do Menu",
      type: "array",
      of: [
        {
          type: "object",
          name: "menuItem",
          fields: [
            {
              name: "pagina",
              title: "Página",
              type: "string",
              options: {
                list: paginasDisponiveis,
              },
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: "titulo",
              title: "Título do Item",
              type: "string",
              validation: (Rule: Rule) => Rule.required(),
              description: "Texto que aparecerá no menu",
            },
            {
              name: "subItens",
              title: "Sub-itens (Menu Dropdown)",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "subMenuItem",
                  fields: [
                    {
                      name: "pagina",
                      title: "Página",
                      type: "string",
                      options: {
                        list: paginasDisponiveis,
                      },
                      validation: (Rule: Rule) => Rule.required(),
                    },
                    {
                      name: "titulo",
                      title: "Título do Sub-item",
                      type: "string",
                      validation: (Rule: Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: {
                      titulo: "titulo",
                      pagina: "pagina",
                    },
                    prepare({ titulo, pagina }) {
                      return {
                        title: titulo,
                        subtitle: `→ ${pagina}`,
                      };
                    },
                  },
                },
              ],
              description: "Adicione sub-itens para criar um menu dropdown",
            },
          ],
          preview: {
            select: {
              titulo: "titulo",
              pagina: "pagina",
              temSubItens: "subItens",
            },
            prepare({ titulo, pagina, temSubItens }) {
              const hasDropdown = temSubItens && temSubItens.length > 0;
              return {
                title: titulo,
                subtitle: hasDropdown
                  ? `${pagina} (${temSubItens.length} sub-itens)`
                  : pagina,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "botaoPrincipal",
      title: "Botão Principal",
      type: "object",
      fields: [
        {
          name: "titulo",
          title: "Título do Botão",
          type: "string",
        },
      ],
    }),
  ],
});
