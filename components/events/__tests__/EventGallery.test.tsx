import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EventGallery } from "@/components/events/EventGallery";

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
    button: ({ children, onClick, ...props }: any) => (
      <button onClick={onClick} {...props}>
        {children}
      </button>
    ),
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("EventGallery", () => {
  const mockImages = [
    {
      asset: {
        _ref: "image-1",
        _type: "reference" as const,
      },
      alt: "Foto do evento 1",
      caption: "Momento especial do evento",
    },
    {
      asset: {
        _ref: "image-2",
        _type: "reference" as const,
      },
      alt: "Foto do evento 2",
      caption: "Participantes do evento",
    },
    {
      asset: {
        _ref: "image-3",
        _type: "reference" as const,
      },
      alt: "Foto do evento 3",
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    document.body.style.overflow = "unset";
  });

  it("renders null when images array is empty", () => {
    const { container } = render(
      <EventGallery images={[]} eventTitle="Test Event" />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders gallery grid with all images", () => {
    render(<EventGallery images={mockImages} eventTitle="Workshop" />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(mockImages.length);
  });

  it("displays image alt text", () => {
    render(<EventGallery images={mockImages} eventTitle="Workshop" />);
    expect(screen.getByAltText("Foto do evento 1")).toBeInTheDocument();
    expect(screen.getByAltText("Foto do evento 2")).toBeInTheDocument();
  });

  it("uses eventTitle as fallback for alt text when not provided", () => {
    const imagesWithoutAlt = [
      {
        asset: {
          _ref: "image-1",
          _type: "reference" as const,
        },
      },
    ];
    render(
      <EventGallery images={imagesWithoutAlt} eventTitle="Festa Junina" />,
    );
    expect(screen.getByAltText(/Festa Junina - Foto 1/)).toBeInTheDocument();
  });

  it("opens lightbox when image is clicked", () => {
    render(<EventGallery images={mockImages} eventTitle="Workshop" />);
    const buttons = screen.getAllByRole("button");

    // Click first image button
    fireEvent.click(buttons[0]);

    // Lightbox should be open and showing the first image
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("displays caption in lightbox", () => {
    render(<EventGallery images={mockImages} eventTitle="Workshop" />);
    const buttons = screen.getAllByRole("button");

    // Click first image
    fireEvent.click(buttons[0]);

    // Should have caption both in thumbnail hover and lightbox, so check for at least one
    const captions = screen.getAllByText("Momento especial do evento");
    expect(captions.length).toBeGreaterThan(0);
  });

  it("closes lightbox when close button is clicked", () => {
    render(<EventGallery images={mockImages} eventTitle="Workshop" />);
    const buttons = screen.getAllByRole("button");

    // Open lightbox
    fireEvent.click(buttons[0]);

    // Close lightbox
    const closeButton = screen.getByLabelText("Fechar galeria");
    fireEvent.click(closeButton);

    // Counter should not be visible anymore
    expect(screen.queryByText("1 / 3")).not.toBeInTheDocument();
  });

  it("navigates to next image", () => {
    render(<EventGallery images={mockImages} eventTitle="Workshop" />);
    const buttons = screen.getAllByRole("button");

    // Open lightbox
    fireEvent.click(buttons[0]);

    // Click next button
    const nextButton = screen.getByLabelText("Próxima imagem");
    fireEvent.click(nextButton);

    // Should show second image
    expect(screen.getByText("2 / 3")).toBeInTheDocument();
  });

  it("navigates to previous image", () => {
    render(<EventGallery images={mockImages} eventTitle="Workshop" />);
    const buttons = screen.getAllByRole("button");

    // Open lightbox
    fireEvent.click(buttons[0]);

    // Go to next image
    const nextButton = screen.getByLabelText("Próxima imagem");
    fireEvent.click(nextButton);

    // Go back to previous
    const prevButton = screen.getByLabelText("Imagem anterior");
    fireEvent.click(prevButton);

    // Should show first image
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("wraps around to last image when going previous from first", () => {
    render(<EventGallery images={mockImages} eventTitle="Workshop" />);
    const buttons = screen.getAllByRole("button");

    // Open lightbox
    fireEvent.click(buttons[0]);

    // Click previous button (should wrap to last image)
    const prevButton = screen.getByLabelText("Imagem anterior");
    fireEvent.click(prevButton);

    // Should show last image
    expect(screen.getByText("3 / 3")).toBeInTheDocument();
  });

  it("wraps around to first image when going next from last", () => {
    render(<EventGallery images={mockImages} eventTitle="Workshop" />);
    const buttons = screen.getAllByRole("button");

    // Open lightbox on last image
    fireEvent.click(buttons[2]);

    // Click next button (should wrap to first image)
    const nextButton = screen.getByLabelText("Próxima imagem");
    fireEvent.click(nextButton);

    // Should show first image
    expect(screen.getByText("1 / 3")).toBeInTheDocument();
  });

  it("does not show navigation buttons when there is only one image", () => {
    const singleImage = [mockImages[0]];
    render(<EventGallery images={singleImage} eventTitle="Workshop" />);

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);

    // Navigation buttons should not exist
    expect(screen.queryByLabelText("Próxima imagem")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Imagem anterior")).not.toBeInTheDocument();
  });
});
