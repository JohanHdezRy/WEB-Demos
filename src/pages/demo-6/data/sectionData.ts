import { S } from "./tokens";

export interface MetricItem {
  label: string;
  value: string | number;
  change: string;
  positive: boolean;
  prefix?: string;
  donut?: number;
}

// ── Overview ──────────────────────────────────────────────
export const OVERVIEW_METRICS: MetricItem[] = [
  { label: "Net Revenue",   value: 3131021, change: "+0.4% this month",  positive: true,  prefix: "$" },
  { label: "ARR",           value: 1511121, change: "+32% YoY",          positive: true,  prefix: "$" },
  { label: "Revenue Goal",  value: "71%",   change: "Quarterly target",  positive: true,  donut: 71 },
  { label: "New Orders",    value: 18221,   change: "+11% this week",    positive: true },
];

export const OVERVIEW_CATEGORIES = [
  { label: "Electronics", value: 35, color: S.green },
  { label: "Furniture",   value: 28, color: S.blue },
  { label: "Clothes",     value: 22, color: S.orange },
  { label: "Shoes",       value: 15, color: S.purple },
];

export const OVERVIEW_CUSTOMERS = [
  { name: "Nataniel Donowan", deals: 12, value: "$8,420",  status: "Active"  },
  { name: "Sarah Mitchell",   deals: 8,  value: "$5,100",  status: "Active"  },
  { name: "James Okonkwo",    deals: 15, value: "$11,200", status: "VIP"     },
  { name: "Yuki Tanaka",      deals: 6,  value: "$3,800",  status: "At-risk" },
  { name: "Clara Osei",       deals: 20, value: "$14,600", status: "VIP"     },
];

export const OVERVIEW_STATUS_COLOR: Record<string, string> = {
  Active:    S.green,
  VIP:       S.blue,
  "At-risk": S.red,
};

// ── ECommerce ─────────────────────────────────────────────
export const ECOM_METRICS: MetricItem[] = [
  { label: "Total Sales",      value: 84210, change: "+8.4% this month",  positive: true,  prefix: "$" },
  { label: "Orders Today",     value: 142,   change: "+23 vs yesterday",  positive: true },
  { label: "Avg Order Value",  value: 593,   change: "-$12 vs last wk",   positive: false, prefix: "$" },
  { label: "Refund Rate",      value: "2.1%", change: "of total orders",  positive: true,  donut: 2 },
];

export const ECOM_ORDERS = [
  { id: "#ORD-4521", customer: "Nataniel D.", product: 'MacBook Pro 14"',     amount: "$2,399", date: "Apr 12", status: "Delivered"  },
  { id: "#ORD-4520", customer: "Sarah M.",    product: "AirPods Pro",         amount: "$249",   date: "Apr 12", status: "Shipped"    },
  { id: "#ORD-4519", customer: "James O.",    product: "iPad Air M2",         amount: "$599",   date: "Apr 11", status: "Processing" },
  { id: "#ORD-4518", customer: "Yuki T.",     product: "Apple Watch S9",      amount: "$399",   date: "Apr 11", status: "Cancelled"  },
  { id: "#ORD-4517", customer: "Clara O.",    product: "iPhone 16 Pro",       amount: "$1,099", date: "Apr 10", status: "Delivered"  },
  { id: "#ORD-4516", customer: "Amir H.",     product: 'Samsung 4K TV 65"',   amount: "$1,299", date: "Apr 10", status: "Shipped"    },
  { id: "#ORD-4515", customer: "Lena K.",     product: "Sony WH-1000XM5",     amount: "$349",   date: "Apr 09", status: "Delivered"  },
];

export const ECOM_PRODUCTS = [
  { name: 'MacBook Pro 14"',   sku: "APL-MBP14", stock: 48,  sold: 312, revenue: "$748k", trend: 92 },
  { name: "iPhone 16 Pro",     sku: "APL-I16P",  stock: 120, sold: 892, revenue: "$980k", trend: 98 },
  { name: "iPad Air M2",       sku: "APL-IPAM2", stock: 65,  sold: 254, revenue: "$152k", trend: 74 },
  { name: "AirPods Pro 2",     sku: "APL-APP2",  stock: 200, sold: 567, revenue: "$141k", trend: 86 },
  { name: "Apple Watch S9",    sku: "APL-AWS9",  stock: 33,  sold: 189, revenue: "$75k",  trend: 68 },
  { name: 'Samsung 4K TV 65"', sku: "SAM-4K65",  stock: 12,  sold: 98,  revenue: "$127k", trend: 71 },
];

export const ECOM_MONTHLY = [
  { label: "Oct", value: 62 },
  { label: "Nov", value: 70 },
  { label: "Dec", value: 95 },
  { label: "Jan", value: 58 },
  { label: "Feb", value: 74 },
  { label: "Mar", value: 83 },
  { label: "Apr", value: 91 },
];

export const ECOM_STATUS_COLOR: Record<string, string> = {
  Delivered:  S.green,
  Shipped:    S.blue,
  Processing: S.yellow,
  Cancelled:  S.red,
};
