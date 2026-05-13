import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Footer } from "../Footer";

describe("Footer (socials)", () => {
  it("renders YouTube icon and link from configuration", () => {
    render(<Footer youtube="https://youtube.com/@fundacaoluzamor" />);
    const yt = screen.getByRole("link", { name: /youtube/i });
    expect(yt).toBeInTheDocument();
  });
});
