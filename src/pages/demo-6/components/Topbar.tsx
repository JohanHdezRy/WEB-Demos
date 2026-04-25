import { S } from "../data/tokens";
import { SETTINGS_ITEMS } from "../data/navData";
import type { Section, SettingsSection } from "../types";

interface TopbarProps {
  activeSection: Section;
  activeSettings: SettingsSection | null;
  onToggleSidebar: () => void;
}

const sectionLabels: Record<Section, string> = {
  overview: "Overview",
  ecommerce: "eCommerce",
  analytics: "Analytics",
  customers: "Customers",
};

export function Topbar({
  activeSection,
  activeSettings,
  onToggleSidebar,
}: TopbarProps) {
  return (
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
        onClick={onToggleSidebar}
        style={{
          display: "none",
          flexDirection: "column",
          gap: 4,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 4,
          marginRight: 4,
        }}
        aria-label="Toggle sidebar"
      >
        <span
          style={{
            display: "block",
            width: 18,
            height: 1.5,
            background: S.muted,
          }}
        />
        <span
          style={{
            display: "block",
            width: 18,
            height: 1.5,
            background: S.muted,
          }}
        />
        <span
          style={{
            display: "block",
            width: 18,
            height: 1.5,
            background: S.muted,
          }}
        />
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
  );
}
