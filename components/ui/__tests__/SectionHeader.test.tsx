import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeader } from "@/components/ui/SectionHeader";

describe("SectionHeader", () => {
  it("renders title correctly", () => {
    render(<SectionHeader title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders tag when provided", () => {
    render(<SectionHeader tag="Test Tag" title="Title" />);
    expect(screen.getByText("Test Tag")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<SectionHeader title="Title" description="Test description" />);
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("applies light variant by default", () => {
    render(<SectionHeader title="Light Title" />);
    const title = screen.getByText("Light Title");
    expect(title).toHaveClass("text-gray-900");
  });

  it("applies dark variant classes when specified", () => {
    render(<SectionHeader title="Dark Title" variant="dark" />);
    const title = screen.getByText("Dark Title");
    expect(title).toHaveClass("text-white");
  });

  it("renders ReactNode as title", () => {
    render(
      <SectionHeader
        title={
          <div>
            <span>Complex</span> <strong>Title</strong>
          </div>
        }
      />,
    );
    expect(screen.getByText("Complex")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
  });

  it("applies appropriate flex classes for left alignment", () => {
    const { container } = render(<SectionHeader title="Left aligned" />);
    const header = container.firstChild as HTMLElement;
    expect(header).toHaveClass("items-start");
  });
});
