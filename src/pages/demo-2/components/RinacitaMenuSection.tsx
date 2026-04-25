import { type RefObject } from "react";
import { C } from "../data/tokens";
import { MENU_CARDS } from "../data/menuData";
import { MenuCard } from "./MenuCard";

interface RinacitaMenuSectionProps {
  menuRef: RefObject<HTMLElement | null>;
}

export function RinacitaMenuSection({ menuRef }: RinacitaMenuSectionProps) {
  return (
    <section ref={menuRef} style={{ padding: "80px 48px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          maxWidth: 1200,
          margin: "0 auto 44px",
        }}
      >
        <h2
          className="reveal"
          style={{
            margin: 0,
            fontSize: "clamp(1.6rem,3vw,2.4rem)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            color: C.dark,
          }}
        >
          Nuestra carta
        </h2>
        <a
          href="#"
          className="reveal"
          style={{
            color: C.muted,
            fontSize: "0.78rem",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
            letterSpacing: "0.5px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.dark)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
        >
          Ver menú completo
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <div
        className="ri-menu-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {MENU_CARDS.map((card, i) => (
          <div key={i} className="menu-card">
            <MenuCard card={card} idx={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
