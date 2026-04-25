import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { S } from "../data/tokens";

interface LineChartProps {
  color?: string;
}

export function LineChart({ color = S.green }: LineChartProps) {
  const ref = useRef<SVGPathElement>(null);
  const points = [30, 45, 35, 60, 50, 72, 58, 80, 65, 90, 70, 95];
  const w = 320;
  const h = 100;
  const d = points
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"} ${(i / (points.length - 1)) * w} ${h - (p / 100) * h}`,
    )
    .join(" ");
  const gradId = `lg-${color.replace("#", "")}`;

  useEffect(() => {
    if (ref.current) {
      const len = ref.current.getTotalLength();
      gsap.fromTo(
        ref.current,
        { strokeDashoffset: len, strokeDasharray: len },
        { strokeDashoffset: 0, duration: 2, delay: 0.5, ease: "power2.out" },
      );
    }
  }, []);

  return (
    <svg
      width="100%"
      height="100"
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill={`url(#${gradId})`} />
      <path
        ref={ref}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
