import { cn } from "@/lib/utils";

interface DottedBackgroundProps {
  className?: string;
  dotSize?: number;
  dotSpacing?: number;
  dotColor?: string;
  fadeRadius?: number;
}

export function DottedBackground({
  className,
  dotSize = 2,
  dotSpacing = 20,
  dotColor = "#EFEFEF",
}: DottedBackgroundProps) {
  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{
        backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
        backgroundPosition: "center",
        mask: `radial-gradient(circle at center, black 0%, black 30%, transparent 85%, transparent 100%)`,
        WebkitMask: `radial-gradient(circle at center, black 0%, black 30%, transparent 85%, transparent 100%)`,
      }}
    />
  );
}
