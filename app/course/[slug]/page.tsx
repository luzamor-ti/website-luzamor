import { client } from "@/sanity/lib/client";
import { courseBySlugQuery } from "@/sanity/lib/queries/course"; // Importei a mesma query da listagem
import { notFound } from "next/navigation";
import {
  CourseHero,
  CourseDescription,
  CourseForm,
} from "@/components/courses";
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
        description={curso.shortDescription || ""}
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

      {/* Container Principal com Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* COLUNA DA ESQUERDA: Descrição (Ocupa 2/3 do espaço) */}
          <div className="lg:col-span-2">
            <CourseDescription
              description={curso.description}
              schedule={curso.schedule}
            />
          </div>

          {/* COLUNA DA DIREITA: Formulário (Ocupa 1/3 do espaço) */}
          {/* 'sticky' faz o form seguir o scroll se a descrição for longa */}
          <aside className="lg:col-span-1 lg:sticky lg:top-8">
            <div className="bg-gray-50 rounded-2xl border  shadow-xl overflow-hidden">
              {/* Note que removi o padding aqui para deixar o form controlar o espaço interno */}
              <CourseForm course={curso} whatsappNumber="99999999" />
            </div>
          </aside>
        </div>
      </section>

      {/* Seção de sugestões usando os dados da query reaproveitada */}
      <RelatedCourses courses={outrosCursos} />
    </main>
  );
}
