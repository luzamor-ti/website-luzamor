"use client";

import { motion } from "framer-motion";
import { staggerItemVariants } from "@/lib/animations";
import { ReactNode } from "react";

interface SectionHeaderProps {
  tag?: string;
  title?: string | ReactNode;
  description?: string;
  align?: "left" | "center";
  variant?: "light" | "dark";
  layout?: "default" | "split"; // split = tag+título à esquerda, descrição à direita
}

export function SectionHeader({
  tag,
  description,
  title = "",
  align = "left",
  variant = "light",
  layout = "default",
}: SectionHeaderProps) {
  const textColorClass = variant === "dark" ? "text-white" : "text-gray-900";
  const descriptionColorClass =
    variant === "dark" ? "text-gray-200" : "text-gray-600";
  const tagColorClass = variant === "dark" ? "text-white" : "text-gray-900";

  const toCamelCase = (str: string) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (layout === "split") {
    return (
      <motion.div
        className="mb-10 md:mb-16 lg:mb-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 lg:gap-8"
        variants={staggerItemVariants}
      >
        <div className="flex flex-col items-start">
          {tag && (
            <motion.div
              className="flex items-center gap-2 mb-3 md:mb-4"
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <div
                  className="bg-primary rounded-full flex-shrink-0 animate-pulse"
                  style={{ width: "14px", height: "14px" }}
                />
                <div
                  className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"
                  style={{ width: "14px", height: "14px" }}
                />
              </div>
              <span
                className={`${tagColorClass} text-sm md:text-base font-medium`}
              >
                {toCamelCase(tag)}
              </span>
            </motion.div>
          )}
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold max-w-xl ${textColorClass}`}
          >
            {title}
          </h2>
        </div>

        {description && (
          <div className="max-w-md">
            <p
              className={`${descriptionColorClass} leading-relaxed text-base md:text-lg`}
            >
              {description}
            </p>
          </div>
        )}
      </motion.div>
    );
  }

  // Layout Default (original com melhorias)
  const alignClass =
    align === "center" ? "text-center items-center" : "items-start";

  return (
    <motion.div
      className={`mb-10 md:mb-16 flex flex-col ${alignClass}`}
      variants={staggerItemVariants}
    >
      {tag && (
        <motion.div
          className={`flex items-center gap-2 mb-3 md:mb-4 ${align === "center" ? "justify-center" : ""}`}
          whileHover={{ x: align === "center" ? 0 : 4 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative">
            <div
              className="bg-primary rounded-full flex-shrink-0 animate-pulse"
              style={{ width: "14px", height: "14px" }}
            />
            <div
              className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"
              style={{ width: "14px", height: "14px" }}
            />
          </div>
          <span className={`${tagColorClass} text-sm md:text-base font-medium`}>
            {toCamelCase(tag)}
          </span>
        </motion.div>
      )}
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${textColorClass}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`${descriptionColorClass} text-base md:text-lg leading-relaxed ${
            align === "center" ? "max-w-3xl mx-auto" : "max-w-3xl"
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
