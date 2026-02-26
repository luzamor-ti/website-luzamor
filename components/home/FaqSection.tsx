"use client";

import { Faq } from "@/sanity/lib/types/faq";
import { HomeSection } from "@/sanity/lib/types/homeSection";
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";
import { Section, SectionHeader, Accordion } from "@/components/ui";
import { PortableText } from "@portabletext/react";

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
    content: (
      <div className="prose prose-sm max-w-none">
        <PortableText value={item.answer} />
      </div>
    ),
  }));

  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Coluna esquerda: Header */}
        <div className="flex flex-col justify-start">
          <SectionHeader
            tag={section?.tag || fallback.tag}
            title={section?.title || fallback.title}
            description={section?.description || fallback.description}
            align="left"
          />
        </div>

        {/* Coluna direita: Accordion */}
        <div>
          <Accordion items={accordionItems} allowMultiple={false} />
        </div>
      </div>
    </Section>
  );
}
