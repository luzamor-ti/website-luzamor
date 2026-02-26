"use client";

import { motion } from "framer-motion";
import { staggerItemVariants } from "@/lib/animations";
import { LinkButton } from "./LinkButton";
import { ReactNode } from "react";

interface SectionFooterProps {
  text: string | ReactNode;
  linkText?: string;
  linkHref?: string;
  showLink?: boolean;
  className?: string;
}

/**
 * SectionFooter Component
 *
 * Componente reutilizável para footers de seções com padrão consistente:
 * - Texto descritivo à esquerda
 * - Divider horizontal (apenas desktop)
 * - Link opcional à direita
 *
 * Usado em: EventsSection, HowToHelpSection, CoursesSection
 */
export function SectionFooter({
  text,
  linkText,
  linkHref,
  showLink = true,
  className = "",
}: SectionFooterProps) {
  return (
    <motion.div
      className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-6 pt-8 md:pt-12 mt-2 md:mt-4 ${className}`}
      variants={staggerItemVariants}
    >
      {/* Texto descritivo */}
      <div
        className="text-gray-600 text-base md:text-lg leading-relaxed flex-shrink-0 order-1"
        style={{ maxWidth: "520px" }}
      >
        {typeof text === "string" ? <p>{text}</p> : text}
      </div>

      {/* Divider - apenas desktop */}
      <div className="hidden md:block flex-grow h-px bg-gray-400 order-2" />

      {/* Link para ver todos */}
      {showLink && linkHref && linkText && (
        <div className="order-3 md:order-3 mt-auto md:mt-0">
          <LinkButton href={linkHref} className="flex-shrink-0">
            {linkText}
          </LinkButton>
        </div>
      )}
    </motion.div>
  );
}
