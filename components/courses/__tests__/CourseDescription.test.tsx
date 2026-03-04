import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CourseDescription } from "@/components/courses/CourseDescription";
import type { PortableTextBlock } from "@portabletext/types";

describe("CourseDescription", () => {
  const mockDescription: PortableTextBlock[] = [
    {
      _type: "block",
      _key: "1",
      children: [
        {
          _type: "span",
          _key: "1-1",
          text: "Este curso oferece uma introdução completa ao tema.",
          marks: [],
        },
      ],
      markDefs: [],
      style: "normal",
    },
  ];

  it("renders course description heading", () => {
    render(<CourseDescription description={mockDescription} />);

    expect(screen.getByText("Sobre o Curso")).toBeInTheDocument();
  });

  it("renders portable text description", () => {
    render(<CourseDescription description={mockDescription} />);

    expect(
      screen.getByText("Este curso oferece uma introdução completa ao tema."),
    ).toBeInTheDocument();
  });

  it("renders schedule when provided", () => {
    const schedule = "Terças e quintas, das 19h às 21h";
    render(
      <CourseDescription description={mockDescription} schedule={schedule} />,
    );

    expect(screen.getByText("Datas e Horários")).toBeInTheDocument();
    expect(screen.getByText(schedule)).toBeInTheDocument();
  });

  it("does not render schedule section when not provided", () => {
    render(<CourseDescription description={mockDescription} />);

    expect(screen.queryByText("Datas e Horários")).not.toBeInTheDocument();
  });

  it("renders with correct section styling", () => {
    const { container } = render(
      <CourseDescription description={mockDescription} />,
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-white");
  });

  it("renders schedule with correct styling", () => {
    const schedule = "Segundas e quartas, das 14h às 16h";
    const { container } = render(
      <CourseDescription description={mockDescription} schedule={schedule} />,
    );

    const scheduleDiv = container.querySelector(".border-primary");
    expect(scheduleDiv).toBeInTheDocument();
    expect(scheduleDiv).toHaveClass("bg-gray-50", "rounded-lg");
  });
});
