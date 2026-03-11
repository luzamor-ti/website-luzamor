import { Section, Heading, Text } from "@/components/ui";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { portableTextComponents } from "@/constants/portableTextComponents";

interface CourseDescriptionProps {
  description: PortableTextBlock[];
  schedule?: string;
}

export function CourseDescription({
  description,
  schedule,
}: CourseDescriptionProps) {
  return (
    <Section className="!pt-0">
      <div className="max-w-4xl mx-auto">
        <Heading level={2} className="mb-8 ">
          Sobre o Curso
        </Heading>

        <div className="prose prose-lg max-w-none">
          <PortableText
            value={description}
            components={portableTextComponents}
          />
        </div>

        {schedule && (
          <div className="mt-10 p-6 bg-gray-50 rounded-lg border-l-4 border-primary">
            <Heading level={4} className="mb-2">
              Datas e Horários
            </Heading>
            <Text>{schedule}</Text>
          </div>
        )}
      </div>
    </Section>
  );
}
