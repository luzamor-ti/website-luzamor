"use client";

import { motion } from "framer-motion";
import { staggerItemVariants } from "@/lib/animations";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "sm" | "md" | "lg";
}

/**
 * Card reutilizável com animação
 * Usado para criar cards com bordas, sombras e animações
 */
export function Card({
  children,
  className = "",
  hover = true,
  padding = "md",
}: CardProps) {
  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const hoverClasses = hover
    ? "hover:shadow-xl hover:border-gray-200 transition-all"
    : "";

  return (
    <motion.div
      className={`bg-white border border-gray-100 rounded-xl shadow-md ${paddingClasses[padding]} ${hoverClasses} ${className}`}
      variants={staggerItemVariants}
    >
      {children}
    </motion.div>
  );
}
