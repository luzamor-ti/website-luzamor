import { describe, it, expect } from "vitest";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FaqSection } from "@/components/home/FaqSection";
import { Faq } from "@/sanity/lib/types/faq";
import { HomeSection } from "@/sanity/lib/types/homeSection";

describe("FaqSection", () => {
  const mockFaqData: Faq[] = [
    {
      _id: "faq-1",
      question: "Como posso ajudar a fundação?",
      answer: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Você pode ajudar através de doações ou trabalho voluntário.",
            },
          ],
        },
      ] as any,
      order: 1,
    },
    {
      _id: "faq-2",
      question: "Onde a fundação atua?",
      answer: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Atuamos em diversas comunidades no Brasil.",
            },
          ],
        },
      ] as any,
      order: 2,
    },
    {
      _id: "faq-3",
      question: "A fundação emite recibos de doação?",
      answer: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Sim, emitimos recibos para todas as doações.",
            },
          ],
        },
      ] as any,
      order: 3,
    },
  ];

  const mockSection: HomeSection = {
    _id: "section-faq",
    _type: "secaoHome",
    name: "faq",
    tag: "FAQ",
    title: "Perguntas Frequentes",
    description: "Tire suas dúvidas sobre a fundação",
    active: true,
  };

  it("renders FAQ questions", () => {
    render(<FaqSection data={mockFaqData} section={mockSection} />);

    expect(
      screen.getByText("Como posso ajudar a fundação?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Onde a fundação atua?")).toBeInTheDocument();
    expect(
      screen.getByText("A fundação emite recibos de doação?"),
    ).toBeInTheDocument();
  });

  it("renders section header with data", () => {
    render(<FaqSection data={mockFaqData} section={mockSection} />);

    // tag from section
    expect(screen.getByText(/FAQ/i)).toBeInTheDocument();
    expect(screen.getByText("Perguntas Frequentes")).toBeInTheDocument();
    expect(
      screen.getByText("Tire suas dúvidas sobre a fundação"),
    ).toBeInTheDocument();
  });

  it("uses fallback text when section is null", () => {
    render(<FaqSection data={mockFaqData} section={null} />);

    expect(screen.getByText(/FAQ|Perguntas/i)).toBeInTheDocument();
  });

  it("opens FAQ answer when question is clicked", async () => {
    const user = userEvent.setup();
    render(<FaqSection data={mockFaqData} section={mockSection} />);

    await user.click(screen.getByText("Como posso ajudar a fundação?"));

    expect(
      screen.getByText(
        "Você pode ajudar através de doações ou trabalho voluntário.",
      ),
    ).toBeInTheDocument();
  });

  it("renders all FAQ answers correctly", async () => {
    const user = userEvent.setup();
    render(<FaqSection data={mockFaqData} section={mockSection} />);

    await user.click(screen.getByText("Como posso ajudar a fundação?"));
    expect(
      screen.getByText(
        "Você pode ajudar através de doações ou trabalho voluntário.",
      ),
    ).toBeInTheDocument();

    await user.click(screen.getByText("Onde a fundação atua?"));
    expect(
      screen.getByText("Atuamos em diversas comunidades no Brasil."),
    ).toBeInTheDocument();

    await user.click(screen.getByText("A fundação emite recibos de doação?"));
    expect(
      screen.getByText("Sim, emitimos recibos para todas as doações."),
    ).toBeInTheDocument();
  });

  it("returns null when no FAQ data", () => {
    const { container } = render(
      <FaqSection data={[]} section={mockSection} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("renders in two-column grid layout", () => {
    const { container } = render(
      <FaqSection data={mockFaqData} section={mockSection} />,
    );

    const grid = container.querySelector(".grid-cols-1.lg\\:grid-cols-2");
    expect(grid).toBeInTheDocument();
  });

  it("uses accordion with single mode (allowMultiple=false)", async () => {
    const user = userEvent.setup();
    render(<FaqSection data={mockFaqData} section={mockSection} />);

    // Open first question
    await user.click(screen.getByText("Como posso ajudar a fundação?"));
    expect(
      screen.getByText(
        "Você pode ajudar através de doações ou trabalho voluntário.",
      ),
    ).toBeInTheDocument();

    // Open second question (first should close in single mode)
    await user.click(screen.getByText("Onde a fundação atua?"));
    expect(
      screen.queryByText(
        "Você pode ajudar através de doações ou trabalho voluntário.",
      ),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Atuamos em diversas comunidades no Brasil."),
    ).toBeInTheDocument();
  });

  it("renders with single FAQ item", () => {
    render(<FaqSection data={[mockFaqData[0]]} section={mockSection} />);

    expect(
      screen.getByText("Como posso ajudar a fundação?"),
    ).toBeInTheDocument();
  });
});
