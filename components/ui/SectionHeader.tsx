"use client";

import { motion } from "framer-motion";
import { staggerItemVariants } from "@/lib/animations";
import { ReactNode } from "react";

interface SectionHeaderProps {
  tag?: string;
  title: string | ReactNode;
  description?: string;
  align?: "left" | "center";
}

/**
 * Cabeçalho de seção com tag opcional, título e descrição
 * Usado no início das seções principais
 */
export function SectionHeader({
  tag,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const alignClass =
    align === "center" ? "text-center items-center" : "items-start";

  // Converte para Camel Case
  const toCamelCase = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <motion.div
      className={`mb-16 flex flex-col ${alignClass}`}
      variants={staggerItemVariants}
    >
      {tag && (
        <div className="flex items-center gap-2 mb-4">
          <div
            className="bg-primary rounded-full flex-shrink-0"
            style={{
              width: "16px",
              height: "16px",
            }}
          />
          <span
            className="text-gray-900"
            style={{
              width: "auto",
              height: "auto",
              whiteSpace: "pre",
              lineHeight: 1.2,
              fontSize: "16px",
            }}
          >
            {toCamelCase(tag)}
          </span>
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">{description}</p>
      )}
    </motion.div>
  );
}
