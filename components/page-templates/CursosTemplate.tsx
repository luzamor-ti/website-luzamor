import { Section, Heading, Grid, SectionHeader } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import { Clock } from "lucide-react";
import { Course } from "@/sanity/lib/types/course";
import { getCourses } from "@/sanity/lib/services/courseService";

export async function CursosTemplate() {
  const cursos = await getCourses();

  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <Section className="relative bg-[#0a0a0a] pt-40 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "url('https://framerusercontent.com/images/al6LHhZeQCUgkaAutT71lCt7G5w.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px)",
            transform: "scale(1.2)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]/80" />
        <div className="relative z-10 max-w-5xl">
          <SectionHeader
            tag="Cursos e eventos"
            title="Nossos Cursos"
            description="Explore nossa variedade de cursos e atividades culturais."
            variant="dark"
            align="left"
          />
        </div>
      </Section>

      {/* GRID DE CURSOS */}
      <Section className="py-24">
        <div className="container mx-auto px-4">
          <Grid cols={3} gap="lg">
            {cursos.map((curso: Course) => {
              const imageUrl = buildSanityImageUrl(
                curso.coverPhoto?.asset?._ref,
              );
              const teacher =
                curso.teacherType === "membro"
                  ? curso.teacherMember
                  : curso.externalTeacher;
              const teacherPhoto = buildSanityImageUrl(
                teacher?.photo?.asset?._ref,
              );

              return (
                <Link
                  href={`/course/${curso.slug}`}
                  key={curso._id}
                  className="group"
                >
                  <div className="bg-transparent rounded-[32px] p-4 h-full shadow-md hover:shadow-xl transition-all duration-500 border border-gray-200 flex flex-col">
                    {/* PASSO 1: IMAGEM COM SELO FLUTUANTE */}
                    <div className="relative h-64 w-full rounded-[24px] overflow-hidden mb-6">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={curso.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      )}

                      {teacher?.name && teacherPhoto && (
                        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                          <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gray-100">
                            <Image
                              src={teacherPhoto}
                              alt={teacher.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-xs font-bold text-gray-900">
                            {teacher.name}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* INFO DO CURSO */}
                    <div className="px-2 flex flex-col flex-grow">
                      <Heading
                        level={3}
                        className="text-2xl mb-3 text-black font-bold tracking-tight"
                      >
                        {curso.title}
                      </Heading>

                      {curso.schedule && (
                        <div className="flex items-center gap-2 text-gray-500 mb-6">
                          <Clock className="w-5 h-5 text-[#00b341]" />
                          <span className="text-base font-medium">
                            {curso.schedule}
                          </span>
                        </div>
                      )}

                      {/* --- PASSO 2: BOTÃO VERDE ARREDONDADO --- */}
                      <div className="mt-auto pt-2">
                        <div className="w-full bg-[#00b341] group-hover:bg-[#009a37] text-white font-bold py-4 rounded-full text-center transition-colors shadow-md shadow-emerald-100">
                          {curso.enrollment?.buttonText || "Saiba mais"}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </Grid>
        </div>
      </Section>
    </main>
  );
}
