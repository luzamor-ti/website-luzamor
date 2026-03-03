"use client";

import { motion } from "framer-motion";
import { staggerContainerVariants } from "@/lib/animations";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  isFluid?: boolean;
}

/**
 * Container de seção com animações
 * Wrapper para seções da página com animação de entrada
 */
export function Section({
  children,
  className = "",
  id,
  isFluid = false,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`${className} py-20 px-4`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainerVariants}
    >
      {/* 
         Se isFluid for true, usamos w-full. 
         Se for false (padrão), mantemos o max-w-6xl original.
      */}
      <div className={isFluid ? "w-full" : "max-w-6xl mx-auto"}>{children}</div>
    </motion.section>
  );
}
