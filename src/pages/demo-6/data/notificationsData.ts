import type { Notification } from "../types";

export const INIT_NOTIFICATIONS: Notification[] = [
  { id: 1, icon: "🛒", text: "New order #4521 received", time: "2m ago" },
  { id: 2, icon: "💳", text: "Payment confirmed $299", time: "14m ago" },
  { id: 3, icon: "📦", text: "Shipment delivered to NY", time: "1h ago" },
  { id: 4, icon: "⚠️", text: "Low stock: SKU-8821", time: "3h ago" },
  { id: 5, icon: "🧑", text: "New user registered", time: "5h ago" },
];
