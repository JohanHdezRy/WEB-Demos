import { useState } from "react";
import { S } from "./data/tokens";
import { SETTINGS_ITEMS } from "./data/navData";
import { useSectionTransition } from "./hooks/useSectionTransition";
import { Sidebar } from "./components/Sidebar";
import { Topbar } from "./components/Topbar";
import { RightPanel } from "./components/RightPanel";
import { OverviewSection } from "./components/OverviewSection";
import { ECommerceSection } from "./components/ECommerceSection";
import { AnalyticsSection } from "./components/AnalyticsSection";
import { CustomersSection } from "./components/CustomersSection";
import { PlaceholderSection } from "./components/PlaceholderSection";
import type { Section, SettingsSection } from "./types";

export function Dashboard() {
  const {
    activeSection,
    activeSettings,
    mainRef,
    changeSection,
    changeSettingsSection,
  } = useSectionTransition();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <Sidebar
        activeSection={activeSection}
        activeSettings={activeSettings}
        sidebarOpen={sidebarOpen}
        onChangeSection={(sec: Section) => changeSection(sec)}
        onChangeSettingsSection={(sec: SettingsSection) =>
          changeSettingsSection(sec)
        }
      />

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Topbar
          activeSection={activeSection}
          activeSettings={activeSettings}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />

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

      <RightPanel />

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
