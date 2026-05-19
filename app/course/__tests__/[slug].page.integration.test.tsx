import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import CourseDetailPage from "@/app/course/[slug]/page";
import type { ReactNode } from "react";

const mocks = vi.hoisted(() => ({
  fetchMock: vi.fn(),
  getGlobalConfigurationMock: vi.fn(),
  getRelatedCoursesMock: vi.fn(),
  notFoundMock: vi.fn(),
}));

vi.mock("@/sanity/lib/client", () => ({
  client: {
    fetch: mocks.fetchMock,
  },
}));

vi.mock("@/sanity/lib/queries/course", () => ({
  courseBySlugQuery: "courseBySlugQuery",
}));

vi.mock("next/navigation", () => ({
  notFound: () => {
    mocks.notFoundMock();
    throw new Error("NEXT_NOT_FOUND");
  },
}));

vi.mock("@/sanity/lib/services/courseService", () => ({
  getRelatedCourses: mocks.getRelatedCoursesMock,
}));

vi.mock("@/sanity/lib/services/configuracaoService", () => ({
  getGlobalConfiguration: mocks.getGlobalConfigurationMock,
}));

vi.mock("@/components/courses", () => ({
  CourseHero: ({
    title,
    description,
    children,
  }: {
    title: string;
    description: string;
    children?: ReactNode;
  }) => (
    <section data-testid="course-hero">
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </section>
  ),
  CourseDescription: ({ courseTitle }: { courseTitle: string }) => (
    <section data-testid="course-description">{courseTitle}</section>
  ),
  CourseForm: ({
    course,
    globalWhatsapp,
  }: {
    course: { title: string };
    globalWhatsapp?: string;
  }) => (
    <div data-testid="course-form">
      {course.title} - {globalWhatsapp}
    </div>
  ),
}));

vi.mock("@/components/courses/RelatedCourses", () => ({
  RelatedCourses: ({ courses }: { courses: Array<{ title: string }> }) => (
    <div data-testid="related-courses">{courses.length}</div>
  ),
}));

describe("CourseDetailPage", () => {
  const course = {
    _id: "curso-1",
    title: "Curso de Violão",
    slug: "curso-de-violao",
    shortDescription: "Aprenda violão do básico ao avançado",
    description: [{ _type: "block", _key: "1", children: [] }],
    schedule: "Segundas às 19h",
    coverPhoto: {
      asset: { _ref: "image-cover123", _type: "reference" },
    },
    teachers: [],
    enrollment: {
      active: true,
      buttonText: "Saiba mais",
    },
    monthlyOptions: [],
    whatsappNumber: "5511999999999",
  };

  beforeEach(() => {
    mocks.fetchMock.mockReset();
    mocks.getGlobalConfigurationMock.mockReset();
    mocks.getRelatedCoursesMock.mockReset();
    mocks.notFoundMock.mockReset();
  });

  it("fetches the course and renders the main sections", async () => {
    mocks.fetchMock.mockResolvedValue(course);
    mocks.getGlobalConfigurationMock.mockResolvedValue({
      contact: { whatsapp: "5511888888888" },
    });
    mocks.getRelatedCoursesMock.mockResolvedValue([
      { _id: "curso-2", title: "Outro curso" },
    ]);

    const element = await CourseDetailPage({
      params: Promise.resolve({ slug: "curso-de-violao" }),
    });
    render(element);

    expect(mocks.fetchMock).toHaveBeenCalledWith("courseBySlugQuery", {
      slug: "curso-de-violao",
    });
    expect(mocks.getGlobalConfigurationMock).toHaveBeenCalled();
    expect(mocks.getRelatedCoursesMock).toHaveBeenCalledWith("curso-1", 3);
    expect(screen.getByTestId("course-hero")).toBeInTheDocument();
    expect(screen.getByTestId("course-description")).toHaveTextContent(
      "Curso de Violão",
    );
    expect(screen.getByTestId("course-form")).toHaveTextContent(
      "5511888888888",
    );
    expect(screen.getByTestId("related-courses")).toHaveTextContent("1");
  });

  it("calls notFound when the course is not returned", async () => {
    mocks.fetchMock.mockResolvedValue(null);
    mocks.getGlobalConfigurationMock.mockResolvedValue({
      contact: { whatsapp: "5511888888888" },
    });

    await expect(
      CourseDetailPage({ params: Promise.resolve({ slug: "inexistente" }) }),
    ).rejects.toThrow("NEXT_NOT_FOUND");

    expect(mocks.notFoundMock).toHaveBeenCalled();
  });
});
