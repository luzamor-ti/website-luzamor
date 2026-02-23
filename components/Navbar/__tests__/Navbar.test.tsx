import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../Navbar";

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  usePathname: () => "/sobre",
}));

// Mock framer-motion to avoid animation side effects
vi.mock("framer-motion", () => {
  const MotionComponent = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }
  >(({ children, ...props }, ref) =>
    React.createElement("div", { ...props, ref }, children)
  );
  MotionComponent.displayName = "MotionComponent";

  const motion = new Proxy({} as Record<string, typeof MotionComponent>, {
    get: (_target, tag: string) => {
      const TagComponent = React.forwardRef<
        HTMLElement,
        React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }
      >(({ children, ...props }, ref) =>
        React.createElement(tag, { ...props, ref }, children)
      );
      TagComponent.displayName = `motion.${tag}`;
      return TagComponent;
    },
  });

  function AnimatePresence({ children }: { children: React.ReactNode }) {
    return React.createElement(React.Fragment, null, children);
  }
  AnimatePresence.displayName = "AnimatePresence";

  return { motion, AnimatePresence };
});

// Mock Sanity image URL builder
vi.mock("@sanity/image-url", () => ({
  default: () => ({
    image: () => ({ width: () => ({ url: () => "https://example.com/logo.png" }) }),
  }),
}));

vi.mock("@/sanity/lib/sanity/client", () => ({ client: {} }));

// Mock Next.js Link
vi.mock("next/link", () => {
  function MockLink({
    href,
    children,
    ...props
  }: { href: string; children: React.ReactNode; [key: string]: unknown }) {
    return React.createElement("a", { href, ...props }, children);
  }
  MockLink.displayName = "MockLink";
  return { default: MockLink };
});

const mockItens = [
  { tituloPersonalizado: "Sobre nós", slug: "sobre" },
  { tituloPersonalizado: "Projetos", slug: "projetos" },
  { tituloPersonalizado: "Contato", slug: "contato" },
];

const mockBotaoPrincipal = { titulo: "Seja apoiador", slug: "doacoes" };

describe("Navbar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all CMS-driven navigation links", () => {
    render(<Navbar itens={mockItens} />);
    // Links exist in the desktop nav (mobile nav is hidden when mobileOpen=false)
    expect(screen.getByText("Sobre nós")).toBeInTheDocument();
    expect(screen.getByText("Projetos")).toBeInTheDocument();
    expect(screen.getByText("Contato")).toBeInTheDocument();
  });

  it("renders the CTA button with correct href when provided", () => {
    render(<Navbar itens={mockItens} botaoPrincipal={mockBotaoPrincipal} />);
    const ctaLinks = screen.getAllByText("Seja apoiador");
    expect(ctaLinks.length).toBeGreaterThan(0);
    ctaLinks.forEach((el) => {
      expect(el.closest("a")).toHaveAttribute("href", "/doacoes");
    });
  });

  it("does not render CTA button when botaoPrincipal is absent", () => {
    render(<Navbar itens={mockItens} />);
    expect(screen.queryByText("Seja apoiador")).not.toBeInTheDocument();
  });

  it("marks the active route link with active styling", () => {
    render(<Navbar itens={mockItens} />);
    const activeLinks = screen.getAllByRole("link", { name: "Sobre nós" });
    const hasActiveStyle = activeLinks.some((el) =>
      el.className.includes("bg-white/[0.12]")
    );
    expect(hasActiveStyle).toBe(true);
  });

  it("does not apply active styling to non-active links", () => {
    render(<Navbar itens={mockItens} />);
    // usePathname is mocked to "/sobre", so "Projetos" should NOT be active
    const inactiveLinks = screen.getAllByRole("link", { name: "Projetos" });
    inactiveLinks.forEach((el) => {
      expect(el.className).not.toContain("bg-white/[0.12]");
    });
  });

  it("renders the hamburger button with correct aria attributes", () => {
    render(<Navbar itens={mockItens} />);
    const btn = screen.getByRole("button", { name: "Abrir menu" });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  it("opens the mobile menu when hamburger button is clicked", () => {
    render(<Navbar itens={mockItens} />);
    fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
    // After toggle the accessible name should change to "Fechar menu"
    expect(screen.getByRole("button", { name: "Fechar menu" })).toBeInTheDocument();
  });

  it("closes the mobile menu when a nav link is clicked", () => {
    render(<Navbar itens={mockItens} />);
    fireEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
    // Click the mobile version of a link (there are duplicates; click last one)
    const links = screen.getAllByText("Projetos");
    fireEvent.click(links[links.length - 1]);
    expect(screen.getByRole("button", { name: "Abrir menu" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("renders fallback text logo when no logo prop is given", () => {
    render(<Navbar itens={[]} />);
    expect(screen.getByText("Luzamor")).toBeInTheDocument();
  });

  it("renders image logo when logo prop is provided", () => {
    const logo = { asset: { _ref: "image-abc" } };
    render(<Navbar itens={[]} logo={logo} />);
    expect(screen.getByRole("img", { name: "Logo" })).toBeInTheDocument();
  });
});
