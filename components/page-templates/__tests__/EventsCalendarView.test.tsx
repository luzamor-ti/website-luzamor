import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
      />,
    );

    const prevButton = screen.getByLabelText("Mês anterior");
    const nextButton = screen.getByLabelText("Próximo mês");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("navigates to previous month", async () => {
    const user = userEvent.setup();

    render(
      <EventsCalendarView
        upcomingEvents={mockUpcomingEvents}
        pastEvents={mockPastEvents}
      />,
    );

    const prevButton = screen.getByLabelText("Mês anterior");
    await user.click(prevButton);

    // Should show February 2026
    expect(screen.getByText(/fevereiro de 2026/i)).toBeInTheDocument();
  });

  it("navigates to next month", async () => {
    const user = userEvent.setup();

    render(
      <EventsCalendarView
        upcomingEvents={mockUpcomingEvents}
        pastEvents={mockPastEvents}
      />,
    );

    const nextButton = screen.getByLabelText("Próximo mês");
    await user.click(nextButton);

    // Should show April 2026
    expect(screen.getByText(/abril de 2026/i)).toBeInTheDocument();
  });

  it("displays event on correct date", async () => {
    const user = userEvent.setup();

    render(
      <EventsCalendarView
        upcomingEvents={mockUpcomingEvents}
        pastEvents={mockPastEvents}
      />,
    );

    // Navigate to April to see the event
    const nextButton = screen.getByLabelText("Próximo mês");
    await user.click(nextButton);

    // Event should appear on April 24
    expect(screen.getByText("Evento Abril")).toBeInTheDocument();
  });

  it("renders legend with correct colors", () => {
    render(
      <EventsCalendarView
        upcomingEvents={mockUpcomingEvents}
        pastEvents={mockPastEvents}
      />,
    );

    expect(screen.getByText("Próximos eventos")).toBeInTheDocument();
    expect(screen.getByText("Eventos passados")).toBeInTheDocument();
  });

  it("shows upcoming events with primary color", async () => {
    const user = userEvent.setup();

    render(
      <EventsCalendarView
        upcomingEvents={mockUpcomingEvents}
        pastEvents={mockPastEvents}
      />,
    );

    // Navigate to April
    const nextButton = screen.getByLabelText("Próximo mês");
    await user.click(nextButton);

    const eventLink = screen.getByText("Evento Abril").closest("a");
    expect(eventLink).toHaveClass("bg-primary");
    expect(eventLink).toHaveClass("text-white");
  });

  it("shows past events with gray color", async () => {
    const user = userEvent.setup();

    render(
      <EventsCalendarView
        upcomingEvents={mockUpcomingEvents}
        pastEvents={mockPastEvents}
      />,
    );

    // Navigate to February
    const prevButton = screen.getByLabelText("Mês anterior");
    await user.click(prevButton);

    const eventLink = screen.getByText("Evento Passado").closest("a");
    expect(eventLink).toHaveClass("bg-gray-200");
    expect(eventLink).toHaveClass("text-gray-700");
  });

  it("shows +N more indicator when more than 3 events on same day", async () => {
    const user = userEvent.setup();

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
      />,
    );

    // Navigate to April
    const nextButton = screen.getByLabelText("Próximo mês");
    await user.click(nextButton);

    // Should show "+3 mais" (5 events - 2 displayed = 3 more)
    expect(screen.getByText("+3 mais")).toBeInTheDocument();
  });

  it("renders event links with correct href", async () => {
    const user = userEvent.setup();

    render(
      <EventsCalendarView
        upcomingEvents={mockUpcomingEvents}
        pastEvents={mockPastEvents}
      />,
    );

    // Navigate to April
    const nextButton = screen.getByLabelText("Próximo mês");
    await user.click(nextButton);

    const eventLink = screen.getByText("Evento Abril").closest("a");
    expect(eventLink).toHaveAttribute("href", "/evento/evento-abril");
  });
});
