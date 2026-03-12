"use client";

import { Event } from "@/sanity/lib/types/event";
import { HomeSection } from "@/sanity/lib/types/homeSection";
import { TEXT_FALLBACKS } from "@/constants/textFallbacks";
import { Section, SectionHeader, SectionFooter } from "@/components/ui";
import { motion } from "framer-motion";
import { staggerContainerVariants } from "@/lib/animations";
import { EventCard } from "../ui/EventCard";

interface EventsSectionProps {
  data: Event[];
  section: HomeSection | null;
}

export function EventsSection({ data, section }: EventsSectionProps) {
  if (!data || data.length === 0) {
    return null;
  }

  const fallback = TEXT_FALLBACKS.events;

  // Pegar os 3 próximos eventos
  const upcomingEvents = data.slice(0, 3);

  return (
    <Section>
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <SectionHeader
          tag={section?.tag || fallback.tag}
          title={section?.title || fallback.title}
          description={section?.description || fallback.description}
          layout="split"
          variant="light"
        />

        {/* Grid de Eventos */}
        {upcomingEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {upcomingEvents.map((event, index) => (
              <EventCard key={event._id} event={event} index={index} />
            ))}
          </div>
        )}

        {/* Footer */}
        <SectionFooter
          text={
            section?.buttonText ||
            fallback.description_footer ||
            fallback.buttonText ||
            ""
          }
          linkText={
            section?.linkText || fallback.linkText || "Ver todos os eventos"
          }
          linkHref="/calendario-eventos"
          showLink={data.length > 3}
        />
      </motion.div>
    </Section>
  );
}
