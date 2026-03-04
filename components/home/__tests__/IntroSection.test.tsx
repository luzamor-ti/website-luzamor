import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import IntroSection from "@/components/home/IntroSection";
import { HomeSection } from "@/sanity/lib/types/homeSection";

describe("IntroSection", () => {
  const mockData: HomeSection = {
    _id: "intro-1",
    _type: "secaoHome",
    name: "intro",
    tag: "Nossa História",
    title: "Conheça a Fundação Luzamor",
    description:
      "Uma fundação dedicada a transformar vidas através da cultura e educação.",
    buttonText: "Saiba mais",
    buttonUrl: "/sobre-nos",
    active: true,
    image: {
      asset: {
        _id: "image-1",
        url: "https://cdn.sanity.io/images/test/intro.jpg",
      },
      alt: "Imagem da fundação",
    },
  };

  it("renders with data", () => {
    render(<IntroSection data={mockData} />);

    expect(screen.getByText("Nossa História")).toBeInTheDocument();
    expect(screen.getByText("Conheça a Fundação Luzamor")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Uma fundação dedicada a transformar vidas através da cultura e educação.",
      ),
    ).toBeInTheDocument();
  });

  it("renders button with custom text and URL", () => {
    render(<IntroSection data={mockData} />);

    const button = screen.getByText("Saiba mais").closest("a");
    expect(button).toHaveAttribute("href", "/sobre-nos");
  });

  it("uses fallback data when data is null", () => {
    render(<IntroSection data={null} />);

    // Should render fallback from textFallbacks.ts
    expect(screen.getByText(/Nossa Missão/i)).toBeInTheDocument();
  });

  it("renders image when provided", () => {
    render(<IntroSection data={mockData} />);

    const image = screen.getByAltText("Imagem da fundação");
    expect(image).toBeInTheDocument();
  });

  it("renders decorative pattern when no image", () => {
    const dataWithoutImage: HomeSection = {
      ...mockData,
      image: undefined,
    } as HomeSection;

    const { container } = render(<IntroSection data={dataWithoutImage} />);

    // Should have decorative blur elements
    const blurElements = container.querySelectorAll(".blur-3xl");
    expect(blurElements.length).toBeGreaterThan(0);
  });

  it("uses image alt text or title as fallback", () => {
    const dataWithoutAlt: HomeSection = {
      ...mockData,
      image: {
        asset: {
          _id: "image-1",
          _ref: "image-1",
          url: "https://example.com/intro.jpg",
        },
      },
    } as HomeSection;

    render(<IntroSection data={dataWithoutAlt} />);

    const image = screen.getByAltText(/Conheça a Fundação Luzamor/i);
    expect(image).toBeInTheDocument();
  });

  it("renders in two-column grid layout", () => {
    const { container } = render(<IntroSection data={mockData} />);

    const grid = container.querySelector(".grid-cols-1.md\\:grid-cols-2");
    expect(grid).toBeInTheDocument();
  });
});
