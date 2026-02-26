"use client";

import { motion } from "framer-motion";
import { staggerItemVariants } from "@/lib/animations";
import { ReactNode } from "react";

interface SectionHeaderProps {
  tag?: string;
  title: string | ReactNode;
  description?: string;
  align?: "left" | "center";
  variant?: "light" | "dark";
}

export function SectionHeader({
  tag,
  title,
  description,
  align = "left",
  variant = "light",
}: SectionHeaderProps) {
  const alignClass =
    align === "center" ? "text-center items-center" : "items-start";

  const textColorClass = variant === "dark" ? "text-white" : "text-gray-900";
  const descriptionColorClass =
    variant === "dark" ? "text-gray-200" : "text-gray-600";

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
            className={textColorClass}
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
      <h2 className={`text-4xl md:text-5xl font-bold ${textColorClass} mb-4`}>
        {title}
      </h2>
      {description && (
        <p className={`${descriptionColorClass} text-lg max-w-3xl mx-auto`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
