import type { LucideIcon, LucideProps } from "lucide-react";
import {
  Award,
  Book,
  BookOpen,
  Calendar,
  Camera,
  CheckCircle,
  Circle,
  Coffee,
  Film,
  Gift,
  Globe,
  GraduationCap,
  Headphones,
  Heart,
  Home,
  Lightbulb,
  MapPin,
  Mic,
  Music,
  Palette,
  Rocket,
  School,
  Smile,
  Sparkles,
  Star,
  Target,
  ThumbsUp,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

interface DynamicIconProps extends Omit<LucideProps, "ref"> {
  name: string;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Award,
  Book,
  BookOpen,
  Calendar,
  Camera,
  CheckCircle,
  Circle,
  Coffee,
  Film,
  Gift,
  Globe,
  GraduationCap,
  Headphones,
  Heart,
  Home,
  Lightbulb,
  MapPin,
  Mic,
  Music,
  Palette,
  Rocket,
  School,
  Smile,
  Sparkles,
  Star,
  Target,
  ThumbsUp,
  TrendingUp,
  Users,
  Zap,
};

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    return <Circle {...props} />;
  }

  return <IconComponent {...props} />;
}
