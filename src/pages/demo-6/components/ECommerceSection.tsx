import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { S } from "../data/tokens";
import { MetricCard } from "./MetricCard";
import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";
import { DonutChart } from "./DonutChart";

const metrics = [
  {
    label: "Total Sales",
    value: 84210,
    change: "+8.4% this month",
    positive: true,
    prefix: "$",
  },
  {
    label: "Orders Today",
    value: 142,
    change: "+23 vs yesterday",
    positive: true,
  },
  {
    label: "Avg Order Value",
    value: 593,
    change: "-$12 vs last wk",
    positive: false,
    prefix: "$",
  },
  {
    label: "Refund Rate",
    value: "2.1%",
    change: "of total orders",
    positive: true,
    donut: 2,
  },
];

const orders = [
  {
    id: "#ORD-4521",
    customer: "Nataniel D.",
    product: 'MacBook Pro 14"',
    amount: "$2,399",
    date: "Apr 12",
    status: "Delivered",
  },
  {
    id: "#ORD-4520",
    customer: "Sarah M.",
    product: "AirPods Pro",
    amount: "$249",
    date: "Apr 12",
    status: "Shipped",
  },
  {
    id: "#ORD-4519",
    customer: "James O.",
    product: "iPad Air M2",
    amount: "$599",
    date: "Apr 11",
    status: "Processing",
  },
  {
    id: "#ORD-4518",
    customer: "Yuki T.",
    product: "Apple Watch S9",
    amount: "$399",
    date: "Apr 11",
    status: "Cancelled",
  },
  {
    id: "#ORD-4517",
    customer: "Clara O.",
    product: "iPhone 16 Pro",
    amount: "$1,099",
    date: "Apr 10",
    status: "Delivered",
  },
  {
    id: "#ORD-4516",
    customer: "Amir H.",
    product: 'Samsung 4K TV 65"',
    amount: "$1,299",
    date: "Apr 10",
    status: "Shipped",
  },
  {
    id: "#ORD-4515",
    customer: "Lena K.",
    product: "Sony WH-1000XM5",
    amount: "$349",
    date: "Apr 09",
    status: "Delivered",
  },
];

const products = [
  {
    name: 'MacBook Pro 14"',
    sku: "APL-MBP14",
    stock: 48,
    sold: 312,
    revenue: "$748k",
    trend: 92,
  },
  {
    name: "iPhone 16 Pro",
    sku: "APL-I16P",
    stock: 120,
    sold: 892,
    revenue: "$980k",
    trend: 98,
  },
  {
    name: "iPad Air M2",
    sku: "APL-IPAM2",
    stock: 65,
    sold: 254,
    revenue: "$152k",
    trend: 74,
  },
  {
    name: "AirPods Pro 2",
    sku: "APL-APP2",
    stock: 200,
    sold: 567,
    revenue: "$141k",
    trend: 86,
  },
  {
    name: "Apple Watch S9",
    sku: "APL-AWS9",
    stock: 33,
    sold: 189,
    revenue: "$75k",
    trend: 68,
  },
  {
    name: 'Samsung 4K TV 65"',
    sku: "SAM-4K65",
    stock: 12,
    sold: 98,
    revenue: "$127k",
    trend: 71,
  },
];

const monthlyData = [
  { label: "Oct", value: 62 },
  { label: "Nov", value: 70 },
  { label: "Dec", value: 95 },
  { label: "Jan", value: 58 },
  { label: "Feb", value: 74 },
  { label: "Mar", value: 83 },
  { label: "Apr", value: 91 },
];

const statusColor: Record<string, string> = {
  Delivered: S.green,
  Shipped: S.blue,
  Processing: S.yellow,
  Cancelled: S.red,
};

export function ECommerceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<"orders" | "products">(
    "orders",
  );

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
          <MetricCard key={i} {...m} donutColor={S.green} />
        ))}
      </div>

      <div
        className="db-charts-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 16 }}
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
          <p style={{ color: S.text, fontWeight: 600, marginBottom: 6 }}>
            Monthly Revenue
          </p>
          <p style={{ color: S.muted, fontSize: "0.72rem", marginBottom: 14 }}>
            Last 7 months
          </p>
          <BarChart data={monthlyData} color={S.blue} height={80} />
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
            Revenue Trend — MTD $84.2k
          </p>
          <LineChart color={S.blue} />
          <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
            {[
              { label: "Electronics", pct: 43, color: S.blue },
              { label: "Wearables", pct: 28, color: S.purple },
              { label: "Audio", pct: 29, color: S.orange },
            ].map((c) => (
              <div key={c.label} style={{ textAlign: "center" }}>
                <DonutChart pct={c.pct} size={44} stroke={6} color={c.color} />
                <p
                  style={{ color: S.muted, fontSize: "0.65rem", marginTop: 4 }}
                >
                  {c.label}
                </p>
                <p
                  style={{
                    color: c.color,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                  }}
                >
                  {c.pct}%
                </p>
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
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
        </div>

        {selectedTab === "orders" ? (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {[
                  "Order",
                  "Customer",
                  "Product",
                  "Amount",
                  "Date",
                  "Status",
                ].map((h) => (
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
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${S.border}` }}>
                  <td
                    style={{
                      padding: "10px 12px",
                      color: S.blue,
                      fontSize: "0.8rem",
                      fontFamily: "monospace",
                    }}
                  >
                    {o.id}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      color: S.text,
                      fontSize: "0.8rem",
                    }}
                  >
                    {o.customer}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      color: S.muted,
                      fontSize: "0.8rem",
                    }}
                  >
                    {o.product}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      color: S.green,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    {o.amount}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      color: S.muted,
                      fontSize: "0.8rem",
                    }}
                  >
                    {o.date}
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <span
                      style={{
                        background: `${statusColor[o.status]}22`,
                        color: statusColor[o.status],
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
                {["Product", "SKU", "Stock", "Sold", "Revenue", "Trend"].map(
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
              {products.map((p, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${S.border}` }}>
                  <td
                    style={{
                      padding: "10px 12px",
                      color: S.text,
                      fontSize: "0.8rem",
                    }}
                  >
                    {p.name}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      color: S.muted,
                      fontSize: "0.75rem",
                      fontFamily: "monospace",
                    }}
                  >
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
                  <td
                    style={{
                      padding: "10px 12px",
                      color: S.muted,
                      fontSize: "0.8rem",
                    }}
                  >
                    {p.sold}
                  </td>
                  <td
                    style={{
                      padding: "10px 12px",
                      color: S.green,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    {p.revenue}
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
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
                      <span style={{ color: S.muted, fontSize: "0.68rem" }}>
                        {p.trend}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
