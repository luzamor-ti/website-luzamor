import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutHeroSection } from "@/components/about/AboutHeroSection";
import { AboutHero } from "@/sanity/lib/types/about";

describe("AboutHeroSection", () => {
  const mockAboutHeroData: AboutHero = {
    titulo: "Sobre a Fundação Luzamor",
    subtitulo: "Transformando vidas através da cultura e educação",
    tag: "Quem Somos",
  } as AboutHero;

  it("renders with hero data", () => {
    render(<AboutHeroSection data={mockAboutHeroData} />);

    expect(screen.getByText("Sobre a Fundação Luzamor")).toBeInTheDocument();
    expect(
      screen.getByText("Transformando vidas através da cultura e educação"),
    ).toBeInTheDocument();
    expect(screen.getByText("Quem Somos")).toBeInTheDocument();
  });

  it("uses fallback data when data is null", () => {
    render(<AboutHeroSection data={null} />);

    // Should render fallback from textFallbacks.ts
    expect(screen.getByText(/Sobre/i)).toBeInTheDocument();
  });

  it("renders tag as uppercase badge", () => {
    render(<AboutHeroSection data={mockAboutHeroData} />);

    const tag = screen.getByText("Quem Somos");
    expect(tag).toHaveClass("uppercase", "tracking-wide");
  });

  it("renders title with correct hierarchy", () => {
    render(<AboutHeroSection data={mockAboutHeroData} />);

    const title = screen.getByText("Sobre a Fundação Luzamor");
    expect(title.tagName).toBe("H1");
  });

  it("renders subtitle when provided", () => {
    render(<AboutHeroSection data={mockAboutHeroData} />);

    const subtitle = screen.getByText(
      "Transformando vidas através da cultura e educação",
    );
    expect(subtitle).toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    const dataWithoutSubtitle: AboutHero = {
      ...mockAboutHeroData,
      subtitulo: undefined,
    };

    render(<AboutHeroSection data={dataWithoutSubtitle} />);

    expect(
      screen.queryByText("Transformando vidas através da cultura e educação"),
    ).not.toBeInTheDocument();
  });

  it("renders gradient background when no image is provided", () => {
    render(<AboutHeroSection data={mockAboutHeroData} />);

    const section = screen
      .getByText("Sobre a Fundação Luzamor")
      .closest("section");
    const gradient = section?.querySelector(".bg-gradient-to-br");
    expect(gradient).toBeInTheDocument();
  });
});
