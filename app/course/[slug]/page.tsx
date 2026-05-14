import { client } from "@/sanity/lib/client";
import { courseBySlugQuery } from "@/sanity/lib/queries/course";
import { notFound } from "next/navigation";
import {
  CourseHero,
  CourseDescription,
  CourseForm,
} from "@/components/courses";
import { RelatedCourses } from "@/components/courses/RelatedCourses";
import { getRelatedCourses } from "@/sanity/lib/services/courseService";
import { getGlobalConfiguration } from "@/sanity/lib/services/configuracaoService";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // 1. Busca o curso atual e configuração global em paralelo
  const [curso, globalConfig] = await Promise.all([
    client.fetch(courseBySlugQuery, { slug }),
    getGlobalConfiguration(),
  ]);

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
        teachers={curso.teachers}
      >
        <div id="course-form" className="bg-gray-50 rounded-2xl shadow-xl overflow-hidden mt-8 lg:mt-0">
          <CourseForm
            course={curso}
            whatsappNumber={curso.whatsappNumber}
            globalWhatsapp={globalConfig?.contact?.whatsapp}
          />
        </div>
      </CourseHero>

      {/* Descrição do Curso */}
      <CourseDescription
        description={curso.description}
        schedule={curso.schedule}
        monthlyOptions={curso.monthlyOptions}
        enrollment={curso.enrollment}
        courseTitle={curso.title}
        whatsappNumber={curso.whatsappNumber}
        globalWhatsapp={globalConfig?.contact?.whatsapp}
      />

      {/* Seção de sugestões usando os dados da query reaproveitada */}
      <RelatedCourses courses={outrosCursos} />
    </main>
  );
}
