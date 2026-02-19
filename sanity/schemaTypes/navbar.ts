import { defineType, defineField } from "sanity";

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
          fields: [
            {
              name: "tituloPersonalizado",
              title: "Título Personalizado (opcional)",
              type: "string",
              description:
                "Se vazio, usa automaticamente o título da página vinculada",
            },
            // {
            //   name: "pagina",
            //   title: "Página Vinculada",
            //   type: "reference",
            //   to: [
            //     { type: "paginaSobre" },
            //     { type: "paginaContato" },
            //     { type: "paginaProjetos" },
            //     { type: "paginaTrabalhos" },
            //     { type: "paginaHome" },
            //   ],
            //   validation: (Rule) => Rule.required(),
            // },
            // {
            //   name: "submenu",
            //   title: "Submenu",
            //   type: "array",
            //   of: [
            //     {
            //       type: "object",
            //       fields: [
            //         {
            //           name: "tituloPersonalizado",
            //           title: "Título Personalizado",
            //           type: "string",
            //         },
            //         {
            //           name: "pagina",
            //           title: "Página Vinculada",
            //           type: "reference",
            //           to: [
            //             { type: "paginaSobre" },
            //             { type: "paginaContato" },
            //             { type: "paginaProjetos" },
            //             { type: "paginaTrabalhos" },
            //           ],
            //         },
            //       ],
            //     },
            //   ],
            // },
          ],
        },
      ],
    }),
  ],
});
