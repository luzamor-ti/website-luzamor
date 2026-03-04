import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FeaturedEvent } from "../FeaturedEvent";
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
    onMouseEnter,
    onMouseLeave,
  }: {
    children: React.ReactNode;
    href: string;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
  }) => (
    <a href={href} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </a>
  ),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
}));

describe("FeaturedEvent", () => {
  const mockEvent: Event = {
    _id: "event-1",
    title: "Arena Sertaneja",
    slug: { current: "arena-sertaneja" },
    coverImage: {
      asset: { _ref: "image-123", _type: "reference" },
      alt: "Arena Sertaneja",
    },
    description: [
      {
        _type: "block",
        _key: "block1",
        children: [
          {
            _type: "span",
            _key: "span1",
            text: "A Fundação LuzAmor convida você para a 4ª edição do Jantar Arena Sertaneja",
            marks: [],
          },
        ],
        style: "normal",
        markDefs: [],
      },
    ],
    category: "musical",
    eventDate: "2026-04-24T19:30:00.000Z",
    ticketPrice: { free: false, value: 50.0 },
    location: { name: "Pátio da Fundação" },
    cta: { enabled: true, type: "link", link: "/inscricao" },
    featured: true,
    active: true,
  };

  it("renders event title", () => {
    render(<FeaturedEvent event={mockEvent} />);
    expect(screen.getByText("Arena Sertaneja")).toBeInTheDocument();
  });

  it("renders event description", () => {
    render(<FeaturedEvent event={mockEvent} />);
    expect(
      screen.getByText(
        /A Fundação LuzAmor convida você para a 4ª edição do Jantar Arena Sertaneja/,
      ),
    ).toBeInTheDocument();
  });

  it("displays day and month from event date", () => {
    render(<FeaturedEvent event={mockEvent} />);
    expect(screen.getByText("24")).toBeInTheDocument();
    expect(screen.getByText("ABR")).toBeInTheDocument();
  });

  it("displays year below date", () => {
    render(<FeaturedEvent event={mockEvent} />);
    expect(screen.getByText("2026")).toBeInTheDocument();
  });

  it("displays event time", () => {
    render(<FeaturedEvent event={mockEvent} />);
    expect(screen.getByText(/16:30/)).toBeInTheDocument();
  });

  it("renders category badge with icon", () => {
    render(<FeaturedEvent event={mockEvent} />);
    expect(screen.getByText("Musical")).toBeInTheDocument();
  });

  it("renders event image with correct alt text", () => {
    render(<FeaturedEvent event={mockEvent} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("alt", "Arena Sertaneja");
  });

  it("creates link to event detail page", () => {
    render(<FeaturedEvent event={mockEvent} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/evento/arena-sertaneja");
  });

  it("renders CTA button with text from fallback", () => {
    render(<FeaturedEvent event={mockEvent} />);
    expect(screen.getByText("Inscreva-se")).toBeInTheDocument();
  });

  it("triggers hover state on mouse enter", () => {
    render(<FeaturedEvent event={mockEvent} />);
    const link = screen.getByRole("link");
    
    fireEvent.mouseEnter(link);
    // Hover state is managed internally, just verify no errors
    expect(link).toBeInTheDocument();
  });

  it("uses responsive classes for mobile optimization", () => {
    const { container } = render(<FeaturedEvent event={mockEvent} />);
    const gridElement = container.querySelector(".grid");
    
    expect(gridElement).toHaveClass("grid-cols-1");
    expect(gridElement).toHaveClass("md:grid-cols-5");
  });

  it("renders with educational category", () => {
    const educationalEvent: Event = { ...mockEvent, category: "educacional" };
    render(<FeaturedEvent event={educationalEvent} />);
    expect(screen.getByText("Educacional")).toBeInTheDocument();
  });

  it("renders with cultural category", () => {
    const culturalEvent: Event = { ...mockEvent, category: "cultural" };
    render(<FeaturedEvent event={culturalEvent} />);
    expect(screen.getByText("Cultural")).toBeInTheDocument();
  });

  it("renders with celebration category", () => {
    const celebrationEvent: Event = { ...mockEvent, category: "celebracao" };
    render(<FeaturedEvent event={celebrationEvent} />);
    expect(screen.getByText("Celebração")).toBeInTheDocument();
  });

  it("handles events without description", () => {
    const eventWithoutDesc = { ...mockEvent, description: [] };
    render(<FeaturedEvent event={eventWithoutDesc} />);
    
    // Should still render title and other elements
    expect(screen.getByText("Arena Sertaneja")).toBeInTheDocument();
    expect(screen.getByText("24")).toBeInTheDocument();
  });
});
