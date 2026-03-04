import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Heading, Text, Link } from "@/components/ui/Typography";

describe("Typography Components", () => {
  describe("Heading", () => {
    it("renders h2 by default", () => {
      render(<Heading>Default heading</Heading>);
      const heading = screen.getByText("Default heading");
      expect(heading.tagName).toBe("H2");
    });

    it("renders h1 when level is 1", () => {
      render(<Heading level={1}>H1 heading</Heading>);
      const heading = screen.getByText("H1 heading");
      expect(heading.tagName).toBe("H1");
    });

    it("renders h3 when level is 3", () => {
      render(<Heading level={3}>H3 heading</Heading>);
      const heading = screen.getByText("H3 heading");
      expect(heading.tagName).toBe("H3");
    });

    it("applies correct classes for level 1", () => {
      render(<Heading level={1}>Large heading</Heading>);
      const heading = screen.getByText("Large heading");
      expect(heading).toHaveClass("text-5xl", "md:text-6xl", "font-bold");
    });

    it("applies correct classes for level 2", () => {
      render(<Heading level={2}>Medium heading</Heading>);
      const heading = screen.getByText("Medium heading");
      expect(heading).toHaveClass("text-4xl", "md:text-5xl", "font-bold");
    });

    it("applies custom className", () => {
      render(<Heading className="custom-heading">Custom</Heading>);
      const heading = screen.getByText("Custom");
      expect(heading).toHaveClass("custom-heading");
    });
  });

  describe("Text", () => {
    it("renders paragraph with body variant by default", () => {
      render(<Text>Body text</Text>);
      const text = screen.getByText("Body text");
      expect(text.tagName).toBe("P");
      expect(text).toHaveClass("text-base", "text-gray-700");
    });

    it("applies small variant classes", () => {
      render(<Text variant="small">Small text</Text>);
      const text = screen.getByText("Small text");
      expect(text).toHaveClass("text-sm", "text-gray-600");
    });

    it("applies large variant classes", () => {
      render(<Text variant="large">Large text</Text>);
      const text = screen.getByText("Large text");
      expect(text).toHaveClass("text-lg", "text-gray-700");
    });

    it("applies muted variant classes", () => {
      render(<Text variant="muted">Muted text</Text>);
      const text = screen.getByText("Muted text");
      expect(text).toHaveClass("text-gray-500");
    });

    it("applies custom className", () => {
      render(<Text className="custom-text">Custom</Text>);
      const text = screen.getByText("Custom");
      expect(text).toHaveClass("custom-text");
    });
  });

  describe("Link", () => {
    it("renders an anchor tag with href", () => {
      render(<Link href="/test">Link text</Link>);
      const link = screen.getByText("Link text");
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("href", "/test");
    });

    it("applies default variant classes", () => {
      render(<Link href="/test">Default link</Link>);
      const link = screen.getByText("Default link");
      expect(link).toHaveClass("text-gray-700", "hover:text-gray-900");
    });

    it("applies primary variant classes", () => {
      render(
        <Link href="/test" variant="primary">
          Primary link
        </Link>,
      );
      const link = screen.getByText("Primary link");
      expect(link).toHaveClass("text-primary", "font-semibold");
    });

    it("applies custom className", () => {
      render(
        <Link href="/test" className="custom-link">
          Custom link
        </Link>,
      );
      const link = screen.getByText("Custom link");
      expect(link).toHaveClass("custom-link");
    });
  });
});
