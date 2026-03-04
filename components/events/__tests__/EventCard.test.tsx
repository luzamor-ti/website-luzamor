import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { EventCard } from "@/components/events/EventCard";
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
  },
}));

describe("EventCard", () => {
  const mockEvent: Event = {
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
    shortDescription:
      "Aprenda técnicas de artesanato com materiais recicláveis",
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
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders event title", () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText("Workshop de Artesanato")).toBeInTheDocument();
  });

  it("renders event description", () => {
    render(<EventCard event={mockEvent} />);
    expect(
      screen.getByText(
        /Aprenda técnicas de artesanato com materiais recicláveis/,
      ),
    ).toBeInTheDocument();
  });

  it("renders event category label", () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText("Educacional")).toBeInTheDocument();
  });

  it("renders event location", () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText("Sede da Fundação Luz & Amor")).toBeInTheDocument();
  });

  it("displays free ticket price", () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText("Entrada Gratuita")).toBeInTheDocument();
  });

  it("displays paid ticket price", () => {
    const paidEvent = {
      ...mockEvent,
      ticketPrice: {
        free: false,
        value: 25.0,
      },
    };
    render(<EventCard event={paidEvent} />);
    expect(screen.getByText("R$ 25.00")).toBeInTheDocument();
  });

  it("formats event date correctly", () => {
    render(<EventCard event={mockEvent} />);
    // Should display day and month (year is not displayed in the badge)
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText(/abr/i)).toBeInTheDocument();
  });

  it("displays time correctly", () => {
    render(<EventCard event={mockEvent} />);
    expect(screen.getByText(/14:00/)).toBeInTheDocument();
  });

  it("renders gallery icon when showGalleryIcon is true and event has gallery", () => {
    const eventWithGallery = {
      ...mockEvent,
      gallery: [
        {
          asset: { _ref: "img1", _type: "reference" as const },
          alt: "Foto 1",
        },
        {
          asset: { _ref: "img2", _type: "reference" as const },
          alt: "Foto 2",
        },
      ],
    };
    render(<EventCard event={eventWithGallery} showGalleryIcon={true} />);
    // Should display just the number "2"
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("does not render gallery icon when event has no gallery", () => {
    render(<EventCard event={mockEvent} showGalleryIcon={true} />);
    expect(screen.queryByText(/fotos/)).not.toBeInTheDocument();
  });

  it("renders link to event detail page", () => {
    render(<EventCard event={mockEvent} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/evento/workshop-artesanato");
  });

  it("renders event image with alt text", () => {
    render(<EventCard event={mockEvent} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Workshop de Artesanato");
  });

  it("displays weekday in event details", () => {
    render(<EventCard event={mockEvent} />);
    // April 15, 2026 is a Wednesday
    expect(screen.getByText(/quarta-feira/i)).toBeInTheDocument();
  });
});
