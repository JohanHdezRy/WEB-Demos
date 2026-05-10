import { useRef } from "react";
import { S } from "../data/tokens";
import { usePathDrawAnimation } from "../hooks/useChartAnimations";

interface SparklineProps {
  color?: string;
}

export function Sparkline({ color = S.green }: SparklineProps) {
  const ref = useRef<SVGPathElement>(null);
  usePathDrawAnimation(ref);

  const points = [10, 20, 12, 28, 18, 35, 25, 40, 30, 45];
  const w = 100;
  const h = 40;
  const d = points
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"} ${(i / (points.length - 1)) * w} ${h - p}`,
    )
    .join(" ");

  return (
    <svg width="100" height="40" viewBox={`0 0 ${w} ${h}`}>
      <path
        ref={ref}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
