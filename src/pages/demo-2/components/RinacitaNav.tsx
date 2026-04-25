import { type RefObject } from "react";
import { Link } from "react-router-dom";
import { C } from "../data/tokens";
import { NAV_LINKS } from "../data/footerData";

interface RinacitaNavProps {
  navRef: RefObject<HTMLElement | null>;
  menuOpen: boolean;
  setMenuOpen: (v: boolean | ((prev: boolean) => boolean)) => void;
}

export function RinacitaNav({
  navRef,
  menuOpen,
  setMenuOpen,
}: RinacitaNavProps) {
  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 48px",
          transition: "background 0.4s, backdrop-filter 0.4s",
        }}
      >
        <Link
          to="/"
          style={{
            color: C.muted,
            fontSize: "0.72rem",
            textDecoration: "none",
            letterSpacing: "0.5px",
          }}
        >
          ← Demos
        </Link>
        <span
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "1rem",
            fontWeight: 500,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: C.dark,
          }}
        >
          Rinacita
        </span>
        <div
          className="ri-nav-links"
          style={{ display: "flex", gap: 28, alignItems: "center" }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              style={{
                color: C.muted,
                fontSize: "0.78rem",
                textDecoration: "none",
                letterSpacing: "0.5px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.dark)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
            >
              {l}
            </a>
          ))}
          <button
            style={{
              background: C.dark,
              color: C.bg,
              border: "none",
              padding: "9px 22px",
              borderRadius: 9999,
              fontSize: "0.78rem",
              fontWeight: 500,
              cursor: "pointer",
              letterSpacing: "0.5px",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.72")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Reservar
          </button>
        </div>
        <button
          className="ri-hamburger"
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            display: "none",
            flexDirection: "column",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 4,
          }}
          aria-label="Menú"
        >
          <span
            style={{
              display: "block",
              width: 22,
              height: 1.5,
              background: C.dark,
              transition: "transform 0.3s",
              transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 1.5,
              background: C.dark,
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 0.2s",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 1.5,
              background: C.dark,
              transition: "transform 0.3s",
              transform: menuOpen
                ? "translateY(-6.5px) rotate(-45deg)"
                : "none",
            }}
          />
        </button>
      </nav>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99,
            background: C.bg,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: 24,
              right: 24,
              background: "none",
              border: "none",
              fontSize: "1.4rem",
              cursor: "pointer",
              color: C.dark,
            }}
            aria-label="Cerrar"
          >
            ✕
          </button>
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              onClick={() => setMenuOpen(false)}
              style={{
                color: C.dark,
                fontSize: "1.5rem",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                textDecoration: "none",
              }}
            >
              {l}
            </a>
          ))}
          <button
            style={{
              background: C.dark,
              color: C.bg,
              border: "none",
              padding: "12px 36px",
              borderRadius: 9999,
              fontSize: "0.9rem",
              fontWeight: 500,
              cursor: "pointer",
              marginTop: 8,
            }}
          >
            Reservar
          </button>
        </div>
      )}
    </>
  );
}
