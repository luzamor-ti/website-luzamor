import Image from "next/image";
import { Section, Heading, Text } from "@/components/ui";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
export function CourseTeacher({ type, member, external }: any) {
  const teacher = type === "membro" ? member : external;
  if (!teacher) return null;
  const photoUrl = buildSanityImageUrl(teacher.photo?.asset?._ref);
  return (
    <Section className="bg-gray-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {photoUrl && (
          <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg shrink-0">
            <Image
              src={photoUrl}
              alt={teacher.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <Text className="text-primary font-bold uppercase tracking-tighter text-sm mb-1">
            Professor
          </Text>
          <Heading level={3} className="mb-2">
            {teacher.name}
          </Heading>
          {teacher.role && (
            <Text className="font-medium text-gray-700 mb-4">
              {teacher.role}
            </Text>
          )}
          {teacher.shortBio && (
            <Text className="text-gray-600 italic">{teacher.shortBio}</Text>
          )}
        </div>
      </div>
    </Section>
  );
}
