import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

/* ═══════════════════════════════════════════════════════
   TYPES
═══════════════════════════════════════════════════════ */
type Section = "overview" | "ecommerce" | "analytics" | "customers";
type SettingsSection = "messages" | "reviews" | "settings" | "help";

interface Notification {
  id: number;
  icon: string;
  text: string;
  time: string;
}
interface Activity {
  id: number;
  text: string;
  done: boolean;
}
interface Contact {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: "online" | "busy" | "away" | "offline";
  highlight: boolean;
}

/* ═══════════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════════ */
const S = {
  bg: "#0D1117",
  surface: "#161B22",
  surface2: "#1C2128",
  border: "#21262D",
  green: "#3FB950",
  blue: "#58A6FF",
  orange: "#F0883E",
  red: "#F85149",
  purple: "#D2A8FF",
  yellow: "#E3B341",
  text: "#E6EDF3",
  muted: "#8B949E",
};

const STATUS_COLOR: Record<Contact["status"], string> = {
  online: S.green,
  busy: S.red,
  away: S.yellow,
  offline: S.muted,
};

/* ═══════════════════════════════════════════════════════
   STATIC DATA
═══════════════════════════════════════════════════════ */
const INIT_NOTIFICATIONS: Notification[] = [
  { id: 1, icon: "🛒", text: "New order #4521 received", time: "2m ago" },
  { id: 2, icon: "💳", text: "Payment confirmed $299", time: "14m ago" },
  { id: 3, icon: "📦", text: "Shipment delivered to NY", time: "1h ago" },
  { id: 4, icon: "⚠️", text: "Low stock: SKU-8821", time: "3h ago" },
  { id: 5, icon: "🧑", text: "New user registered", time: "5h ago" },
];

const INIT_ACTIVITIES: Activity[] = [
  { id: 1, text: "Review Q2 financial report", done: false },
  { id: 2, text: "Update product pricing model", done: true },
  { id: 3, text: "Team standup @ 9am", done: true },
  { id: 4, text: "Send proposal to Acme Corp", done: false },
  { id: 5, text: "Audit inventory SKU-88xx series", done: false },
  { id: 6, text: "Schedule Q3 planning session", done: false },
];

const CONTACTS: Contact[] = [
  {
    id: 1,
    name: "Nataniel Donowan",
    role: "Sales Lead",
    email: "n.donowan@co.com",
    phone: "+1 555 0101",
    status: "online",
    highlight: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Account Mgr",
    email: "priya@co.com",
    phone: "+1 555 0102",
    status: "busy",
    highlight: false,
  },
  {
    id: 3,
    name: "Marco Torres",
    role: "Support",
    email: "marco@co.com",
    phone: "+1 555 0103",
    status: "online",
    highlight: false,
  },
  {
    id: 4,
    name: "Julia Chen",
    role: "Marketing",
    email: "julia@co.com",
    phone: "+1 555 0104",
    status: "away",
    highlight: false,
  },
  {
    id: 5,
    name: "Amir Hassan",
    role: "DevOps",
    email: "amir@co.com",
    phone: "+1 555 0105",
    status: "offline",
    highlight: false,
  },
];

const DASHBOARD_GRID = [
  { id: "overview", label: "Overview", icon: "⊞", desc: "KPIs & charts" },
  { id: "ecommerce", label: "eCommerce", icon: "🛒", desc: "Orders & sales" },
  {
    id: "analytics",
    label: "Analytics",
    icon: "📊",
    desc: "Traffic & funnels",
  },
  { id: "customers", label: "Customers", icon: "👥", desc: "CRM & contacts" },
] as const;

const SETTINGS_ITEMS = [
  { id: "messages", label: "Messages", icon: "💬" },
  { id: "reviews", label: "Reviews", icon: "⭐" },
  { id: "settings", label: "Settings", icon: "⚙" },
  { id: "help", label: "Help Centre", icon: "❓" },
] as const;

/* ═══════════════════════════════════════════════════════
   SHARED CHARTS
═══════════════════════════════════════════════════════ */
function DonutChart({
  pct,
  size = 80,
  stroke = 10,
  color = S.green,
}: {
  pct: number;
  size?: number;
  stroke?: number;
  color?: string;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const ref = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { strokeDashoffset: circ },
        {
          strokeDashoffset: circ - dash,
          duration: 1.5,
          delay: 0.4,
          ease: "power2.out",
        },
      );
    }
  }, [circ, dash]);

  return (
    <svg
      width={size}
      height={size}
      style={{ transform: "rotate(-90deg)", flexShrink: 0 }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={S.border}
        strokeWidth={stroke}
      />
      <circle
        ref={ref}
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={circ}
        strokeLinecap="round"
      />
    </svg>
  );
}

