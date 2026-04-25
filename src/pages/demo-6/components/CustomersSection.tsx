import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { S } from "../data/tokens";
import { MetricCard } from "./MetricCard";
import { LineChart } from "./LineChart";

const metrics = [
  {
    label: "Total Customers",
    value: 24820,
    change: "+340 this month",
    positive: true,
  },
  { label: "Active", value: 19640, change: "79% of total", positive: true },
  {
    label: "Churned (30d)",
    value: 284,
    change: "-12% vs last mo",
    positive: true,
  },
  {
    label: "NPS Score",
    value: "72",
    change: "Excellent",
    positive: true,
    donut: 72,
    donutColor: S.green,
  },
];

const customers = [
  {
    name: "Nataniel Donowan",
    email: "n.donowan@acme.com",
    plan: "Enterprise",
    ltv: "$28,400",
    joined: "Jan 2022",
    status: "Active",
    risk: "Low",
  },
  {
    name: "Sarah Mitchell",
    email: "sarah@bloom.co",
    plan: "Pro",
    ltv: "$12,100",
    joined: "Mar 2022",
    status: "Active",
    risk: "Low",
  },
  {
    name: "James Okonkwo",
    email: "james@nexio.io",
    plan: "Enterprise",
    ltv: "$44,200",
    joined: "Aug 2021",
    status: "Active",
    risk: "Low",
  },
  {
    name: "Yuki Tanaka",
    email: "yuki@tanaka.jp",
    plan: "Starter",
    ltv: "$3,800",
    joined: "Nov 2023",
    status: "At-risk",
    risk: "High",
  },
  {
    name: "Clara Osei",
    email: "c.osei@kobu.com",
    plan: "Enterprise",
    ltv: "$58,600",
    joined: "May 2021",
    status: "Active",
    risk: "Low",
  },
  {
    name: "Lena Kowalski",
    email: "lena@drift.eu",
    plan: "Pro",
    ltv: "$9,200",
    joined: "Jul 2023",
    status: "Churned",
    risk: "N/A",
  },
  {
    name: "Raj Patel",
    email: "raj@softex.in",
    plan: "Starter",
    ltv: "$2,400",
    joined: "Feb 2024",
    status: "Trial",
    risk: "Medium",
  },
];

const stageData = [
  { label: "Lead", value: 100 },
  { label: "Qualified", value: 72 },
  { label: "Demo", value: 51 },
  { label: "Proposal", value: 38 },
  { label: "Closed", value: 26 },
];

const statusColor: Record<string, string> = {
  Active: S.green,
  "At-risk": S.orange,
  Churned: S.red,
  Trial: S.blue,
};

const riskColor: Record<string, string> = {
  Low: S.green,
  Medium: S.yellow,
  High: S.red,
  "N/A": S.muted,
};

export function CustomersSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");

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

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
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
          <MetricCard key={i} {...m} />
        ))}
      </div>

      <div
        className="db-charts-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 16 }}
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
          <p style={{ color: S.text, fontWeight: 600, marginBottom: 14 }}>
            Sales Funnel
          </p>
          {stageData.map((s, i) => (
            <div key={s.label} style={{ marginBottom: 8 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <span style={{ color: S.muted, fontSize: "0.72rem" }}>
                  {s.label}
                </span>
                <span
                  style={{
                    color: S.text,
                    fontSize: "0.72rem",
                    fontWeight: 600,
                  }}
                >
                  {s.value}
                </span>
              </div>
              <div
                style={{
                  height: 6,
                  background: S.border,
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${s.value}%`,
                    height: "100%",
                    background: `hsl(${140 - i * 20},70%,45%)`,
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          ))}
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
              marginBottom: 14,
            }}
          >
            <p style={{ color: S.text, fontWeight: 600 }}>
              Customer Acquisition
            </p>
            <span style={{ color: S.muted, fontSize: "0.72rem" }}>
              Last 7 months
            </span>
          </div>
          <LineChart color={S.purple} />
          <div style={{ display: "flex", gap: 20, marginTop: 14 }}>
            {[
              { label: "New MRR", value: "$12,400", color: S.green },
              { label: "Expansion", value: "$4,200", color: S.blue },
              { label: "Churn MRR", value: "$-1,800", color: S.red },
            ].map((m) => (
              <div key={m.label} style={{ textAlign: "center" }}>
                <p style={{ color: S.muted, fontSize: "0.68rem" }}>{m.label}</p>
                <p
                  style={{ color: m.color, fontWeight: 700, fontSize: "1rem" }}
                >
                  {m.value}
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
          <p style={{ color: S.text, fontWeight: 600 }}>Customer List</p>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers..."
              style={{
                background: S.bg,
                border: `1px solid ${S.border}`,
                color: S.text,
                padding: "6px 12px",
                borderRadius: 6,
                fontSize: "0.75rem",
                outline: "none",
                width: 180,
              }}
            />
            <button
              style={{
                background: S.green,
                border: "none",
                color: "#0D1117",
                padding: "6px 14px",
                borderRadius: 6,
                fontSize: "0.75rem",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              + Add Customer
            </button>
          </div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[
                "Customer",
                "Email",
                "Plan",
                "LTV",
                "Joined",
                "Status",
                "Churn Risk",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    textAlign: "left",
                    color: S.muted,
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    padding: "8px 10px",
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
            {filtered.map((c, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${S.border}` }}>
                <td
                  style={{
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: `hsl(${i * 50 + 150},45%,38%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    {c.name[0]}
                  </div>
                  <span style={{ color: S.text, fontSize: "0.8rem" }}>
                    {c.name}
                  </span>
                </td>
                <td
                  style={{
                    padding: "10px",
                    color: S.muted,
                    fontSize: "0.75rem",
                  }}
                >
                  {c.email}
                </td>
                <td style={{ padding: "10px" }}>
                  <span
                    style={{
                      background: `${S.blue}18`,
                      color: S.blue,
                      borderRadius: 20,
                      padding: "2px 8px",
                      fontSize: "0.68rem",
                    }}
                  >
                    {c.plan}
                  </span>
                </td>
                <td
                  style={{
                    padding: "10px",
                    color: S.green,
                    fontWeight: 600,
                    fontSize: "0.8rem",
                  }}
                >
                  {c.ltv}
                </td>
                <td
                  style={{
                    padding: "10px",
                    color: S.muted,
                    fontSize: "0.75rem",
                  }}
                >
                  {c.joined}
                </td>
                <td style={{ padding: "10px" }}>
                  <span
                    style={{
                      background: `${statusColor[c.status] ?? S.muted}22`,
                      color: statusColor[c.status] ?? S.muted,
                      borderRadius: 20,
                      padding: "2px 8px",
                      fontSize: "0.68rem",
                      fontWeight: 600,
                    }}
                  >
                    {c.status}
                  </span>
                </td>
                <td style={{ padding: "10px" }}>
                  <span
                    style={{
                      color: riskColor[c.risk],
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    {c.risk}
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
