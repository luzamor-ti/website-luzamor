"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface TickerProps {
  children: ReactNode;
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * Ticker horizontal infinito com animação suave
 * Multiplica automaticamente os elementos para garantir scroll infinito suave
 * Ideal para logos de patrocinadores, badges, etc.
 */
export function Ticker({
  children,
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
  className = "",
}: TickerProps) {
  const [duplicateCount, setDuplicateCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateDuplicates = () => {
      if (!containerRef.current || !contentRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = contentRef.current.offsetWidth;

      // Calcula quantas vezes precisa duplicar para preencher pelo menos 2x a largura da tela
      // Isso garante scroll infinito suave mesmo com poucos elementos
      if (contentWidth > 0) {
        const minDuplicates = Math.ceil((containerWidth * 2) / contentWidth);
        // Garante pelo menos 3 duplicatas para scroll suave
        setDuplicateCount(Math.max(minDuplicates, 3));
      }
    };

    calculateDuplicates();

    // Recalcula quando a janela é redimensionada
    window.addEventListener("resize", calculateDuplicates);
    return () => window.removeEventListener("resize", calculateDuplicates);
  }, [children]);

  const speedValues = {
    slow: "60s",
    normal: "40s",
    fast: "20s",
  };

  const animationDuration = speedValues[speed];
  const animationDirection = direction === "left" ? "normal" : "reverse";

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-ticker"
        style={
          {
            animationDuration,
            animationDirection,
            "--ticker-pause": pauseOnHover ? "paused" : "running",
          } as React.CSSProperties
        }
      >
        {/* Renderiza múltiplas cópias dos elementos para scroll infinito suave */}
        {Array.from({ length: duplicateCount }).map((_, index) => (
          <div
            key={index}
            ref={index === 0 ? contentRef : undefined}
            className="flex items-center gap-8 px-4"
            aria-hidden={index > 0}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
