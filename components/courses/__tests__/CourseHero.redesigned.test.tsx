import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CourseHero } from "@/components/courses/CourseHero";
import { Course } from "@/sanity/lib/types/course";

vi.mock("@/utils/buildSanityImageUrl", () => ({
  buildSanityImageUrl: (ref?: string) =>
    ref ? `https://cdn.sanity.io/images/${ref}` : "",
}));

describe("CourseHero", () => {
  const coverPhoto: Course["coverPhoto"] = {
    asset: {
      _ref: "image-cover123",
      _type: "reference",
    },
    alt: "Foto de capa do curso",
  };

  const teachers: NonNullable<Course["teachers"]> = [
    {
      teacherType: "membro",
      teacherMember: {
        _id: "teacher-1",
        name: "João Silva",
        role: "Professor",
        shortBio: "Músico com 15 anos de experiência.",
        photo: {
          asset: {
            _ref: "image-teacher456",
            _type: "reference",
          },
        },
      },
    },
  ];

  it("renders the title, description, and cover image", () => {
    render(
      <CourseHero
        title="Curso de Violão"
        description="Aprenda violão do básico ao avançado"
        coverPhoto={coverPhoto}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Curso de Violão" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Aprenda violão do básico ao avançado"),
    ).toBeInTheDocument();
    expect(screen.getByAltText("Curso de Violão")).toHaveAttribute(
      "src",
      expect.stringContaining("image-cover123"),
    );
    expect(screen.getByText("Curso")).toBeInTheDocument();
  });

  it("renders teacher chips when teachers are provided", () => {
    render(
      <CourseHero
        title="Curso de Violão"
        description="Aprenda violão do básico ao avançado"
        teachers={teachers}
      />,
    );

    expect(screen.getByText("Professores")).toBeInTheDocument();
    expect(screen.getByText("João Silva")).toBeInTheDocument();
    expect(screen.getByAltText("João Silva")).toHaveAttribute(
      "src",
      expect.stringContaining("image-teacher456"),
    );
  });

  it("renders without a cover image when none is provided", () => {
    render(
      <CourseHero
        title="Curso de Piano"
        description="Domine o piano clássico"
      />,
    );

    expect(screen.getByText("Curso de Piano")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
