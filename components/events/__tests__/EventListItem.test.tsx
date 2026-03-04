import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { EventListItem } from "../EventListItem";
import { Event } from "@/sanity/lib/types/event";

// Mock Next.js Image
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

// Mock Next.js Link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

describe("EventListItem", () => {
  const baseEvent: Event = {
    _id: "event-1",
    title: "Concerto de Primavera",
    slug: { current: "concerto-primavera" },
    coverImage: {
      asset: { _ref: "image-1", _type: "reference" },
      alt: "Imagem do Concerto",
    },
    description: [
      {
        _type: "block",
        _key: "block1",
        children: [
          {
            _type: "span",
            _key: "span1",
            text: "Um concerto emocionante com música clássica.",
            marks: [],
          },
        ],
        style: "normal",
        markDefs: [],
      },
    ],
    category: "musical",
    eventDate: "2026-04-15T19:00:00.000Z",
    ticketPrice: { free: false, value: 50.0 },
    location: { name: "Teatro Municipal" },
    cta: { enabled: false },
    featured: false,
    active: true,
  };

  it("renders event title", () => {
    render(<EventListItem event={baseEvent} />);
    expect(screen.getByText("Concerto de Primavera")).toBeInTheDocument();
  });

  it("renders event description", () => {
    render(<EventListItem event={baseEvent} />);
    expect(
      screen.getByText("Um concerto emocionante com música clássica.")
    ).toBeInTheDocument();
  });

  it("renders event image with correct alt text", () => {
    render(<EventListItem event={baseEvent} />);
    const image = screen.getByAltText("Imagem do Concerto");
    expect(image).toBeInTheDocument();
  });

  it("renders event weekday", () => {
    render(<EventListItem event={baseEvent} />);
    // Component displays weekday, not full date
    expect(screen.getByText("quarta-feira")).toBeInTheDocument();
  });

  it("renders event time in local timezone", () => {
    render(<EventListItem event={baseEvent} />);
    // UTC 19:00 converts to local time (Brazil -3h = 16:00)
    expect(screen.getByText("16:00")).toBeInTheDocument();
  });

  it("renders event location", () => {
    render(<EventListItem event={baseEvent} />);
    expect(screen.getByText("Teatro Municipal")).toBeInTheDocument();
  });

  it("renders free event badge", () => {
    const freeEvent = { ...baseEvent, ticketPrice: { free: true } };
    render(<EventListItem event={freeEvent} />);
    expect(screen.getByText("Entrada Gratuita")).toBeInTheDocument();
  });

  it("does not display price for paid events", () => {
    render(<EventListItem event={baseEvent} />);
    // Component does not show price value for paid events
    expect(screen.queryByText(/R\$/)).not.toBeInTheDocument();
    expect(screen.queryByText("Entrada Gratuita")).not.toBeInTheDocument();
  });

  it("renders musical category badge with icon", () => {
    render(<EventListItem event={baseEvent} />);
    
    const badge = screen.getByText("Musical");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-violet-100");
    expect(badge).toHaveClass("text-violet-700");
  });

  it("renders cultural category badge with icon", () => {
    const culturalEvent: Event = { ...baseEvent, category: "cultural" };
    render(<EventListItem event={culturalEvent} />);
    
    const badge = screen.getByText("Cultural");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-purple-100");
    expect(badge).toHaveClass("text-purple-700");
  });

  it("renders educacional category badge with icon", () => {
    const educacionalEvent: Event = { ...baseEvent, category: "educacional" };
    render(<EventListItem event={educacionalEvent} />);
    
    const badge = screen.getByText("Educacional");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-blue-100");
    expect(badge).toHaveClass("text-blue-700");
  });

  it("renders social category badge with icon", () => {
    const socialEvent: Event = { ...baseEvent, category: "social" };
    render(<EventListItem event={socialEvent} />);
    
    const badge = screen.getByText("Social");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-green-100");
    expect(badge).toHaveClass("text-green-700");
  });

  it("renders celebration category badge with icon", () => {
    const celebrationEvent: Event = { ...baseEvent, category: "celebracao" };
    render(<EventListItem event={celebrationEvent} />);
    
    const badge = screen.getByText("Celebração");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-pink-100");
    expect(badge).toHaveClass("text-pink-700");
  });

  it("links to correct event page", () => {
    render(<EventListItem event={baseEvent} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/evento/concerto-primavera");
  });

  it("has responsive vertical layout classes", () => {
    const { container } = render(<EventListItem event={baseEvent} />);
    
    // Check for mobile-first vertical layout (flex-col sm:flex-row)
    const eventCard = container.querySelector(".flex-col");
    expect(eventCard).toBeInTheDocument();
  });

  it("handles events without description", () => {
    const eventWithoutDescription: Event = { ...baseEvent, description: [] };
    render(<EventListItem event={eventWithoutDescription} />);
    
    expect(screen.getByText("Concerto de Primavera")).toBeInTheDocument();
  });

  it("renders description with first block only (line-clamp-2)", () => {
    const eventWithMultipleBlocks = {
      ...baseEvent,
      description: [
        {
          _type: "block" as const,
          _key: "block1",
          children: [
            { _type: "span" as const, _key: "span1", text: "Parágrafo 1. ", marks: [] },
          ],
          style: "normal" as const,
          markDefs: [],
        },
        {
          _type: "block" as const,
          _key: "block2",
          children: [
            { _type: "span" as const, _key: "span2", text: "Parágrafo 2.", marks: [] },
          ],
          style: "normal" as const,
          markDefs: [],
        },
      ],
    };
    
    render(<EventListItem event={eventWithMultipleBlocks} />);
    
    // Only first paragraph visible due to line-clamp-2
    expect(screen.getByText(/Parágrafo 1/)).toBeInTheDocument();
  });
});
