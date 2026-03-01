import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "@/components/home/HeroSection";
import { Hero } from "@/sanity/lib/types/hero";

describe("HeroSection", () => {
  const mockHeroData: Hero = {
    _id: "1",
    _type: "hero",
    title: "Test Hero Title",
    subtitle: "Test subtitle",
    tagline: "Test tagline",
    primaryCta: {
      text: "Primary CTA",
      url: "/primary",
    },
    secondaryCta: {
      text: "Secondary CTA",
      url: "/secondary",
    },
    image: {
      asset: {
        _id: "image-1",
        _ref: "image-1",
        url: "https://example.com/image.jpg",
      },
    },
  };

  it("renders with hero data", () => {
    render(<HeroSection data={mockHeroData} />);

    expect(screen.getByText("Test Hero Title")).toBeInTheDocument();
    expect(screen.getByText("Test subtitle")).toBeInTheDocument();
    expect(screen.getByText("Test tagline")).toBeInTheDocument();
  });

  it("renders with null data and shows fallback title", () => {
    render(<HeroSection data={null} />);

    expect(
      screen.getByText("Transformando cultura em experiências reais"),
    ).toBeInTheDocument();
  });

  it("renders primary CTA button", () => {
    render(<HeroSection data={mockHeroData} />);

    const primaryButton = screen.getByText("Primary CTA").closest("a");
    expect(primaryButton).toHaveAttribute("href", "/primary");
  });

  it("renders secondary CTA button", () => {
    render(<HeroSection data={mockHeroData} />);

    const secondaryButton = screen.getByText("Secondary CTA").closest("a");
    expect(secondaryButton).toHaveAttribute("href", "/secondary");
  });

  it("does not render CTAs when not provided", () => {
    const dataWithoutCtas: Hero = {
      ...mockHeroData,
      primaryCta: undefined,
      secondaryCta: undefined,
    };

    render(<HeroSection data={dataWithoutCtas} />);

    expect(screen.queryByText("Primary CTA")).not.toBeInTheDocument();
    expect(screen.queryByText("Secondary CTA")).not.toBeInTheDocument();
  });

  it("does not render tagline when not provided", () => {
    const dataWithoutTagline: Hero = {
      ...mockHeroData,
      tagline: undefined,
    };

    render(<HeroSection data={dataWithoutTagline} />);

    expect(screen.queryByText("Test tagline")).not.toBeInTheDocument();
  });

  it("does not render subtitle when not provided", () => {
    const dataWithoutSubtitle: Hero = {
      ...mockHeroData,
      subtitle: undefined,
    };

    render(<HeroSection data={dataWithoutSubtitle} />);

    expect(screen.queryByText("Test subtitle")).not.toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<HeroSection data={mockHeroData} />);

    const section = screen.getByLabelText("Hero section");
    expect(section).toBeInTheDocument();
  });
});
