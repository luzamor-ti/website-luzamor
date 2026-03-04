/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ContactSection } from "../ContactSection";
import { Contact } from "@/sanity/lib/types/contact";
import { HomeSection } from "@/sanity/lib/types/homeSection";

describe("ContactSection", () => {
  const mockSection: HomeSection = {
    _id: "section-contact",
    _type: "secaoHome",
    name: "contact",
    tag: "Contato",
    title: "Fale Conosco",
    active: true,
    labels: {
      email: "E-mail",
      phone: "Telefone",
      address: "Endereço",
    },
  };

  const mockData: Contact[] = [
    {
      _id: "contact-1",
      email: "contato@fundacao.org",
      phone: "(11) 98765-4321",
      address: "Rua Exemplo, 123 - São Paulo, SP",
    },
  ];

  it("renders with contact data", () => {
    render(<ContactSection data={mockData} section={mockSection} />);

    expect(screen.getByText("Contato")).toBeInTheDocument();
    expect(screen.getByText("Fale Conosco")).toBeInTheDocument();
    expect(screen.getByText("contato@fundacao.org")).toBeInTheDocument();
    expect(screen.getByText("(11) 98765-4321")).toBeInTheDocument();
    expect(
      screen.getByText("Rua Exemplo, 123 - São Paulo, SP"),
    ).toBeInTheDocument();
  });

  it("renders labels correctly", () => {
    render(<ContactSection data={mockData} section={mockSection} />);

    // Labels devem aparecer 1 vez cada
    expect(screen.getAllByText("E-mail").length).toBeGreaterThan(0);
    expect(screen.getByText("Telefone")).toBeInTheDocument();
    expect(screen.getByText("Endereço")).toBeInTheDocument();
  });

  it("renders email as mailto link", () => {
    render(<ContactSection data={mockData} section={mockSection} />);

    const emailLink = screen.getByRole("link", {
      name: "contato@fundacao.org",
    });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:contato@fundacao.org");
  });

  it("renders phone as tel link", () => {
    render(<ContactSection data={mockData} section={mockSection} />);

    const phoneLink = screen.getByRole("link", { name: "(11) 98765-4321" });
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute("href", "tel:(11) 98765-4321");
  });

  it("renders multiple contact cards", () => {
    const multipleContacts: Contact[] = [
      ...mockData,
      {
        _id: "contact-2",
        email: "info@fundacao.org",
        phone: "(11) 91234-5678",
        address: "Av. Teste, 456 - Rio de Janeiro, RJ",
      },
    ];

    render(<ContactSection data={multipleContacts} section={mockSection} />);

    expect(screen.getByText("contato@fundacao.org")).toBeInTheDocument();
    expect(screen.getByText("info@fundacao.org")).toBeInTheDocument();
    expect(screen.getByText("(11) 98765-4321")).toBeInTheDocument();
    expect(screen.getByText("(11) 91234-5678")).toBeInTheDocument();
  });

  it("returns null when data is empty", () => {
    const { container } = render(
      <ContactSection data={[]} section={mockSection} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("returns null when data is null", () => {
    const { container } = render(
      <ContactSection data={null as any} section={mockSection} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it("uses fallback labels when section labels are not provided", () => {
    const sectionWithoutLabels = { ...mockSection, labels: undefined };
    render(<ContactSection data={mockData} section={sectionWithoutLabels} />);

    // Should still render labels from fallback (fallback uses "Email" not "E-mail")
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Telefone")).toBeInTheDocument();
    expect(screen.getByText("Endereço")).toBeInTheDocument();
  });

  it("handles contact with only email", () => {
    const emailOnlyContact: Contact[] = [
      {
        _id: "contact-email",
        email: "only@email.com",
      },
    ];

    render(<ContactSection data={emailOnlyContact} section={mockSection} />);

    expect(screen.getByText("only@email.com")).toBeInTheDocument();
    // Telefone and Endereço won't be visible since the contact doesn't have them
  });

  it("handles contact with only phone", () => {
    const phoneOnlyContact: Contact[] = [
      {
        _id: "contact-phone",
        phone: "(11) 99999-9999",
      },
    ];

    render(<ContactSection data={phoneOnlyContact} section={mockSection} />);

    expect(screen.getByText("(11) 99999-9999")).toBeInTheDocument();
    // Email and Endereço won't be visible since the contact doesn't have them
  });

  it("handles contact with only address", () => {
    const addressOnlyContact: Contact[] = [
      {
        _id: "contact-address",
        address: "Rua Somente Endereço, 789",
      },
    ];

    render(<ContactSection data={addressOnlyContact} section={mockSection} />);

    expect(screen.getByText("Rua Somente Endereço, 789")).toBeInTheDocument();
    // Email and Telefone won't be visible since the contact doesn't have them
  });

  it("uses fallback tag and title when section is null", () => {
    render(<ContactSection data={mockData} section={null} />);

    // Fallback values from TEXT_FALLBACKS.contact
    expect(screen.getByText("Contato")).toBeInTheDocument();
    expect(screen.getByText("Fale Conosco")).toBeInTheDocument();
  });
});
