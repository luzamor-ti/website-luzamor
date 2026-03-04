import * as LucideIcons from "lucide-react";
import { LucideProps } from "lucide-react";

interface DynamicIconProps extends Omit<LucideProps, "ref"> {
  name: string;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[name] as
    | React.ComponentType<LucideProps>
    | undefined;

  if (!IconComponent) {
    return <LucideIcons.Circle {...props} />;
  }

  return <IconComponent {...props} />;
}
