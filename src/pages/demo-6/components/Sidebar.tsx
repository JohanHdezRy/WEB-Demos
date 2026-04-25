import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { S } from "../data/tokens";
import { DASHBOARD_GRID, SETTINGS_ITEMS } from "../data/navData";
import type { Section, SettingsSection } from "../types";

interface SidebarProps {
  activeSection: Section;
  activeSettings: SettingsSection | null;
  sidebarOpen: boolean;
  onChangeSection: (sec: Section) => void;
  onChangeSettingsSection: (sec: SettingsSection) => void;
}

export function Sidebar({
  activeSection,
  activeSettings,
  sidebarOpen,
  onChangeSection,
  onChangeSettingsSection,
}: SidebarProps) {
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
          style={{ fontWeight: 800, fontSize: "0.95rem", letterSpacing: "1px" }}
        >
          DWIS·M
        </span>
      </div>

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
          <span style={{ color: S.muted, fontSize: "0.72rem" }}>Search...</span>
        </div>
      </div>

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
                onClick={() => onChangeSection(item.id as Section)}
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
                  style={{ color: S.muted, fontSize: "0.55rem", lineHeight: 1 }}
                >
                  {item.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

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
                onChangeSettingsSection(item.id as SettingsSection)
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
  );
}
