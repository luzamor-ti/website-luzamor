import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { OurHistorySection } from "../OurHistorySection";

describe("OurHistorySection", () => {
  const mockData = {
    tagline: "Nossa Jornada",
    titulo: "História da Fundação",
    descricao: "Uma história de transformação",
    timeline: [
      {
        ano: "2010",
        tagline: "Fundação",
        titulo: "Início da Jornada",
        descricao: "A fundação foi criada",
        imagem: {
          _type: "image",
          asset: {
            _ref: "image-2010",
            _type: "reference",
          },
        },
      },
      {
        ano: "2015",
        tagline: "Expansão",
        titulo: "Crescimento",
        descricao: "Expandimos nossos projetos",
        imagem: {
          _type: "image",
          asset: {
            _ref: "image-2015",
            _type: "reference",
          },
        },
      },
      {
        ano: "2020",
        titulo: "Consolidação",
        descricao: "Consolidamos nossa atuação",
      },
    ],
  };

  it("renders with timeline data", () => {
    render(<OurHistorySection data={mockData} />);

    expect(screen.getByText("Nossa Jornada")).toBeInTheDocument();
    expect(screen.getByText("História da Fundação")).toBeInTheDocument();
    expect(
      screen.getByText("Uma história de transformação"),
    ).toBeInTheDocument();

    // Timeline items
    expect(screen.getAllByText("2010").length).toBeGreaterThan(0);
    expect(screen.getAllByText("2015").length).toBeGreaterThan(0);
    expect(screen.getAllByText("2020").length).toBeGreaterThan(0);
  });

  it("renders timeline items with titles", () => {
    render(<OurHistorySection data={mockData} />);

    expect(screen.getAllByText("Início da Jornada").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Crescimento").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Consolidação").length).toBeGreaterThan(0);
  });

  it("renders timeline items with descriptions", () => {
    render(<OurHistorySection data={mockData} />);

    expect(screen.getAllByText("A fundação foi criada").length).toBeGreaterThan(
      0,
    );
    expect(
      screen.getAllByText("Expandimos nossos projetos").length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText("Consolidamos nossa atuação").length,
    ).toBeGreaterThan(0);
  });

  it("renders timeline item images when provided", () => {
    render(<OurHistorySection data={mockData} />);

    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);

    // Verifica se as imagens dos anos 2010 e 2015 estão presentes
    const image2010 = images.find(
      (img) => img.getAttribute("alt") === "Início da Jornada",
    );
    const image2015 = images.find(
      (img) => img.getAttribute("alt") === "Crescimento",
    );

    expect(image2010).toBeInTheDocument();
    expect(image2015).toBeInTheDocument();
  });

  it("renders with fallback data when data is null", () => {
    render(<OurHistorySection data={null} />);

    // Fallback values from ABOUT_PAGE_FALLBACKS.history
    expect(
      screen.getByText("A História da Fundação Luzamor"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Uma trajetória de compromisso com a cultura, educação e desenvolvimento comunitário.",
      ),
    ).toBeInTheDocument();
  });

  it("renders taglines for timeline items", () => {
    render(<OurHistorySection data={mockData} />);

    expect(screen.getAllByText("Fundação").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Expansão").length).toBeGreaterThan(0);
  });

  it("handles timeline items without tagline", () => {
    render(<OurHistorySection data={mockData} />);

    // Item de 2020 não tem tagline
    expect(screen.getAllByText("Consolidação").length).toBeGreaterThan(0);
  });

  it("handles timeline items without image", () => {
    render(<OurHistorySection data={mockData} />);

    // Item de 2020 não tem imagem, mas deve renderizar normalmente
    expect(screen.getAllByText("2020").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Consolidação").length).toBeGreaterThan(0);
  });

  it("renders timeline with correct structure", () => {
    const { container } = render(<OurHistorySection data={mockData} />);

    // Verifica se a estrutura da timeline está presente
    const timeline = container.querySelector(".relative.z-20.space-y-12");
    expect(timeline).toBeInTheDocument();

    // Verifica se a linha vertical está presente
    const verticalLine = container.querySelector(
      ".absolute.left-1\\/2.w-\\[2px\\].bg-gray-200",
    );
    expect(verticalLine).toBeInTheDocument();
  });

  it("alternates timeline item layout on desktop", () => {
    const { container } = render(<OurHistorySection data={mockData} />);

    // Verifica se há elementos com grid de 3 colunas (layout desktop)
    const gridItems = container.querySelectorAll(
      ".md\\:grid-cols-\\[1fr_auto_1fr\\]",
    );
    expect(gridItems.length).toBeGreaterThan(0);
  });

  it("displays section header elements", () => {
    render(<OurHistorySection data={mockData} />);

    // Verifica elementos do header
    expect(screen.getByText("Nossa Jornada")).toBeInTheDocument();
    expect(screen.getByText("História da Fundação")).toBeInTheDocument();
  });

  it("handles empty timeline gracefully", () => {
    const dataWithEmptyTimeline = {
      ...mockData,
      timeline: [],
    };

    const { container } = render(
      <OurHistorySection data={dataWithEmptyTimeline} />,
    );

    // Deve renderizar sem erros
    const timelineContainer = container.querySelector(".relative.z-20");
    expect(timelineContainer).toBeInTheDocument();
  });
});
