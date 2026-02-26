"use client";

import { Faq } from "@/sanity/lib/types/faq";
import { HomeSection } from "@/sanity/lib/types/homeSection";
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";
import { Section, SectionHeader, Accordion, Text } from "@/components/ui";

interface FaqSectionProps {
  data: Faq[];
  section: HomeSection | null;
}

export function FaqSection({ data, section }: FaqSectionProps) {
  if (!data || data.length === 0) {
    return null;
  }

  const fallback = TEXT_FALLBACKS.faq;

  const accordionItems = data.map((item) => ({
    id: item._id,
    title: item.question,
    content: <Text>{item.answer}</Text>,
  }));

  return (
    <Section className="bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          tag={section?.tag || fallback.tag}
          title={section?.title || fallback.title}
          align="center"
        />
        <Accordion items={accordionItems} allowMultiple={false} />
      </div>
    </Section>
  );
}
