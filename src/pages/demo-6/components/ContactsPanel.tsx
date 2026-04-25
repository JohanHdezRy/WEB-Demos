import { useState } from "react";
import { S, STATUS_COLOR } from "../data/tokens";
import { CONTACTS } from "../data/contactsData";

export function ContactsPanel() {
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
