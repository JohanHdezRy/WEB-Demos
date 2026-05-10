import { S } from "../data/tokens";
import {
  OVERVIEW_METRICS,
  OVERVIEW_CATEGORIES,
  OVERVIEW_CUSTOMERS,
  OVERVIEW_STATUS_COLOR,
} from "../data/sectionData";
import { DashboardSection, ChartCard } from "./DashboardSection";
import { DonutChart } from "./DonutChart";
import { Sparkline } from "./Sparkline";
import { LineChart } from "./LineChart";

export function OverviewSection() {
  return (
    <DashboardSection
      metrics={OVERVIEW_METRICS}
      charts={
        <>
          <ChartCard title="Sales by Category">
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
                  <p style={{ color: S.text, fontWeight: 700, fontSize: "1.1rem", lineHeight: 1 }}>
                    102k
                  </p>
                  <p style={{ color: S.muted, fontSize: "0.58rem" }}>Units</p>
                </div>
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                {OVERVIEW_CATEGORIES.map((c) => (
                  <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: c.color,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ color: S.muted, fontSize: "0.72rem", flex: 1 }}>
                      {c.label}
                    </span>
                    <span style={{ color: S.text, fontSize: "0.72rem", fontWeight: 600 }}>
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
          </ChartCard>

          <ChartCard title="Revenue Trend">
            <div style={{ display: "flex", gap: 20, marginBottom: 14 }}>
              <div>
                <p style={{ color: S.muted, fontSize: "0.7rem" }}>New Customers</p>
                <p style={{ color: S.text, fontWeight: 700, fontSize: "1.2rem" }}>862</p>
              </div>
              <div>
                <p style={{ color: S.muted, fontSize: "0.7rem" }}>Total Profit</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <p style={{ color: S.text, fontWeight: 700, fontSize: "1.2rem" }}>$25.6k</p>
                  <Sparkline />
                </div>
              </div>
            </div>
            <p style={{ color: S.text, fontWeight: 700, fontSize: "1.1rem", marginBottom: 8 }}>
              $136,755.77
            </p>
            <LineChart />
          </ChartCard>
        </>
      }
      table={
        <ChartCard
          title="Top Customers"
          headerRight={
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
          }
        >
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
              {OVERVIEW_CUSTOMERS.map((c, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${S.border}` }}>
                  <td style={{ padding: "11px 12px", display: "flex", alignItems: "center", gap: 10 }}>
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
                    <span style={{ color: S.text, fontSize: "0.82rem" }}>{c.name}</span>
                  </td>
                  <td style={{ padding: "11px 12px", color: S.muted, fontSize: "0.82rem" }}>
                    {c.deals}
                  </td>
                  <td style={{ padding: "11px 12px", color: S.green, fontSize: "0.82rem", fontWeight: 600 }}>
                    {c.value}
                  </td>
                  <td style={{ padding: "11px 12px" }}>
                    <span
                      style={{
                        background: `${OVERVIEW_STATUS_COLOR[c.status] ?? S.muted}22`,
                        color: OVERVIEW_STATUS_COLOR[c.status] ?? S.muted,
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
        </ChartCard>
      }
    />
  );
}
