import { defineField, defineType } from "sanity";

export default defineType({
  name: "paginaParceiros",
  title: "Página de Parceiros",
  type: "document",
  // Singleton — apenas um documento
  fields: [
    // ── Hero ──
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({
          name: "tag",
          title: "Tag (texto pequeno acima do título)",
          type: "string",
          initialValue: "Transparência e Gratidão",
        }),
        defineField({
          name: "titulo",
          title: "Título",
          type: "string",
          initialValue: "Nossos Parceiros e Amigos",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "descricao",
          title: "Descrição",
          type: "text",
          rows: 3,
          initialValue:
            "Um enorme obrigado a todos os parceiros, apoiadores e doadores que tornam nossa missão possível.",
        }),
        defineField({
          name: "imagemFundo",
          title: "Imagem de Fundo",
          type: "image",
          options: { hotspot: true },
          description: "Imagem exibida ao fundo da seção hero",
          fields: [
            defineField({
              name: "alt",
              title: "Texto Alternativo",
              type: "string",
            }),
          ],
        }),
      ],
    }),

    // ── CTA Principal ──
    defineField({
      name: "ctaPrincipal",
      title: "CTA Principal",
      type: "object",
      fields: [
        defineField({
          name: "titulo",
          title: "Título",
          type: "string",
          initialValue: "Faça Parte da Mudança",
        }),
        defineField({
          name: "descricao",
          title: "Descrição",
          type: "text",
          rows: 2,
          initialValue:
            "Sua empresa ou você pode transformar vidas. Conheça as formas de apoiar a Fundação Luz & Amor e juntos faremos mais.",
        }),
        defineField({
          name: "botaoPatrocinador",
          title: "Texto do Botão: Patrocinador",
          type: "string",
          initialValue: "Seja um Patrocinador",
        }),
        defineField({
          name: "botaoApoiador",
          title: "Texto do Botão: Apoiador",
          type: "string",
          initialValue: "Seja um Apoiador",
        }),
        defineField({
          name: "botaoDoador",
          title: "Texto do Botão: Doação",
          type: "string",
          initialValue: "Faça uma Doação",
        }),
      ],
    }),

    // ── Seção de Parceiros ──
    defineField({
      name: "secaoParceiros",
      title: "Seção: Patrocinadores e Apoiadores",
      type: "object",
      fields: [
        defineField({
          name: "tag",
          title: "Tag",
          type: "string",
          initialValue: "Parceiros",
        }),
        defineField({
          name: "titulo",
          title: "Título",
          type: "string",
          initialValue: "Patrocinadores e Apoiadores",
        }),
        defineField({
          name: "descricao",
          title: "Descrição",
          type: "text",
          rows: 2,
          initialValue:
            "Empresas, instituições e editais que acreditam e investem no nosso trabalho.",
        }),
        defineField({
          name: "labelAba2026",
          title: "Label Aba Ano Atual",
          type: "string",
          initialValue: "Parceiros de 2026",
        }),
        defineField({
          name: "labelAbaAnteriores",
          title: "Label Aba Anos Anteriores",
          type: "string",
          initialValue: "Parceiros Anteriores",
        }),
        defineField({
          name: "mensagemVazioAtual",
          title: "Mensagem quando não há parceiros no ano atual",
          type: "string",
          initialValue: "Nenhuma parceria cadastrada para 2026 ainda.",
        }),
        defineField({
          name: "mensagemVazioAnteriores",
          title: "Mensagem quando não há parceiros anteriores",
          type: "string",
          initialValue: "Nenhuma parceria anterior cadastrada.",
        }),
      ],
    }),

    // ── Seção Apoiadores Individuais ──
    defineField({
      name: "secaoIndividuais",
      title: "Seção: Apoiadores Individuais",
      type: "object",
      fields: [
        defineField({
          name: "tag",
          title: "Tag",
          type: "string",
          initialValue: "Pessoas que fazem a diferença",
        }),
        defineField({
          name: "titulo",
          title: "Título",
          type: "string",
          initialValue: "Apoiadores Individuais",
        }),
        defineField({
          name: "descricao",
          title: "Descrição",
          type: "text",
          rows: 2,
          initialValue:
            "Pessoas físicas que contribuem com sua presença e apoio direto à fundação.",
        }),
      ],
    }),

    // ── Seção Doadores ──
    defineField({
      name: "secaoDoadores",
      title: "Seção: Doadores",
      type: "object",
      fields: [
        defineField({
          name: "tag",
          title: "Tag",
          type: "string",
          initialValue: "Gratidão",
        }),
        defineField({
          name: "titulo",
          title: "Título",
          type: "string",
          initialValue: "Nossos Doadores",
        }),
        defineField({
          name: "descricao",
          title: "Descrição",
          type: "text",
          rows: 2,
          initialValue:
            "Cada contribuição, pequena ou grande, faz toda a diferença em nossa missão.",
        }),
        defineField({
          name: "tituloMensais",
          title: "Título: Doadores Mensais",
          type: "string",
          initialValue: "Doadores Mensais",
        }),
        defineField({
          name: "tituloPontuais",
          title: "Título: Doadores Pontuais",
          type: "string",
          initialValue: "Doadores Pontuais",
        }),
      ],
    }),

    // ── CTA Final ──
    defineField({
      name: "ctaFinal",
      title: "CTA Final (fundo colorido)",
      type: "object",
      fields: [
        defineField({
          name: "titulo",
          title: "Título",
          type: "string",
          initialValue: "Sua empresa pode estar aqui",
        }),
        defineField({
          name: "descricao",
          title: "Descrição",
          type: "text",
          rows: 2,
          initialValue:
            "Entre em contato e descubra como fazer parte da rede de parceiros da Fundação Luz & Amor.",
        }),
        defineField({
          name: "textoBotao",
          title: "Texto do Botão",
          type: "string",
          initialValue: "Entrar em Contato",
        }),
      ],
    }),
  ],

  preview: {
    prepare() {
      return { title: "Página de Parceiros" };
    },
  },
});
