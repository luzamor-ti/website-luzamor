import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { RelatedCourses } from "@/components/courses/RelatedCourses";
import { Course } from "@/sanity/lib/types/course";

// Mock do buildSanityImageUrl
vi.mock("@/utils/buildSanityImageUrl", () => ({
  buildSanityImageUrl: (ref?: string) =>
    ref ? `https://cdn.sanity.io/images/${ref}` : "",
}));

describe("RelatedCourses", () => {
  const mockCourses: Course[] = [
    {
      _id: "course-1",
      title: "Curso de Violão",
      slug: "curso-violao",
      coverPhoto: {
        asset: {
          _ref: "image-violao",
          _type: "reference",
        },
      },
      description: [],
      schedule: "Terças e quintas, 19h",
      teacherType: "membro",
      teacherMember: {
        _id: "member-1",
        name: "João Silva",
        role: "Professor de Música",
        photo: {
          asset: {
            _ref: "image-joao",
            _type: "reference",
          },
        },
      },
      enrollment: {
        active: true,
        buttonText: "Saiba mais",
      },
      active: true,
    },
    {
      _id: "course-2",
      title: "Curso de Piano",
      slug: "curso-piano",
      coverPhoto: {
        asset: {
          _ref: "image-piano",
          _type: "reference",
        },
      },
      description: [],
      schedule: "Segundas e quartas, 14h",
      teacherType: "externo",
      externalTeacher: {
        name: "Maria Santos",
        photo: {
          asset: {
            _ref: "image-maria",
            _type: "reference",
          },
        },
      },
      enrollment: {
        active: true,
        buttonText: "Inscreva-se",
      },
      active: true,
    },
  ];

  it("renders section header correctly", () => {
    render(<RelatedCourses courses={mockCourses} />);

    expect(screen.getByText("Outros Trabalhos")).toBeInTheDocument();
    expect(screen.getByText("Construindo cultura juntos")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Da educação ao desenvolvimento cultural, cada causa carrega a nossa missão/,
      ),
    ).toBeInTheDocument();
  });

  it("renders all course titles", () => {
    render(<RelatedCourses courses={mockCourses} />);

    expect(screen.getByText("Curso de Violão")).toBeInTheDocument();
    expect(screen.getByText("Curso de Piano")).toBeInTheDocument();
  });

  it("renders course cover images", () => {
    render(<RelatedCourses courses={mockCourses} />);

    const violaoImage = screen.getByAltText("Curso de Violão");
    const pianoImage = screen.getByAltText("Curso de Piano");

    expect(violaoImage).toBeInTheDocument();
    expect(pianoImage).toBeInTheDocument();
    expect(violaoImage).toHaveAttribute(
      "src",
      expect.stringContaining("image-violao"),
    );
    expect(pianoImage).toHaveAttribute(
      "src",
      expect.stringContaining("image-piano"),
    );
  });

  it("renders teacher seals for courses with teacher info", () => {
    render(<RelatedCourses courses={mockCourses} />);

    expect(screen.getByText("João Silva")).toBeInTheDocument();
    expect(screen.getByText("Maria Santos")).toBeInTheDocument();
  });

  it("renders course schedules", () => {
    render(<RelatedCourses courses={mockCourses} />);

    expect(screen.getByText("Terças e quintas, 19h")).toBeInTheDocument();
    expect(screen.getByText("Segundas e quartas, 14h")).toBeInTheDocument();
  });

  it("renders enrollment button text", () => {
    render(<RelatedCourses courses={mockCourses} />);

    expect(screen.getByText("Saiba mais")).toBeInTheDocument();
    expect(screen.getByText("Inscreva-se")).toBeInTheDocument();
  });

  it("renders links to course pages", () => {
    render(<RelatedCourses courses={mockCourses} />);

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/course/curso-violao");
    expect(links[1]).toHaveAttribute("href", "/course/curso-piano");
  });

  it("returns null when courses array is empty", () => {
    const { container } = render(<RelatedCourses courses={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("returns null when courses is null", () => {
    const { container } = render(
      <RelatedCourses courses={null as unknown as Course[]} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders course without teacher seal when teacher info is missing", () => {
    const coursesWithoutTeacher: Course[] = [
      {
        _id: "course-3",
        title: "Curso de Canto",
        slug: "curso-canto",
        coverPhoto: {
          asset: {
            _ref: "image-canto",
            _type: "reference",
          },
        },
        description: [],
        schedule: "Sextas, 18h",
        teacherType: "membro",
        enrollment: {
          active: true,
          buttonText: "Ver mais",
        },
        active: true,
      },
    ];

    render(<RelatedCourses courses={coursesWithoutTeacher} />);

    expect(screen.getByText("Curso de Canto")).toBeInTheDocument();
    // Should not render teacher seal
    const teacherSeals = screen
      .queryAllByRole("img")
      .filter((img) => img.className.includes("rounded-full"));
    expect(teacherSeals).toHaveLength(0);
  });
});
