"use client";

import { Faq } from "@/sanity/lib/types/faq";
import { Section, SectionHeader, Accordion, Text } from "@/components/ui";

interface FaqSectionProps {
  data: Faq[];
}

export function FaqSection({ data }: FaqSectionProps) {
  if (!data || data.length === 0) {
    return null;
  }

  const accordionItems = data.map((item) => ({
    id: item._id,
    title: item.pergunta,
    content: <Text>{item.resposta}</Text>,
  }));

  return (
    <Section className="bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          tag="Dúvidas"
          title="Perguntas Frequentes"
          align="center"
        />
        <Accordion items={accordionItems} allowMultiple={false} />
      </div>
    </Section>
  );
}
