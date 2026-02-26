import { JSX, ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}

interface TextProps {
  children: ReactNode;
  variant?: "body" | "small" | "large" | "muted";
  className?: string;
}

interface LinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  variant?: "primary" | "default";
}

/**
 * Componente de título com níveis e estilos predefinidos
 */
export function Heading({ children, level = 2, className = "" }: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const levelClasses = {
    1: "text-5xl md:text-6xl font-bold",
    2: "text-4xl md:text-5xl font-bold",
    3: "text-3xl md:text-4xl font-bold",
    4: "text-2xl md:text-3xl font-bold",
    5: "text-xl md:text-2xl font-semibold",
    6: "text-lg md:text-xl font-semibold",
  };

  return (
    <Tag className={`${levelClasses[level]} ${className}`}>{children}</Tag>
  );
}

/**
 * Componente de texto com variantes predefinidas
 */
export function Text({
  children,
  variant = "body",
  className = "",
}: TextProps) {
  const variantClasses = {
    body: "text-base text-gray-700 leading-relaxed",
    small: "text-sm text-gray-600",
    large: "text-lg text-gray-700 leading-relaxed",
    muted: "text-base text-gray-500",
  };

  return (
    <p className={`${variantClasses[variant]} ${className}`}>{children}</p>
  );
}

/**
 * Componente de link com estilos predefinidos
 */
export function Link({
  children,
  href,
  className = "",
  variant = "default",
}: LinkProps) {
  const variantClasses = {
    primary: "text-primary font-semibold hover:text-primary/80",
    default: "text-gray-700 hover:text-gray-900",
  };

  return (
    <a
      href={href}
      className={`transition-colors ${variantClasses[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

/**
 * Tag pequena para labels e categorias
 */
export function Tag({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`text-primary font-semibold uppercase text-sm tracking-wide ${className}`}
    >
      {children}
    </span>
  );
}
