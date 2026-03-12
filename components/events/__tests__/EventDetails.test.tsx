import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { EventDetails } from "@/components/events/EventDetails";
import { createMockEvent } from "./eventMocks";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock @portabletext/react
vi.mock("@portabletext/react", () => ({
  PortableText: ({
    value,
  }: {
    value: Array<{ children: Array<{ text: string }> }>;
  }) => (
    <div data-testid="portable-text">
      {value.map((block, i) =>
        block.children?.map((child, j) => (
          <span key={`${i}-${j}`}>{child.text}</span>
        )),
      )}
    </div>
  ),
}));

describe("EventDetails", () => {
  it("renderiza o heading 'Sobre o Evento'", () => {
    const event = createMockEvent();
    render(<EventDetails event={event} />);

    expect(screen.getByText("Sobre o Evento")).toBeInTheDocument();
  });

  it("renderiza o conteúdo da descrição via PortableText", () => {
    const event = createMockEvent();
    render(<EventDetails event={event} />);

    expect(screen.getByTestId("portable-text")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Aprenda técnicas de artesanato com materiais recicláveis",
      ),
    ).toBeInTheDocument();
  });

  it("retorna null quando description é undefined", () => {
    const event = createMockEvent({ description: undefined });
    const { container } = render(<EventDetails event={event} />);

    expect(container.firstChild).toBeNull();
  });

  it("tem aria-labelledby no elemento section", () => {
    const event = createMockEvent();
    const { container } = render(<EventDetails event={event} />);

    const section = container.querySelector("section");
    expect(section).toHaveAttribute("aria-labelledby", "event-about-heading");
  });
});
