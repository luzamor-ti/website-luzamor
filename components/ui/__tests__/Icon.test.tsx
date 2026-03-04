import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Icon } from "@/components/ui/Icon";
import { Home, User, Settings } from "lucide-react";

describe("Icon", () => {
  it("renders icon component", () => {
    const { container } = render(<Icon icon={Home} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("applies default size of 24", () => {
    const { container } = render(<Icon icon={Home} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "24");
    expect(svg).toHaveAttribute("height", "24");
  });

  it("applies custom size", () => {
    const { container } = render(<Icon icon={User} size={32} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });

  it("applies small size", () => {
    const { container } = render(<Icon icon={Settings} size={16} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "16");
    expect(svg).toHaveAttribute("height", "16");
  });

  it("applies large size", () => {
    const { container } = render(<Icon icon={Home} size={48} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("width", "48");
    expect(svg).toHaveAttribute("height", "48");
  });

  it("applies custom className", () => {
    const { container } = render(<Icon icon={Home} className="text-primary" />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveClass("text-primary");
  });

  it("applies strokeWidth of 2", () => {
    const { container } = render(<Icon icon={Home} />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("stroke-width", "2");
  });

  it("renders different icon types", () => {
    const { container: homeContainer } = render(<Icon icon={Home} />);
    const { container: userContainer } = render(<Icon icon={User} />);
    const { container: settingsContainer } = render(<Icon icon={Settings} />);

    expect(homeContainer.querySelector("svg")).toBeInTheDocument();
    expect(userContainer.querySelector("svg")).toBeInTheDocument();
    expect(settingsContainer.querySelector("svg")).toBeInTheDocument();
  });

  it("combines size and className", () => {
    const { container } = render(
      <Icon icon={Home} size={40} className="custom-icon text-blue-500" />,
    );
    const svg = container.querySelector("svg");

    expect(svg).toHaveAttribute("width", "40");
    expect(svg).toHaveAttribute("height", "40");
    expect(svg).toHaveClass("custom-icon", "text-blue-500");
  });
});
