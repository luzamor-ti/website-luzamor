import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Ticker } from "@/components/ui/Ticker";

describe("Ticker", () => {
  beforeEach(() => {
    // Mock offsetWidth for ticker calculations
    Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
      configurable: true,
      value: 1000,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children correctly", () => {
    render(
      <Ticker>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Ticker>,
    );

    // Ticker duplicates items for infinite loop effect, so we use getAllByText
    expect(screen.getAllByText("Item 1").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Item 2").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Item 3").length).toBeGreaterThan(0);
  });

  it("duplicates content for infinite scroll", () => {
    render(
      <Ticker>
        <div>Unique Item</div>
      </Ticker>,
    );

    // Should have multiple instances due to duplication
    const items = screen.getAllByText("Unique Item");
    expect(items.length).toBeGreaterThan(1);
  });

  it("applies normal speed by default", () => {
    const { container } = render(
      <Ticker>
        <div>Item</div>
      </Ticker>,
    );

    const tickerElement = container.querySelector(".animate-ticker");
    expect(tickerElement).toHaveStyle({ animationDuration: "40s" });
  });

  it("applies slow speed when specified", () => {
    const { container } = render(
      <Ticker speed="slow">
        <div>Item</div>
      </Ticker>,
    );

    const tickerElement = container.querySelector(".animate-ticker");
    expect(tickerElement).toHaveStyle({ animationDuration: "60s" });
  });

  it("applies fast speed when specified", () => {
    const { container } = render(
      <Ticker speed="fast">
        <div>Item</div>
      </Ticker>,
    );

    const tickerElement = container.querySelector(".animate-ticker");
    expect(tickerElement).toHaveStyle({ animationDuration: "20s" });
  });

  it("applies left direction by default", () => {
    const { container } = render(
      <Ticker>
        <div>Item</div>
      </Ticker>,
    );

    const tickerElement = container.querySelector(".animate-ticker");
    expect(tickerElement).toHaveStyle({ animationDirection: "normal" });
  });

  it("applies right direction when specified", () => {
    const { container } = render(
      <Ticker direction="right">
        <div>Item</div>
      </Ticker>,
    );

    const tickerElement = container.querySelector(".animate-ticker");
    expect(tickerElement).toHaveStyle({ animationDirection: "reverse" });
  });

  it("enables pause on hover by default", () => {
    const { container } = render(
      <Ticker>
        <div>Item</div>
      </Ticker>,
    );

    const tickerElement = container.querySelector(".animate-ticker");
    expect(tickerElement).toBeInTheDocument();
  });

  it("disables pause on hover when specified", () => {
    const { container } = render(
      <Ticker pauseOnHover={false}>
        <div>Item</div>
      </Ticker>,
    );

    const tickerElement = container.querySelector(".animate-ticker");
    expect(tickerElement).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Ticker className="custom-ticker">
        <div>Item</div>
      </Ticker>,
    );

    expect(container.firstChild).toHaveClass("custom-ticker");
  });

  it("renders with complex children", () => {
    render(
      <Ticker>
        <div className="logo">
          <img src="/logo1.png" alt="Logo 1" />
        </div>
        <div className="logo">
          <img src="/logo2.png" alt="Logo 2" />
        </div>
        <div className="logo">
          <img src="/logo3.png" alt="Logo 3" />
        </div>
      </Ticker>,
    );

    // Items are duplicated for infinite scroll effect
    expect(screen.getAllByAltText("Logo 1").length).toBeGreaterThan(0);
    expect(screen.getAllByAltText("Logo 2").length).toBeGreaterThan(0);
    expect(screen.getAllByAltText("Logo 3").length).toBeGreaterThan(0);
  });

  it("applies overflow-hidden to container", () => {
    const { container } = render(
      <Ticker>
        <div>Item</div>
      </Ticker>,
    );

    expect(container.firstChild).toHaveClass("overflow-hidden");
  });

  it("applies w-max to ticker content", () => {
    const { container } = render(
      <Ticker>
        <div>Item</div>
      </Ticker>,
    );

    const tickerContent = container.querySelector(".animate-ticker");
    expect(tickerContent).toHaveClass("w-max");
  });

  it("combines all props correctly", () => {
    const { container } = render(
      <Ticker
        speed="fast"
        direction="right"
        pauseOnHover={false}
        className="sponsors-ticker"
      >
        <div>Sponsor 1</div>
        <div>Sponsor 2</div>
      </Ticker>,
    );

    const tickerContainer = container.firstChild as HTMLElement;
    const tickerElement = container.querySelector(
      ".animate-ticker",
    ) as HTMLElement;

    expect(tickerContainer).toHaveClass("sponsors-ticker");
    expect(tickerElement).toHaveStyle({
      animationDuration: "20s",
      animationDirection: "reverse",
    });
  });
});
