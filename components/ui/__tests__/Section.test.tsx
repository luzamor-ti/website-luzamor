import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Section } from "@/components/ui/Section";

describe("Section", () => {
  it("renders children correctly", () => {
    render(
      <Section>
        <p>Section content</p>
      </Section>,
    );
    expect(screen.getByText("Section content")).toBeInTheDocument();
  });

  it("applies default padding classes", () => {
    render(<Section>Default section</Section>);
    const section = screen.getByText("Default section").closest("section");
    expect(section).toHaveClass("py-20", "px-4");
  });

  it("applies custom className", () => {
    render(<Section className="custom-section">Custom section</Section>);
    const section = screen.getByText("Custom section").closest("section");
    expect(section).toHaveClass("custom-section");
  });

  it("applies id when provided", () => {
    render(<Section id="test-section">Section with ID</Section>);
    const section = screen.getByText("Section with ID").closest("section");
    expect(section).toHaveAttribute("id", "test-section");
  });

  it("wraps content in max-width container", () => {
    render(
      <Section>
        <div data-testid="content">Content</div>
      </Section>,
    );
    const container = screen.getByTestId("content").parentElement;
    expect(container).toHaveClass("max-w-6xl", "mx-auto");
  });
});
