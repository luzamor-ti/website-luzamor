import { defineType, defineField } from "sanity";
import type { LucideIcon } from "lucide-react";
import { paginasInternas } from "./paginasInternas";
import {
  Users,
  DollarSign,
  Clock,
  Heart,
  Handshake,
  GraduationCap,
  Target,
  TrendingUp,
  Award,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  Star,
  Sparkles,
  Zap,
} from "lucide-react";

// Lista de ícones disponíveis com preview visual
const iconOptions = [
  { title: "👥 Pessoas", value: "Users" },
  { title: "💰 Dinheiro", value: "DollarSign" },
  { title: "⏰ Tempo/Relógio", value: "Clock" },
  { title: "❤️ Coração", value: "Heart" },
  { title: "🤝 Aperto de Mãos", value: "Handshake" },
  { title: "🎓 Educação", value: "GraduationCap" },
  { title: "🎯 Alvo/Meta", value: "Target" },
  { title: "📈 Crescimento", value: "TrendingUp" },
  { title: "🏆 Troféu/Prêmio", value: "Award" },
  { title: "💬 Mensagem", value: "MessageCircle" },
  { title: "📧 Email", value: "Mail" },
  { title: "📞 Telefone", value: "Phone" },
  { title: "📍 Localização", value: "MapPin" },
  { title: "📅 Calendário", value: "Calendar" },
  { title: "✓ Check/Confirmação", value: "CheckCircle" },
  { title: "⭐ Estrela", value: "Star" },
  { title: "✨ Brilho/Destaque", value: "Sparkles" },
  { title: "⚡ Raio/Energia", value: "Zap" },
];

