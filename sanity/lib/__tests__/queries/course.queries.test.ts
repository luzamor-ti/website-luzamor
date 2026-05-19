import { describe, it, expect } from "vitest";
import {
  coursesQuery,
  courseBySlugQuery,
  relatedcoursesQuery,
} from "@/sanity/lib/queries/course";

describe("course queries", () => {
  it("projects the fields needed by the course list", () => {
    expect(coursesQuery).toContain('"title": titulo');
    expect(coursesQuery).toContain('"slug": slug.current');
    expect(coursesQuery).toContain('"minAge": idadeMinima');
    expect(coursesQuery).toContain('"monthlyOptions": opcoesMensalidade[]');
    expect(coursesQuery).toContain('"teachers": professores[]');
    expect(coursesQuery).toContain('"active": ativo');
  });

  it("projects the fields needed by the course detail page", () => {
    expect(courseBySlugQuery).toContain("slug.current == $slug");
    expect(courseBySlugQuery).toContain('"shortDescription": descricaoCurta');
    expect(courseBySlugQuery).toContain('"minAge": idadeMinima');
    expect(courseBySlugQuery).toContain(
      '"monthlyOptions": opcoesMensalidade[]',
    );
    expect(courseBySlugQuery).toContain('"teachers": professores[]');
    expect(courseBySlugQuery).toContain('"classroom": salaAula');
  });

  it("keeps the related courses query aligned with the course list query", () => {
    expect(relatedcoursesQuery).toContain("order(ordem asc, _createdAt desc)");
    expect(relatedcoursesQuery).toContain('"teachers": professores[]');
    expect(relatedcoursesQuery).toContain(
      '"monthlyOptions": opcoesMensalidade[]',
    );
    expect(relatedcoursesQuery).toContain('"active": ativo');
  });
});
