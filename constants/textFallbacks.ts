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

export const GENERIC_FALLBACK = {
  whatsappDefaultMessage: "Olá! Gostaria de mais informações sobre {itemName}",
};

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
 * Calendar Events Page Fallbacks
 */
export const CALENDAR_EVENTS_FALLBACKS = {
  agendaTag: "Agenda Completa",
  tabUpcoming: "Próximos Eventos",
  tabPast: "Eventos Passados",
  viewList: "Lista",
  viewCalendar: "Calendário",
  noEventsFound: "Nenhum evento encontrado.",
  loadMoreButton: "Carregar mais eventos",
  showingCount: "Exibindo {current} de {total} eventos",
  enrollButton: "Inscreva-se",
  freeEntry: "Entrada Gratuita",
  andMore: "+{count} mais",
  legendUpcoming: "Próximos eventos",
  legendPast: "Eventos passados",
  ariaLabels: {
    previousMonth: "Mês anterior",
    nextMonth: "Próximo mês",
    previousEvent: "Evento anterior",
    nextEvent: "Próximo evento",
    listView: "Visualização em lista",
    calendarView: "Visualização em calendário",
    upcomingTab: "Ver próximos eventos",
    pastTab: "Ver eventos passados",
    loadMore: "Carregar mais eventos",
  },
};

export const ABOUT_PAGE_FALLBACKS = {
  hero: {
    tag: "Sobre Nós",
    title: "Transformando vidas através da cultura e educação",
    subtitle:
      "Conheça nossa história de dedicação ao desenvolvimento comunitário e transformação social.",
  },
  impacts: {
    introText:
      "Nosso trabalho gera impacto real na vida de milhares de pessoas em nossa comunidade.",
    items: [
      {
        number: "5.000+",
        title: "Vidas Impactadas",
        description: "Pessoas beneficiadas por nossos projetos e iniciativas",
        icon: "Heart",
      },
      {
        number: "20+",
        title: "Anos de História",
        description: "Décadas de dedicação ao desenvolvimento comunitário",
        icon: "Award",
      },
      {
        number: "15",
        title: "Projetos Ativos",
        description: "Iniciativas em andamento em diversas áreas",
        icon: "Target",
      },
      {
        number: "30+",
        title: "Parceiros",
        description: "Organizações que apoiam nossa missão",
        icon: "Users",
      },
    ],
  },
  history: {
    tagline: "Nossa Jornada",
    title: "A História da Fundação Luzamor",
    description:
      "Uma trajetória de compromisso com a cultura, educação e desenvolvimento comunitário.",
    timeline: [
      {
        year: "2004",
        tagline: "O Começo",
        title: "Fundação",
        description: "Início de nossa jornada dedicada à transformação social",
      },
      {
        year: "2010",
        tagline: "Crescimento",
        title: "Expansão",
        description: "Ampliação dos projetos culturais e educacionais",
      },
      {
        year: "2015",
        tagline: "Conquistas",
        title: "Reconhecimento",
        description: "Premiação por impacto social e cultural",
      },
      {
        year: "2024",
        tagline: "Atualidade",
        title: "Presente",
        description: "Milhares de vidas transformadas e projetos consolidados",
      },
    ],
  },
  mission: {
    tag: "Nossa Missão",
    title: "Transformar vidas através da cultura e educação",
    description:
      "Nossa missão é promover o desenvolvimento integral de pessoas e comunidades através de ações culturais, educacionais e sociais, valorizando a cultura local e fomentando a cidadania.",
  },
  vision: {
    tag: "Nossa Visão",
    title: "Um futuro de oportunidades para todos",
    description:
      "Ser referência em transformação social através da cultura e educação, construindo uma sociedade mais justa, inclusiva e com acesso igualitário a oportunidades de desenvolvimento.",
  },
  team: {
    tag: "Nosso Time",
    title: "Pessoas dedicadas à transformação",
    description:
      "Conheça as pessoas que fazem acontecer e tornam nossa missão possível.",
  },
};

/**
 * Event Detail Page Fallbacks
 */
export const EVENT_DETAIL_FALLBACKS = {
  ctaButtonText: "Participe do Evento",
  whatsappDefaultMessage:
    "Olá! Gostaria de mais informações sobre o evento {eventName}",
  locationButtonText: "Ver Localização",
  globalWhatsapp: "5511999999999", // Número padrão - deve ser configurado
};

/**
 * Partners Page Fallbacks
 */
export const PARTNERS_PAGE_FALLBACKS = {
  hero: {
    tag: "Transparência e Gratidão",
    title: "Nossos Parceiros e Amigos",
    description:
      "Um enorme obrigado a todos os parceiros, apoiadores e doadores que tornam nossa missão possível.",
  },
  cta: {
    title: "Faça Parte da Mudança",
    description:
      "Sua empresa ou você pode transformar vidas. Conheça as formas de apoiar a Fundação Luz & Amor e juntos faremos mais.",
    sponsorButtonText: "Seja um Patrocinador",
    supporterButtonText: "Seja um Apoiador",
    donorButtonText: "Faça uma Doação",
  },
  partnersSection: {
    tag: "Parceiros",
    title: "Patrocinadores e Apoiadores",
    description:
      "Empresas, instituições e editais que acreditam e investem no nosso trabalho.",
    tabCurrentLabel: "Parceiros do Ano Atual",
    tabPastLabel: "Parceiros Anteriores",
    emptyCurrentMessage: "Nenhuma parceria cadastrada para o ano atual ainda.",
    emptyPastMessage: "Nenhuma parceria anterior cadastrada.",
  },
  individualsSection: {
    tag: "Pessoas que fazem a diferença",
    title: "Apoiadores Individuais",
    description:
      "Pessoas físicas que contribuem com sua presença e apoio direto à fundação.",
  },
  donorsSection: {
    tag: "Gratidão",
    title: "Nossos Doadores",
    description:
      "Cada contribuição, pequena ou grande, faz toda a diferença em nossa missão.",
    monthlyTitle: "Doadores Mensais",
    punctualTitle: "Doadores Pontuais",
    emptyMonthly: "Nenhum doador mensal cadastrado ainda.",
    emptyPunctual: "Nenhum doador pontual cadastrado ainda.",
  },
  ctaFinal: {
    title: "Sua empresa pode estar aqui",
    description:
      "Entre em contato e descubra como fazer parte da rede de parceiros da Fundação Luz & Amor.",
    buttonText: "Entrar em Contato",
  },
};

/**
 * Diretoria Page Fallbacks
 */
export const DIRETORIA_PAGE_FALLBACKS = {
  hero: {
    tag: "Gestão & Governança",
    title: "Nossa Diretoria",
    description:
      "Conheça os líderes que guiam a Fundação com dedicação e propósito.",
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
