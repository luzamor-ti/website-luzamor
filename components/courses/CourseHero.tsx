import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import { Course } from "@/sanity/lib/types/course";

interface CourseHeroProps {
  title: string;
  description: string;
  coverPhoto?: Course["coverPhoto"];
  teacherName?: string;
  teacherPhoto?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    alt?: string;
  };
}

export function CourseHero({
  title,
  description,
  coverPhoto,
  teacherName,
  teacherPhoto,
}: CourseHeroProps) {
  const imageUrl = buildSanityImageUrl(coverPhoto?.asset?._ref);

  // Gera a URL da foto do professor se ela existir
  const teacherPhotoUrl = teacherPhoto?.asset?._ref
    ? buildSanityImageUrl(teacherPhoto.asset._ref)
    : null;

  return (
    <Section
      isFluid
      className="relative min-h-[90vh] flex flex-col justify-start overflow-hidden bg-[#0a0a0a] !p-0"
    >
      {/* FUNDO COM BLUR */}
      {imageUrl && (
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px)",
            transform: "scale(1.2)",
          }}
        />
      )}

      <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-32 pb-20 flex flex-col items-start">
        <div className="w-full mb-12">
          <SectionHeader
            tag="Curso"
            title={title}
            description={description}
            variant="dark"
            align="left"
          />
        </div>

        {imageUrl && (
          <div className="w-full flex justify-center">
            <div className="relative w-full max-w-3xl aspect-video rounded-[48px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.7)] border border-white/10 transition-all duration-700">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                priority
              />

              {/* SELO DO PROFESSOR (Igual ao CursosTemplate) */}
              {teacherName && teacherPhotoUrl && (
                <div className="absolute bottom-8 left-8 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-100">
                    <Image
                      src={teacherPhotoUrl}
                      alt={teacherName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-900">
                    {teacherName}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
