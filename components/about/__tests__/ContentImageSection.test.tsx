/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ContentImageSection } from "../ContentImageSection";
import { ContentWithImage } from "@/sanity/lib/types/about";

describe("ContentImageSection", () => {
  const mockFallback = {
    tag: "Sobre",
    title: "Nossa Missão",
    description: "Descrição de fallback",
  };

  const mockData: ContentWithImage = {
    tag: "Missão",
    titulo: "Transformar vidas através da educação",
    descricao: [
      {
        _type: "block",
        children: [
          { _type: "span", text: "Acreditamos no poder transformador da educação" },
        ],
      },
    ] as any,
    imagem: {
      asset: {
        _ref: "image-123",
        _type: "reference",
      },
    },
  };

  it("renders with data from props", () => {
    render(
      <ContentImageSection
        data={mockData}
        fallback={mockFallback}
        imagePosition="right"
      />,
    );

    expect(screen.getByText("Missão")).toBeInTheDocument();
    expect(
      screen.getByText("Transformar vidas através da educação"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Acreditamos no poder transformador da educação"),
    ).toBeInTheDocument();
  });

  it("renders fallback data when data is null", () => {
    render(
      <ContentImageSection
        data={null}
        fallback={mockFallback}
        imagePosition="right"
      />,
    );

    expect(screen.getByText("Sobre")).toBeInTheDocument();
    expect(screen.getByText("Nossa Missão")).toBeInTheDocument();
    expect(screen.getByText("Descrição de fallback")).toBeInTheDocument();
  });

  it("renders image when provided", () => {
    render(
      <ContentImageSection
        data={mockData}
        fallback={mockFallback}
        imagePosition="right"
      />,
    );

    const image = screen.getByAltText("Transformar vidas através da educação");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src");
  });

  it("renders gradient placeholder when no image", () => {
    const dataWithoutImage = { ...mockData, imagem: undefined };
    const { container } = render(
      <ContentImageSection
        data={dataWithoutImage}
        fallback={mockFallback}
        imagePosition="right"
      />,
    );

    const gradientDiv = container.querySelector(
      ".bg-gradient-to-br.from-primary.to-primary-dark",
    );
    expect(gradientDiv).toBeInTheDocument();
  });

  it("positions image on the left when imagePosition is left", () => {
    const { container } = render(
      <ContentImageSection
        data={mockData}
        fallback={mockFallback}
        imagePosition="left"
      />,
    );

    const imageContainer = container.querySelector(".lg\\:order-1");
    expect(imageContainer).toBeInTheDocument();

    const contentContainer = container.querySelector(".lg\\:order-2");
    expect(contentContainer).toBeInTheDocument();
  });

  it("positions image on the right by default", () => {
    const { container } = render(
      <ContentImageSection
        data={mockData}
        fallback={mockFallback}
        imagePosition="right"
      />,
    );

    // When on right, no order classes should be applied
    const imageContainer = container.querySelector(".relative.h-\\[500px\\]");
    expect(imageContainer).toBeInTheDocument();
    expect(imageContainer).not.toHaveClass("lg:order-1");
  });

  it("applies light background color when specified", () => {
    const { container } = render(
      <ContentImageSection
        data={mockData}
        fallback={mockFallback}
        backgroundColor="light"
      />,
    );

    const section = container.querySelector(".bg-neutral-light");
    expect(section).toBeInTheDocument();
  });

  it("applies white background color by default", () => {
    const { container } = render(
      <ContentImageSection
        data={mockData}
        fallback={mockFallback}
        backgroundColor="white"
      />,
    );

    const section = container.querySelector(".bg-white");
    expect(section).toBeInTheDocument();
  });

  it("extracts text from PortableText description", () => {
    const dataWithPortableText = {
      ...mockData,
      descricao: [
        {
          _type: "block",
          children: [{ _type: "span", text: "Texto do bloco 1" }],
        },
        {
          _type: "block",
          children: [{ _type: "span", text: "Texto do bloco 2" }],
        },
      ] as any,
    };

    render(
      <ContentImageSection
        data={dataWithPortableText}
        fallback={mockFallback}
      />,
    );

    expect(screen.getByText(/Texto do bloco 1/)).toBeInTheDocument();
  });

  it("uses fallback for empty description", () => {
    const dataWithoutDescription = { ...mockData, descricao: undefined };
    render(
      <ContentImageSection
        data={dataWithoutDescription}
        fallback={mockFallback}
      />,
    );

    expect(screen.getByText("Descrição de fallback")).toBeInTheDocument();
  });
});
