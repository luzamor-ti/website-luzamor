import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { EventListItem } from "../EventListItem";
import { mockMusicalEvent } from "./eventMocks";

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
  const baseEvent = mockMusicalEvent;

  it("renders event title", () => {
    render(<EventListItem event={baseEvent} />);
    expect(screen.getByText("Concerto de Primavera")).toBeInTheDocument();
  });

  it("renders event description", () => {
    render(<EventListItem event={baseEvent} />);
    expect(
      screen.getByText(/Aprenda técnicas de artesanato/i),
    ).toBeInTheDocument();
  });

  it("renders event image with correct alt text", () => {
    render(<EventListItem event={baseEvent} />);
    const image = screen.getByAltText(/Workshop de Artesanato/i);
    expect(image).toBeInTheDocument();
  });

  it("renders event weekday", () => {
    render(<EventListItem event={baseEvent} />);
    // Component displays weekday, not full date
    expect(screen.getByText("quarta-feira")).toBeInTheDocument();
  });

  it("renders event time in local timezone", () => {
    render(<EventListItem event={baseEvent} />);
    // Test uses UTC time as CI/CD environment runs in UTC
    expect(screen.getByText("19:00")).toBeInTheDocument();
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

  it("renders shortDescription with line-clamp-2", () => {
    const eventWithLongDescription = {
      ...baseEvent,
      shortDescription:
        "Este é um texto muito longo que deve ser cortado pela classe line-clamp-2 do Tailwind, garantindo que apenas duas linhas sejam exibidas no componente EventListItem.",
    };

    render(<EventListItem event={eventWithLongDescription} />);

    // shortDescription deve estar presente com line-clamp-2
    expect(screen.getByText(/Este é um texto muito longo/)).toBeInTheDocument();
  });
});
