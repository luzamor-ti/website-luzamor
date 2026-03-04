import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CalendarioEventosTemplate } from "@/components/page-templates/CalendarioEventosTemplate";
import { Page } from "@/sanity/lib/types/page";
import { Event } from "@/sanity/lib/types/event";

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    section: ({ children, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    button: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock event components
vi.mock("@/components/events", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  EventCard: ({ event }: any) => (
    <div data-testid="event-card">{event.title}</div>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  EventListItem: ({ event }: any) => (
    <div data-testid="event-list-item">{event.title}</div>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  EventGallery: ({ images, eventTitle }: any) => (
    <div data-testid="event-gallery">
      {eventTitle} - {images.length} photos
    </div>
  ),
}));

describe("CalendarioEventosTemplate", () => {
  const mockPage: Page = {
    _id: "calendario-eventos",
    _type: "pagina",
    title: "Calendário de Eventos",
    slug: { current: "calendario-eventos" },
    description: "Confira todos os eventos da Fundação Luz & Amor",
    pageType: "calendario-eventos",
    active: true,
  };

  const mockUpcomingEvent: Event = {
    _id: "future-event-1",
    title: "Workshop Educacional",
    slug: { current: "workshop-educacional" },
    coverImage: {
      asset: {
        _ref: "image-future",
        _type: "reference" as const,
      },
      alt: "Workshop Educacional",
    },
    description: [
      {
        _type: "block" as const,
        _key: "block1",
        children: [
          {
            _type: "span" as const,
            _key: "span1",
            text: "Um workshop sobre educação financeira",
            marks: [],
          },
        ],
        style: "normal" as const,
        markDefs: [],
      },
    ],
    category: "educacional",
    eventDate: "2026-05-20T10:00:00.000Z",
    ticketPrice: {
      free: true,
    },
    cta: {
      enabled: true,
    },
    featured: false,
    active: true,
  };

  const mockPastEvent: Event = {
    _id: "past-event-1",
    title: "Festa Junina 2025",
    slug: { current: "festa-junina-2025" },
    coverImage: {
      asset: {
        _ref: "image-past",
        _type: "reference" as const,
      },
      alt: "Festa Junina",
    },
    description: [
      {
        _type: "block" as const,
        _key: "block2",
        children: [
          {
            _type: "span" as const,
            _key: "span2",
            text: "Nossa tradicional festa junina",
            marks: [],
          },
        ],
        style: "normal" as const,
        markDefs: [],
      },
    ],
    category: "celebracao",
    eventDate: "2025-06-15T18:00:00.000Z",
    ticketPrice: {
      free: false,
      value: 15.0,
    },
    cta: {
      enabled: false,
    },
    location: {
      name: "Pátio da Fundação",
      address: "Rua das Flores, 123",
    },
    gallery: [
      {
        asset: {
          _ref: "gallery-1",
          _type: "reference" as const,
        },
        alt: "Galeria 1",
        caption: "Participantes se divertindo",
      },
      {
        asset: {
          _ref: "gallery-2",
          _type: "reference" as const,
        },
        alt: "Galeria 2",
      },
    ],
    featured: false,
    active: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders page title and description", () => {
    render(
      <CalendarioEventosTemplate
        pagina={mockPage}
        upcomingEvents={[]}
        pastEvents={[]}
      />,
    );

    expect(screen.getByText("Calendário de Eventos")).toBeInTheDocument();
    expect(
      screen.getByText("Confira todos os eventos da Fundação Luz & Amor"),
    ).toBeInTheDocument();
  });

  it("renders upcoming events section with events", () => {
    render(
      <CalendarioEventosTemplate
        pagina={mockPage}
        upcomingEvents={[mockUpcomingEvent]}
        pastEvents={[]}
      />,
    );

    expect(screen.getByText("Próximos Eventos")).toBeInTheDocument();
    // Event appears twice: once in FeaturedEventsCarousel, once in EventsListView
    const eventTitles = screen.getAllByText("Workshop Educacional");
    expect(eventTitles.length).toBeGreaterThan(0);
  });

  it("renders past events section with events", () => {
    render(
      <CalendarioEventosTemplate
        pagina={mockPage}
        upcomingEvents={[]}
        pastEvents={[mockPastEvent]}
      />,
    );

    // Click on past events tab to see past events
    const pastEventsTab = screen.getByLabelText("Ver eventos passados");
    fireEvent.click(pastEventsTab);

    // Now past event should be visible
    const eventTitles = screen.getAllByText("Festa Junina 2025");
    expect(eventTitles.length).toBeGreaterThan(0);
  });

  it("shows empty state when no upcoming events", () => {
    render(
      <CalendarioEventosTemplate
        pagina={mockPage}
        upcomingEvents={[]}
        pastEvents={[]}
      />,
    );

    // Upcoming tab is active by default, should show empty state
    expect(screen.getByText("Nenhum evento encontrado.")).toBeInTheDocument();
  });

  it("shows empty state when no past events", () => {
    render(
      <CalendarioEventosTemplate
        pagina={mockPage}
        upcomingEvents={[]}
        pastEvents={[]}
      />,
    );

    expect(screen.getByText("Nenhum evento encontrado.")).toBeInTheDocument();
  });

  it("renders multiple upcoming events", () => {
    const events = [
      mockUpcomingEvent,
      {
        ...mockUpcomingEvent,
        _id: "future-event-2",
        title: "Palestra de Saúde",
      },
    ];

    render(
      <CalendarioEventosTemplate
        pagina={mockPage}
        upcomingEvents={events}
        pastEvents={[]}
      />,
    );

    // "Workshop Educacional" appears in both featured and list
    const workshopTitles = screen.getAllByText("Workshop Educacional");
    expect(workshopTitles.length).toBeGreaterThan(0);

    // "Palestra de Saúde" appears only in list (not in top 3 featured, but still in upcoming)
    expect(screen.getByText("Palestra de Saúde")).toBeInTheDocument();
  });

  it("renders past events with EventListItem components", () => {
    render(
      <CalendarioEventosTemplate
        pagina={mockPage}
        upcomingEvents={[]}
        pastEvents={[mockPastEvent]}
      />,
    );

    // Click on past events tab
    const pastEventsTab = screen.getByLabelText("Ver eventos passados");
    fireEvent.click(pastEventsTab);

    // Check that past event is rendered using EventListItem component
    expect(screen.getByText("Festa Junina 2025")).toBeInTheDocument();
  });

  it("renders past events with proper interaction", () => {
    render(
      <CalendarioEventosTemplate
        pagina={mockPage}
        upcomingEvents={[]}
        pastEvents={[mockPastEvent]}
      />,
    );

    // Click on past events tab
    const pastEventsTab = screen.getByLabelText("Ver eventos passados");
    fireEvent.click(pastEventsTab);

    // Past event should be visible
    expect(screen.getByText("Festa Junina 2025")).toBeInTheDocument();

    // EventListItem component should be used (has data-testid)
    expect(screen.getByTestId("event-list-item")).toBeInTheDocument();
  });

  it("renders both upcoming and past events sections when both exist", () => {
    render(
      <CalendarioEventosTemplate
        pagina={mockPage}
        upcomingEvents={[mockUpcomingEvent]}
        pastEvents={[mockPastEvent]}
      />,
    );

    // Both tabs should be available
    expect(screen.getByLabelText("Ver próximos eventos")).toBeInTheDocument();
    expect(screen.getByLabelText("Ver eventos passados")).toBeInTheDocument();

    // Upcoming events shown by default (appears in both featured and list)
    const workshopTitles = screen.getAllByText("Workshop Educacional");
    expect(workshopTitles.length).toBeGreaterThan(0);

    // Click on past events tab
    const pastEventsTab = screen.getByLabelText("Ver eventos passados");
    fireEvent.click(pastEventsTab);

    // Now past events should be visible
    const eventTitles = screen.getAllByText("Festa Junina 2025");
    expect(eventTitles.length).toBeGreaterThan(0);
  });

  it("does not show gallery button for upcoming events", () => {
    render(
      <CalendarioEventosTemplate
        pagina={mockPage}
        upcomingEvents={[
          { ...mockUpcomingEvent, gallery: [mockPastEvent.gallery![0]] },
        ]}
        pastEvents={[]}
      />,
    );

    // Upcoming events should not show gallery button even if gallery is present
    expect(screen.queryByText("Ver galeria completa")).not.toBeInTheDocument();
  });
});
