import { S } from "../data/tokens";

interface PlaceholderSectionProps {
  title: string;
  icon: string;
}

export function PlaceholderSection({ title, icon }: PlaceholderSectionProps) {
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
