"use client";

import { Section, Heading } from "@/components/ui";
import { Event } from "@/sanity/lib/types/event";
import { EventGallery } from "./EventGallery";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";

interface EventGallerySectionProps {
  event: Event;
}

export function EventGallerySection({ event }: EventGallerySectionProps) {
  const hasGallery = event.gallery && event.gallery.length > 0;

  if (!hasGallery) return null;

  return (
    <Section>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInVariants}
        className="max-w-7xl mx-auto"
      >
        <Heading level={2} className="mb-8 text-center">
          Galeria de Fotos
        </Heading>
        <EventGallery images={event.gallery!} eventTitle={event.title} />
      </motion.div>
    </Section>
  );
}
