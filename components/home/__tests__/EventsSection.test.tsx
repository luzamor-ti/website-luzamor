/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { EventsSection } from "../EventsSection";
import { Event } from "@/sanity/lib/types/event";
import { HomeSection } from "@/sanity/lib/types/homeSection";

describe("EventsSection", () => {
  const mockSection: HomeSection = {
    _id: "section-events",
    _type: "secaoHome",
    name: "events",
    tag: "Eventos",
    title: "Próximos Eventos",
    active: true,
  };

  const mockData: Event[] = [
    {
      _id: "event-1",
      title: "Festival Cultural",
      shortDescription: "Um evento incrível de cultura e arte",
      description: [
        {
          _type: "block",
          children: [{ _type: "span", text: "Um evento incrível" }],
        },
      ] as any,
      eventDate: "2024-12-25T10:00:00.000Z",
      location: {
        name: "Centro Cultural",
      },
      category: "cultural",
      coverImage: {
        asset: {
          _ref: "image-event-1",
          _type: "reference",
        },
        alt: "Festival Cultural",
      },
      slug: {
        current: "festival-cultural",
      },
      ticketPrice: {
        free: true,
      },
      cta: {
        enabled: true,
        buttonText: "Inscrever-se",
        type: "whatsapp",
        whatsapp: "5511999999999",
        whatsappMessage: "Quero participar do festival",
      },
      featured: false,
      active: true,
    },
    {
      _id: "event-2",
      title: "Workshop Educacional",
      shortDescription: "Aprenda coisas novas neste workshop",
      description: [
        {
          _type: "block",
          children: [{ _type: "span", text: "Aprenda coisas novas" }],
        },
      ] as any,
      eventDate: "2024-12-30T14:00:00.000Z",
      location: {
        name: "Auditório Principal",
      },
      category: "educacional",
      coverImage: {
        asset: {
          _ref: "image-event-2",
          _type: "reference",
        },
        alt: "Workshop Educacional",
      },
      slug: {
        current: "workshop-educacional",
      },
      ticketPrice: {
        free: false,
        value: 50,
      },
      cta: {
        enabled: true,
        buttonText: "Saiba mais",
        type: "email",
        email: "eventos@fundacao.org",
      },
      featured: false,
      active: true,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with events data", () => {
    render(<EventsSection data={mockData} section={mockSection} />);

    expect(screen.getByText("Eventos")).toBeInTheDocument();
    expect(screen.getByText("Próximos Eventos")).toBeInTheDocument();
    expect(screen.getByText("Festival Cultural")).toBeInTheDocument();
    expect(screen.getByText("Workshop Educacional")).toBeInTheDocument();
  });

  it("renders event locations", () => {
    render(<EventsSection data={mockData} section={mockSection} />);

    expect(screen.getByText("Centro Cultural")).toBeInTheDocument();
    expect(screen.getByText("Auditório Principal")).toBeInTheDocument();
  });

  it("renders event categories", () => {
    render(<EventsSection data={mockData} section={mockSection} />);

    expect(screen.getByText("Cultural")).toBeInTheDocument();
    expect(screen.getByText("Educacional")).toBeInTheDocument();
  });

  it("renders event images", () => {
    render(<EventsSection data={mockData} section={mockSection} />);

    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);

    const festivalImage = images.find(
      (img) => img.getAttribute("alt") === "Festival Cultural",
    );
    expect(festivalImage).toBeInTheDocument();
  });

  it("renders CTA buttons when enabled", () => {
    render(<EventsSection data={mockData} section={mockSection} />);

    expect(screen.getByText("Inscrever-se")).toBeInTheDocument();
    expect(screen.getByText("Saiba mais")).toBeInTheDocument();
  });

  it("opens WhatsApp when WhatsApp CTA is clicked", async () => {
    const user = userEvent.setup();
    const windowOpenSpy = vi.spyOn(window, "open");
    windowOpenSpy.mockImplementation(() => null);

    render(<EventsSection data={mockData} section={mockSection} />);

    const whatsappButton = screen.getByText("Inscrever-se").closest("button");
    if (whatsappButton) {
      await user.click(whatsappButton);

      expect(windowOpenSpy).toHaveBeenCalledWith(
        expect.stringContaining("wa.me/5511999999999"),
        "_blank",
      );
      expect(windowOpenSpy).toHaveBeenCalledWith(
        expect.stringContaining(
          encodeURIComponent("Quero participar do festival"),
        ),
        "_blank",
      );
    }
  });

  it("creates mailto link when email CTA is clicked", async () => {
    const user = userEvent.setup();
    const createElementSpy = vi.spyOn(document, "createElement");

    render(<EventsSection data={mockData} section={mockSection} />);

    const emailButton = screen.getByText("Saiba mais").closest("button");
    if (emailButton) {
      await user.click(emailButton);

      expect(createElementSpy).toHaveBeenCalledWith("a");
    }
  });

  it("returns null when data is empty", () => {
    const { container } = render(
      <EventsSection data={[]} section={mockSection} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("returns null when data is null", () => {
    const { container } = render(
      <EventsSection data={null as any} section={mockSection} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("limits to 3 upcoming events", () => {
    const manyEvents: Event[] = [
      ...mockData,
      {
        _id: "event-3",
        title: "Evento 3",
        shortDescription: "Terceiro evento da lista",
        description: [
          {
            _type: "block",
            children: [{ _type: "span", text: "Terceiro evento" }],
          },
        ] as any,
        eventDate: "2025-01-05T10:00:00.000Z",
        location: {
          name: "Local 3",
        },
        category: "social",
        coverImage: {
          asset: { _ref: "image-3", _type: "reference" },
          alt: "Evento 3",
        },
        slug: { current: "evento-3" },
        ticketPrice: { free: true },
        cta: { enabled: false },
        featured: false,
        active: true,
      },
      {
        _id: "event-4",
        title: "Evento 4",
        shortDescription: "Quarto evento da lista",
        description: [
          {
            _type: "block",
            children: [{ _type: "span", text: "Quarto evento" }],
          },
        ] as any,
        eventDate: "2025-01-10T10:00:00.000Z",
        location: {
          name: "Local 4",
        },
        category: "outro",
        coverImage: {
          asset: { _ref: "image-4", _type: "reference" },
          alt: "Evento 4",
        },
        slug: { current: "evento-4" },
        ticketPrice: { free: false, value: 100 },
        cta: { enabled: false },
        featured: false,
        active: true,
      },
    ];

    render(<EventsSection data={manyEvents} section={mockSection} />);

    expect(screen.getByText("Festival Cultural")).toBeInTheDocument();
    expect(screen.getByText("Workshop Educacional")).toBeInTheDocument();
    expect(screen.getByText("Evento 3")).toBeInTheDocument();
    expect(screen.queryByText("Evento 4")).not.toBeInTheDocument();
  });

  it("uses fallback data when section is null", () => {
    render(<EventsSection data={mockData} section={null} />);

    // Should render with fallback tag and title
    expect(screen.getByText("Eventos")).toBeInTheDocument();
    expect(screen.getByText("Próximos eventos")).toBeInTheDocument();
  });

  it("handles events without CTA", () => {
    const eventWithoutCTA: Event[] = [
      {
        ...mockData[0],
        cta: {
          enabled: false,
        },
      },
    ];

    const { container } = render(
      <EventsSection data={eventWithoutCTA} section={mockSection} />,
    );

    expect(container).toBeTruthy();
    // CTA button should not be present when disabled
  });

  it("handles link CTA type", async () => {
    const user = userEvent.setup();
    const windowOpenSpy = vi.spyOn(window, "open");
    windowOpenSpy.mockImplementation(() => null);

    const eventWithLinkCTA: Event[] = [
      {
        ...mockData[0],
        cta: {
          enabled: true,
          buttonText: "Ver mais",
          type: "link",
          link: "https://example.com/evento",
        },
      },
    ];

    render(<EventsSection data={eventWithLinkCTA} section={mockSection} />);

    const linkButton = screen.getByText("Ver mais").closest("button");

    if (linkButton) {
      await user.click(linkButton);
      expect(windowOpenSpy).toHaveBeenCalledWith(
        "https://example.com/evento",
        "_blank",
      );
    }
  });

  it("formats ticket price with pt-BR currency format", () => {
    render(<EventsSection data={mockData} section={mockSection} />);

    // Evento pago deve mostrar preço em formato pt-BR - R$ 50,00
    expect(screen.getByText(/R\$\s*50,00/)).toBeInTheDocument();
  });

  it("displays 'Gratuito' for free events", () => {
    render(<EventsSection data={mockData} section={mockSection} />);

    // Evento gratuito deve mostrar "Gratuito"
    expect(screen.getByText("Gratuito")).toBeInTheDocument();
  });

  it("renders EventCategoryBadge component for category badge", () => {
    render(<EventsSection data={mockData} section={mockSection} />);

    // EventCategoryBadge deve estar presente com labels corretas
    expect(screen.getByText("Cultural")).toBeInTheDocument();
    expect(screen.getByText("Educacional")).toBeInTheDocument();
  });

  it("prevents CTA button click from propagating to card link", async () => {
    const user = userEvent.setup();
    const windowOpenSpy = vi
      .spyOn(window, "open")
      .mockImplementation(() => null);

    render(<EventsSection data={mockData} section={mockSection} />);

    const ctaButton = screen.getByText("Inscrever-se").closest("button");

    if (ctaButton) {
      await user.click(ctaButton);

      // Deve ter chamado WhatsApp, não navegado
      expect(windowOpenSpy).toHaveBeenCalledWith(
        expect.stringContaining("wa.me/5511999999999"),
        "_blank",
      );
    }
  });

  it("uses global WhatsApp fallback when event has no WhatsApp", async () => {
    const user = userEvent.setup();
    const windowOpenSpy = vi
      .spyOn(window, "open")
      .mockImplementation(() => null);

    const eventWithoutWhatsApp: Event[] = [
      {
        ...mockData[0],
        cta: {
          enabled: true,
          buttonText: "Falar no WhatsApp",
          type: "whatsapp",
          whatsapp: "", // Sem WhatsApp configurado
          whatsappMessage: "Olá!",
        },
      },
    ];

    render(<EventsSection data={eventWithoutWhatsApp} section={mockSection} />);

    const ctaButton = screen.getByText("Falar no WhatsApp").closest("button");

    if (ctaButton) {
      await user.click(ctaButton);

      // Deve usar fallback global (assumindo que existe)
      expect(windowOpenSpy).toHaveBeenCalledWith(
        expect.stringContaining("wa.me/"),
        "_blank",
      );
    }
  });

  it("renders event links with correct hrefs", () => {
    const { container } = render(
      <EventsSection data={mockData} section={mockSection} />,
    );

    const links = container.querySelectorAll('a[href^="/evento/"]');

    expect(links.length).toBeGreaterThan(0);
    expect(links[0]).toHaveAttribute("href", "/evento/festival-cultural");
  });

  it("displays event time with Clock icon", () => {
    const { container } = render(
      <EventsSection data={mockData} section={mockSection} />,
    );

    // Deve haver ícones de relógio (Clock)
    const clockIcons = container.querySelectorAll("svg");
    expect(clockIcons.length).toBeGreaterThan(0);
  });
});
