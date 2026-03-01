import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "@/components/ui/Card";

describe("Card", () => {
  it("renders children correctly", () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>,
    );
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies default padding classes", () => {
    render(<Card>Default padding</Card>);
    const card = screen.getByText("Default padding");
    expect(card).toHaveClass("p-6");
  });

  it("applies small padding classes when specified", () => {
    render(<Card padding="sm">Small padding</Card>);
    const card = screen.getByText("Small padding");
    expect(card).toHaveClass("p-4");
  });

  it("applies large padding classes when specified", () => {
    render(<Card padding="lg">Large padding</Card>);
    const card = screen.getByText("Large padding");
    expect(card).toHaveClass("p-8");
  });

  it("applies hover classes by default", () => {
    render(<Card>Hoverable card</Card>);
    const card = screen.getByText("Hoverable card");
    expect(card).toHaveClass("hover:shadow-xl", "hover:border-gray-200");
  });

  it("does not apply hover classes when hover is false", () => {
    render(<Card hover={false}>Non-hoverable card</Card>);
    const card = screen.getByText("Non-hoverable card");
    expect(card).not.toHaveClass("hover:shadow-xl");
  });

  it("applies custom className", () => {
    render(<Card className="custom-card">Custom card</Card>);
    const card = screen.getByText("Custom card");
    expect(card).toHaveClass("custom-card");
  });

  it("applies base card styles", () => {
    render(<Card>Base card</Card>);
    const card = screen.getByText("Base card");
    expect(card).toHaveClass("bg-white", "border", "rounded-xl", "shadow-md");
  });
});
