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

  const mockTeachers: Course["teachers"] = [
    {
      teacherType: "membro",
      teacherMember: {
        _id: "membro1",
        name: "João Silva",
        role: "Professor",
        photo: {
          asset: { _ref: "image-teacher456", _type: "reference" },
        },
      },
    },
  ];

  it("renders course title and description", () => {
    render(
      <CourseHero
        title="Curso de Violão"
        description="Aprenda violão do básico ao avançado"
      />,
    );

    expect(screen.getByRole("heading", { name: "Curso de Violão" })).toBeInTheDocument();
    expect(
      screen.getByText("Aprenda violão do básico ao avançado"),
    ).toBeInTheDocument();
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

  it("renders teacher list when teachers are provided", () => {
    render(
      <CourseHero
        title="Curso de Violão"
        description="Aprenda violão do básico ao avançado"
        teachers={mockTeachers}
      />,
    );

    expect(screen.getByText("Professores")).toBeInTheDocument();
    expect(screen.getByText("João Silva")).toBeInTheDocument();
    const teacherImage = screen.getByAltText("João Silva");
    expect(teacherImage).toBeInTheDocument();
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
});
