import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { S } from "../data/tokens";
import { MetricCard } from "./MetricCard";
import type { MetricItem } from "../data/sectionData";

interface DashboardSectionProps {
  metrics: MetricItem[];
  metricsDonutColor?: string;
  charts: ReactNode;
  /** CSS grid-template-columns for the charts row. Default `1fr 1fr`. */
  chartsCols?: string;
  table: ReactNode;
}

/**
 * Shared layout for dashboard tabs (Overview, ECommerce, …).
 * Renders the metrics grid, a 2-col charts row, and a table card,
 * with the same staggered intro animation everywhere.
 */
export function DashboardSection({
  metrics,
  metricsDonutColor,
  charts,
  chartsCols = "1fr 1fr",
  table,
}: DashboardSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".metric-card", {
          y: 18,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.1,
          ease: "power2.out",
        });
        gsap.from(".chart-card", {
          y: 18,
          opacity: 0,
          duration: 0.5,
          stagger: 0.12,
          delay: 0.3,
          ease: "power2.out",
        });
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      <div
        className="db-metrics-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 16,
        }}
      >
        {metrics.map((m, i) => (
          <MetricCard
            key={i}
            {...m}
            {...(metricsDonutColor !== undefined ? { donutColor: metricsDonutColor } : {})}
          />
        ))}
      </div>

      <div
        className="db-charts-grid"
        style={{ display: "grid", gridTemplateColumns: chartsCols, gap: 16 }}
      >
        {charts}
      </div>

      {table}
    </div>
  );
}

/** Standard card chrome used by every chart panel. */
export function ChartCard({
  title,
  subtitle,
  headerRight,
  children,
}: {
  title?: string;
  subtitle?: string;
  headerRight?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      className="chart-card"
      style={{
        background: S.surface,
        border: `1px solid ${S.border}`,
        borderRadius: 10,
        padding: 20,
      }}
    >
      {(title || headerRight) && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: subtitle ? 6 : 16,
          }}
        >
          {title && (
            <p style={{ color: S.text, fontWeight: 600 }}>{title}</p>
          )}
          {headerRight}
        </div>
      )}
      {subtitle && (
        <p style={{ color: S.muted, fontSize: "0.72rem", marginBottom: 14 }}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
