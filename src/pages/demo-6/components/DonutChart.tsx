import { useRef } from "react";
import { S } from "../data/tokens";
import { useDonutAnimation } from "../hooks/useChartAnimations";

interface DonutChartProps {
  pct: number;
  size?: number;
  stroke?: number;
  color?: string;
}

export function DonutChart({
  pct,
  size = 80,
  stroke = 10,
  color = S.green,
}: DonutChartProps) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const ref = useRef<SVGCircleElement>(null);
  useDonutAnimation(ref, circ, dash);

  return (
    <svg
      width={size}
      height={size}
      style={{ transform: "rotate(-90deg)", flexShrink: 0 }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={S.border}
        strokeWidth={stroke}
      />
      <circle
        ref={ref}
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={circ}
        strokeLinecap="round"
      />
    </svg>
  );
}
