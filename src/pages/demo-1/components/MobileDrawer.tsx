import { T } from "../data/tokens";
import { NAV_LINKS } from "../data/footerData";

interface MobileDrawerProps {
  onClose: () => void;
}

export function MobileDrawer({ onClose }: MobileDrawerProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: T.bg,
        zIndex: 90,
        display: "flex",
        flexDirection: "column",
        padding: "100px 32px 48px",
        gap: 32,
      }}
    >
      {NAV_LINKS.map((l) => (
        <a
          key={l}
          href="#"
          onClick={onClose}
          style={{
            color: T.text,
            fontSize: "1.6rem",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            textDecoration: "none",
          }}
        >
          {l}
        </a>
      ))}
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <a
          href="#"
          style={{
            color: T.muted,
            fontSize: "0.9rem",
            textDecoration: "none",
          }}
        >
          Sign in
        </a>
        <button
          style={{
            background: T.accentBg,
            color: T.accentTx,
            border: "none",
            padding: "14px 24px",
            borderRadius: 9999,
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "pointer",
            width: "fit-content",
          }}
        >
          Get started
        </button>
      </div>
    </div>
  );
}
