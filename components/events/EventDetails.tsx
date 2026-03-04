"use client";

import { Section, Heading } from "@/components/ui";
import { Event } from "@/sanity/lib/types/event";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { motion } from "framer-motion";
import { fadeInVariants } from "@/lib/animations";

interface EventDetailsProps {
  event: Event;
}

/**
 * Custom PortableText components
 * - Blocks H1 and H2 (renders as H3)
 * - Applies proper styling and spacing
 * - Maintains user formatting from CMS
 */
const portableTextComponents: PortableTextComponents = {
  block: {
    // Headings - H1 and H2 are converted to H3
    h1: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4 leading-tight">
        {children}
      </h3>
    ),
    h2: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4 leading-tight">
        {children}
      </h3>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4 leading-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl md:text-2xl font-semibold text-gray-800 mt-6 mb-3 leading-tight">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg md:text-xl font-semibold text-gray-800 mt-5 mb-2.5 leading-snug">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-base md:text-lg font-medium text-gray-700 mt-4 mb-2 leading-snug">
        {children}
      </h6>
    ),
    // Paragraphs with increased spacing
    normal: ({ children }) => (
      <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
        {children}
      </p>
    ),
    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },
  marks: {
    // Bold
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    // Italic
    em: ({ children }) => <em className="italic">{children}</em>,
    // Underline
    underline: ({ children }) => <u className="underline">{children}</u>,
    // Links
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:text-primary/80 underline font-medium transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    // Bulleted lists
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
        {children}
      </ul>
    ),
    // Numbered lists
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-base md:text-lg leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-base md:text-lg leading-relaxed">{children}</li>
    ),
  },
};

export function EventDetails({ event }: EventDetailsProps) {
  if (!event.description) return null;

  return (
    <Section className="!pt-0">
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
        <div className="max-w-none">
          <PortableText
            value={event.description}
            components={portableTextComponents}
          />
        </div>
      </motion.div>
    </Section>
  );
}
