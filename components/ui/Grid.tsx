"use client";

import { motion } from "framer-motion";
import { staggerContainerVariants } from "@/lib/animations";
import { ReactNode } from "react";

interface GridProps {
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Grid responsivo com animação
 */
export function Grid({
  children,
  cols = 3,
  gap = "md",
  className = "",
}: GridProps) {
  const colsClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  return (
    <motion.div
      className={`grid ${colsClasses[cols]} ${gapClasses[gap]} ${className}`}
      variants={staggerContainerVariants}
    >
      {children}
    </motion.div>
  );
}
