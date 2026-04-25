import { S } from "../data/tokens";
import { NotificationsPanel } from "./NotificationsPanel";
import { ActivitiesPanel } from "./ActivitiesPanel";
import { ContactsPanel } from "./ContactsPanel";

export function RightPanel() {
  return (
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
  );
}