function Sparkline({ color = S.green }: { color?: string }) {
  const ref = useRef<SVGPathElement>(null);
  const points = [10, 20, 12, 28, 18, 35, 25, 40, 30, 45];
  const w = 100;
  const h = 40;
  const d = points
    .map(
      (p, i) =>
        `${i === 0 ? "M" : "L"} ${(i / (points.length - 1)) * w} ${h - p}`,
    )
    .join(" ");

  useEffect(() => {
    if (ref.current) {
      const len = ref.current.getTotalLength();
      gsap.fromTo(
        ref.current,
        { strokeDashoffset: len, strokeDasharray: len },
        { strokeDashoffset: 0, duration: 1.5, delay: 0.8, ease: "power2.out" },
      );
    }
  }, []);

  return (
    <svg width="100" height="40" viewBox={`0 0 ${w} ${h}`}>
      <path
        ref={ref}
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LineChart({ color = S.green }: { color?: string }) {
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

function BarChart({
  data,
  height = 80,
  color = S.blue,
}: {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
}) {
  const barsRef = useRef<(SVGRectElement | null)[]>([]);
  const max = Math.max(...data.map((d) => d.value));
  const w = 300;
  const barW = Math.floor(w / data.length) - 4;

  useEffect(() => {
    barsRef.current.forEach((bar, i) => {
      if (!bar) return;
      const finalH = (data[i].value / max) * height;
      gsap.fromTo(
        bar,
        { attr: { height: 0, y: height } },
        {
          attr: { height: finalH, y: height - finalH },
          duration: 0.8,
          delay: 0.3 + i * 0.07,
          ease: "power2.out",
        },
      );
    });
  }, [data, max, height]);

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

/* ═══════════════════════════════════════════════════════
   METRIC CARD
═══════════════════════════════════════════════════════ */
function MetricCard({
  label,
  value,
  change,
  positive,
  prefix = "",
  suffix = "",
  donut,
  donutColor = S.green,
}: {
  label: string;
  value: string | number;
  change: string;
  positive: boolean;
  prefix?: string;
  suffix?: string;
  donut?: number;
  donutColor?: string;
}) {
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

/* ═══════════════════════════════════════════════════════
   SECTION: OVERVIEW
═══════════════════════════════════════════════════════ */
function OverviewSection() {
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

  return (
    <div
      ref={ref}
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      {/* Metrics */}
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

      {/* Charts row */}
      <div className="db-charts-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Sales donut */}
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

        {/* Revenue trend */}
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

      {/* Customer table */}
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

/* ═══════════════════════════════════════════════════════
   SECTION: ECOMMERCE
═══════════════════════════════════════════════════════ */
function ECommerceSection() {
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

  return (
    <div
      ref={ref}
      style={{ display: "flex", flexDirection: "column", gap: 20 }}
    >
      {/* Metrics */}
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

      {/* Charts */}
      <div
        className="db-charts-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 16 }}
      >
        {/* Monthly revenue bar */}
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

        {/* Top categories with sparklines */}
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

      {/* Orders / Products table */}
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

/* ═══════════════════════════════════════════════════════
   SECTION: ANALYTICS
═══════════════════════════════════════════════════════ */
function AnalyticsSection() {
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
        className="db-charts-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}
      >
        {/* Traffic over time */}
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

        {/* Devices + Traffic sources */}
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

      {/* Top pages */}
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

/* ═══════════════════════════════════════════════════════
   SECTION: CUSTOMERS (CRM)
═══════════════════════════════════════════════════════ */
function CustomersSection() {
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

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

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

      {/* Funnel + Lifetime value */}
      <div
        className="db-charts-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 16 }}
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

      {/* Customer table */}
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

/* ═══════════════════════════════════════════════════════
   PLACEHOLDER for SETTINGS sections
═══════════════════════════════════════════════════════ */
function PlaceholderSection({ title, icon }: { title: string; icon: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        gap: 16,
        opacity: 0.4,
      }}
    >
      <span style={{ fontSize: "3rem" }}>{icon}</span>
      <p style={{ color: S.text, fontSize: "1.2rem", fontWeight: 600 }}>
        {title}
      </p>
      <p style={{ color: S.muted, fontSize: "0.85rem" }}>
        This section is under construction.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   RIGHT PANEL: NOTIFICATIONS
═══════════════════════════════════════════════════════ */
function NotificationsPanel() {
  const [items, setItems] = useState<Notification[]>(INIT_NOTIFICATIONS);
  const [clearing, setClearing] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const animateOut = useCallback((targets: Element[], onDone: () => void) => {
    gsap.to(targets, {
      x: 60,
      opacity: 0,
      height: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.35,
      stagger: 0.05,
      ease: "power2.in",
      onComplete: onDone,
    });
  }, []);

  const animateIn = useCallback((targets: Element[]) => {
    gsap.fromTo(
      targets,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.07, ease: "power2.out" },
    );
  }, []);

  const clearAll = useCallback(() => {
    if (clearing || !listRef.current) return;
    setClearing(true);
    const els = Array.from(listRef.current.querySelectorAll(".notif-item"));
    animateOut(els, () => {
      setItems([]);
      setClearing(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setItems(INIT_NOTIFICATIONS);
      }, 25000);
    });
  }, [clearing, animateOut]);

  const dismissOne = useCallback((id: number) => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector(`[data-notif="${id}"]`);
    if (!el) return;
    gsap.to(el, {
      x: 60,
      opacity: 0,
      height: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => setItems((prev) => prev.filter((n) => n.id !== id)),
    });
  }, []);

  // Animate in when items repopulate
  useEffect(() => {
    if (!items.length || !listRef.current) return;
    const els = Array.from(listRef.current.querySelectorAll(".notif-item"));
    if (els.length) animateIn(els);
  }, [items.length, animateIn]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  return (
    <div style={{ padding: "0 14px 16px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <p style={{ color: S.text, fontWeight: 600, fontSize: "0.85rem" }}>
          Notifications
        </p>
        {items.length > 0 && (
          <button
            onClick={clearAll}
            style={{
              background: "transparent",
              border: `1px solid ${S.border}`,
              color: S.muted,
              padding: "3px 8px",
              borderRadius: 5,
              fontSize: "0.62rem",
              cursor: "pointer",
              letterSpacing: "0.5px",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.color = S.red;
              (e.target as HTMLElement).style.borderColor = S.red;
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.color = S.muted;
              (e.target as HTMLElement).style.borderColor = S.border;
            }}
          >
            Clear all
          </button>
        )}
      </div>

      <div
        ref={listRef}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        {items.length === 0 ? (
          <p
            style={{
              color: S.muted,
              fontSize: "0.72rem",
              textAlign: "center",
              padding: "12px 0",
            }}
          >
            No notifications · reappearing soon…
          </p>
        ) : (
          items.map((n) => (
            <div
              key={n.id}
              data-notif={n.id}
              className="notif-item"
              style={{
                display: "flex",
                gap: 8,
                padding: "9px 10px",
                background: S.bg,
                borderRadius: 8,
                border: `1px solid ${S.border}`,
                cursor: "pointer",
                overflow: "hidden",
              }}
              onClick={() => dismissOne(n.id)}
            >
              <span style={{ fontSize: "0.95rem", flexShrink: 0 }}>
                {n.icon}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{ color: S.text, fontSize: "0.7rem", lineHeight: 1.4 }}
                >
                  {n.text}
                </p>
                <p style={{ color: S.muted, fontSize: "0.6rem", marginTop: 2 }}>
                  {n.time}
                </p>
              </div>
              <span
                style={{
                  color: S.muted,
                  fontSize: "0.65rem",
                  flexShrink: 0,
                  paddingTop: 1,
                }}
              >
                ✕
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   RIGHT PANEL: ACTIVITIES
═══════════════════════════════════════════════════════ */
function ActivitiesPanel() {
  const [activities, setActivities] = useState<Activity[]>(INIT_ACTIVITIES);

  const toggle = useCallback(
    (id: number) => {
      const el = document.querySelector(
        `[data-activity="${id}"] .activity-text`,
      ) as HTMLElement | null;
      const isDone = activities.find((a) => a.id === id)?.done;
      if (el) {
        gsap.to(el, {
          textDecoration: isDone ? "none" : "line-through",
          opacity: isDone ? 1 : 0.45,
          duration: 0.25,
        });
      }
      setActivities((prev) =>
        prev.map((a) => (a.id === id ? { ...a, done: !a.done } : a)),
      );
    },
    [activities],
  );

  return (
    <div
      style={{ borderTop: `1px solid ${S.border}`, padding: "14px 14px 16px" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <p style={{ color: S.text, fontWeight: 600, fontSize: "0.85rem" }}>
          Activities
        </p>
        <span style={{ color: S.muted, fontSize: "0.65rem" }}>
          {activities.filter((a) => a.done).length}/{activities.length} done
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {activities.map((a) => (
          <div
            key={a.id}
            data-activity={a.id}
            onClick={() => toggle(a.id)}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "flex-start",
              cursor: "pointer",
              padding: "4px 0",
            }}
          >
            {/* Checkbox */}
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 3,
                flexShrink: 0,
                marginTop: 2,
                border: `1.5px solid ${a.done ? S.green : S.muted}`,
                background: a.done ? S.green : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
              }}
            >
              {a.done && (
                <span
                  style={{
                    color: "#0D1117",
                    fontSize: "0.6rem",
                    lineHeight: 1,
                  }}
                >
                  ✓
                </span>
              )}
            </div>
            <p
              className="activity-text"
              style={{
                color: a.done ? S.muted : S.text,
                fontSize: "0.74rem",
                lineHeight: 1.4,
                textDecoration: a.done ? "line-through" : "none",
                opacity: a.done ? 0.45 : 1,
                transition: "color 0.2s",
              }}
            >
              {a.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   RIGHT PANEL: CONTACTS
═══════════════════════════════════════════════════════ */
function ContactsPanel() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div style={{ borderTop: `1px solid ${S.border}`, padding: "14px 14px 0" }}>
      <p
        style={{
          color: S.text,
          fontWeight: 600,
          marginBottom: 10,
          fontSize: "0.85rem",
        }}
      >
        Contacts
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {CONTACTS.map((c) => (
          <div
            key={c.id}
            className="right-item"
            style={{ position: "relative" }}
            onMouseEnter={() => setHoveredId(c.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "7px 9px",
                borderRadius: 8,
                background: c.highlight ? `${S.green}14` : "transparent",
                border: c.highlight
                  ? `1px solid ${S.green}30`
                  : "1px solid transparent",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
            >
              {/* Avatar */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: c.highlight
                      ? S.green
                      : `hsl(${c.id * 60 + 200},40%,40%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  {c.name[0]}
                </div>
                {/* Status dot */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: STATUS_COLOR[c.status],
                    border: `1.5px solid ${S.surface}`,
                  }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    color: c.highlight ? S.green : S.text,
                    fontSize: "0.74rem",
                    fontWeight: c.highlight ? 600 : 400,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.name}
                </p>
                <p style={{ color: S.muted, fontSize: "0.6rem" }}>{c.role}</p>
              </div>
            </div>

            {/* Hover popup */}
            {hoveredId === c.id && (
              <div
                style={{
                  position: "absolute",
                  left: "105%",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: S.surface2,
                  border: `1px solid ${S.border}`,
                  borderRadius: 8,
                  padding: "10px 12px",
                  zIndex: 100,
                  minWidth: 180,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                  pointerEvents: "none",
                }}
              >
                {/* Arrow */}
                <div
                  style={{
                    position: "absolute",
                    right: "100%",
                    top: "50%",
                    transform: "translateY(-50%)",
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    borderRight: `5px solid ${S.border}`,
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: c.highlight
                        ? S.green
                        : `hsl(${c.id * 60 + 200},40%,40%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    {c.name[0]}
                  </div>
                  <div>
                    <p
                      style={{
                        color: S.text,
                        fontSize: "0.78rem",
                        fontWeight: 600,
                      }}
                    >
                      {c.name}
                    </p>
                    <p style={{ color: S.muted, fontSize: "0.62rem" }}>
                      {c.role}
                    </p>
                  </div>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 4 }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <span style={{ fontSize: "0.65rem" }}>✉</span>
                    <span style={{ color: S.muted, fontSize: "0.68rem" }}>
                      {c.email}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <span style={{ fontSize: "0.65rem" }}>📞</span>
                    <span style={{ color: S.muted, fontSize: "0.68rem" }}>
                      {c.phone}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 2,
                    }}
                  >
                    <div
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: STATUS_COLOR[c.status],
                      }}
                    />
                    <span
                      style={{
                        color: STATUS_COLOR[c.status],
                        fontSize: "0.68rem",
                        textTransform: "capitalize",
                      }}
                    >
                      {c.status}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN DASHBOARD
═══════════════════════════════════════════════════════ */
export function Dashboard() {
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [activeSettings, setActiveSettings] = useState<SettingsSection | null>(
    null,
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  const sectionLabels: Record<Section, string> = {
    overview: "Overview",
    ecommerce: "eCommerce",
    analytics: "Analytics",
    customers: "Customers",
  };

  const changeSection = (sec: Section) => {
    if (!mainRef.current || sec === activeSection) return;
    gsap.to(mainRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveSection(sec);
        setActiveSettings(null);
        gsap.to(mainRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      },
    });
  };

  const changeSettingsSection = (sec: SettingsSection) => {
    if (!mainRef.current) return;
    gsap.to(mainRef.current, {
      opacity: 0,
      y: 8,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setActiveSettings(sec);
        gsap.to(mainRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      },
    });
  };

  // Sidebar entrance
  const sidebarRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", {
        x: -16,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.1,
      });
    }, sidebarRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      style={{
        fontFamily: "var(--font-poppins)",
        background: S.bg,
        minHeight: "100vh",
        display: "flex",
        color: S.text,
        fontSize: "0.85rem",
      }}
    >
      {/* ── Sidebar ── */}
      <aside
        ref={sidebarRef}
        className={`db-sidebar${sidebarOpen ? " db-sidebar-open" : ""}`}
        style={{
          width: 220,
          background: S.surface,
          borderRight: `1px solid ${S.border}`,
          display: "flex",
          flexDirection: "column",
          padding: "20px 0",
          flexShrink: 0,
        }}
      >
        {/* Back */}
        <div style={{ padding: "0 10px 12px" }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              color: S.muted,
              textDecoration: "none",
              fontSize: "0.72rem",
              padding: "7px 10px",
              borderRadius: 6,
              border: `1px solid ${S.border}`,
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = S.text;
              (e.currentTarget as HTMLElement).style.borderColor = S.muted;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = S.muted;
              (e.currentTarget as HTMLElement).style.borderColor = S.border;
            }}
          >
            ← Back to Demos
          </Link>
        </div>

        {/* Logo */}
        <div
          style={{
            padding: "0 20px 22px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", gap: 3 }}>
            {[S.green, "#2EA043", "#1A7F37"].map((c, i) => (
              <div
                key={i}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontWeight: 800,
              fontSize: "0.95rem",
              letterSpacing: "1px",
            }}
          >
            DWIS·M
          </span>
        </div>

        {/* Search */}
        <div style={{ padding: "0 10px 18px" }}>
          <div
            style={{
              background: S.bg,
              border: `1px solid ${S.border}`,
              borderRadius: 7,
              padding: "7px 10px",
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            <span style={{ color: S.muted, fontSize: "0.72rem" }}>🔍</span>
            <span style={{ color: S.muted, fontSize: "0.72rem" }}>
              Search...
            </span>
          </div>
        </div>

        {/* DASHBOARDS — 2x2 grid */}
        <div style={{ padding: "0 10px 10px" }}>
          <p
            style={{
              color: S.muted,
              fontSize: "0.58rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              padding: "0 6px 8px",
              fontWeight: 600,
            }}
          >
            DASHBOARDS
          </p>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}
          >
            {DASHBOARD_GRID.map((item) => {
              const isActive = activeSection === item.id && !activeSettings;
              return (
                <button
                  key={item.id}
                  className="nav-item"
                  onClick={() => changeSection(item.id as Section)}
                  style={{
                    background: isActive ? `${S.green}18` : S.bg,
                    border: `1px solid ${isActive ? S.green + "60" : S.border}`,
                    borderRadius: 8,
                    padding: "10px 6px",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "background 0.2s, border-color 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                  <p
                    style={{
                      color: isActive ? S.green : S.text,
                      fontSize: "0.68rem",
                      fontWeight: isActive ? 600 : 400,
                      lineHeight: 1,
                    }}
                  >
                    {item.label}
                  </p>
                  <p
                    style={{
                      color: S.muted,
                      fontSize: "0.55rem",
                      lineHeight: 1,
                    }}
                  >
                    {item.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* SETTINGS — vertical list */}
        <div style={{ padding: "10px 10px 0" }}>
          <p
            style={{
              color: S.muted,
              fontSize: "0.58rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              padding: "0 6px 8px",
              fontWeight: 600,
            }}
          >
            SETTINGS
          </p>
          {SETTINGS_ITEMS.map((item) => {
            const isActive = activeSettings === item.id;
            return (
              <div
                key={item.id}
                className="nav-item"
                onClick={() =>
                  changeSettingsSection(item.id as SettingsSection)
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "8px 10px",
                  cursor: "pointer",
                  borderRadius: 6,
                  margin: "1px 0",
                  background: isActive ? `${S.green}14` : "transparent",
                  borderLeft: `2px solid ${isActive ? S.green : "transparent"}`,
                  transition: "background 0.2s",
                }}
              >
                <span style={{ fontSize: "0.82rem" }}>{item.icon}</span>
                <span
                  style={{
                    color: isActive ? S.green : S.muted,
                    fontSize: "0.78rem",
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </aside>

      {/* ── Main ── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Topbar */}
        <div
          style={{
            background: S.surface,
            borderBottom: `1px solid ${S.border}`,
            padding: "11px 22px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <button
            className="db-hamburger"
            onClick={() => setSidebarOpen((v) => !v)}
            style={{ display: "none", flexDirection: "column", gap: 4, background: "none", border: "none", cursor: "pointer", padding: 4, marginRight: 4 }}
            aria-label="Toggle sidebar"
          >
            <span style={{ display: "block", width: 18, height: 1.5, background: S.muted }} />
            <span style={{ display: "block", width: 18, height: 1.5, background: S.muted }} />
            <span style={{ display: "block", width: 18, height: 1.5, background: S.muted }} />
          </button>
          <div style={{ color: S.muted, fontSize: "0.76rem" }}>
            <span>Dashboards</span>
            <span style={{ margin: "0 6px", opacity: 0.4 }}>/</span>
            <span style={{ color: S.text, fontWeight: 600 }}>
              {activeSettings
                ? SETTINGS_ITEMS.find((i) => i.id === activeSettings)?.label
                : sectionLabels[activeSection]}
            </span>
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <button
              style={{
                background: S.bg,
                border: `1px solid ${S.border}`,
                color: S.text,
                padding: "5px 12px",
                borderRadius: 6,
                fontSize: "0.72rem",
                cursor: "pointer",
              }}
            >
              Apr 2025 ▾
            </button>
            {["🔔", "⚙", "👤"].map((icon) => (
              <button
                key={icon}
                style={{
                  background: S.bg,
                  border: `1px solid ${S.border}`,
                  color: S.text,
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: "0.82rem",
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div
          ref={mainRef}
          style={{ flex: 1, overflowY: "auto", padding: "22px" }}
        >
          {activeSettings ? (
            <PlaceholderSection
              title={
                SETTINGS_ITEMS.find((i) => i.id === activeSettings)?.label ?? ""
              }
              icon={
                SETTINGS_ITEMS.find((i) => i.id === activeSettings)?.icon ?? ""
              }
            />
          ) : activeSection === "overview" ? (
            <OverviewSection />
          ) : activeSection === "ecommerce" ? (
            <ECommerceSection />
          ) : activeSection === "analytics" ? (
            <AnalyticsSection />
          ) : (
            <CustomersSection />
          )}
        </div>
      </main>

      {/* ── Right Panel ── */}
      <aside
        className="db-right-panel"
        style={{
          width: 268,
          background: S.surface,
          borderLeft: `1px solid ${S.border}`,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <div style={{ padding: "18px 0 0" }}>
          <NotificationsPanel />
          <ActivitiesPanel />
          <ContactsPanel />
        </div>
      </aside>
      <style>{`
        @media (max-width: 1024px) {
          .db-right-panel { display: none !important; }
        }
        @media (max-width: 768px) {
          .db-sidebar { position: fixed !important; top: 0 !important; left: 0 !important; height: 100% !important; z-index: 200 !important; transform: translateX(-100%) !important; transition: transform 0.3s ease !important; }
          .db-sidebar.db-sidebar-open { transform: translateX(0) !important; }
          .db-hamburger { display: flex !important; }
          .db-metrics-grid { grid-template-columns: repeat(2,1fr) !important; }
          .db-charts-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .db-metrics-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
