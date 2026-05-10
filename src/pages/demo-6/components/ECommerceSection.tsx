import { useState } from "react";
import { S } from "../data/tokens";
import {
  ECOM_METRICS,
  ECOM_ORDERS,
  ECOM_PRODUCTS,
  ECOM_MONTHLY,
  ECOM_STATUS_COLOR,
} from "../data/sectionData";
import { DashboardSection, ChartCard } from "./DashboardSection";
import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";
import { DonutChart } from "./DonutChart";

const tableTh = (h: string) => (
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
);

const tdMuted = { padding: "10px 12px", color: S.muted, fontSize: "0.8rem" } as const;
const tdText  = { padding: "10px 12px", color: S.text,  fontSize: "0.8rem" } as const;

export function ECommerceSection() {
  const [selectedTab, setSelectedTab] = useState<"orders" | "products">("orders");

  return (
    <DashboardSection
      metrics={ECOM_METRICS}
      metricsDonutColor={S.green}
      chartsCols="1fr 1.4fr"
      charts={
        <>
          <ChartCard title="Monthly Revenue" subtitle="Last 7 months">
            <BarChart data={ECOM_MONTHLY} color={S.blue} height={80} />
          </ChartCard>

          <ChartCard title="Revenue Trend — MTD $84.2k">
            <LineChart color={S.blue} />
            <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
              {[
                { label: "Electronics", pct: 43, color: S.blue },
                { label: "Wearables",   pct: 28, color: S.purple },
                { label: "Audio",       pct: 29, color: S.orange },
              ].map((c) => (
                <div key={c.label} style={{ textAlign: "center" }}>
                  <DonutChart pct={c.pct} size={44} stroke={6} color={c.color} />
                  <p style={{ color: S.muted, fontSize: "0.65rem", marginTop: 4 }}>{c.label}</p>
                  <p style={{ color: c.color, fontSize: "0.7rem", fontWeight: 700 }}>{c.pct}%</p>
                </div>
              ))}
            </div>
          </ChartCard>
        </>
      }
      table={
        <ChartCard
          headerRight={
            <button
              style={{
                background: S.blue,
                border: "none",
                color: "#fff",
                padding: "6px 14px",
                borderRadius: 6,
                fontSize: "0.75rem",
                cursor: "pointer",
              }}
            >
              + New Order
            </button>
          }
          title=""
        >
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {(["orders", "products"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTab(t)}
                style={{
                  background: selectedTab === t ? `${S.blue}22` : "transparent",
                  border: `1px solid ${selectedTab === t ? S.blue : S.border}`,
                  color: selectedTab === t ? S.blue : S.muted,
                  padding: "5px 14px",
                  borderRadius: 6,
                  fontSize: "0.75rem",
                  cursor: "pointer",
                  textTransform: "capitalize",
                  fontWeight: selectedTab === t ? 600 : 400,
                }}
              >
                {t === "orders" ? "Recent Orders" : "Top Products"}
              </button>
            ))}
          </div>

          {selectedTab === "orders" ? (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Order", "Customer", "Product", "Amount", "Date", "Status"].map(tableTh)}
                </tr>
              </thead>
              <tbody>
                {ECOM_ORDERS.map((o, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${S.border}` }}>
                    <td style={{ padding: "10px 12px", color: S.blue, fontSize: "0.8rem", fontFamily: "monospace" }}>
                      {o.id}
                    </td>
                    <td style={tdText}>{o.customer}</td>
                    <td style={tdMuted}>{o.product}</td>
                    <td style={{ padding: "10px 12px", color: S.green, fontSize: "0.8rem", fontWeight: 600 }}>
                      {o.amount}
                    </td>
                    <td style={tdMuted}>{o.date}</td>
                    <td style={{ padding: "10px 12px" }}>
                      <span
                        style={{
                          background: `${ECOM_STATUS_COLOR[o.status]}22`,
                          color: ECOM_STATUS_COLOR[o.status],
                          borderRadius: 20,
                          padding: "3px 10px",
                          fontSize: "0.68rem",
                          fontWeight: 600,
                        }}
                      >
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Product", "SKU", "Stock", "Sold", "Revenue", "Trend"].map(tableTh)}
                </tr>
              </thead>
              <tbody>
                {ECOM_PRODUCTS.map((p, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${S.border}` }}>
                    <td style={tdText}>{p.name}</td>
                    <td style={{ padding: "10px 12px", color: S.muted, fontSize: "0.75rem", fontFamily: "monospace" }}>
                      {p.sku}
                    </td>
                    <td
                      style={{
                        padding: "10px 12px",
                        color: p.stock < 20 ? S.red : S.text,
                        fontSize: "0.8rem",
                        fontWeight: p.stock < 20 ? 600 : 400,
                      }}
                    >
                      {p.stock}
                    </td>
                    <td style={tdMuted}>{p.sold}</td>
                    <td style={{ padding: "10px 12px", color: S.green, fontSize: "0.8rem", fontWeight: 600 }}>
                      {p.revenue}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div
                          style={{
                            flex: 1,
                            height: 4,
                            background: S.border,
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${p.trend}%`,
                              height: "100%",
                              background: p.trend > 80 ? S.green : S.yellow,
                              borderRadius: 2,
                            }}
                          />
                        </div>
                        <span style={{ color: S.muted, fontSize: "0.68rem" }}>{p.trend}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </ChartCard>
      }
    />
  );
}
