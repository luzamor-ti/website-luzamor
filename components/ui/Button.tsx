"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

/**
 * Componente de botão reutilizável com múltiplas variantes
 */
export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300";

  const variantClasses = {
    primary:
      "bg-primary text-white hover:bg-green-800 shadow-sm hover:shadow-md",
    secondary:
      "bg-secondary text-white hover:bg-secondary/90 shadow-sm hover:shadow-md",
    outline:
      "bg-white border-2 border-gray-300 text-gray-700 hover:bg-primary hover:border-primary hover:text-white",
    ghost: "bg-transparent text-primary hover:bg-primary/10",
  };

  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
