"use client";

import { motion } from "framer-motion";
import { staggerContainerVariants } from "@/lib/animations";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Container de seção com animações
 * Wrapper para seções da página com animação de entrada
 */
export function Section({ children, className = "", id }: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`py-20 px-4 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainerVariants}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </motion.section>
  );
}
