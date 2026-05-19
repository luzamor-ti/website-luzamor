import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CourseTeacherList } from "@/components/courses/CourseTeacherList";
import { Course } from "@/sanity/lib/types/course";

vi.mock("@/utils/buildSanityImageUrl", () => ({
  buildSanityImageUrl: (ref?: string) =>
    ref ? `https://cdn.sanity.io/images/${ref}` : "",
}));

describe("CourseTeacherList", () => {
  const teachers: NonNullable<Course["teachers"]> = [
    {
      teacherType: "membro",
      teacherMember: {
        _id: "member-1",
        name: "João Silva",
        role: "Professor de Música",
        shortBio: "Músico com 15 anos de experiência.",
        photo: {
          asset: {
            _ref: "image-abc123",
            _type: "reference",
          },
        },
      },
    },
    {
      teacherType: "externo",
      externalTeacher: {
        name: "Maria Santos",
        photo: {
          asset: {
            _ref: "image-def456",
            _type: "reference",
          },
        },
      },
    },
  ];

  it("renders the list heading and teacher cards", () => {
    render(<CourseTeacherList teachers={teachers} />);

    expect(screen.getByText("Professores")).toBeInTheDocument();
    expect(screen.getByText("João Silva")).toBeInTheDocument();
    expect(screen.getByText("Professor de Música")).toBeInTheDocument();
    expect(screen.getByText("Maria Santos")).toBeInTheDocument();
    expect(screen.getByAltText("João Silva")).toHaveAttribute(
      "src",
      expect.stringContaining("image-abc123"),
    );
    expect(screen.getByAltText("Maria Santos")).toHaveAttribute(
      "src",
      expect.stringContaining("image-def456"),
    );
  });

  it("renders the member bio but not the external role", () => {
    render(<CourseTeacherList teachers={teachers} />);

    expect(
      screen.getByText("Músico com 15 anos de experiência."),
    ).toBeInTheDocument();
    expect(screen.queryByText("Maria Santos")).toBeInTheDocument();
    expect(screen.queryByText("Professor de Música")).toBeInTheDocument();
  });

  it("returns null for an empty array", () => {
    const { container } = render(<CourseTeacherList teachers={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
