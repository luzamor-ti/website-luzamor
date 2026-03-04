"use client";

import { Section, Heading } from "@/components/ui";
import { Event } from "@/sanity/lib/types/event";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";

interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  if (!event.description) return null;

  return (
    <Section>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
        className="max-w-4xl mx-auto"
      >
        <Heading level={2} className="mb-8">
          Sobre o Evento
        </Heading>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
          <PortableText value={event.description} />
        </div>
      </motion.div>
    </Section>
  );
}
