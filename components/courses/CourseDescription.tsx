import { Section, Heading, Text } from "@/components/ui";
import { PortableText } from "@portabletext/react";
// Importe o tipo específico para o Portable Text
import type { PortableTextBlock } from "@portabletext/types";

interface CourseDescriptionProps {
  description: PortableTextBlock[];
  schedule?: string;
}

export function CourseDescription({
  description,
  schedule,
}: CourseDescriptionProps) {
  return (
    <Section className="bg-white">
      <div className="max-w-4xl mx-auto">
        <Heading level={2} className="mb-8">
          Sobre o Curso
        </Heading>
        <div className="prose prose-lg max-w-none">
          <PortableText value={description} />
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
