import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CourseEnrollment } from "@/components/courses/CourseEnrollment";
import { Course } from "@/sanity/lib/types/course";

describe("CourseEnrollment", () => {
  const mockEnrollment: Course["enrollment"] = {
    active: true,
    whatsapp: "5511999999999",
    messageText: "Olá, gostaria de me inscrever no curso",
    buttonText: "Inscreva-se agora",
  };

  it("renders enrollment heading", () => {
    render(<CourseEnrollment enrollment={mockEnrollment} />);

    expect(screen.getByText("Ficou interessado?")).toBeInTheDocument();
  });

  it("renders custom button text when provided", () => {
    render(<CourseEnrollment enrollment={mockEnrollment} />);

    expect(screen.getByText("Inscreva-se agora")).toBeInTheDocument();
  });

  it("renders default button text when not provided", () => {
    const enrollmentWithoutButtonText: Course["enrollment"] = {
      active: true,
      whatsapp: "5511999999999",
      messageText: "Olá",
    };

    render(<CourseEnrollment enrollment={enrollmentWithoutButtonText} />);

    expect(screen.getByText("Quero me inscrever")).toBeInTheDocument();
  });

  it("generates correct WhatsApp URL with message", () => {
    render(<CourseEnrollment enrollment={mockEnrollment} />);

    const link = screen.getByRole("link");
    const expectedUrl = `https://wa.me/5511999999999?text=${encodeURIComponent("Olá, gostaria de me inscrever no curso")}`;

    expect(link).toHaveAttribute("href", expectedUrl);
  });

  it("generates WhatsApp URL without message when not provided", () => {
    const enrollmentWithoutMessage: Course["enrollment"] = {
      active: true,
      whatsapp: "5511888888888",
      buttonText: "Fale conosco",
    };

    render(<CourseEnrollment enrollment={enrollmentWithoutMessage} />);

    const link = screen.getByRole("link");
    const expectedUrl = "https://wa.me/5511888888888?text=";

    expect(link).toHaveAttribute("href", expectedUrl);
  });

  it("renders with correct section styling", () => {
    const { container } = render(
      <CourseEnrollment enrollment={mockEnrollment} />,
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-primary", "text-white", "text-center");
  });

  it("renders link with Button component", () => {
    render(<CourseEnrollment enrollment={mockEnrollment} />);

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(screen.getByText("Inscreva-se agora")).toBeInTheDocument();
  });
});
