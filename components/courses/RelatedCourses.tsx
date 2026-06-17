"use client";
import { Section, SectionHeader, Grid, Heading, Button } from "@/components/ui";
import Image from "next/image";
import Link from "next/link";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import { Clock } from "lucide-react";
import { Course } from "@/sanity/lib/types/course";
import { routesPath } from "@/constants/routesPath";

interface RelatedCoursesProps {
  courses: Course[];
}

export function RelatedCourses({ courses }: RelatedCoursesProps) {
  if (!courses || courses.length === 0) return null;
  console.log(courses)
  return (
    <Section className=" py-24">
      <div className="container mx-auto px-4">
        {/* Usando o layout 'split' para alinhar à esquerda, mantendo a consistência com a sidebar de cima */}
        <SectionHeader
          tag="Outros cursos"
          title="Construindo cultura juntos"
          description="Da educação ao desenvolvimento cultural, cada causa carrega a nossa missão de elevar e capacitar."
          layout="split"
          align="left"
        />

        <Grid cols={3} gap="lg">
          {courses.map((curso) => {
            const imageUrl = buildSanityImageUrl(curso.coverPhoto?.asset?._ref);

            return (
              <Link
                href={routesPath.course(curso.slug)}
                key={curso._id}
                className="group"
              >
                <div className="bg-white rounded-[32px] p-4 h-full shadow-md hover:shadow-xl transition-all duration-500 border border-gray-200 flex flex-col">
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
                  </div>

                  {/* INFO DO CURSO */}
                  <div className="px-2 flex flex-col flex-grow">
                    <Heading
                      level={3}
                      className="text-2xl mb-3 text-black font-bold tracking-tight"
                    >
                      {curso.title}
                    </Heading>

                    {(curso.schedule || curso.requireScheduling) && (
                      <div className="flex items-start gap-2 text-gray-500 mb-6">
                        <Clock className="w-5 h-5 text-[#00b341] shrink-0 mt-[2px]" />
                        <div className="flex flex-col">
                          {curso.schedule && (
                            <span className="text-base font-medium">
                              {curso.schedule}
                            </span>
                          )}
                          {curso.requireScheduling && (
                            <span className="text-sm font-medium mt-0.5">
                              Aulas mediante agendamento e disponibilidade
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* --- PASSO 2: BOTÃO VERDE ARREDONDADO --- */}
                    <div className="mt-auto pt-2">
                      <Button variant="primary" size="md" fullWidth>
                        {curso.enrollment?.buttonText || "Saiba mais"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </Grid>
      </div>
    </Section>
  );
}
