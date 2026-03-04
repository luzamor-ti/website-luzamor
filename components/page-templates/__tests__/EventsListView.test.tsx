import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EventsListView } from "../calendario-eventos/EventsListView";
import { Event } from "@/sanity/lib/types/event";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      ...props
    }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div {...props}>{children}</div>
    ),
  },
}));

describe("EventsListView", () => {
  const mockEvents: Event[] = Array.from({ length: 15 }, (_, i) => ({
    _id: `event-${i + 1}`,
    title: `Evento ${i + 1}`,
    slug: { current: `evento-${i + 1}` },
    eventDate: `2026-04-${String(i + 1).padStart(2, "0")}T18:00:00`,
    coverImage: {
      asset: { _ref: `image-${i + 1}`, _type: "reference" },
      alt: `Cover ${i + 1}`,
    },
    category: "cultural",
    ticketPrice: { free: true },
    location: { name: `Local ${i + 1}` },
    description: [
      {
        _type: "block",
        children: [{ _type: "span", text: `Descrição ${i + 1}` }],
      },
    ],
    cta: { enabled: false },
    featured: false,
    active: true,
  })) as Event[];

  it("renders events list", () => {
    render(<EventsListView events={mockEvents.slice(0, 3)} />);

    expect(screen.getByText("Evento 1")).toBeInTheDocument();
    expect(screen.getByText("Evento 2")).toBeInTheDocument();
    expect(screen.getByText("Evento 3")).toBeInTheDocument();
  });

  it("shows initial number of events (10 by default)", () => {
    render(<EventsListView events={mockEvents} />);

    // Should show first 10 events
    expect(screen.getByText("Evento 1")).toBeInTheDocument();
    expect(screen.getByText("Evento 10")).toBeInTheDocument();
    expect(screen.queryByText("Evento 11")).not.toBeInTheDocument();
  });

  it("shows load more button when there are more events", () => {
    render(<EventsListView events={mockEvents} />);

    expect(screen.getByText("Carregar mais eventos")).toBeInTheDocument();
  });

  it("does not show load more button when all events are visible", () => {
    render(<EventsListView events={mockEvents.slice(0, 5)} />);

    expect(screen.queryByText("Carregar mais eventos")).not.toBeInTheDocument();
  });

  it("loads more events when clicking load more button", async () => {
    const user = userEvent.setup();

    render(
      <EventsListView
        events={mockEvents}
        initialDisplayCount={5}
        loadMoreCount={5}
      />,
    );

    // Initially shows 5 events
    expect(screen.getByText("Evento 5")).toBeInTheDocument();
    expect(screen.queryByText("Evento 6")).not.toBeInTheDocument();

    // Click load more
    const loadMoreButton = screen.getByText("Carregar mais eventos");
    await user.click(loadMoreButton);

    // Now shows 10 events
    expect(screen.getByText("Evento 6")).toBeInTheDocument();
    expect(screen.getByText("Evento 10")).toBeInTheDocument();
  });

  it("displays event counter", () => {
    render(<EventsListView events={mockEvents} />);

    expect(screen.getByText("Exibindo 10 de 15 eventos")).toBeInTheDocument();
  });

  it("updates counter after loading more", async () => {
    const user = userEvent.setup();

    render(
      <EventsListView
        events={mockEvents}
        initialDisplayCount={5}
        loadMoreCount={5}
      />,
    );

    expect(screen.getByText("Exibindo 5 de 15 eventos")).toBeInTheDocument();

    const loadMoreButton = screen.getByText("Carregar mais eventos");
    await user.click(loadMoreButton);

    expect(screen.getByText("Exibindo 10 de 15 eventos")).toBeInTheDocument();
  });

  it("shows empty state when no events", () => {
    render(<EventsListView events={[]} />);

    expect(screen.getByText("Nenhum evento encontrado.")).toBeInTheDocument();
  });

  it("displays gallery icon when showGalleryIcon is true and event has gallery", () => {
    const eventsWithGallery = [
      {
        ...mockEvents[0],
        gallery: [
          { asset: { _ref: "gallery-1" }, alt: "Gallery 1" },
          { asset: { _ref: "gallery-2" }, alt: "Gallery 2" },
        ],
      },
    ] as Event[];

    render(<EventsListView events={eventsWithGallery} showGalleryIcon />);

    // Should show gallery count
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("respects custom initialDisplayCount", () => {
    render(<EventsListView events={mockEvents} initialDisplayCount={3} />);

    expect(screen.getByText("Exibindo 3 de 15 eventos")).toBeInTheDocument();
  });

  it("respects custom loadMoreCount", async () => {
    const user = userEvent.setup();

    render(
      <EventsListView
        events={mockEvents}
        initialDisplayCount={5}
        loadMoreCount={3}
      />,
    );

    expect(screen.getByText("Exibindo 5 de 15 eventos")).toBeInTheDocument();

    const loadMoreButton = screen.getByText("Carregar mais eventos");
    await user.click(loadMoreButton);

    // Should increase by 3 (loadMoreCount)
    expect(screen.getByText("Exibindo 8 de 15 eventos")).toBeInTheDocument();
  });
});
