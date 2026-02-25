import { LucideIcon } from "lucide-react";

interface IconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
}

/**
 * Wrapper para ícones do Lucide React (Feather Icons)
 * Padroniza o uso de ícones no projeto
 */
export function Icon({
  icon: IconComponent,
  size = 24,
  className = "",
}: IconProps) {
  return <IconComponent size={size} className={className} strokeWidth={2} />;
}
