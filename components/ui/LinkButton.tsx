"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function LinkButton({
  href,
  children,
  className = "",
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 text-primary font-medium text-base relative pb-2 transition-all duration-300 hover:gap-3 ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight className="w-5 h-5 transition-all duration-300 group-hover:rotate-45" />
      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
