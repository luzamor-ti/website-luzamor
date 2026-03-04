import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CourseHero } from "@/components/courses/CourseHero";
import { Course } from "@/sanity/lib/types/course";

// Mock do buildSanityImageUrl
vi.mock("@/utils/buildSanityImageUrl", () => ({
  buildSanityImageUrl: (ref?: string) =>
    ref ? `https://cdn.sanity.io/images/${ref}` : "",
}));

describe("CourseHero", () => {
  const mockCoverPhoto: Course["coverPhoto"] = {
    asset: {
      _ref: "image-cover123",
      _type: "reference",
    },
    alt: "Foto de capa do curso",
  };

  const mockTeacherPhoto = {
    asset: {
      _ref: "image-teacher456",
      _type: "reference" as const,
    },
    alt: "Foto do professor",
  };

  it("renders course title and description", () => {
    render(
      <CourseHero
        title="Curso de Violão"
        description="Aprenda violão do básico ao avançado"
      />,
    );

    expect(screen.getByText("Curso de Violão")).toBeInTheDocument();
    expect(
      screen.getByText("Aprenda violão do básico ao avançado"),
    ).toBeInTheDocument();
  });

  it("renders tag 'Curso'", () => {
    render(
      <CourseHero
        title="Curso de Piano"
        description="Domine o piano clássico"
      />,
    );

    expect(screen.getByText("Curso")).toBeInTheDocument();
  });

  it("renders cover photo when provided", () => {
    render(
      <CourseHero
        title="Curso de Violão"
        description="Aprenda violão do básico ao avançado"
        coverPhoto={mockCoverPhoto}
      />,
    );

    const image = screen.getByAltText("Curso de Violão");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("image-cover123"),
    );
  });

  it("renders teacher seal when teacher name and photo are provided", () => {
    render(
      <CourseHero
        title="Curso de Violão"
        description="Aprenda violão do básico ao avançado"
        coverPhoto={mockCoverPhoto}
        teacherName="João Silva"
        teacherPhoto={mockTeacherPhoto}
      />,
    );

    expect(screen.getByText("João Silva")).toBeInTheDocument();
    const teacherImage = screen.getByAltText("João Silva");
    expect(teacherImage).toBeInTheDocument();
    expect(teacherImage).toHaveAttribute(
      "src",
      expect.stringContaining("image-teacher456"),
    );
  });

  it("does not render teacher seal when teacher name is missing", () => {
    render(
      <CourseHero
        title="Curso de Violão"
        description="Aprenda violão do básico ao avançado"
        coverPhoto={mockCoverPhoto}
        teacherPhoto={mockTeacherPhoto}
      />,
    );

    expect(screen.queryByAltText(/teacher/i)).not.toBeInTheDocument();
  });

  it("does not render teacher seal when teacher photo is missing", () => {
    render(
      <CourseHero
        title="Curso de Violão"
        description="Aprenda violão do básico ao avançado"
        coverPhoto={mockCoverPhoto}
        teacherName="João Silva"
      />,
    );

    // Teacher name should not appear if there's no photo
    expect(screen.queryByText("João Silva")).not.toBeInTheDocument();
  });

  it("renders without cover photo", () => {
    render(
      <CourseHero
        title="Curso de Violão"
        description="Aprenda violão do básico ao avançado"
      />,
    );

    expect(screen.getByText("Curso de Violão")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders with dark variant for section header", () => {
    const { container } = render(
      <CourseHero
        title="Curso de Violão"
        description="Aprenda violão do básico ao avançado"
      />,
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-[#0a0a0a]");
  });

  it("renders image with proper alt text", () => {
    render(
      <CourseHero
        title="Curso de Violão"
        description="Aprenda violão do básico ao avançado"
        coverPhoto={mockCoverPhoto}
      />,
    );

    const image = screen.getByAltText("Curso de Violão");
    expect(image).toBeInTheDocument();
  });
});
