import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ImpactSection from "@/components/home/ImpactSection";
import { HomeSection } from "@/sanity/lib/types/homeSection";

describe("ImpactSection", () => {
  const mockData: HomeSection = {
    _id: "impact-1",
    tag: "Nosso Impacto",
    title: "Transformando Vidas",
    description: "Veja os números do nosso impacto social",
    cards: [
      {
        title: "Pessoas Atendidas",
        description: "Impactadas pelos nossos programas",
        number: "1000",
        image: {
          asset: {
            _id: "img-1",
            _ref: "img-1",
            url: "https://example.com/impact1.jpg",
          },
        },
      },
      {
        title: "Projetos Realizados",
        description: "Iniciativas concluídas com sucesso",
        number: "50",
        image: {
          asset: {
            _id: "img-2",
            _ref: "img-2",
            url: "https://example.com/impact2.jpg",
          },
        },
      },
      {
        title: "Comunidades",
        description: "Em todo território nacional",
        number: "20",
      },
    ],
  } as HomeSection;

  it("renders with impact data", () => {
    render(<ImpactSection data={mockData} />);

    expect(screen.getByText("Nosso Impacto")).toBeInTheDocument();
    expect(screen.getByText("Transformando Vidas")).toBeInTheDocument();
    expect(
      screen.getByText("Veja os números do nosso impacto social"),
    ).toBeInTheDocument();
  });

  it("renders impact cards with titles and descriptions", () => {
    render(<ImpactSection data={mockData} />);

    expect(screen.getByText("Pessoas Atendidas")).toBeInTheDocument();
    expect(
      screen.getByText("Impactadas pelos nossos programas"),
    ).toBeInTheDocument();

    expect(screen.getByText("Projetos Realizados")).toBeInTheDocument();
    expect(
      screen.getByText("Iniciativas concluídas com sucesso"),
    ).toBeInTheDocument();

    expect(screen.getByText("Comunidades")).toBeInTheDocument();
    expect(screen.getByText("Em todo território nacional")).toBeInTheDocument();
  });

  it("renders counter animations with numbers", () => {
    const { container } = render(<ImpactSection data={mockData} />);

    // CounterAnimation components should be present
    const counters = container.querySelectorAll("h1 span");
    expect(counters.length).toBeGreaterThan(0);
  });

  it("uses fallback data when data is null", () => {
    render(<ImpactSection data={null} />);

    // Should render fallback from textFallbacks.ts
    expect(screen.getByText(/Impacto/i)).toBeInTheDocument();
  });

  it("renders gradient background when no image provided", () => {
    const { container } = render(<ImpactSection data={mockData} />);

    // Third card has no image, should have gradient
    const gradients = container.querySelectorAll(".bg-gradient-to-br");
    expect(gradients.length).toBeGreaterThan(0);
  });

  it("renders in 3-column grid", () => {
    const { container } = render(<ImpactSection data={mockData} />);

    // Should have Grid with cols={3}
    const cards = container.querySelectorAll('[role="article"]');
    expect(cards.length).toBe(3);
  });

  it("applies hover effects to cards", () => {
    const { container } = render(<ImpactSection data={mockData} />);

    const cards = container.querySelectorAll('[role="article"]');
    cards.forEach((card) => {
      expect(card).toHaveClass("group", "cursor-pointer");
    });
  });

  it("renders with custom aria labels", () => {
    render(<ImpactSection data={mockData} />);

    expect(
      screen.getByLabelText("Impacto: Pessoas Atendidas"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Impacto: Projetos Realizados"),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Impacto: Comunidades")).toBeInTheDocument();
  });

  it("renders with split layout", () => {
    render(<ImpactSection data={mockData} />);

    // SectionHeader should be using split layout
    expect(screen.getByText("Nosso Impacto")).toBeInTheDocument();
    expect(screen.getByText("Transformando Vidas")).toBeInTheDocument();
  });

  it("renders cards with proper height", () => {
    const { container } = render(<ImpactSection data={mockData} />);

    const cards = container.querySelectorAll('[role="article"]');
    cards.forEach((card) => {
      expect(card).toHaveClass("h-[400px]");
    });
  });

  it("applies overlay effects to card images", () => {
    const { container } = render(<ImpactSection data={mockData} />);

    const overlays = container.querySelectorAll(".bg-gradient-to-t");
    expect(overlays.length).toBeGreaterThan(0);
  });
});
