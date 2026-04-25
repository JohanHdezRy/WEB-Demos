import type { RefObject } from "react";
import { Link } from "react-router-dom";
import { T } from "../data/tokens";
import { NAV_LINKS } from "../data/footerData";

interface NavbarProps {
  navRef: RefObject<HTMLElement | null>;
  menuOpen: boolean;
  onMenuToggle: () => void;
}

export function Navbar({ navRef, menuOpen, onMenuToggle }: NavbarProps) {
  return (
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
        padding: "16px 24px",
        gap: 32,
        transition: "background 0.4s, backdrop-filter 0.4s",
      }}
      className="cx-nav"
    >
      <span
        style={{
          fontWeight: 700,
          fontSize: "1rem",
          letterSpacing: "-0.03em",
          color: T.text,
          marginRight: 8,
        }}
      >
        Cloud<span style={{ opacity: 0.4 }}>X</span>
      </span>
      <Link
        to="/"
        style={{
          color: T.muted,
          fontSize: "0.75rem",
          textDecoration: "none",
        }}
      >
        ← Demos
      </Link>
      <div className="cx-nav-links">
        {NAV_LINKS.map((l) => (
          <a
            key={l}
            href="#"
            style={{
              color: T.muted,
              fontSize: "0.82rem",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
          >
            {l}
          </a>
        ))}
      </div>
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <a
          href="#"
          className="cx-signin"
          style={{
            color: T.muted,
            fontSize: "0.82rem",
            textDecoration: "none",
            padding: "9px 20px",
          }}
        >
          Sign in
        </a>
        <button
          className="cx-cta-btn"
          style={{
            background: T.accentBg,
            color: T.accentTx,
            border: "none",
            padding: "9px 22px",
            borderRadius: 9999,
            fontSize: "0.82rem",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0,0,0,0.26)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.26)";
          }}
        >
          Get started
        </button>
        <button
          className="cx-hamburger"
          onClick={onMenuToggle}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: T.text,
            display: "flex",
            flexDirection: "column",
            gap: 5,
            padding: 4,
          }}
          aria-label="Toggle menu"
        >
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "currentColor",
              transition: "transform 0.3s, opacity 0.3s",
              transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "currentColor",
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 0.3s",
            }}
          />
          <span
            style={{
              display: "block",
              width: 22,
              height: 2,
              background: "currentColor",
              transition: "transform 0.3s",
              transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>
    </nav>
  );
}
