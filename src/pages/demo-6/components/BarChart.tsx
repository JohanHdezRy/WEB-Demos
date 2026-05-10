import { useRef } from "react";
import { S } from "../data/tokens";
import { useBarChartAnimation } from "../hooks/useChartAnimations";

interface BarChartProps {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
}

export function BarChart({ data, height = 80, color = S.blue }: BarChartProps) {
  const barsRef = useRef<(SVGRectElement | null)[]>([]);
  const max = Math.max(...data.map((d) => d.value));
  const w = 300;
  const barW = Math.floor(w / data.length) - 4;
  useBarChartAnimation(barsRef, data, max, height);

  return (
    <svg
      width="100%"
      height={height + 20}
      viewBox={`0 0 ${w} ${height + 20}`}
      preserveAspectRatio="none"
    >
      {data.map((d, i) => {
        const x = i * (barW + 4);
        return (
          <g key={d.label}>
            <rect
              ref={(el) => {
                barsRef.current[i] = el;
              }}
              x={x}
              y={height}
              width={barW}
              height={0}
              rx={3}
              fill={color}
              opacity="0.85"
            />
            <text
              x={x + barW / 2}
              y={height + 14}
              textAnchor="middle"
              fill={S.muted}
              fontSize="8"
              fontFamily="var(--font-poppins)"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
