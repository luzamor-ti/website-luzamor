import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EventsTabNavigation } from "../calendario-eventos/EventsTabNavigation";

describe("EventsTabNavigation", () => {
  it("renders tab buttons", () => {
    const mockTabChange = vi.fn();
    const mockViewChange = vi.fn();

    render(
      <EventsTabNavigation
        activeTab="upcoming"
        onTabChange={mockTabChange}
        activeView="list"
        onViewChange={mockViewChange}
      />,
    );

    expect(screen.getByText("Próximos Eventos")).toBeInTheDocument();
    expect(screen.getByText("Eventos Passados")).toBeInTheDocument();
  });

  it("renders view toggle buttons", () => {
    const mockTabChange = vi.fn();
    const mockViewChange = vi.fn();

    render(
      <EventsTabNavigation
        activeTab="upcoming"
        onTabChange={mockTabChange}
        activeView="list"
        onViewChange={mockViewChange}
      />,
    );

    expect(screen.getByText("Lista")).toBeInTheDocument();
    expect(screen.getByText("Calendário")).toBeInTheDocument();
  });

  it("highlights active tab", () => {
    const mockTabChange = vi.fn();
    const mockViewChange = vi.fn();

    render(
      <EventsTabNavigation
        activeTab="upcoming"
        onTabChange={mockTabChange}
        activeView="list"
        onViewChange={mockViewChange}
      />,
    );

    const upcomingTab = screen.getByText("Próximos Eventos");
    expect(upcomingTab).toHaveClass("bg-primary");
    expect(upcomingTab).toHaveClass("text-white");
  });

  it("highlights active view", () => {
    const mockTabChange = vi.fn();
    const mockViewChange = vi.fn();

    render(
      <EventsTabNavigation
        activeTab="upcoming"
        onTabChange={mockTabChange}
        activeView="list"
        onViewChange={mockViewChange}
      />,
    );

    const listButton = screen.getByLabelText("Visualização em lista");
    expect(listButton).toHaveClass("bg-primary");
    expect(listButton).toHaveClass("text-white");
  });

  it("calls onTabChange when clicking tab", async () => {
    const user = userEvent.setup();
    const mockTabChange = vi.fn();
    const mockViewChange = vi.fn();

    render(
      <EventsTabNavigation
        activeTab="upcoming"
        onTabChange={mockTabChange}
        activeView="list"
        onViewChange={mockViewChange}
      />,
    );

    const pastTab = screen.getByText("Eventos Passados");
    await user.click(pastTab);

    expect(mockTabChange).toHaveBeenCalledWith("past");
  });

  it("calls onViewChange when clicking view toggle", async () => {
    const user = userEvent.setup();
    const mockTabChange = vi.fn();
    const mockViewChange = vi.fn();

    render(
      <EventsTabNavigation
        activeTab="upcoming"
        onTabChange={mockTabChange}
        activeView="list"
        onViewChange={mockViewChange}
      />,
    );

    const calendarView = screen.getByText("Calendário");
    await user.click(calendarView);

    expect(mockViewChange).toHaveBeenCalledWith("calendar");
  });

  it("applies correct styles to inactive tab", () => {
    const mockTabChange = vi.fn();
    const mockViewChange = vi.fn();

    render(
      <EventsTabNavigation
        activeTab="upcoming"
        onTabChange={mockTabChange}
        activeView="list"
        onViewChange={mockViewChange}
      />,
    );

    const pastTab = screen.getByText("Eventos Passados");
    expect(pastTab).toHaveClass("text-gray-600");
  });

  it("applies correct styles to inactive view", () => {
    const mockTabChange = vi.fn();
    const mockViewChange = vi.fn();

    render(
      <EventsTabNavigation
        activeTab="upcoming"
        onTabChange={mockTabChange}
        activeView="list"
        onViewChange={mockViewChange}
      />,
    );

    const calendarButton = screen.getByLabelText("Visualização em calendário");
    expect(calendarButton).toHaveClass("text-gray-600");
    expect(calendarButton).toHaveClass("bg-gray-100");
  });

  it("renders icons for view toggles", () => {
    const mockTabChange = vi.fn();
    const mockViewChange = vi.fn();

    const { container } = render(
      <EventsTabNavigation
        activeTab="upcoming"
        onTabChange={mockTabChange}
        activeView="list"
        onViewChange={mockViewChange}
      />,
    );

    // List and Calendar icons should be present (check for SVG elements)
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(0);
  });
});
