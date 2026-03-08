"use client";

import { Event } from "@/sanity/lib/types/event";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";
import { portableTextComponents } from "@/constants/portableTextComponents";

interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  if (!event.description) return null;

  return (
    <section aria-labelledby="event-about-heading" className="space-y-6">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
      >
        <h2
          id="event-about-heading"
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-6"
        >
          Sobre o Evento
        </h2>
        <div>
          <PortableText
            value={event.description}
            components={portableTextComponents}
          />
        </div>
      </motion.div>
    </section>
  );
}
