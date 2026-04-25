import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { S } from "../data/tokens";
import { MetricCard } from "./MetricCard";
import { DonutChart } from "./DonutChart";
import { Sparkline } from "./Sparkline";
import { LineChart } from "./LineChart";

const metrics = [
  {
    label: "Net Revenue",
    value: 3131021,
    change: "+0.4% this month",
    positive: true,
    prefix: "$",
  },
  {
    label: "ARR",
    value: 1511121,
    change: "+32% YoY",
    positive: true,
    prefix: "$",
  },
  {
    label: "Revenue Goal",
    value: "71%",
    change: "Quarterly target",
    positive: true,
    donut: 71,
  },
  {
    label: "New Orders",
    value: 18221,
    change: "+11% this week",
    positive: true,
  },
];

const categoryData = [
  { label: "Electronics", value: 35, color: S.green },
  { label: "Furniture", value: 28, color: S.blue },
  { label: "Clothes", value: 22, color: S.orange },
  { label: "Shoes", value: 15, color: S.purple },
];

const customers = [
  { name: "Nataniel Donowan", deals: 12, value: "$8,420", status: "Active" },
  { name: "Sarah Mitchell", deals: 8, value: "$5,100", status: "Active" },
  { name: "James Okonkwo", deals: 15, value: "$11,200", status: "VIP" },
  { name: "Yuki Tanaka", deals: 6, value: "$3,800", status: "At-risk" },
  { name: "Clara Osei", deals: 20, value: "$14,600", status: "VIP" },
];

const statusColor: Record<string, string> = {
  Active: S.green,
  VIP: S.blue,
  "At-risk": S.red,
};

export function OverviewSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".metric-card", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        delay: 0.1,
        ease: "power2.out",
      });
      gsap.from(".chart-card", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        delay: 0.3,
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
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
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
          <p style={{ color: S.text, fontWeight: 600, marginBottom: 16 }}>
            Sales by Category
          </p>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <DonutChart pct={68} size={100} stroke={14} />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    color: S.text,
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    lineHeight: 1,
                  }}
                >
                  102k
                </p>
                <p style={{ color: S.muted, fontSize: "0.58rem" }}>Units</p>
              </div>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {categoryData.map((c) => (
                <div
                  key={c.label}
                  style={{ display: "flex", alignItems: "center", gap: 8 }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: c.color,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{ color: S.muted, fontSize: "0.72rem", flex: 1 }}
                  >
                    {c.label}
                  </span>
                  <span
                    style={{
                      color: S.text,
                      fontSize: "0.72rem",
                      fontWeight: 600,
                    }}
                  >
                    {c.value}%
                  </span>
                  <div
                    style={{
                      width: 50,
                      height: 4,
                      background: S.border,
                      borderRadius: 2,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${c.value}%`,
                        height: "100%",
                        background: c.color,
                        borderRadius: 2,
                      }}
                    />
                  </div>
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
            padding: 20,
          }}
        >
          <p style={{ color: S.text, fontWeight: 600, marginBottom: 14 }}>
            Revenue Trend
          </p>
          <div style={{ display: "flex", gap: 20, marginBottom: 14 }}>
            <div>
              <p style={{ color: S.muted, fontSize: "0.7rem" }}>
                New Customers
              </p>
              <p style={{ color: S.text, fontWeight: 700, fontSize: "1.2rem" }}>
                862
              </p>
            </div>
            <div>
              <p style={{ color: S.muted, fontSize: "0.7rem" }}>Total Profit</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <p
                  style={{ color: S.text, fontWeight: 700, fontSize: "1.2rem" }}
                >
                  $25.6k
                </p>
                <Sparkline />
              </div>
            </div>
          </div>
          <p
            style={{
              color: S.text,
              fontWeight: 700,
              fontSize: "1.1rem",
              marginBottom: 8,
            }}
          >
            $136,755.77
          </p>
          <LineChart />
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <p style={{ color: S.text, fontWeight: 600 }}>Top Customers</p>
          <button
            style={{
              background: "transparent",
              border: `1px solid ${S.border}`,
              color: S.muted,
              padding: "4px 10px",
              borderRadius: 6,
              fontSize: "0.72rem",
              cursor: "pointer",
            }}
          >
            View all →
          </button>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Customer", "Deals", "Value", "Status"].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    color: S.muted,
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    padding: "8px 12px",
                    borderBottom: `1px solid ${S.border}`,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${S.border}` }}>
                <td
                  style={{
                    padding: "11px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      background: `hsl(${i * 80 + 120},50%,38%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {c.name[0]}
                  </div>
                  <span style={{ color: S.text, fontSize: "0.82rem" }}>
                    {c.name}
                  </span>
                </td>
                <td
                  style={{
                    padding: "11px 12px",
                    color: S.muted,
                    fontSize: "0.82rem",
                  }}
                >
                  {c.deals}
                </td>
                <td
                  style={{
                    padding: "11px 12px",
                    color: S.green,
                    fontSize: "0.82rem",
                    fontWeight: 600,
                  }}
                >
                  {c.value}
                </td>
                <td style={{ padding: "11px 12px" }}>
                  <span
                    style={{
                      background: `${statusColor[c.status] ?? S.muted}22`,
                      color: statusColor[c.status] ?? S.muted,
                      borderRadius: 20,
                      padding: "3px 10px",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                    }}
                  >
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
