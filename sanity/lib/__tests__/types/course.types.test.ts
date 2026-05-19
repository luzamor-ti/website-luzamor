import { describe, it, expect } from "vitest";
import { Course } from "@/sanity/lib/types/course";

describe("Course type", () => {
  const course: Course = {
    _id: "curso-1",
    title: "Curso de Violão",
    slug: "curso-de-violao",
    coverPhoto: {
      asset: {
        _ref: "image-cover123",
        _type: "reference",
      },
      alt: "Foto de capa",
    },
    description: [],
    schedule: "Segundas às 19h",
    enrollment: {
      active: true,
      whatsapp: "5511999999999",
      messageText: "Olá",
      buttonText: "Saiba mais",
    },
    active: true,
    shortDescription: "Aprenda violão",
    minAge: 12,
    monthlyOptions: [
      {
        title: "Aulas Individuais",
        free: false,
        price: 150,
        details: "Acompanhamento personalizado",
      },
      {
        title: "Aula Experimental",
        free: true,
        details: "Primeira aula gratuita",
      },
    ],
    teachers: [
      {
        teacherType: "membro",
        teacherMember: {
          _id: "member-1",
          name: "João Silva",
          role: "Professor",
          photo: {
            asset: {
              _ref: "image-teacher456",
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
              _ref: "image-external789",
              _type: "reference",
            },
          },
        },
      },
    ],
  };

  it("supports the current course structure", () => {
    expect(course.title).toBe("Curso de Violão");
    expect(course.slug).toBe("curso-de-violao");
    expect(course.active).toBe(true);
    expect(course.minAge).toBe(12);
  });

  it("supports monthly options for paid and free plans", () => {
    expect(course.monthlyOptions).toHaveLength(2);
    expect(course.monthlyOptions?.[0].price).toBe(150);
    expect(course.monthlyOptions?.[1].free).toBe(true);
  });

  it("supports multiple teachers with member and external entries", () => {
    expect(course.teachers).toHaveLength(2);
    expect(course.teachers?.[0].teacherType).toBe("membro");
    expect(course.teachers?.[1].teacherType).toBe("externo");
  });

  it("keeps enrollment data required by the current UI", () => {
    expect(course.enrollment.active).toBe(true);
    expect(course.enrollment.buttonText).toBe("Saiba mais");
    expect(course.enrollment.messageText).toContain("Olá");
  });
});
