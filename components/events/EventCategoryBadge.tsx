"use client";

import { Circle } from "lucide-react";
import { Event } from "@/sanity/lib/types/event";
import {
  CATEGORY_LABELS,
  CATEGORY_ICONS,
  CATEGORY_COLORS,
  CATEGORY_COLORS_OUTLINE,
  CATEGORY_COLORS_SOLID,
} from "@/constants/eventCategories";

interface EventCategoryBadgeProps {
  category: Event["category"];
  variant?: "default" | "outline" | "solid";
  size?: "sm" | "md" | "lg";
}

const SIZE_CLASSES = {
  sm: "px-2.5 py-1 text-xs gap-1.5",
  md: "px-3 py-1.5 text-sm gap-1.5",
  lg: "px-4 py-2 text-base gap-2",
};

const ICON_SIZES = {
  sm: 12,
  md: 14,
  lg: 16,
};

export function EventCategoryBadge({
  category,
  variant = "default",
  size = "md",
}: EventCategoryBadgeProps) {
  const CategoryIcon = CATEGORY_ICONS[category] || Circle;

  const colorClass =
    variant === "outline"
      ? CATEGORY_COLORS_OUTLINE[category]
      : variant === "solid"
        ? CATEGORY_COLORS_SOLID[category]
        : CATEGORY_COLORS[category];

  const sizeClass = SIZE_CLASSES[size];
  const iconSize = ICON_SIZES[size];

  return (
    <span
      className={`inline-flex items-center rounded-full font-bold border ${colorClass} ${sizeClass}`}
    >
      <CategoryIcon size={iconSize} aria-hidden="true" />
      {CATEGORY_LABELS[category]}
    </span>
  );
}
