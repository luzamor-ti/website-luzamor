import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EventListItem } from "@/components/events/EventListItem";
import { Event } from "@/sanity/lib/types/event";

const mockEvent: Event = {
  _id: "event-1",
  title: "Workshop de Educação Financeira",
  slug: { current: "workshop-educacao-financeira" },
  coverImage: {
    asset: {
      _ref: "image-1",
      _type: "reference" as const,
    },
    alt: "Workshop de Educação Financeira",
  },
  shortDescription:
    "Aprenda a gerenciar suas finanças pessoais e alcançar seus objetivos financeiros.",
  description: [
    {
      _type: "block" as const,
      _key: "block1",
      children: [
        {
          _type: "span" as const,
          _key: "span1",
          text: "Aprenda a gerenciar suas finanças pessoais e alcançar seus objetivos financeiros.",
          marks: [],
        },
      ],
      style: "normal" as const,
      markDefs: [],
    },
  ],
  category: "educacional",
  eventDate: "2026-05-20T19:00:00.000Z",
  ticketPrice: {
    free: true,
  },
  cta: {
    enabled: false,
  },
  location: {
    name: "Auditório Principal",
    address: "Rua das Flores, 123",
  },
  featured: false,
  active: true,
};

const meta = {
  title: "Events/EventListItem",
  component: EventListItem,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Componente mobile-first otimizado para exibir evento em lista. Mostra dia da semana (não data completa), horário local, categoria badge e entrada gratuita quando aplicável. Layout responsivo: flex-col em mobile, flex-row em desktop.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    event: {
      description: "Objeto Event com dados do evento",
    },
    showGalleryIcon: {
      control: "boolean",
      description: "Exibe ícone de galeria para eventos passados com fotos",
    },
  },
} satisfies Meta<typeof EventListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EducacionalGratis: Story = {
  args: {
    event: mockEvent,
    showGalleryIcon: false,
  },
};

export const MusicalPago: Story = {
  args: {
    event: {
      ...mockEvent,
      _id: "event-2",
      title: "Concerto de Primavera",
      category: "musical",
      ticketPrice: {
        free: false,
        value: 50.0,
      },
      eventDate: "2026-06-15T20:00:00.000Z",
    },
    showGalleryIcon: false,
  },
};

export const CulturalComGaleria: Story = {
  args: {
    event: {
      ...mockEvent,
      _id: "event-3",
      title: "Exposição de Arte Contemporânea",
      category: "cultural",
      eventDate: "2025-12-10T14:00:00.000Z",
      gallery: [
        {
          asset: { _ref: "gallery-1", _type: "reference" as const },
          alt: "Foto 1",
        },
        {
          asset: { _ref: "gallery-2", _type: "reference" as const },
          alt: "Foto 2",
        },
        {
          asset: { _ref: "gallery-3", _type: "reference" as const },
          alt: "Foto 3",
        },
      ],
    },
    showGalleryIcon: true,
  },
};

export const SocialSemDescricao: Story = {
  args: {
    event: {
      ...mockEvent,
      _id: "event-4",
      title: "Campanha de Doação de Alimentos",
      category: "social",
      description: [],
      eventDate: "2026-07-25T09:00:00.000Z",
    },
    showGalleryIcon: false,
  },
};

export const CelebracaoTituloLongo: Story = {
  args: {
    event: {
      ...mockEvent,
      _id: "event-5",
      title:
        "Festa Junina Beneficente da Fundação Luz & Amor - Edição Especial 2026",
      category: "celebracao",
      eventDate: "2026-06-20T17:00:00.000Z",
      ticketPrice: {
        free: false,
        value: 25.0,
      },
    },
    showGalleryIcon: false,
  },
};

export const Mobile: Story = {
  args: {
    event: mockEvent,
    showGalleryIcon: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const Tablet: Story = {
  args: {
    event: mockEvent,
    showGalleryIcon: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};
