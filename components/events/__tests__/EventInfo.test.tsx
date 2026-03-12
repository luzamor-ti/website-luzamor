import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { EventInfo } from "@/components/events/EventInfo";
import { createMockEvent } from "./eventMocks";

// Mock framer-motion — inclui span e div para cobrir o componente Button
vi.mock("framer-motion", () => ({
  motion: new Proxy(
    {},
    {
      get:
        (_target, tag: string) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ children, ...props }: any) => {
          const Tag = tag as keyof JSX.IntrinsicElements;
          return <Tag {...props}>{children}</Tag>;
        },
    },
  ),
}));

// Mock lucide-react icons to avoid render issues
vi.mock("lucide-react", () => ({
  Calendar: () => <svg data-testid="icon-calendar" />,
  MapPin: () => <svg data-testid="icon-mappin" />,
  Ticket: () => <svg data-testid="icon-ticket" />,
  FolderOpen: () => <svg data-testid="icon-folder" />,
  ArrowRight: () => <svg data-testid="icon-arrow-right" />,
  ArrowUpRight: () => <svg data-testid="icon-arrow-up-right" />,
}));

describe("EventInfo — Ingresso", () => {
  it("exibe 'Gratuito' para evento gratuito", () => {
    const event = createMockEvent({ ticketPrice: { free: true } });
    render(<EventInfo event={event} />);
    expect(screen.getByText("Gratuito")).toBeInTheDocument();
  });

  it("exibe valor formatado para evento pago", () => {
    const event = createMockEvent({
      ticketPrice: { free: false, value: 50.0 },
    });
    render(<EventInfo event={event} />);
    expect(screen.getByText("R$ 50,00")).toBeInTheDocument();
  });

  it("exibe 'Valor do Ingresso' como label quando ticketPrice está presente", () => {
    const event = createMockEvent({ ticketPrice: { free: true } });
    render(<EventInfo event={event} />);
    expect(screen.getByText("Valor do Ingresso")).toBeInTheDocument();
  });
});

describe("EventInfo — CTA Button", () => {
  it("exibe o texto do botão CTA do evento", () => {
    const event = createMockEvent({
      cta: {
        enabled: true,
        buttonText: "Garantir presença",
        type: "link",
        link: "https://example.com",
      },
    });
    render(<EventInfo event={event} />);
    expect(screen.getByText("Garantir presença")).toBeInTheDocument();
  });

  it("exibe texto fallback quando cta não está habilitado", () => {
    const event = createMockEvent({ cta: { enabled: false } });
    render(<EventInfo event={event} />);
    expect(screen.getByText("Participe do Evento")).toBeInTheDocument();
  });
});

describe("EventInfo — Data e Horário", () => {
  it("exibe label 'Data e Horário'", () => {
    const event = createMockEvent();
    render(<EventInfo event={event} />);
    expect(screen.getByText("Data e Horário")).toBeInTheDocument();
  });

  it("exibe o horário com prefixo 'às'", () => {
    const event = createMockEvent();
    render(<EventInfo event={event} />);
    const timeText = screen.getByText(/às \d{2}:\d{2}/);
    expect(timeText).toBeInTheDocument();
  });
});

describe("EventInfo — Localização", () => {
  it("exibe o nome do local quando definido", () => {
    const event = createMockEvent({
      location: {
        name: "Teatro Municipal",
        address: "Rua Central, 10",
        mapLink: "https://maps.google.com/teatro",
      },
    });
    render(<EventInfo event={event} />);
    expect(screen.getByText("Teatro Municipal")).toBeInTheDocument();
  });

  it("exibe o endereço quando definido", () => {
    const event = createMockEvent({
      location: {
        name: "Teatro Municipal",
        address: "Rua Central, 10",
        mapLink: undefined,
      },
    });
    render(<EventInfo event={event} />);
    expect(screen.getByText("Rua Central, 10")).toBeInTheDocument();
  });

  it("exibe 'Ver no Mapa' quando location tem mapLink", () => {
    const event = createMockEvent({
      location: {
        name: "Espaço Verde",
        address: "Rua das Árvores",
        mapLink: "https://maps.google.com/espaco",
      },
    });
    render(<EventInfo event={event} />);
    expect(screen.getByText("Ver no Mapa")).toBeInTheDocument();
  });

  it("exibe 'Ver Auditório' quando location não tem mapLink nem address", () => {
    const event = createMockEvent({
      location: { name: undefined, address: undefined, mapLink: undefined },
    });
    render(<EventInfo event={event} />);
    expect(screen.getByText("Ver Auditório")).toBeInTheDocument();
  });

  it("exibe 'Ver no Mapa' quando location tem apenas address (sem mapLink)", () => {
    const event = createMockEvent({
      location: {
        name: "Local X",
        address: "Av. Principal, 500",
        mapLink: undefined,
      },
    });
    render(<EventInfo event={event} />);
    expect(screen.getByText("Ver no Mapa")).toBeInTheDocument();
  });
});

describe("EventInfo — Projeto Relacionado", () => {
  it("exibe link para o projeto quando event.project está presente", () => {
    const event = createMockEvent({
      project: {
        _id: "proj-1",
        title: "Projeto Esperança",
        slug: "projeto-esperanca",
      },
    });
    render(<EventInfo event={event} />);
    expect(screen.getByText("Projeto Esperança")).toBeInTheDocument();
  });

  it("não exibe seção de projeto quando event.project é undefined", () => {
    const event = createMockEvent({ project: undefined });
    render(<EventInfo event={event} />);
    expect(screen.queryByText("Projeto")).not.toBeInTheDocument();
  });
});
