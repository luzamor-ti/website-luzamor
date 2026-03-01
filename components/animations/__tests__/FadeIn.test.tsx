import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import FadeIn from "../FadeIn";

describe("FadeIn", () => {
  it("renders children correctly", () => {
    render(
      <FadeIn>
        <div>Test Content</div>
      </FadeIn>,
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("wraps content in motion div", () => {
    const { container } = render(
      <FadeIn>
        <div>Animated Content</div>
      </FadeIn>,
    );

    // O mock de motion.div renderiza como div
    const motionDiv = container.querySelector("div");
    expect(motionDiv).toBeInTheDocument();
  });

  it("renders multiple children", () => {
    render(
      <FadeIn>
        <div>First Child</div>
        <div>Second Child</div>
        <span>Third Child</span>
      </FadeIn>,
    );

    expect(screen.getByText("First Child")).toBeInTheDocument();
    expect(screen.getByText("Second Child")).toBeInTheDocument();
    expect(screen.getByText("Third Child")).toBeInTheDocument();
  });

  it("handles nested components", () => {
    render(
      <FadeIn>
        <div>
          <h1>Title</h1>
          <p>Description</p>
        </div>
      </FadeIn>,
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
  });

  it("renders without children", () => {
    const { container } = render(<FadeIn>{null}</FadeIn>);

    // Deve renderizar sem erros
    const motionDiv = container.querySelector("div");
    expect(motionDiv).toBeInTheDocument();
  });

  it("preserves child element structure", () => {
    render(
      <FadeIn>
        <article data-testid="article">
          <header>Header</header>
          <main>Main Content</main>
          <footer>Footer</footer>
        </article>
      </FadeIn>,
    );

    expect(screen.getByTestId("article")).toBeInTheDocument();
    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Main Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
