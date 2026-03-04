import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FeaturedEvent } from "@/components/page-templates/calendario-eventos/FeaturedEvent";
import { Event } from "@/sanity/lib/types/event";

const mockEvent: Event = {
  _id: "featured-1",
  title: "Festival de Música Clássica",
  slug: { current: "festival-musica-classica" },
  coverImage: {
    asset: {
      _ref: "image-festival",
      _type: "reference" as const,
    },
    alt: "Festival de Música Clássica",
  },
  shortDescription:
    "Join Junte-se a nós para uma noite mágica de música clássica com orquestra sinfônica completa.",
  description: [
    {
      _type: "block" as const,
      _key: "block1",
      children: [
        {
          _type: "span" as const,
          _key: "span1",
          text: "Join Junte-se a nós para uma noite mágica de música clássica com orquestra sinfônica completa.",
          marks: [],
        },
      ],
      style: "normal" as const,
      markDefs: [],
    },
  ],
  category: "musical",
  eventDate: "2026-08-15T20:00:00.000Z",
  ticketPrice: {
    free: false,
    value: 80.0,
  },
  cta: {
    enabled: true,
    buttonText: "Garantir Ingresso",
    type: "link" as const,
    link: "https://example.com/ingressos",
  },
  location: {
    name: "Teatro Municipal",
    address: "Avenida Central, 456",
  },
  featured: true,
  active: true,
};

const meta = {
  title: "Events/FeaturedEvent",
  component: FeaturedEvent,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Card hero para eventos em destaque no carrossel. Apresenta layout horizontal em desktop (grid 2/3 colunas) com data em destaque, categoria badge e CTA opcional. Mobile-first com imagem full-width.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    event: {
      description: "Objeto Event para exibir em destaque",
    },
  },
} satisfies Meta<typeof FeaturedEvent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Musical: Story = {
  args: {
    event: mockEvent,
  },
};

export const EducacionalComCTA: Story = {
  args: {
    event: {
      ...mockEvent,
      _id: "featured-2",
      title: "Curso de Programação para Iniciantes",
      category: "educacional",
      eventDate: "2026-09-10T14:00:00.000Z",
      description: [
        {
          _type: "block" as const,
          _key: "block2",
          children: [
            {
              _type: "span" as const,
              _key: "span2",
              text: "Aprenda os fundamentos da programação e inicie sua carreira em tecnologia.",
              marks: [],
            },
          ],
          style: "normal" as const,
          markDefs: [],
        },
      ],
      cta: {
        enabled: true,
        buttonText: "Inscreva-se Agora",
        type: "link" as const,
        link: "/cursos/programacao-iniciantes",
      },
    },
  },
};

export const CulturalGratis: Story = {
  args: {
    event: {
      ...mockEvent,
      _id: "featured-3",
      title: "Exposição: Arte e Cultura Popular",
      category: "cultural",
      eventDate: "2026-07-20T10:00:00.000Z",
      ticketPrice: {
        free: true,
      },
      cta: {
        enabled: false,
      },
    },
  },
};

export const SocialBeneficente: Story = {
  args: {
    event: {
      ...mockEvent,
      _id: "featured-4",
      title: "Campanha de Arrecadação de Agasalhos",
      category: "social",
      eventDate: "2026-06-05T08:00:00.000Z",
      ticketPrice: {
        free: true,
      },
      description: [
        {
          _type: "block" as const,
          _key: "block3",
          children: [
            {
              _type: "span" as const,
              _key: "span3",
              text: "Ajude famílias necessitadas doando agasalhos neste inverno.",
              marks: [],
            },
          ],
          style: "normal" as const,
          markDefs: [],
        },
      ],
    },
  },
};

export const CelebracaoSemDescricao: Story = {
  args: {
    event: {
      ...mockEvent,
      _id: "featured-5",
      title: "Festa Junina 2026",
      category: "celebracao",
      eventDate: "2026-06-24T18:00:00.000Z",
      description: [],
      ticketPrice: {
        free: false,
        value: 30.0,
      },
    },
  },
};

export const TituloLongo: Story = {
  args: {
    event: {
      ...mockEvent,
      _id: "featured-6",
      title:
        "Grande Festival Internacional de Cinema Independente e Documentários - Edição Comemorativa 2026",
      category: "arte",
      eventDate: "2026-10-15T19:00:00.000Z",
    },
  },
};

export const MobileView: Story = {
  args: {
    event: mockEvent,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const TabletView: Story = {
  args: {
    event: mockEvent,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};
