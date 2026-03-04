import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EventsListView } from "@/components/page-templates/calendario-eventos/EventsListView";
import { Event } from "@/sanity/lib/types/event";

const createMockEvent = (
  id: number,
  category: Event["category"],
  isFree: boolean = true,
  hasGallery: boolean = false
): Event => ({
  _id: `event-${id}`,
  title: `Evento de Teste ${id}`,
  slug: { current: `evento-teste-${id}` },
  coverImage: {
    asset: {
      _ref: `image-${id}`,
      _type: "reference" as const,
    },
    alt: `Evento ${id}`,
  },
  description: [
    {
      _type: "block" as const,
      _key: "block1",
      children: [
        {
          _type: "span" as const,
          _key: "span1",
          text: `Descrição do evento ${id} com informações relevantes sobre o que será apresentado.`,
          marks: [],
        },
      ],
      style: "normal" as const,
      markDefs: [],
    },
  ],
  category,
  eventDate: new Date(2026, 4 + id, 15 + id, 19, 0, 0).toISOString(),
  ticketPrice: {
    free: isFree,
    value: isFree ? undefined : 25.0 + id * 5,
  },
  cta: {
    enabled: false,
  },
  location: {
    name: `Local do Evento ${id}`,
    address: `Endereço ${id}`,
  },
  featured: false,
  active: true,
  ...(hasGallery && {
    gallery: Array.from({ length: 3 + id }, (_, i) => ({
      asset: { _ref: `gallery-${i}`, _type: "reference" as const },
      alt: `Foto ${i + 1}`,
    })),
  }),
});

const meta = {
  title: "Events/EventsListView",
  component: EventsListView,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Lista de eventos com paginação 'Carregar mais'. Exibe EventListItem cards com contador de eventos visíveis. Suporta ícone de galeria para eventos passados. Mobile-optimized com spacing reduzido.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    events: {
      description: "Array de eventos para exibir",
    },
    showGalleryIcon: {
      control: "boolean",
      description: "Mostra ícone de galeria para eventos com fotos",
    },
    initialDisplayCount: {
      control: "number",
      description: "Quantidade inicial de eventos exibidos (padrão: 10)",
    },
    loadMoreCount: {
      control: "number",
      description: "Quantidade de eventos carregados ao clicar 'Carregar mais' (padrão: 5)",
    },
  },
} satisfies Meta<typeof EventsListView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PoucosEventos: Story = {
  args: {
    events: [
      createMockEvent(1, "educacional", true),
      createMockEvent(2, "musical", false),
      createMockEvent(3, "cultural", true),
    ],
    showGalleryIcon: false,
  },
};

export const MuitosEventos: Story = {
  args: {
    events: Array.from({ length: 15 }, (_, i) =>
      createMockEvent(
        i + 1,
        (["educacional", "musical", "cultural", "social", "celebracao"] as const)[i % 5],
        i % 3 === 0,
        false
      )
    ),
    showGalleryIcon: false,
  },
};

export const EventosPassadosComGaleria: Story = {
  args: {
    events: Array.from({ length: 8 }, (_, i) =>
      createMockEvent(
        i + 1,
        (["musical", "cultural", "arte"] as const)[i % 3],
        false,
        true
      )
    ),
    showGalleryIcon: true,
  },
};

export const ListaVazia: Story = {
  args: {
    events: [],
    showGalleryIcon: false,
  },
};

export const PaginacaoCustomizada: Story = {
  args: {
    events: Array.from({ length: 20 }, (_, i) =>
      createMockEvent(i + 1, "educacional", i % 2 === 0, false)
    ),
    showGalleryIcon: false,
    initialDisplayCount: 3,
    loadMoreCount: 3,
  },
};

export const VariedadeCategorias: Story = {
  args: {
    events: [
      createMockEvent(1, "musical", true),
      createMockEvent(2, "cultural", false),
      createMockEvent(3, "educacional", true),
      createMockEvent(4, "social", true),
      createMockEvent(5, "celebracao", false),
      createMockEvent(6, "esportivo", true),
      createMockEvent(7, "arte", false),
      createMockEvent(8, "literario", true),
      createMockEvent(9, "arrecadacao", true),
      createMockEvent(10, "outro", false),
    ],
    showGalleryIcon: false,
  },
};

export const EventosComGaleriaVariada: Story = {
  args: {
    events: [
      createMockEvent(1, "cultural", true, true),
      createMockEvent(2, "musical", true, false),
      createMockEvent(3, "arte", false, true),
      createMockEvent(4, "literario", true, false),
      createMockEvent(5, "celebracao", false, true),
    ],
    showGalleryIcon: true,
  },
};

export const MobileView: Story = {
  args: {
    events: Array.from({ length: 6 }, (_, i) =>
      createMockEvent(i + 1, (["educacional", "musical"] as const)[i % 2], i % 3 === 0, false)
    ),
    showGalleryIcon: false,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const TabletView: Story = {
  args: {
    events: Array.from({ length: 8 }, (_, i) =>
      createMockEvent(i + 1, "cultural", i % 2 === 0, true)
    ),
    showGalleryIcon: true,
  },
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};
