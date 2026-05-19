"use client";

import Image from "next/image";
import { Section, Heading, Text } from "@/components/ui";
import { buildSanityImageUrl } from "@/utils/buildSanityImageUrl";
import { Course } from "@/sanity/lib/types/course";

interface CourseTeacherListProps {
  teachers: NonNullable<Course["teachers"]>;
}

export function CourseTeacherList({ teachers }: CourseTeacherListProps) {
  if (!teachers.length) {
    return null;
  }

  return (
    <Section className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <Heading level={2} className="mb-8 text-gray-900">
          Professores
        </Heading>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher, index) => {
            const teacherData =
              teacher.teacherType === "membro"
                ? teacher.teacherMember
                : teacher.externalTeacher;

            if (!teacherData) {
              return null;
            }

            const photoUrl = buildSanityImageUrl(
              teacherData.photo?.asset?._ref,
            );

            return (
              <article
                key={`${teacherData.name}-${index}`}
                className="rounded-3xl bg-white p-5 shadow-md border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  {photoUrl ? (
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border border-gray-200 shrink-0">
                      <Image
                        src={photoUrl}
                        alt={teacherData.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white font-bold shrink-0">
                      {teacherData.name.charAt(0)}
                    </div>
                  )}

                  <div>
                    <Heading level={3} className="text-xl text-gray-900">
                      {teacherData.name}
                    </Heading>
                    {teacher.teacherType === "membro" &&
                      teacher.teacherMember?.role && (
                        <Text className="text-sm text-gray-600">
                          {teacher.teacherMember.role}
                        </Text>
                      )}
                    {teacher.teacherType === "membro" &&
                      teacher.teacherMember?.shortBio && (
                        <Text className="text-sm text-gray-500 mt-1">
                          {teacher.teacherMember.shortBio}
                        </Text>
                      )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
