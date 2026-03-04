import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CursosTemplate } from "@/components/page-templates/CursosTemplate";
import { Course } from "@/sanity/lib/types/course";

// Mock do getCourses service
vi.mock("@/sanity/lib/services/courseService", () => ({
  getCourses: vi.fn(),
}));

// Mock do buildSanityImageUrl
vi.mock("@/utils/buildSanityImageUrl", () => ({
  buildSanityImageUrl: (ref?: string) =>
    ref ? `https://cdn.sanity.io/images/${ref}` : "",
}));

import { getCourses } from "@/sanity/lib/services/courseService";

describe("CursosTemplate", () => {
  const mockCourses: Course[] = [
    {
      _id: "course-1",
      title: "Curso de Violão",
      slug: { current: "curso-violao" },
      coverPhoto: {
        asset: {
          _ref: "image-violao",
          _type: "reference",
        },
      },
      description: [],
      schedule: "Terças e quintas, das 19h às 21h",
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
        whatsapp: "5511999999999",
        buttonText: "Inscreva-se agora",
      },
      active: true,
    },
    {
      _id: "course-2",
      title: "Curso de Piano",
      slug: { current: "curso-piano" },
      coverPhoto: {
        asset: {
          _ref: "image-piano",
          _type: "reference",
        },
      },
      description: [],
      schedule: "Segundas e quartas, das 14h às 16h",
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
        whatsapp: "5511888888888",
        buttonText: "Saiba mais",
      },
      active: true,
    },
  ];

  beforeEach(() => {
    vi.mocked(getCourses).mockResolvedValue(mockCourses);
  });

  it("renders hero section with title and description", async () => {
    const component = await CursosTemplate();
    render(component);

    expect(screen.getByText("Cursos E Eventos")).toBeInTheDocument();
    expect(screen.getByText("Nossos Cursos")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Explore nossa variedade de cursos e atividades culturais.",
      ),
    ).toBeInTheDocument();
  });

  it("renders all course titles", async () => {
    const component = await CursosTemplate();
    render(component);

    expect(screen.getByText("Curso de Violão")).toBeInTheDocument();
    expect(screen.getByText("Curso de Piano")).toBeInTheDocument();
  });

  it("renders course schedules", async () => {
    const component = await CursosTemplate();
    render(component);

    expect(
      screen.getByText("Terças e quintas, das 19h às 21h"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Segundas e quartas, das 14h às 16h"),
    ).toBeInTheDocument();
  });

  it("renders course images", async () => {
    const component = await CursosTemplate();
    render(component);

    const violaoImage = screen.getByAltText("Curso de Violão");
    const pianoImage = screen.getByAltText("Curso de Piano");

    expect(violaoImage).toBeInTheDocument();
    expect(pianoImage).toBeInTheDocument();
  });

  it("renders teacher seals", async () => {
    const component = await CursosTemplate();
    render(component);

    expect(screen.getByText("João Silva")).toBeInTheDocument();
    expect(screen.getByText("Maria Santos")).toBeInTheDocument();
  });

  it("renders enrollment button text", async () => {
    const component = await CursosTemplate();
    render(component);

    expect(screen.getByText("Inscreva-se agora")).toBeInTheDocument();
    expect(screen.getByText("Saiba mais")).toBeInTheDocument();
  });

  it("renders links to course detail pages", async () => {
    const component = await CursosTemplate();
    render(component);

    const links = screen.getAllByRole("link");
    const courseLinks = links.filter((link) =>
      link.getAttribute("href")?.startsWith("/course/"),
    );

    expect(courseLinks[0]).toHaveAttribute("href", "/course/curso-violao");
    expect(courseLinks[1]).toHaveAttribute("href", "/course/curso-piano");
  });

  it("calls getCourses service", async () => {
    vi.clearAllMocks();
    await CursosTemplate();

    expect(getCourses).toHaveBeenCalledTimes(1);
  });

  it("renders grid with correct number of columns", async () => {
    const component = await CursosTemplate();
    const { container } = render(component);

    const grid = container.querySelector('[class*="grid-cols"]');
    expect(grid).toBeInTheDocument();
  });

  it("renders course cards with hover effects", async () => {
    const component = await CursosTemplate();
    const { container } = render(component);

    const cards = container.querySelectorAll(".group");
    expect(cards.length).toBe(2);
  });

  it("renders when no courses are available", async () => {
    vi.mocked(getCourses).mockResolvedValue([]);

    const component = await CursosTemplate();
    render(component);

    expect(screen.getByText("Nossos Cursos")).toBeInTheDocument();
    expect(screen.queryByText("Curso de Violão")).not.toBeInTheDocument();
  });

  it("renders course without teacher when teacher info is missing", async () => {
    const coursesWithoutTeacher: Course[] = [
      {
        _id: "course-3",
        title: "Curso de Canto",
        slug: { current: "curso-canto" },
        coverPhoto: {
          asset: {
            _ref: "image-canto",
            _type: "reference",
          },
        },
        description: [],
        schedule: "Sextas, das 18h às 20h",
        teacherType: "membro",
        enrollment: {
          active: true,
          buttonText: "Ver detalhes",
        },
        active: true,
      },
    ];

    vi.mocked(getCourses).mockResolvedValue(coursesWithoutTeacher);

    const component = await CursosTemplate();
    render(component);

    expect(screen.getByText("Curso de Canto")).toBeInTheDocument();
    expect(screen.getByText("Ver detalhes")).toBeInTheDocument();
  });

  it("renders hero section with dark variant", async () => {
    const component = await CursosTemplate();
    const { container } = render(component);

    const heroSection = container.querySelector(".bg-\\[\\#0a0a0a\\]");
    expect(heroSection).toBeInTheDocument();
  });
});