export default defineType({
  name: "secaoHome",
  title: "Seções da Home",
  type: "document",
  groups: [
    {
      name: "identificacao",
      title: "Identificação",
    },
    {
      name: "conteudo",
      title: "Conteúdo Principal",
    },
    {
      name: "acoes",
      title: "Botões e Links",
    },
    {
      name: "cards",
      title: "Cards/Itens",
    },
    {
      name: "configuracoes",
      title: "Configurações",
    },
  ],
  fields: [
    // ========== GRUPO: IDENTIFICAÇÃO ==========
    defineField({
      name: "nome",
      title: "Tipo da Seção",
      type: "string",
      description:
        "⚠️ Escolha o tipo de seção que deseja criar. Não altere após criar!",
      validation: (Rule) => Rule.required(),
      group: "identificacao",
      options: {
        list: [
          { title: "📝 Introdução", value: "intro" },
          { title: "🎯 Projetos", value: "projects" },
          { title: "👥 Membros da Equipe", value: "members" },
          { title: "🤝 Apoiadores/Parceiros", value: "supporters" },
          { title: "❓ Perguntas Frequentes (FAQ)", value: "faq" },
          { title: "📧 Contato", value: "contact" },
          { title: "📊 Impacto/Números", value: "impact" },
          { title: "🌟 Iniciativas", value: "initiatives" },
          { title: "🙋 Como Ajudar", value: "howToHelp" },
        ],
        layout: "dropdown",
      },
    }),

    defineField({
      name: "ativa",
      title: "Seção Ativa",
      type: "boolean",
      description: "Marque para exibir esta seção na página inicial",
      initialValue: true,
      group: "identificacao",
    }),

    // ========== GRUPO: CONTEÚDO PRINCIPAL ==========
    defineField({
      name: "tag",
      title: "Tag Superior (opcional)",
      type: "string",
      description:
        "Texto pequeno que aparece acima do título (ex: 'Conheça nosso trabalho')",
      group: "conteudo",
      placeholder: "Nossa Missão",
    }),

    defineField({
      name: "titulo",
      title: "Título Principal",
      type: "string",
      description: "O título grande e principal da seção",
      validation: (Rule) => Rule.required().max(100),
      group: "conteudo",
      placeholder: "Como você pode nos ajudar",
      hidden: ({ parent }) => parent?.nome === "supporters",
    }),

    defineField({
      name: "descricao",
      title: "Descrição",
      type: "text",
      description: "Texto explicativo que aparece abaixo do título",
      rows: 3,
      group: "conteudo",
      placeholder: "Descreva o conteúdo desta seção...",
      hidden: ({ parent }) => parent?.nome === "contact",
    }),

    defineField({
      name: "imagem",
      title: "Imagem Principal da Seção",
      type: "image",
      description:
        "Imagem principal da seção (usada em algumas seções como Introdução)",
      group: "conteudo",
      hidden: ({ parent }) => parent?.nome !== "intro",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto Alternativo",
          description: "Descreva a imagem para acessibilidade",
        },
      ],
    }),

    // ========== GRUPO: AÇÕES (BOTÕES E LINKS) ==========
    defineField({
      name: "textoBotao",
      title: "Texto do Botão / Rodapé da Seção",
      type: "string",
      description:
        "Texto do botão CTA (seção Introdução) ou do texto de rodapé da seção (Iniciativas, Como Ajudar)",
      group: "acoes",
      placeholder: "Junte-se à nossa missão",
      hidden: ({ parent }) =>
        !["intro", "initiatives", "howToHelp"].includes(parent?.nome),
    }),

    defineField({
      name: "urlBotao",
      title: "Página de Destino do Botão Principal",
      type: "string",
      description:
        "Selecione a página interna para onde o botão principal deve levar.",
      group: "acoes",
      options: {
        list: paginasInternas,
        layout: "dropdown",
      },
      hidden: ({ parent }) => parent?.nome !== "intro" || !parent?.textoBotao,
    }),

    defineField({
      name: "textoLink",
      title: "Texto do Link Secundário",
      type: "string",
      description: "Texto de um link alternativo/secundário (se houver)",
      group: "acoes",
      placeholder: "Saiba mais",
      hidden: ({ parent }) =>
        !["projects", "supporters", "initiatives", "howToHelp"].includes(
          parent?.nome,
        ),
    }),

    defineField({
      name: "urlLink",
      title: "Página de Destino do Link Secundário",
      type: "string",
      description:
        "Selecione a página interna para onde o link secundário deve levar.",
      group: "acoes",
      options: {
        list: paginasInternas,
        layout: "dropdown",
      },
      hidden: ({ parent }) =>
        !["projects", "supporters", "initiatives", "howToHelp"].includes(
          parent?.nome,
        ) || !parent?.textoLink,
    }),

    // ========== GRUPO: CARDS/ITENS ==========
    defineField({
      name: "cards",
      title: "Cards/Itens da Seção",
      type: "array",
      description: "Adicione os cards ou itens que aparecerão nesta seção",
      group: "cards",
      hidden: ({ parent }) =>
        !["impact", "initiatives", "howToHelp"].includes(parent?.nome),
      of: [
        {
          type: "object",
          name: "card",
          title: "Card",
          fields: [
            defineField({
              name: "titulo",
              title: "Título do Card",
              type: "string",
              description: "Título principal do card",
              validation: (Rule) => Rule.required().max(60),
              placeholder: "Faça uma doação",
            }),

            defineField({
              name: "descricao",
              title: "Descrição do Card",
              type: "text",
              description: "Texto explicativo do card",
              rows: 3,
              validation: (Rule) => Rule.max(200),
              placeholder: "Sua contribuição financeira ajuda...",
              hidden: ({ document }) =>
                !["impact", "howToHelp"].includes(document?.nome as string),
            }),

            defineField({
              name: "icone",
              title: "Ícone",
              type: "string",
              description: "Selecione um ícone para o card",
              options: {
                list: iconOptions,
                layout: "dropdown",
              },
              hidden: ({ document }) => document?.nome !== "howToHelp",
            }),

            defineField({
              name: "imagem",
              title: "Imagem do Card (opcional)",
              type: "image",
              description: "Imagem de fundo ou destaque do card",
              options: {
                hotspot: true,
              },
            }),

            defineField({
              name: "url",
              title: "Destino do Card",
              type: "string",
              description:
                "Selecione uma página interna ou escolha WhatsApp para abrir o contato da fundação",
              options: {
                list: [
                  ...paginasInternas,
                  { title: "――――――――――――――――――", value: "" },
                  { title: "🌐 WhatsApp", value: "__whatsapp__" },
                ],
                layout: "dropdown",
              },
              hidden: ({ document }) =>
                !["initiatives", "howToHelp"].includes(
                  document?.nome as string,
                ),
            }),

            defineField({
              name: "subtitulo",
              title: "Subtítulo (opcional)",
              type: "string",
              description: "Texto secundário do card (uso específico)",
              placeholder: "Texto adicional",
              hidden: ({ document }) => document?.nome !== "initiatives",
            }),

            defineField({
              name: "numero",
              title: "Número/Métrica",
              type: "string",
              description:
                "Número ou estatística exibida no card de impacto (ex: 652+, 100%)",
              placeholder: "652+",
              hidden: ({ document }) => document?.nome !== "impact",
            }),
          ],
          preview: {
            select: {
              title: "titulo",
              subtitle: "descricao",
              media: "imagem",
              icon: "icone",
            },
            prepare({ title, subtitle, media, icon }) {
              // Mapear ícones para componentes React
              const iconMap: Record<string, LucideIcon> = {
                Users,
                DollarSign,
                Clock,
                Heart,
                Handshake,
                GraduationCap,
                Target,
                TrendingUp,
                Award,
                MessageCircle,
                Mail,
                Phone,
                MapPin,
                Calendar,
                CheckCircle,
                Star,
                Sparkles,
                Zap,
              };

              const IconComponent = icon ? iconMap[icon] : null;

              return {
                title: title || "Card sem título",
                subtitle: subtitle
                  ? subtitle.substring(0, 60) + "..."
                  : "Sem descrição",
                media: media || (IconComponent ? IconComponent : undefined),
              };
            },
          },
        },
      ],
    }),

    // ========== GRUPO: CONFIGURAÇÕES AVANÇADAS ==========
    defineField({
      name: "labels",
      title: "Labels de Contato",
      type: "object",
      description:
        "Rótulos exibidos na seção de Contato ao lado das informações de e-mail, telefone e endereço",
      group: "configuracoes",
      hidden: ({ parent }) => parent?.nome !== "contact",
      options: {
        collapsed: true,
      },
      fields: [
        defineField({
          name: "email",
          title: "Label do Email",
          type: "string",
          placeholder: "Email",
        }),
        defineField({
          name: "telefone",
          title: "Label do Telefone",
          type: "string",
          placeholder: "Telefone",
        }),
        defineField({
          name: "endereco",
          title: "Label do Endereço",
          type: "string",
          placeholder: "Endereço",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "titulo",
      subtitle: "nome",
      active: "ativa",
    },
    prepare({ title, subtitle, active }) {
      const sectionNames: Record<string, string> = {
        intro: "📝 Introdução",
        projects: "🎯 Projetos",
        members: "👥 Membros",
        supporters: "🤝 Apoiadores",
        faq: "❓ FAQ",
        contact: "📧 Contato",
        impact: "📊 Impacto",
        initiatives: "🌟 Iniciativas",
        howToHelp: "🙋 Como Ajudar",
      };

      return {
        title: title || "⚠️ Sem título",
        subtitle: `${sectionNames[subtitle] || subtitle} ${!active ? "⚫ Inativa" : ""}`,
      };
    },
  },
  orderings: [
    {
      title: "Tipo de Seção",
      name: "sectionType",
      by: [{ field: "nome", direction: "asc" }],
    },
    {
      title: "Título",
      name: "title",
      by: [{ field: "titulo", direction: "asc" }],
    },
  ],
});
