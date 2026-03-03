import { client } from "@/sanity/lib/client";
import { courseBySlugQuery } from "@/sanity/lib/queries/course"; // Importei a mesma query da listagem
import { notFound } from "next/navigation";
import { CourseHero, CourseDescription } from "@/components/courses";
import { RelatedCourses } from "@/components/courses/RelatedCourses";
import { getRelatedCourses } from "@/sanity/lib/services/courseService";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // 1. Busca o curso atual
  const curso = await client.fetch(courseBySlugQuery, { slug });

  if (!curso) {
    notFound();
  }

  // 3. Filtra para não repetir o curso atual e pega 3
  const outrosCursos = await getRelatedCourses(curso._id, 3);

  return (
    <main className="min-h-screen">
      <CourseHero
        title={curso.title}
        description={curso.description?.[0]?.children?.[0]?.text}
        coverPhoto={curso.coverPhoto}
        teacherName={
          curso.teacherType === "membro"
            ? curso.teacherMember?.name
            : curso.externalTeacher?.name
        }
        teacherPhoto={
          curso.teacherType === "membro"
            ? curso.teacherMember?.photo
            : curso.externalTeacher?.photo
        }
      />

      <CourseDescription
        description={curso.description}
        schedule={curso.schedule}
      />

      {/* Seção de sugestões usando os dados da query reaproveitada */}
      <RelatedCourses courses={outrosCursos} />
    </main>
  );
}
