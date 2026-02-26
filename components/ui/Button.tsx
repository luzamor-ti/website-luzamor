"use client";

import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  showArrow?: boolean;
  className?: string;
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  showArrow = false,
  className = "",
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 relative overflow-hidden";

  const variantClasses = {
    primary: "bg-primary text-white shadow-sm hover:shadow-md",
    secondary: "bg-secondary text-white shadow-sm hover:shadow-md",
    outline:
      "bg-white border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-white",
    ghost: "bg-transparent text-primary hover:text-white",
  };

  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} cursor-pointer ${className}`;

  const hoverBackgroundClass =
    variant === "outline" || variant === "ghost" ? "bg-primary" : "bg-black";

  const shouldTextBeGreen = variant === "primary" || variant === "secondary";

  const content = (
    <>
      <motion.div
        className={`absolute inset-0 ${hoverBackgroundClass}`}
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "0%" : "-100%" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0 rounded-full border-2 border-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />

      <motion.span
        className="relative z-10"
        animate={{
          color:
            isHovered && shouldTextBeGreen ? "var(--color-primary)" : undefined,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.span>

      {showArrow && (
        <motion.div
          className="relative z-10"
          animate={{
            rotate: isHovered ? 360 : 0,
            color:
              isHovered && shouldTextBeGreen
                ? "var(--color-primary)"
                : undefined,
          }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <ArrowRight size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />
        </motion.div>
      )}
    </>
  );

  const hoverProps = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  if (href) {
    return (
      <Link href={href} className={classes} {...hoverProps}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} {...hoverProps}>
      {content}
    </button>
  );
}
