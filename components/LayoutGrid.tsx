import type { CSSProperties } from "react";

type GridLine = {
  at: string;
  from?: string;
  to?: string;
  thickness?: string;
  color?: string;
  opacity?: number;
  className?: string;
};

type LayoutGridProps = {
  className?: string;
  verticalLines?: GridLine[];
  horizontalLines?: GridLine[];
};

const defaultLineColor = "rgb(var(--theme-text-rgb) / 0.28)";

function buildLineStyle(
  direction: "vertical" | "horizontal",
  line: GridLine,
): CSSProperties {
  const thickness = line.thickness ?? "1px";
  const color = line.color ?? defaultLineColor;
  const opacity = line.opacity ?? 1;

  if (direction === "vertical") {
    return {
      left: line.at,
      top: line.from ?? "0",
      bottom: line.to ?? "0",
      width: thickness,
      backgroundColor: color,
      opacity,
    };
  }

  return {
    top: line.at,
    left: line.from ?? "0",
    right: line.to ?? "0",
    height: thickness,
    backgroundColor: color,
    opacity,
  };
}

export default function LayoutGrid({
  className = "",
  verticalLines = [],
  horizontalLines = [],
}: LayoutGridProps) {
  return (
    <div className={`pointer-events-none md:block hidden absolute inset-0 ${className}`}>
      {verticalLines.map((line, index) => (
        <div
          key={`vertical-${index}-${line.at}`}
          className={`absolute ${line.className ?? ""}`}
          style={buildLineStyle("vertical", line)}
        />
      ))}

      {horizontalLines.map((line, index) => (
        <div
          key={`horizontal-${index}-${line.at}`}
          className={`absolute ${line.className ?? ""}`}
          style={buildLineStyle("horizontal", line)}
        />
      ))}
    </div>
  );
}
