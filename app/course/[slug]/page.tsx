import { client } from "@/sanity/lib/client";
import { courseBySlugQuery } from "@/sanity/lib/queries/course";
import { notFound } from "next/navigation";
import { CourseHero, CourseDescription } from "@/components/courses";
import { RelatedCourses } from "@/components/courses/RelatedCourses";
import { getRelatedCourses } from "@/sanity/lib/services/courseService";
import Link from "next/link";
import { DoorOpen } from "lucide-react";

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

      {/* Link para a sala de aula vinculada */}
      {curso.classroom && (
        <section className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-primary/10 rounded-xl">
                <DoorOpen size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  Sala de Aula
                </p>
                <p className="text-base font-semibold text-gray-800">
                  {curso.classroom.name}
                </p>
              </div>
            </div>
            <Link
              href={`/salas-aula?sala=${curso.classroom.slug}`}
              className="cursor-pointer inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Ver sala
              <DoorOpen size={15} />
            </Link>
          </div>
        </section>
      )}

      {/* Seção de sugestões usando os dados da query reaproveitada */}
      <RelatedCourses courses={outrosCursos} />
    </main>
  );
}
