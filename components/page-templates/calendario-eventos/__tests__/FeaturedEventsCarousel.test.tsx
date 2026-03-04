import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeaturedEventsCarousel } from "../FeaturedEventsCarousel";
import { createMockEvents } from "@/components/events/__tests__/eventMocks";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("FeaturedEventsCarousel", () => {
  const mockEvents = createMockEvents(3);

  beforeEach(() => {
    vi.clearAllTimers();
    vi.useFakeTimers();
  });

  it("renders first event by default", () => {
    render(<FeaturedEventsCarousel events={mockEvents} />);
    expect(screen.getByText("Evento 1")).toBeInTheDocument();
  });

  it("renders navigation buttons", () => {
    render(<FeaturedEventsCarousel events={mockEvents} />);

    const prevButton = screen.getByLabelText("Evento anterior");
    const nextButton = screen.getByLabelText("Próximo evento");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("renders indicator dots for all events", () => {
    render(<FeaturedEventsCarousel events={mockEvents} />);

    const indicators = screen.getAllByRole("button", {
      name: /Ir para evento/,
    });
    expect(indicators).toHaveLength(mockEvents.length);
  });

  it("renders navigation buttons with correct aria labels", () => {
    render(<FeaturedEventsCarousel events={mockEvents} />);

    const prevButton = screen.getByLabelText("Evento anterior");
    const nextButton = screen.getByLabelText("Próximo evento");

    expect(prevButton).toHaveAttribute("aria-label", "Evento anterior");
    expect(nextButton).toHaveAttribute("aria-label", "Próximo evento");
  });

  it("renders correct number of indicator buttons", () => {
    render(<FeaturedEventsCarousel events={mockEvents} />);

    const indicators = screen.getAllByRole("button", {
      name: /Ir para evento/,
    });
    expect(indicators).toHaveLength(mockEvents.length);

    // Check individual indicator labels
    expect(
      screen.getByRole("button", { name: "Ir para evento 1" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ir para evento 2" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Ir para evento 3" }),
    ).toBeInTheDocument();
  });

  it("marks current indicator with aria-current", () => {
    render(<FeaturedEventsCarousel events={mockEvents} />);

    const firstIndicator = screen.getByRole("button", {
      name: "Ir para evento 1",
    });
    expect(firstIndicator).toHaveAttribute("aria-current", "true");
  });

  it("does not autoplay with single event", () => {
    const singleEvent = [mockEvents[0]];
    render(
      <FeaturedEventsCarousel events={singleEvent} autoplayDelay={3000} />,
    );

    // Should not set up autoplay for single event
    expect(screen.getByText("Evento 1")).toBeInTheDocument();

    vi.advanceTimersByTime(10000);
    // Still on first event
    expect(screen.getByText("Evento 1")).toBeInTheDocument();
  });

  it("renders with single event without navigation controls", () => {
    const singleEvent = [mockEvents[0]];
    render(<FeaturedEventsCarousel events={singleEvent} />);

    // With single event, only the FeaturedEvent is rendered, no controls
    expect(screen.getByText("Evento 1")).toBeInTheDocument();
    expect(screen.queryByLabelText("Evento anterior")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Próximo evento")).not.toBeInTheDocument();
  });

  it("has touch-friendly navigation buttons", () => {
    render(<FeaturedEventsCarousel events={mockEvents} />);

    const prevButton = screen.getByLabelText("Evento anterior");
    const nextButton = screen.getByLabelText("Próximo evento");

    // Check responsive classes
    expect(prevButton).toHaveClass("min-h-[40px]");
    expect(prevButton).toHaveClass("min-w-[40px]");
    expect(nextButton).toHaveClass("min-h-[40px]");
    expect(nextButton).toHaveClass("min-w-[40px]");
  });

  it("has responsive indicator dots", () => {
    const { container } = render(
      <FeaturedEventsCarousel events={mockEvents} />,
    );

    const indicatorContainer = container.querySelector(
      ".flex.justify-center.gap-1\\.5",
    );
    expect(indicatorContainer).toBeInTheDocument();
  });
});
