import { Event } from "@/sanity/lib/types/event";

/**
 * Mock event base para testes
 * Centraliza a estrutura de eventos mock para evitar duplicação
 */
export const createMockEvent = (overrides?: Partial<Event>): Event => ({
  _id: "event-1",
  title: "Workshop de Artesanato",
  slug: { current: "workshop-artesanato" },
  coverImage: {
    asset: {
      _ref: "image-abc123",
      _type: "reference" as const,
    },
    alt: "Workshop de Artesanato",
  },
  shortDescription: "Aprenda técnicas de artesanato com materiais recicláveis",
  description: [
    {
      _type: "block" as const,
      _key: "block1",
      children: [
        {
          _type: "span" as const,
          _key: "span1",
          text: "Aprenda técnicas de artesanato com materiais recicláveis",
          marks: [],
        },
      ],
      style: "normal" as const,
      markDefs: [],
    },
  ],
  category: "educacional",
  eventDate: "2026-04-15T14:00:00.000Z",
  ticketPrice: {
    free: true,
  },
  cta: {
    enabled: true,
    buttonText: "Inscreva-se",
    type: "link" as const,
    link: "https://example.com/inscricao",
  },
  location: {
    name: "Sede da Fundação Luz & Amor",
    address: "Rua das Flores, 123 - Centro",
    mapLink: "https://maps.google.com",
  },
  featured: false,
  active: true,
  ...overrides,
});

/**
 * Cria múltiplos eventos mock para testes de listas
 */
export const createMockEvents = (count: number): Event[] =>
  Array.from({ length: count }, (_, i) => ({
    _id: `event-${i + 1}`,
    title: `Evento ${i + 1}`,
    slug: { current: `evento-${i + 1}` },
    coverImage: {
      asset: { _ref: `image-${i + 1}`, _type: "reference" as const },
      alt: `Imagem Evento ${i + 1}`,
    },
    shortDescription: `Descrição do evento ${i + 1}`,
    description: [
      {
        _type: "block" as const,
        _key: `block-${i + 1}`,
        children: [
          {
            _type: "span" as const,
            _key: `span-${i + 1}`,
            text: `Descrição do evento ${i + 1}`,
            marks: [],
          },
        ],
        style: "normal" as const,
        markDefs: [],
      },
    ],
    category: ["educacional", "musical", "esportivo", "cultural", "outro"][
      i % 5
    ] as Event["category"],
    eventDate: new Date(2026, 3, 15 + i, 14 + (i % 6), 0).toISOString(),
    ticketPrice: {
      free: i % 2 === 0,
      ...(i % 2 !== 0 && { value: 50 + i * 10 }),
    },
    cta: {
      enabled: i % 3 === 0,
      ...(i % 3 === 0 && {
        buttonText: "Inscreva-se",
        type: "link" as const,
        link: `https://example.com/evento-${i + 1}`,
      }),
    },
    location: {
      name: `Local ${i + 1}`,
    },
    featured: i < 3,
    active: true,
  }));

/**
 * Mock de evento musical para testes específicos
 */
export const mockMusicalEvent: Event = createMockEvent({
  _id: "event-musical",
  title: "Concerto de Primavera",
  slug: { current: "concerto-primavera" },
  category: "musical",
  eventDate: "2026-04-15T19:00:00.000Z",
  ticketPrice: { free: false, value: 50.0 },
  location: { name: "Teatro Municipal" },
});

/**
 * Mock de evento com galeria para testes
 */
export const mockEventWithGallery: Event = createMockEvent({
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
});

/**
 * Mock de evento featured (destaque)
 */
export const mockFeaturedEvent: Event = createMockEvent({
  _id: "event-featured",
  title: "Arena Sertaneja",
  slug: { current: "arena-sertaneja" },
  coverImage: {
    asset: { _ref: "image-123", _type: "reference" as const },
    alt: "Arena Sertaneja",
  },
  category: "musical",
  eventDate: "2026-04-24T19:30:00.000Z",
  ticketPrice: { free: false, value: 50.0 },
  location: { name: "Pátio da Fundação" },
  cta: {
    enabled: true,
    buttonText: "Garantir meu lugar",
    type: "link" as const,
    link: "/inscricao",
  },
  featured: true,
  shortDescription:
    "A Fundação LuzAmor convida você para a 4ª edição do Jantar Arena Sertaneja",
});

/**
 * Mock de projeto para testes de relacionamento evento↔projeto
 */
export const mockProject = {
  _id: "project-1",
  title: "Projeto Esperança",
  slug: "projeto-esperanca",
};

/**
 * Mock de evento vinculado a um projeto
 */
export const mockEventWithProject: Event = createMockEvent({
  _id: "event-with-project",
  title: "Workshop do Projeto Esperança",
  slug: { current: "workshop-projeto-esperanca" },
  category: "educacional",
  project: mockProject,
});

/**
 * Mock de evento sem projeto (project null)
 */
export const mockEventWithoutProject: Event = createMockEvent({
  _id: "event-no-project",
  title: "Evento Independente",
  slug: { current: "evento-independente" },
  project: null,
});
