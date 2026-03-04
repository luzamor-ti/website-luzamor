import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders as a link when href is provided", () => {
    render(<Button href="/test">Link Button</Button>);
    const button = screen.getByText("Link Button").closest("a");
    expect(button).toHaveAttribute("href", "/test");
  });

  it("applies primary variant classes by default", () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByText("Primary Button").closest("button");
    expect(button).toHaveClass("bg-primary");
  });

  it("applies secondary variant classes when specified", () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByText("Secondary Button").closest("button");
    expect(button).toHaveClass("bg-secondary");
  });

  it("applies outline variant classes when specified", () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByText("Outline Button").closest("button");
    expect(button).toHaveClass("border-2", "border-gray-300");
  });

  it("applies ghost variant classes when specified", () => {
    render(<Button variant="ghost">Ghost Button</Button>);
    const button = screen.getByText("Ghost Button").closest("button");
    expect(button).toHaveClass("bg-transparent");
  });

  it("applies small size classes when specified", () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByText("Small Button").closest("button");
    expect(button).toHaveClass("py-2", "px-4");
  });

  it("applies medium size classes by default", () => {
    render(<Button>Medium Button</Button>);
    const button = screen.getByText("Medium Button").closest("button");
    expect(button).toHaveClass("py-3", "px-6");
  });

  it("applies large size classes when specified", () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByText("Large Button").closest("button");
    expect(button).toHaveClass("py-4", "px-8");
  });

  it("applies full width class when fullWidth is true", () => {
    render(<Button fullWidth>Full Width Button</Button>);
    const button = screen.getByText("Full Width Button").closest("button");
    expect(button).toHaveClass("w-full");
  });

  it("shows arrow when showArrow is true", () => {
    const { container } = render(<Button showArrow>With Arrow</Button>);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom Class</Button>);
    const button = screen.getByText("Custom Class").closest("button");
    expect(button).toHaveClass("custom-class");
  });
});
