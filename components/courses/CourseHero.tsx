import Image from "next/image";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import { Course } from "@/sanity/lib/types/course";
import { Heading, Text } from "@/components/ui";

interface CourseHeroProps {
  title: string;
  description: string;
  coverPhoto?: Course["coverPhoto"];
  teachers?: Course["teachers"];
  children?: React.ReactNode;
}

export function CourseHero({
  title,
  description,
  coverPhoto,
  teachers,
  children,
}: CourseHeroProps) {
  const imageUrl = buildSanityImageUrl(coverPhoto?.asset?._ref);

  return (
    <section className="relative min-h-[80vh] flex items-center pt-32 pb-16 overflow-hidden bg-gray-900">
      {/* Blurred Background */}
      {imageUrl && (
        <>
          <div className="absolute inset-0">
            <Image
              src={imageUrl}
              alt="Background"
              fill
              className="object-cover blur-2xl scale-110 opacity-50"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/40" />
        </>
      )}

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left Column: Image, Title, Description, Teachers */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              {/* Course Image (card size) */}
              {imageUrl && (
                <div className="relative w-full sm:w-64 h-48 sm:h-40 flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}
              
              <div className="flex-1 space-y-3">
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm">
                  Curso
                </span>
                <Heading level={1} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-md">
                  {title}
                </Heading>
              </div>
            </div>
            {description && (
              <Text className="text-lg md:text-xl text-white font-medium max-w-2xl leading-relaxed pt-2">
                {description}
              </Text>
            )}

            {/* Teachers List */}
            {teachers && teachers.length > 0 && (
              <div className="pt-6 border-t mt-auto border-white/20">
                <Text variant="small" className="text-white uppercase font-bold tracking-wider mb-4">
                  Professores
                </Text>
                <div className="flex flex-wrap gap-4">
                  {teachers.map((teacher, idx) => {
                    const isMembro = teacher.teacherType === "membro";
                    const name = isMembro
                      ? teacher.teacherMember?.name
                      : teacher.externalTeacher?.name;
                    
                    const photoRef = isMembro
                      ? teacher.teacherMember?.photo?.asset?._ref
                      : teacher.externalTeacher?.photo?.asset?._ref;
                      
                    const photoUrl = photoRef ? buildSanityImageUrl(photoRef) : null;

                    if (!name) return null;

                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full pr-5 p-1 shadow-sm hover:bg-white/20 transition-colors"
                      >
                        {photoUrl ? (
                          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/30">
                            <Image
                              src={photoUrl}
                              alt={name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                            {name.charAt(0)}
                          </div>
                        )}
                        <span className="text-sm font-semibold text-white">
                          {name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-1">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
