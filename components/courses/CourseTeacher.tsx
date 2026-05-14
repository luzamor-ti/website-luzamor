import Image from "next/image";
import { Section, Heading, Text } from "@/components/ui";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import { Course } from "@/sanity/lib/types/course";

interface CourseTeacherProps {
  teacher: NonNullable<Course["teachers"]>[number];
}

export function CourseTeacher({ teacher }: CourseTeacherProps) {
  const teacherData = teacher.teacherType === "membro" ? teacher.teacherMember : teacher.externalTeacher;
  if (!teacherData) return null;
  const photoUrl = buildSanityImageUrl(teacherData.photo?.asset?._ref);

  // Type guard to check if teacher is a Member
  const isMember = teacher.teacherType === "membro" && teacher.teacherMember;

  return (
    <Section className="bg-gray-50">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {photoUrl && (
          <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg shrink-0">
            <Image
              src={photoUrl}
              alt={teacherData.name}
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
            {teacherData.name}
          </Heading>
          {isMember && teacher.teacherMember?.role && (
            <Text className="font-medium text-gray-700 mb-4">
              {teacher.teacherMember.role}
            </Text>
          )}
          {isMember && teacher.teacherMember?.shortBio && (
            <Text className="text-gray-600 italic">{teacher.teacherMember.shortBio}</Text>
          )}
        </div>
      </div>
    </Section>
  );
}
