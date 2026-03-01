import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Grid } from "@/components/ui/Grid";

describe("Grid", () => {
  it("renders children correctly", () => {
    render(
      <Grid>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </Grid>,
    );
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
  });

  it("applies 3 columns by default", () => {
    render(
      <Grid>
        <div>Item</div>
      </Grid>,
    );
    const grid = screen.getByText("Item").parentElement;
    expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-3");
  });

  it("applies 1 column when specified", () => {
    render(
      <Grid cols={1}>
        <div>Item</div>
      </Grid>,
    );
    const grid = screen.getByText("Item").parentElement;
    expect(grid).toHaveClass("grid-cols-1");
  });

  it("applies 2 columns when specified", () => {
    render(
      <Grid cols={2}>
        <div>Item</div>
      </Grid>,
    );
    const grid = screen.getByText("Item").parentElement;
    expect(grid).toHaveClass("grid-cols-1", "md:grid-cols-2");
  });

  it("applies 4 columns when specified", () => {
    render(
      <Grid cols={4}>
        <div>Item</div>
      </Grid>,
    );
    const grid = screen.getByText("Item").parentElement;
    expect(grid).toHaveClass("sm:grid-cols-2", "lg:grid-cols-4");
  });

  it("applies medium gap by default", () => {
    render(
      <Grid>
        <div>Item</div>
      </Grid>,
    );
    const grid = screen.getByText("Item").parentElement;
    expect(grid).toHaveClass("gap-6");
  });

  it("applies small gap when specified", () => {
    render(
      <Grid gap="sm">
        <div>Item</div>
      </Grid>,
    );
    const grid = screen.getByText("Item").parentElement;
    expect(grid).toHaveClass("gap-4");
  });

  it("applies large gap when specified", () => {
    render(
      <Grid gap="lg">
        <div>Item</div>
      </Grid>,
    );
    const grid = screen.getByText("Item").parentElement;
    expect(grid).toHaveClass("gap-8");
  });

  it("applies custom className", () => {
    render(
      <Grid className="custom-grid">
        <div>Item</div>
      </Grid>,
    );
    const grid = screen.getByText("Item").parentElement;
    expect(grid).toHaveClass("custom-grid");
  });

  it("applies base grid styles", () => {
    render(
      <Grid>
        <div>Item</div>
      </Grid>,
    );
    const grid = screen.getByText("Item").parentElement;
    expect(grid).toHaveClass("grid");
  });
});
