import { Section, SectionHeader } from "@/components/ui";
import { Classroom } from "@/sanity/lib/types/classroom";
import { ClassroomsList } from "@/components/classrooms";

interface SalasAulaTemplateProps {
  classrooms: Classroom[];
  initialSlug?: string;
}

export function SalasAulaTemplate({
  classrooms,
  initialSlug,
}: SalasAulaTemplateProps) {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <Section className="relative bg-[#0a0a0a] pt-40 pb-24 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "url('/classrooms-hero-bg.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px)",
            transform: "scale(1.2)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]/80" />
        <div className="relative z-10 max-w-5xl">
          <SectionHeader
            tag="Estrutura"
            title="Nossas Salas de Aula"
            description="Conheça os espaços onde acontece a transformação. Ambientes preparados para aprendizado, criatividade e desenvolvimento."
            variant="dark"
            align="left"
          />
        </div>
      </Section>

      {/* LISTAGEM DE SALAS */}
      <Section className="py-20">
        <div className="max-w-5xl mx-auto">
          {classrooms.length === 0 ? (
            <p className="text-center text-gray-400 py-16">
              Nenhuma sala de aula cadastrada ainda.
            </p>
          ) : (
            <ClassroomsList classrooms={classrooms} initialSlug={initialSlug} />
          )}
        </div>
      </Section>
    </main>
  );
}
