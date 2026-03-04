import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutImpactsSection } from "@/components/about/AboutImpactsSection";
import { ImpactsSection } from "@/sanity/lib/types/about";

describe("AboutImpactsSection", () => {
  const mockImpactsData: ImpactsSection = {
    textoIntrodutorio: [
      {
        _type: "block",
        children: [{ _type: "span", text: "Nosso impacto transformador" }],
      },
    ],
    items: [
      {
        numero: "1000",
        titulo: "Pessoas atendidas",
        descricao: "Em todo o Brasil",
        icone: "Users",
      },
      {
        numero: "50",
        titulo: "Projetos realizados",
        descricao: "Desde 2020",
        icone: "Briefcase",
      },
      {
        numero: "20",
        titulo: "Comunidades",
        descricao: "Em 5 estados",
        icone: "MapPin",
      },
      {
        numero: "100",
        titulo: "Voluntários",
        descricao: "Ativos no projeto",
        icone: "Heart",
      },
    ],
  } as ImpactsSection;

  it("renders with impact data", () => {
    render(<AboutImpactsSection data={mockImpactsData} />);

    expect(screen.getByText("Pessoas atendidas")).toBeInTheDocument();
    expect(screen.getByText("Projetos realizados")).toBeInTheDocument();
    expect(screen.getByText("Comunidades")).toBeInTheDocument();
    expect(screen.getByText("Voluntários")).toBeInTheDocument();
  });

  it("renders impact descriptions", () => {
    render(<AboutImpactsSection data={mockImpactsData} />);

    expect(screen.getByText("Em todo o Brasil")).toBeInTheDocument();
    expect(screen.getByText("Desde 2020")).toBeInTheDocument();
    expect(screen.getByText("Em 5 estados")).toBeInTheDocument();
    expect(screen.getByText("Ativos no projeto")).toBeInTheDocument();
  });

  it("renders counter animation components", () => {
    const { container } = render(
      <AboutImpactsSection data={mockImpactsData} />,
    );

    // The CounterAnimation components should be present (they show 0 in tests due to mocking)
    const counterSpans = container.querySelectorAll("h2 span");
    expect(counterSpans.length).toBeGreaterThan(0);
  });

  it("uses fallback data when data is null", () => {
    const { container } = render(<AboutImpactsSection data={null} />);

    // Should render fallback items from textFallbacks.ts
    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();

    // Should have impact cards
    const impactCards = container.querySelectorAll(".bg-white.rounded-xl");
    expect(impactCards).toHaveLength(4);
  });

  it("renders introductory text when provided", () => {
    render(<AboutImpactsSection data={mockImpactsData} />);

    expect(
      screen.getByText(/Nosso impacto transformador/i),
    ).toBeInTheDocument();
  });

  it("renders 4 impact cards in a grid", () => {
    const { container } = render(
      <AboutImpactsSection data={mockImpactsData} />,
    );

    // Should have 4 impact cards
    const impactCards = container.querySelectorAll(".bg-white.rounded-xl");
    expect(impactCards).toHaveLength(4);
  });
});
