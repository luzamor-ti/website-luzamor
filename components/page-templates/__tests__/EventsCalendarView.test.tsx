import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { EventsCalendarView } from "../calendario-eventos/EventsCalendarView";
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

describe("EventsCalendarView", () => {
  const initialMonth = new Date("2026-03-15T12:00:00");

  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockUpcomingEvents: Event[] = [
    {
      _id: "1",
      title: "Evento Abril",
      slug: { current: "evento-abril" },
      eventDate: "2026-04-24T18:00:00",
      coverImage: {
        asset: { _ref: "image-1", _type: "reference" },
        alt: "Cover 1",
      },
      shortDescription: "Um evento cultural incrível em abril",
      category: "cultural",
      ticketPrice: { free: true },
      location: { name: "Local A" },
      description: [],
      cta: { enabled: false },
      featured: false,
      active: true,
    },
  ] as Event[];

  const mockPastEvents: Event[] = [
    {
      _id: "2",
      title: "Evento Passado",
      slug: { current: "evento-passado" },
      eventDate: "2026-02-15T18:00:00",
      coverImage: {
        asset: { _ref: "image-2", _type: "reference" },
        alt: "Cover 2",
      },
      shortDescription: "Evento educacional que já aconteceu",
      category: "educacional",
      ticketPrice: { free: true },
      location: { name: "Local B" },
      description: [],
      cta: { enabled: false },
      featured: false,
      active: true,
    },
  ] as Event[];

  it("renders calendar with current month", () => {
    render(
      <EventsCalendarView
        upcomingEvents={mockUpcomingEvents}
        pastEvents={mockPastEvents}
        initialMonth={initialMonth}
      />,
    );

    // Should show current month/year (March 2026)
    expect(screen.getByText(/março de 2026/i)).toBeInTheDocument();
  });

  it("renders weekday headers", () => {
    render(
      <EventsCalendarView
        upcomingEvents={mockUpcomingEvents}
        pastEvents={mockPastEvents}
        initialMonth={initialMonth}
      />,
    );

    expect(screen.getByText("Dom")).toBeInTheDocument();
    expect(screen.getByText("Seg")).toBeInTheDocument();
    expect(screen.getByText("Ter")).toBeInTheDocument();
    expect(screen.getByText("Qua")).toBeInTheDocument();
    expect(screen.getByText("Qui")).toBeInTheDocument();
    expect(screen.getByText("Sex")).toBeInTheDocument();
    expect(screen.getByText("Sáb")).toBeInTheDocument();
  });

  it("renders navigation buttons", () => {
    render(
      <EventsCalendarView
        upcomingEvents={mockUpcomingEvents}
        pastEvents={mockPastEvents}
        initialMonth={initialMonth}
      />,
    );

    const prevButton = screen.getByLabelText("Mês anterior");
    const nextButton = screen.getByLabelText("Próximo mês");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("navigates to previous month", async () => {
    render(
      <EventsCalendarView
        upcomingEvents={mockUpcomingEvents}
        pastEvents={mockPastEvents}
        initialMonth={initialMonth}
      />,
    );

    const prevButton = screen.getByLabelText("Mês anterior");
    fireEvent.click(prevButton);

    // Should show February 2026
    expect(screen.getByText(/fevereiro de 2026/i)).toBeInTheDocument();
  });

  it("navigates to next month", async () => {
    render(
      <EventsCalendarView
        upcomingEvents={mockUpcomingEvents}
        pastEvents={mockPastEvents}
        initialMonth={initialMonth}
      />,
    );

    const nextButton = screen.getByLabelText("Próximo mês");
    fireEvent.click(nextButton);

    // Should show April 2026
    expect(screen.getByText(/abril de 2026/i)).toBeInTheDocument();
  });

  it("displays event on correct date", async () => {
    render(
      <EventsCalendarView
        upcomingEvents={mockUpcomingEvents}
        pastEvents={mockPastEvents}
        initialMonth={initialMonth}
      />,
    );

    // Navigate to April to see the event
    const nextButton = screen.getByLabelText("Próximo mês");
    fireEvent.click(nextButton);

    // Event should appear on April 24
    expect(screen.getByText("Evento Abril")).toBeInTheDocument();
  });

  it("renders legend with correct colors", () => {
    render(
      <EventsCalendarView
        upcomingEvents={mockUpcomingEvents}
        pastEvents={mockPastEvents}
        initialMonth={initialMonth}
      />,
    );

    expect(screen.getByText("Próximos eventos")).toBeInTheDocument();
    expect(screen.getByText("Eventos passados")).toBeInTheDocument();
  });

  it("shows upcoming events with primary color", async () => {
    render(
      <EventsCalendarView
        upcomingEvents={mockUpcomingEvents}
        pastEvents={mockPastEvents}
        initialMonth={initialMonth}
      />,
    );

    // Navigate to April
    const nextButton = screen.getByLabelText("Próximo mês");
    fireEvent.click(nextButton);

    const eventLink = screen.getByText("Evento Abril").closest("a");
    expect(eventLink).toHaveClass("bg-primary");
    expect(eventLink).toHaveClass("text-white");
  });

  it("shows past events with gray color", async () => {
    render(
      <EventsCalendarView
        upcomingEvents={mockUpcomingEvents}
        pastEvents={mockPastEvents}
        initialMonth={initialMonth}
      />,
    );

    // Navigate to February
    const prevButton = screen.getByLabelText("Mês anterior");
    fireEvent.click(prevButton);

    const eventLink = screen.getByText("Evento Passado").closest("a");
    expect(eventLink).toHaveClass("bg-gray-200");
    expect(eventLink).toHaveClass("text-gray-700");
  });

  it("shows +N more indicator when more than 3 events on same day", async () => {
    const manyEventsOnSameDay: Event[] = Array.from({ length: 5 }, (_, i) => ({
      _id: `event-${i}`,
      title: `Evento ${i + 1}`,
      slug: { current: `evento-${i}` },
      eventDate: "2026-04-24T18:00:00",
      coverImage: {
        asset: { _ref: `image-${i}`, _type: "reference" },
        alt: `Cover ${i}`,
      },
      shortDescription: `Descrição breve do evento ${i + 1}`,
      category: "cultural",
      ticketPrice: { free: true },
      location: { name: "Local" },
      description: [],
      cta: { enabled: false },
      featured: false,
      active: true,
    })) as Event[];

    render(
      <EventsCalendarView
        upcomingEvents={manyEventsOnSameDay}
        pastEvents={[]}
        initialMonth={initialMonth}
      />,
    );

    // Navigate to April
    const nextButton = screen.getByLabelText("Próximo mês");
    fireEvent.click(nextButton);

    // Should show "+3 mais" (5 events - 2 displayed = 3 more)
    expect(screen.getByText("+3 mais")).toBeInTheDocument();
  });

  it("renders event links with correct href", async () => {
    render(
      <EventsCalendarView
        upcomingEvents={mockUpcomingEvents}
        pastEvents={mockPastEvents}
        initialMonth={initialMonth}
      />,
    );

    // Navigate to April
    const nextButton = screen.getByLabelText("Próximo mês");
    fireEvent.click(nextButton);

    const eventLink = screen.getByText("Evento Abril").closest("a");
    expect(eventLink).toHaveAttribute("href", "/evento/evento-abril");
  });
});
