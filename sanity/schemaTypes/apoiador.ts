import { defineField, defineType } from "sanity";

export const apoiador = defineType({
  name: "apoiador",
  title: "Apoiador / Patrocinador",
  type: "document",
  fields: [
    defineField({
      name: "nome",
      title: "Nome",
      type: "string",
      description: "Nome da empresa, pessoa, Lei ou Edital",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo / Foto",
      type: "image",
      options: { hotspot: true },
      description: "Logo da empresa ou foto da pessoa",
    }),
    defineField({
      name: "site",
      title: "Link (Opcional)",
      type: "url",
      description: "Site da empresa, rede social ou página do edital",
    }),
    defineField({
      name: "tipo",
      title: "Tipo",
      type: "string",
      options: {
        list: [
          { title: "Patrocinador", value: "patrocinador" },
          { title: "Apoiador", value: "apoiador" },
          { title: "Apoiador — Pessoa Física", value: "apoiadorIndividual" },
          { title: "Doador Mensal", value: "doadorMensal" },
          { title: "Doador Pontual", value: "doadorPontual" },
        ],
        layout: "radio",
      },
      initialValue: "apoiador",
      validation: (Rule) =>
        Rule.required().warning(
          "Recomendado preencher o tipo; registros antigos serão migrados em breve.",
        ),
    }),
    defineField({
      name: "ano",
      title: "Ano da Parceria",
      type: "number",
      initialValue: new Date().getFullYear(),
      description: "Ano em que a parceria foi realizada",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const tipo = (context.parent as { tipo?: string })?.tipo;
          if (tipo === "doadorMensal" || tipo === "doadorPontual") return true;
          if (value === undefined || value === null)
            return "O ano da parceria é obrigatório para Patrocinadores e Apoiadores";
          if (!Number.isInteger(value) || value <= 0)
            return "Informe um ano válido (número inteiro positivo)";
          return true;
        }),
      hidden: ({ parent }) =>
        parent?.tipo === "doadorMensal" || parent?.tipo === "doadorPontual",
    }),
    defineField({
      name: "categoria",
      title: "Categoria",
      type: "reference",
      to: [{ type: "categoriaParceria" }],
      description:
        "Ex: Lei Rouanet, Edital da Prefeitura — obrigatório para Patrocinadores e Apoiadores",
      hidden: ({ parent }) =>
        !["patrocinador", "apoiador"].includes(parent?.tipo),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const tipo = (context.parent as { tipo?: string })?.tipo;
          if ((tipo === "patrocinador" || tipo === "apoiador") && !value) {
            return "A categoria é obrigatória para Patrocinadores e Apoiadores";
          }
          return true;
        }),
    }),
    defineField({
      name: "destaque",
      title: "Destaque na Home",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "ordem",
      title: "Ordem de Exibição",
      type: "number",
      description: "Número menor aparece primeiro dentro da categoria",
    }),
  ],
  preview: {
    select: {
      title: "nome",
      subtitle: "tipo",
      media: "logo",
    },
    prepare({ title, subtitle, media }) {
      const labels: Record<string, string> = {
        patrocinador: "Patrocinador",
        apoiador: "Apoiador",
        apoiadorIndividual: "Apoiador Individual",
        doadorMensal: "Doador Mensal",
        doadorPontual: "Doador Pontual",
      };
      return {
        title,
        subtitle: labels[subtitle] || subtitle,
        media,
      };
    },
  },
});
