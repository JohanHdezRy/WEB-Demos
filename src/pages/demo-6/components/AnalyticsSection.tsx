import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { S } from "../data/tokens";
import { MetricCard } from "./MetricCard";
import { LineChart } from "./LineChart";
import { DonutChart } from "./DonutChart";
import { BarChart } from "./BarChart";

const metrics = [
  {
    label: "Sessions",
    value: 128430,
    change: "+14% vs last month",
    positive: true,
  },
  {
    label: "Bounce Rate",
    value: "34.2%",
    change: "-2.1% improvement",
    positive: true,
    donut: 34,
  },
  {
    label: "Avg Duration",
    value: "3m 42s",
    change: "+18s vs last month",
    positive: true,
  },
  {
    label: "Conversion",
    value: "5.8%",
    change: "+0.6% this month",
    positive: true,
    donut: 6,
    donutColor: S.blue,
  },
];

const sources = [
  { label: "Organic", value: 82 },
  { label: "Direct", value: 65 },
  { label: "Social", value: 48 },
  { label: "Email", value: 37 },
  { label: "Paid", value: 54 },
  { label: "Referral", value: 28 },
];

const pages = [
  {
    page: "/home",
    views: "42,810",
    unique: "38,200",
    bounce: "28%",
    time: "4m 12s",
  },
  {
    page: "/products",
    views: "31,400",
    unique: "27,900",
    bounce: "35%",
    time: "3m 44s",
  },
  {
    page: "/checkout",
    views: "18,200",
    unique: "16,800",
    bounce: "14%",
    time: "6m 02s",
  },
  {
    page: "/blog/seo-tips",
    views: "12,600",
    unique: "11,400",
    bounce: "48%",
    time: "2m 28s",
  },
  {
    page: "/contact",
    views: "8,320",
    unique: "7,100",
    bounce: "55%",
    time: "1m 49s",
  },
];

const deviceData = [
  { label: "Mobile", pct: 52, color: S.blue },
  { label: "Desktop", pct: 36, color: S.purple },
  { label: "Tablet", pct: 12, color: S.orange },
];

export function AnalyticsSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".metric-card", {
        y: 18,
        opacity: 0,
        duration: 0.45,
        stagger: 0.09,
        ease: "power2.out",
      });
      gsap.from(".chart-card", {
        y: 18,
        opacity: 0,
        duration: 0.45,
        stagger: 0.1,
        delay: 0.2,
        ease: "power2.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

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
          <MetricCard key={i} {...m} />
        ))}
      </div>

      <div
        className="db-charts-grid"
        style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}
      >
        <div
          className="chart-card"
          style={{
            background: S.surface,
            border: `1px solid ${S.border}`,
            borderRadius: 10,
            padding: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <p style={{ color: S.text, fontWeight: 600 }}>Traffic Over Time</p>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { label: "Sessions", color: S.blue },
                { label: "Users", color: S.purple },
              ].map((l) => (
                <div
                  key={l.label}
                  style={{ display: "flex", alignItems: "center", gap: 5 }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 2,
                      background: l.color,
                      borderRadius: 1,
                    }}
                  />
                  <span style={{ color: S.muted, fontSize: "0.68rem" }}>
                    {l.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <LineChart color={S.blue} />
          <div style={{ marginTop: 10 }}>
            <LineChart color={S.purple} />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            className="chart-card"
            style={{
              background: S.surface,
              border: `1px solid ${S.border}`,
              borderRadius: 10,
              padding: 20,
            }}
          >
            <p style={{ color: S.text, fontWeight: 600, marginBottom: 14 }}>
              Devices
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <DonutChart pct={52} size={70} stroke={10} color={S.blue} />
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 7,
                }}
              >
                {deviceData.map((d) => (
                  <div
                    key={d.label}
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: d.color,
                      }}
                    />
                    <span
                      style={{ color: S.muted, fontSize: "0.72rem", flex: 1 }}
                    >
                      {d.label}
                    </span>
                    <span
                      style={{
                        color: S.text,
                        fontSize: "0.72rem",
                        fontWeight: 600,
                      }}
                    >
                      {d.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="chart-card"
            style={{
              background: S.surface,
              border: `1px solid ${S.border}`,
              borderRadius: 10,
              padding: 16,
            }}
          >
            <p
              style={{
                color: S.text,
                fontWeight: 600,
                marginBottom: 12,
                fontSize: "0.85rem",
              }}
            >
              Traffic Sources
            </p>
            <BarChart data={sources} color={S.purple} height={60} />
          </div>
        </div>
      </div>

      <div
        className="chart-card"
        style={{
          background: S.surface,
          border: `1px solid ${S.border}`,
          borderRadius: 10,
          padding: 20,
        }}
      >
        <p style={{ color: S.text, fontWeight: 600, marginBottom: 16 }}>
          Top Pages
        </p>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Page", "Views", "Unique", "Bounce Rate", "Avg Time"].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      textAlign: "left",
                      color: S.muted,
                      fontSize: "0.68rem",
                      fontWeight: 600,
                      padding: "8px 12px",
                      borderBottom: `1px solid ${S.border}`,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {pages.map((p, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${S.border}` }}>
                <td
                  style={{
                    padding: "10px 12px",
                    color: S.blue,
                    fontSize: "0.8rem",
                    fontFamily: "monospace",
                  }}
                >
                  {p.page}
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    color: S.text,
                    fontSize: "0.8rem",
                  }}
                >
                  {p.views}
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    color: S.muted,
                    fontSize: "0.8rem",
                  }}
                >
                  {p.unique}
                </td>
                <td style={{ padding: "10px 12px" }}>
                  <span
                    style={{
                      color: parseFloat(p.bounce) > 45 ? S.red : S.green,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    {p.bounce}
                  </span>
                </td>
                <td
                  style={{
                    padding: "10px 12px",
                    color: S.muted,
                    fontSize: "0.8rem",
                  }}
                >
                  {p.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
