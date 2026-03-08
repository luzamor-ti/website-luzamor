import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PresidentPageContent } from "@/components/president/PresidentPageContent";
import { Member } from "@/sanity/lib/types/member";
import { Page } from "@/sanity/lib/types/page";

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    section: ({ children, ...props }: any) => (
      <section {...props}>{children}</section>
    ),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
  },
}));

// Mock Sanity image builder
vi.mock("@/sanity/lib/image", () => ({
  urlFor: () => ({
    width: () => ({
      height: () => ({
        url: () => "https://cdn.sanity.io/mock-image.jpg",
      }),
    }),
  }),
}));

// Mock PortableText
vi.mock("@portabletext/react", () => ({
  PortableText: ({ value }: { value: unknown[] }) => (
    <div data-testid="portable-text">{value.length} blocks</div>
  ),
}));

// Mock portableTextComponents
vi.mock("@/constants/portableTextComponents", () => ({
  portableTextComponents: {},
}));

const mockPage: Page = {
  _id: "palavra-presidente",
  _type: "pagina",
  title: "Palavra do Presidente",
  slug: { current: "palavra-do-presidente" },
  pageType: "palavra-presidente",
  active: true,
};

const mockPresidentData: Member = {
  _id: "president-1",
  name: "João Silva",
  role: "Presidente",
  shortBio: "Uma breve descrição do presidente.",
  words: [
    {
      _type: "block",
      _key: "block1",
      children: [
        { _type: "span", _key: "span1", text: "Mensagem do presidente.", marks: [] },
      ],
      style: "normal",
      markDefs: [],
    },
  ],
};

describe("PresidentPageContent", () => {
  it("renders page title from pagina prop", () => {
    render(
      <PresidentPageContent pagina={mockPage} presidentData={mockPresidentData} />,
    );

    expect(screen.getByText("Palavra do Presidente")).toBeInTheDocument();
  });

  it("renders president name and role", () => {
    render(
      <PresidentPageContent pagina={mockPage} presidentData={mockPresidentData} />,
    );

    const nameElements = screen.getAllByText("João Silva");
    expect(nameElements.length).toBeGreaterThan(0);

    const roleElements = screen.getAllByText("Presidente");
    expect(roleElements.length).toBeGreaterThan(0);
  });

  it("renders shortBio when provided", () => {
    render(
      <PresidentPageContent pagina={mockPage} presidentData={mockPresidentData} />,
    );

    expect(
      screen.getByText("Uma breve descrição do presidente."),
    ).toBeInTheDocument();
  });

  it("does not render shortBio when not provided", () => {
    const dataWithoutShortBio: Member = {
      ...mockPresidentData,
      shortBio: undefined,
    };

    render(
      <PresidentPageContent pagina={mockPage} presidentData={dataWithoutShortBio} />,
    );

    expect(
      screen.queryByText("Uma breve descrição do presidente."),
    ).not.toBeInTheDocument();
  });

  it("renders PortableText when words are provided", () => {
    render(
      <PresidentPageContent pagina={mockPage} presidentData={mockPresidentData} />,
    );

    expect(screen.getByTestId("portable-text")).toBeInTheDocument();
  });

  it("does not render PortableText when words are missing", () => {
    const dataWithoutWords: Member = {
      ...mockPresidentData,
      words: undefined,
    };

    render(
      <PresidentPageContent pagina={mockPage} presidentData={dataWithoutWords} />,
    );

    expect(screen.queryByTestId("portable-text")).not.toBeInTheDocument();
  });

  it("renders photo when provided", () => {
    const dataWithPhoto: Member = {
      ...mockPresidentData,
      photo: {
        asset: { _ref: "image-abc123", _type: "reference" },
      },
    };

    render(
      <PresidentPageContent pagina={mockPage} presidentData={dataWithPhoto} />,
    );

    const images = screen.getAllByAltText("João Silva");
    expect(images.length).toBeGreaterThan(0);
  });

  it("does not render photo when photo is null", () => {
    const dataWithoutPhoto: Member = {
      ...mockPresidentData,
      photo: undefined,
    };

    render(
      <PresidentPageContent pagina={mockPage} presidentData={dataWithoutPhoto} />,
    );

    expect(screen.queryByAltText("João Silva")).not.toBeInTheDocument();
  });

  it("renders fallback UI labels", () => {
    render(
      <PresidentPageContent pagina={mockPage} presidentData={mockPresidentData} />,
    );

    expect(screen.getByText("Uma mensagem especial")).toBeInTheDocument();
    expect(screen.getByText("por")).toBeInTheDocument();
    expect(screen.getByText("Role para ler")).toBeInTheDocument();
  });
});
