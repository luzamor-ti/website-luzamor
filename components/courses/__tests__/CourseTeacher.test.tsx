import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CourseTeacher } from "@/components/courses/CourseTeacher";
import { Member } from "@/sanity/lib/types/member";
import { Course } from "@/sanity/lib/types/course";

// Mock do buildSanityImageUrl
vi.mock("@/utils/buildSanityImageUrl", () => ({
  buildSanityImageUrl: (ref?: string) =>
    ref ? `https://cdn.sanity.io/images/${ref}` : "",
}));

describe("CourseTeacher", () => {
  const mockMember: Member = {
    _id: "member-1",
    name: "João Silva",
    role: "Professor de Música",
    photo: {
      asset: {
        _ref: "image-abc123",
        _type: "reference",
      },
    },
    shortBio: "Músico com 15 anos de experiência em ensino.",
  };

  const mockExternalTeacher: Course["externalTeacher"] = {
    name: "Maria Santos",
    photo: {
      asset: {
        _ref: "image-def456",
        _type: "reference",
      },
    },
  };

  it("renders member teacher correctly", () => {
    render(<CourseTeacher type="membro" member={mockMember} />);

    expect(screen.getByText("Professor")).toBeInTheDocument();
    expect(screen.getByText("João Silva")).toBeInTheDocument();
    expect(screen.getByText("Professor de Música")).toBeInTheDocument();
    expect(
      screen.getByText("Músico com 15 anos de experiência em ensino."),
    ).toBeInTheDocument();
  });

  it("renders external teacher correctly", () => {
    render(<CourseTeacher type="externo" external={mockExternalTeacher} />);

    expect(screen.getByText("Professor")).toBeInTheDocument();
    expect(screen.getByText("Maria Santos")).toBeInTheDocument();
  });

  it("does not render role and bio for external teacher", () => {
    render(<CourseTeacher type="externo" external={mockExternalTeacher} />);

    expect(screen.queryByText("Professor de Música")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Músico com 15 anos de experiência em ensino."),
    ).not.toBeInTheDocument();
  });

  it("renders teacher photo when available", () => {
    render(<CourseTeacher type="membro" member={mockMember} />);

    const image = screen.getByAltText("João Silva");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("image-abc123"),
    );
  });

  it("returns null when no teacher is provided", () => {
    const { container } = render(<CourseTeacher type="membro" />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders member without role", () => {
    const memberWithoutRole: Member = {
      _id: "member-2",
      name: "Pedro Costa",
      role: "",
      photo: {
        asset: {
          _ref: "image-ghi789",
          _type: "reference",
        },
      },
    };

    render(<CourseTeacher type="membro" member={memberWithoutRole} />);

    expect(screen.getByText("Pedro Costa")).toBeInTheDocument();
    expect(screen.queryByText("Professor de Música")).not.toBeInTheDocument();
  });

  it("renders member without shortBio", () => {
    const memberWithoutBio: Member = {
      _id: "member-3",
      name: "Ana Lima",
      role: "Professora de Arte",
      photo: {
        asset: {
          _ref: "image-jkl012",
          _type: "reference",
        },
      },
    };

    render(<CourseTeacher type="membro" member={memberWithoutBio} />);

    expect(screen.getByText("Ana Lima")).toBeInTheDocument();
    expect(screen.getByText("Professora de Arte")).toBeInTheDocument();
    expect(screen.queryByText(/anos de experiência/)).not.toBeInTheDocument();
  });

  it("renders with correct section styling", () => {
    const { container } = render(
      <CourseTeacher type="membro" member={mockMember} />,
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("bg-gray-50");
  });
});
