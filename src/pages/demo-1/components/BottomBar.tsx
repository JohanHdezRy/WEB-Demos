import type { RefObject } from "react";
import { T } from "../data/tokens";
import { BOTTOM_BAR_LINKS } from "../data/footerData";

interface BottomBarProps {
  bottomBarRef: RefObject<HTMLDivElement | null>;
}

export function BottomBar({ bottomBarRef }: BottomBarProps) {
  return (
    <div
      className="cx-bottom-bar"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        borderTop: `1px solid ${T.border}`,
        background: "rgba(9,9,11,0.92)",
        backdropFilter: "blur(20px)",
        padding: "12px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          color: T.muted2,
          fontSize: "0.7rem",
          letterSpacing: "0.5px",
        }}
      >
        ©2026 Cloud X · All rights reserved
      </span>
      <div ref={bottomBarRef} style={{ display: "flex", gap: 24 }}>
        {BOTTOM_BAR_LINKS.map((l) => (
          <a
            key={l}
            href="#"
            style={{
              color: T.muted2,
              fontSize: "0.7rem",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = T.muted)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.muted2)}
          >
            {l}
          </a>
        ))}
      </div>
    </div>
  );
}
