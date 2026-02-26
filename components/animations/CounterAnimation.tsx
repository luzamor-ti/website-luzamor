"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

interface CounterAnimationProps {
  value: string;
  duration?: number;
  className?: string;
}

/**
 * Extrai o número e o sufixo de uma string (ex: "1.000+" -> {number: 1000, suffix: "+"})
 */
function parseNumberValue(value: string): { number: number; suffix: string } {
  const match = value.match(/^([\d.,]+)(.*)$/);
  if (!match) return { number: 0, suffix: "" };

  const numberStr = match[1].replace(/\./g, "").replace(/,/g, ".");
  const number = parseFloat(numberStr) || 0;
  const suffix = match[2] || "";

  return { number, suffix };
}

/**
 * Formata número no padrão brasileiro (1.000)
 */
function formatBrazilianNumber(num: number): string {
  return Math.floor(num).toLocaleString("pt-BR");
}

/**
 * Componente que anima um número de 0 até o valor final
 */
export function CounterAnimation({
  value,
  duration = 2,
  className = "",
}: CounterAnimationProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  const { number: targetNumber, suffix } = parseNumberValue(value);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);

      // Easing function (ease-out)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      const currentValue = targetNumber * easeOutQuart;
      setDisplayValue(formatBrazilianNumber(currentValue) + suffix);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isInView, targetNumber, suffix, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {displayValue}
    </motion.span>
  );
}
