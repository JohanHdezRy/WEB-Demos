export const DASHBOARD_GRID = [
  { id: "overview", label: "Overview", icon: "⊞", desc: "KPIs & charts" },
  { id: "ecommerce", label: "eCommerce", icon: "🛒", desc: "Orders & sales" },
  { id: "analytics", label: "Analytics", icon: "📊", desc: "Traffic & funnels" },
  { id: "customers", label: "Customers", icon: "👥", desc: "CRM & contacts" },
] as const;

export const SETTINGS_ITEMS = [
  { id: "messages", label: "Messages", icon: "💬" },
  { id: "reviews", label: "Reviews", icon: "⭐" },
  { id: "settings", label: "Settings", icon: "⚙" },
  { id: "help", label: "Help Centre", icon: "❓" },
] as const;
