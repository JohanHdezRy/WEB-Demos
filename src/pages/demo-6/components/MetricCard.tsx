import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { S } from "../data/tokens";
import { DonutChart } from "./DonutChart";

interface MetricCardProps {
  label: string;
  value: string | number;
  change: string;
  positive: boolean;
  prefix?: string;
  suffix?: string;
  donut?: number;
  donutColor?: string;
}

export function MetricCard({
  label,
  value,
  change,
  positive,
  prefix = "",
  suffix = "",
  donut,
  donutColor = S.green,
}: MetricCardProps) {
  const valRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (donut || typeof value === "string") return;
    const target =
      typeof value === "number"
        ? value
        : parseFloat(String(value).replace(/[$,]/g, ""));
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 1.5,
      delay: 0.4,
      ease: "power2.out",
      onUpdate: () => {
        if (valRef.current)
          valRef.current.textContent =
            prefix +
            obj.val.toLocaleString("en-US", { maximumFractionDigits: 0 }) +
            suffix;
      },
    });
  }, [value, prefix, suffix, donut]);

  return (
    <div
      className="metric-card"
      style={{
        background: S.surface,
        border: `1px solid ${S.border}`,
        borderRadius: 10,
        padding: 16,
      }}
    >
      <p style={{ color: S.muted, fontSize: "0.72rem", marginBottom: 10 }}>
        {label}
      </p>
      {donut !== undefined ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <DonutChart pct={donut} size={56} stroke={8} color={donutColor} />
          <div>
            <p
              style={{
                color: S.text,
                fontWeight: 700,
                fontSize: "1.3rem",
                lineHeight: 1,
              }}
            >
              {value}
            </p>
            <p
              style={{
                color: donutColor,
                fontSize: "0.65rem",
                marginTop: 4,
                fontWeight: 600,
              }}
            >
              {change}
            </p>
          </div>
        </div>
      ) : (
        <>
          <p
            style={{
              color: S.text,
              fontWeight: 700,
              fontSize: "1.4rem",
              lineHeight: 1,
              marginBottom: 6,
            }}
          >
            <span ref={valRef}>
              {prefix}
              {value}
              {suffix}
            </span>
          </p>
          <span
            style={{
              color: positive ? S.green : S.red,
              fontSize: "0.7rem",
              fontWeight: 600,
            }}
          >
            {change}
          </span>
          {change.includes("vs") && (
            <span style={{ color: S.muted, fontSize: "0.7rem" }}>
              {" "}
              {change.split("vs")[1]}
            </span>
          )}
        </>
      )}
    </div>
  );
}
