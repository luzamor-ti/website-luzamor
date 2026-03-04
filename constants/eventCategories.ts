import {
  Music,
  BookOpen,
  Users,
  Heart,
  PartyPopper,
  Trophy,
  Palette,
  BookMarked,
  Circle,
} from "lucide-react";
import { Event } from "@/sanity/lib/types/event";

export const CATEGORY_LABELS: Record<Event["category"], string> = {
  cultural: "Cultural",
  educacional: "Educacional",
  social: "Social",
  arrecadacao: "Arrecadação",
  celebracao: "Celebração",
  esportivo: "Esportivo",
  arte: "Arte",
  musical: "Musical",
  literario: "Literário",
  outro: "Outro",
};

export const CATEGORY_ICONS: Record<
  Event["category"],
  React.ComponentType<{ size?: number; className?: string }>
> = {
  cultural: Users,
  educacional: BookOpen,
  social: Heart,
  arrecadacao: Heart,
  celebracao: PartyPopper,
  esportivo: Trophy,
  arte: Palette,
  musical: Music,
  literario: BookMarked,
  outro: Circle,
};

export const CATEGORY_COLORS: Record<Event["category"], string> = {
  cultural: "bg-purple-100 text-purple-700 border-purple-200",
  educacional: "bg-blue-100 text-blue-700 border-blue-200",
  social: "bg-green-100 text-green-700 border-green-200",
  arrecadacao: "bg-yellow-100 text-yellow-700 border-yellow-200",
  celebracao: "bg-pink-100 text-pink-700 border-pink-200",
  esportivo: "bg-red-100 text-red-700 border-red-200",
  arte: "bg-indigo-100 text-indigo-700 border-indigo-200",
  musical: "bg-violet-100 text-violet-700 border-violet-200",
  literario: "bg-cyan-100 text-cyan-700 border-cyan-200",
  outro: "bg-gray-100 text-gray-700 border-gray-200",
};

export const CATEGORY_COLORS_OUTLINE: Record<Event["category"], string> = {
  cultural: "bg-purple-50 text-purple-700 border-purple-300",
  educacional: "bg-blue-50 text-blue-700 border-blue-300",
  social: "bg-green-50 text-green-700 border-green-300",
  arrecadacao: "bg-yellow-50 text-yellow-700 border-yellow-300",
  celebracao: "bg-pink-50 text-pink-700 border-pink-300",
  esportivo: "bg-red-50 text-red-700 border-red-300",
  arte: "bg-indigo-50 text-indigo-700 border-indigo-300",
  musical: "bg-violet-50 text-violet-700 border-violet-300",
  literario: "bg-cyan-50 text-cyan-700 border-cyan-300",
  outro: "bg-gray-50 text-gray-700 border-gray-300",
};

export const CATEGORY_COLORS_SOLID: Record<Event["category"], string> = {
  cultural: "bg-purple-600 text-white border-purple-700",
  educacional: "bg-blue-600 text-white border-blue-700",
  social: "bg-green-600 text-white border-green-700",
  arrecadacao: "bg-yellow-600 text-white border-yellow-700",
  celebracao: "bg-pink-600 text-white border-pink-700",
  esportivo: "bg-red-600 text-white border-red-700",
  arte: "bg-indigo-600 text-white border-indigo-700",
  musical: "bg-violet-600 text-white border-violet-700",
  literario: "bg-cyan-600 text-white border-cyan-700",
  outro: "bg-gray-600 text-white border-gray-700",
};

// FeaturedEvent specific colors (gradient backgrounds)
export const CATEGORY_COLORS_FEATURED: Record<Event["category"], string> = {
  cultural: "bg-purple-100 text-purple-700",
  educacional: "bg-blue-100 text-blue-700",
  social: "bg-green-100 text-green-700",
  arrecadacao: "bg-yellow-100 text-yellow-700",
  celebracao: "bg-pink-100 text-pink-700",
  esportivo: "bg-red-100 text-red-700",
  arte: "bg-indigo-100 text-indigo-700",
  musical: "bg-violet-100 text-violet-700",
  literario: "bg-cyan-100 text-cyan-700",
  outro: "bg-gray-100 text-gray-700",
};
