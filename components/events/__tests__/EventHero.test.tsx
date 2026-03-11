import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { EventHero } from "@/components/events/EventHero";
import { createMockEvent } from "./eventMocks";

// Mocks globais necessários para EventHero
vi.mock("framer-motion", () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

vi.mock("lucide-react", () => ({
  Calendar: () => <svg data-testid="icon-calendar" />,
  Clock: () => <svg data-testid="icon-clock" />,
  MapPin: () => <svg data-testid="icon-mappin" />,
  Ticket: () => <svg data-testid="icon-ticket" />,
}));

vi.mock("@/components/events/EventCategoryBadge", () => ({
  EventCategoryBadge: ({ category }: { category: string }) => (
    <span data-testid="category-badge">{category}</span>
  ),
}));

describe("EventHero — conteúdo principal", () => {
  it("exibe o título do evento", () => {
    const event = createMockEvent({ title: "Grande Palestra 2026" });
    render(<EventHero event={event} />);
    expect(screen.getByText("Grande Palestra 2026")).toBeInTheDocument();
  });

  it("exibe a descrição curta do evento", () => {
    const event = createMockEvent({
      shortDescription: "Uma palestra incrível sobre inovação",
    });
    render(<EventHero event={event} />);
    expect(
      screen.getByText("Uma palestra incrível sobre inovação"),
    ).toBeInTheDocument();
  });

  it("exibe a badge de categoria", () => {
    const event = createMockEvent({ category: "cultural" });
    render(<EventHero event={event} />);
    expect(screen.getByTestId("category-badge")).toBeInTheDocument();
  });

  it("exibe a imagem de capa do evento", () => {
    const event = createMockEvent();
    const { container } = render(<EventHero event={event} />);
    const img = container.querySelector("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("alt");
  });
});

describe("EventHero — informações de data e horário", () => {
  it("exibe a label 'Data'", () => {
    const event = createMockEvent();
    render(<EventHero event={event} />);
    expect(screen.getByText("Data")).toBeInTheDocument();
  });

  it("exibe a label 'Horário'", () => {
    const event = createMockEvent();
    render(<EventHero event={event} />);
    expect(screen.getByText("Horário")).toBeInTheDocument();
  });
});

describe("EventHero — ingresso", () => {
  it("exibe 'Gratuita' para evento gratuito", () => {
    const event = createMockEvent({ ticketPrice: { free: true } });
    render(<EventHero event={event} />);
    expect(screen.getByText("Gratuita")).toBeInTheDocument();
  });

  it("exibe valor numérico para evento pago", () => {
    const event = createMockEvent({
      ticketPrice: { free: false, value: 80.5 },
    });
    render(<EventHero event={event} />);
    expect(screen.getByText(/80/)).toBeInTheDocument();
  });
});

describe("EventHero — localização", () => {
  it("exibe o nome do local quando definido", () => {
    const event = createMockEvent({
      location: {
        name: "Auditório Central",
        address: "Rua A",
        mapLink: undefined,
      },
    });
    render(<EventHero event={event} />);
    expect(screen.getByText("Auditório Central")).toBeInTheDocument();
  });

  it("não exibe o bloco de localização quando location.name não está definido", () => {
    const event = createMockEvent({
      location: { name: undefined, address: undefined, mapLink: undefined },
    });
    render(<EventHero event={event} />);
    // Sem nome do local, o bloco de Local não deve ser renderizado
    expect(screen.queryByText("Local")).not.toBeInTheDocument();
  });
});
