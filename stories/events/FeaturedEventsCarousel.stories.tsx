import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FeaturedEventsCarousel } from "@/components/page-templates/calendario-eventos/FeaturedEventsCarousel";
import { Event } from "@/sanity/lib/types/event";

// Simple deterministic hash function for Storybook data generation
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

const createMockEvent = (
  id: string,
  title: string,
  category: Event["category"],
  date: string,
): Event => {
  const hash = hashString(title);
  const isFree = hash % 2 === 0;
  const hasValue = hash % 3 !== 0;
  const ticketValue = (hash % 100) + 20;
  const ctaEnabled = hash % 5 !== 0;

  return {
    _id: id,
    title,
    slug: { current: title.toLowerCase().replace(/ /g, "-") },
    coverImage: {
      asset: {
        _ref: `image-${id}`,
        _type: "reference" as const,
      },
      alt: title,
    },
    shortDescription: `Descrição breve do evento ${title}`,
    description: [
      {
        _type: "block" as const,
        _key: "block1",
        children: [
          {
            _type: "span" as const,
            _key: "span1",
            text: `Descrição breve do evento ${title}`,
            marks: [],
          },
        ],
        style: "normal" as const,
        markDefs: [],
      },
    ],
    category,
    eventDate: date,
    ticketPrice: {
      free: isFree,
      value: !isFree && hasValue ? ticketValue : undefined,
    },
    cta: {
      enabled: ctaEnabled,
      buttonText: "Saiba Mais",
      type: "link" as const,
      link: `/evento/${title.toLowerCase().replace(/ /g, "-")}`,
    },
    location: {
      name: "Local do Evento",
      address: "Endereço do Local",
    },
    featured: true,
    active: true,
  };
};

const meta = {
  title: "Events/FeaturedEventsCarousel",
  component: FeaturedEventsCarousel,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Carrossel automático de eventos em destaque. Exibe até 3 eventos com navegação por botões, indicadores e autoplay configurável. Para um único evento, renderiza apenas FeaturedEvent sem controles de carrossel.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    events: {
      description: "Array de até 3 eventos em destaque",
    },
    autoplayDelay: {
      control: "number",
      description: "Delay do autoplay em milissegundos (padrão: 7000ms)",
    },
  },
} satisfies Meta<typeof FeaturedEventsCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TresEventos: Story = {
  args: {
    events: [
      createMockEvent(
        "1",
        "Festival de Música Clássica",
        "musical",
        "2026-08-15T20:00:00.000Z",
      ),
      createMockEvent(
        "2",
        "Workshop de Programação",
        "educacional",
        "2026-09-10T14:00:00.000Z",
      ),
      createMockEvent(
        "3",
        "Exposição de Arte Moderna",
        "cultural",
        "2026-07-20T10:00:00.000Z",
      ),
    ],
    autoplayDelay: 7000,
  },
};

export const DoisEventos: Story = {
  args: {
    events: [
      createMockEvent(
        "4",
        "Campanha de Doação",
        "social",
        "2026-06-05T08:00:00.000Z",
      ),
      createMockEvent(
        "5",
        "Festa Junina Beneficente",
        "celebracao",
        "2026-06-24T18:00:00.000Z",
      ),
    ],
    autoplayDelay: 5000,
  },
};

export const EventoUnico: Story = {
  args: {
    events: [
      createMockEvent(
        "6",
        "Grande Concerto de Fim de Ano",
        "musical",
        "2026-12-20T21:00:00.000Z",
      ),
    ],
    autoplayDelay: 7000,
  },
};

export const AutoplayRapido: Story = {
  args: {
    events: [
      createMockEvent(
        "7",
        "Palestra Motivacional",
        "educacional",
        "2026-05-15T19:00:00.000Z",
      ),
      createMockEvent(
        "8",
        "Cinema ao Ar Livre",
        "arte",
        "2026-06-10T20:30:00.000Z",
      ),
      createMockEvent(
        "9",
        "Torneio Esportivo",
        "esportivo",
        "2026-07-05T09:00:00.000Z",
      ),
    ],
    autoplayDelay: 3000,
  },
};

export const AutoplayLento: Story = {
  args: {
    events: [
      createMockEvent(
        "10",
        "Feira Literária",
        "literario",
        "2026-08-25T10:00:00.000Z",
      ),
      createMockEvent(
        "11",
        "Bazar Beneficente",
        "arrecadacao",
        "2026-09-15T14:00:00.000Z",
      ),
      createMockEvent(
        "12",
        "Sarau Cultural",
        "cultural",
        "2026-10-05T19:00:00.000Z",
      ),
    ],
    autoplayDelay: 10000,
  },
};

export const MobileView: Story = {
  args: {
    events: [
      createMockEvent(
        "13",
        "Workshop de Fotografia",
        "educacional",
        "2026-11-20T15:00:00.000Z",
      ),
      createMockEvent(
        "14",
        "Apresentação de Dança",
        "arte",
        "2026-12-10T18:00:00.000Z",
      ),
    ],
    autoplayDelay: 7000,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const TabletView: Story = {
  args: {
    events: [
      createMockEvent(
        "15",
        "Oficina de Artesanato",
        "cultural",
        "2026-10-18T14:00:00.000Z",
      ),
      createMockEvent(
        "16",
        "Palestra de Saúde",
        "educacional",
        "2026-11-05T16:00:00.000Z",
      ),
      createMockEvent(
        "17",
        "Gincana Solidária",
        "social",
        "2026-12-01T09:00:00.000Z",
      ),
    ],
    autoplayDelay: 7000,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};
