import { SectionName } from "@/sanity/lib/types/homeSection";

/**
 * Text Fallbacks
 *
 * Provides default Portuguese text for all CMS-managed sections.
 * These values are used when CMS data is unavailable or incomplete.
 *
 * Property names are in English (code standard),
 * but text values are in Portuguese (user-facing content).
 */

interface FallbackLabels {
  email?: string;
  phone?: string;
  address?: string;
}

interface FallbackCard {
  title: string;
  description: string;
  number?: string;
  linkText?: string;
  icon?: string;
  image?: string;
}

interface SectionFallback {
  tag?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  linkText?: string;
  number?: string;
  description_footer?: string;
  cards?: FallbackCard[];
  labels?: FallbackLabels;
}

export const TEXT_FALLBACKS: Record<SectionName, SectionFallback> = {
  hero: {
    title: "Fundação Luzamor",
    description: "Transformando vidas através da educação e cultura",
    buttonText: "Conheça Nosso Trabalho",
  },

  intro: {
    tag: "Nossa Missão",
    title: "Bem-vindo à Fundação Luzamor",
    description:
      "A Fundação Luzamor é uma organização sem fins lucrativos dedicada a transformar vidas através da educação, cultura e desenvolvimento comunitário.",
    buttonText: "Saiba Mais",
  },

  metrics: {
    tag: "Impacto",
    title: "Nosso Impacto",
    description:
      "Números que refletem nosso compromisso com a transformação social",
    cards: [
      {
        title: "Pessoas Impactadas",
        description: "Vidas transformadas através de nossos programas",
        number: "5000+",
      },
      {
        title: "Projetos Ativos",
        description: "Iniciativas em andamento em diversas áreas",
        number: "15",
      },
      {
        title: "Anos de História",
        description: "Dedicados ao desenvolvimento comunitário",
        number: "20+",
      },
      {
        title: "Parceiros",
        description: "Organizações e empresas que apoiam nossa missão",
        number: "30+",
      },
    ],
  },

  projects: {
    tag: "Projetos",
    title: "Venha participar dos nossos projetos",
    description:
      "Nosso esforço provê manter e melhorar a cultura de nossa cidade, impactando os cidadãos para um melhor bem-estar.",
    buttonText: "Ver Todos os Projetos",
    linkText: "Ver todos os projetos",
  },

  members: {
    tag: "Equipe",
    title: "Nossa Equipe",
    description:
      "Conheça as pessoas dedicadas que tornam nosso trabalho possível",
    buttonText: "Conheça a Equipe",
    linkText: "Ver Perfil",
  },

  supporters: {
    tag: "Nossos apoiadores em 2026",
    title: "Nossos Apoiadores",
    description: "Empresas e organizações que acreditam e apoiam nossa missão",
    buttonText: "Seja um Apoiador",
    linkText: "Ver todos os apoiadores",
  },

  initiatives: {
    tag: "Iniciativas",
    title: "Nossas Iniciativas",
    description: "Áreas de atuação que fazem a diferença na comunidade",
    cards: [
      {
        title: "Educação",
        description: "Programas educacionais para crianças e jovens",
      },
      {
        title: "Cultura",
        description: "Atividades culturais e artísticas",
      },
      {
        title: "Desenvolvimento Comunitário",
        description: "Projetos que fortalecem a comunidade",
      },
      {
        title: "Capacitação Profissional",
        description: "Cursos e workshops para desenvolvimento de habilidades",
      },
    ],
  },

  faq: {
    tag: "FAQ",
    title: "Seja qual for sua dúvida, a gente respode",
    description:
      "Procure por questões comuns sobre doação, cursos e nossos trabalhos",
  },

  courses: {
    tag: "Cursos",
    title: "Aprenda com a gente",
    description:
      "Cursos gratuitos para a comunidade, ensinando habilidades práticas e transformando vidas",
  },

  events: {
    tag: "Eventos",
    title: "Próximos eventos",
    description:
      "Participe de nossos eventos e faça parte da transformação social",
    buttonText: "Ver todos os eventos",
    linkText: "Ver todos os eventos",
    description_footer:
      "Fique por dentro de todos os nossos eventos e atividades. Participe e faça parte da transformação!",
  },

  contact: {
    tag: "Contato",
    title: "Fale Conosco",
    description:
      "Entre em contato para saber mais ou para contribuir com nosso trabalho",
    buttonText: "Enviar Mensagem",
    labels: {
      email: "Email",
      phone: "Telefone",
      address: "Endereço",
    },
  },

  impact: {
    tag: "Nosso impacto",
    title: "Nossas iniciativas que transformam",
    description:
      "Trabalhando sempre para melhorar o bem-estar e a vida de nossos cidadãos",
    cards: [
      {
        title: "Projetos realizados",
        description:
          "Promovendo a cultura e fomentando a educação da população",
        image: "",
        number: "1.000+",
      },
      {
        title: "Cursos e aulas",
        description: "Com profissionais extremamente competentes",
        image: "",
        number: "20+",
      },
      {
        title: "Parcerias ativas",
        description: "Garantindo excelência e melhorias sempre",
        image: "",
        number: "15+",
      },
    ],
  },

  howToHelp: {
    tag: "Como você pode nos ajudar",
    title: "Unidos, nós transformamos",
    description:
      "Fomentando a cultura e melhorando a qualidade de vida da nossa cidade tão preciosa.",
    linkText: "Junte-se à nossa missão",
    buttonText: "Seu apoio pode transformar vidas e inspirar um futuro melhor.",
    description_footer:
      "Seu apoio pode transformar vidas e inspirar um futuro melhor para toda a comunidade.",
    cards: [
      {
        title: "Seja parceiro pessoa física",
        description:
          "Ajude também diretamente como pessoa física e ajude-nos a melhorar ainda mais",
        icon: "Users",
      },
      {
        title: "Faça uma doação",
        description:
          "Seja um apoiador e ajude-nos a fazer cada vez mais e melhor.",
        icon: "DollarSign",
      },
      {
        title: "Seja voluntário",
        description:
          "Doe seu tempo e talento para transformar vidas na nossa comunidade.",
        icon: "Heart",
      },
    ],
  },
};

/**
 * Get fallback text for a section
 */
export function getFallbackText(section: SectionName): SectionFallback {
  return TEXT_FALLBACKS[section] || {};
}

/**
 * Get merged text combining CMS data with fallbacks
 */
export function mergeWithFallback<T extends Record<string, unknown>>(
  cmsData: Partial<T> | null | undefined,
  fallbackData: T,
): T {
  if (!cmsData) return fallbackData;

  return {
    ...fallbackData,
    ...Object.fromEntries(
      Object.entries(cmsData).filter(
        ([, value]) => value !== undefined && value !== null,
      ),
    ),
  } as T;
}
