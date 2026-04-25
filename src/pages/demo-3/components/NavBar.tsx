import type { RefObject } from "react";
import { T } from "../data/tokens";
import { NAV_LINKS } from "../data/galleryData";

interface NavBarProps {
  navRef: RefObject<HTMLElement | null>;
  menuOpen: boolean;
  setMenuOpen: (value: (prev: boolean) => boolean) => void;
}

export function NavBar({ navRef, menuOpen, setMenuOpen }: NavBarProps) {
  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          background: "transparent",
          transition: "background 0.4s, backdrop-filter 0.4s",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.6rem 2.5rem",
            maxWidth: 1440,
            margin: "0 auto",
          }}
        >
          <div
            className="lp-nav-links"
            style={{ display: "flex", gap: "2.8rem", alignItems: "center" }}
          >
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href="#"
                className="nav-link he-body"
                style={{
                  fontSize: "0.78rem",
                  letterSpacing: "0.05em",
                  fontWeight: i === 0 ? 700 : 400,
                  color: i === 0 ? T.onBg : "rgba(255,255,255,0.5)",
                }}
              >
                {link}
              </a>
            ))}
          </div>
          <div
            style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
          >
            <button
              className="nav-menu-btn he-body lp-nav-cta"
              style={{
                padding: "0.55rem 1.4rem",
                borderRadius: 9999,
                color: T.onBg,
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                cursor: "pointer",
              }}
            >
              Menu
            </button>
            <button
              className="lp-hamburger"
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                display: "none",
                flexDirection: "column",
                gap: 5,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 9999,
                width: 40,
                height: 40,
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Menu"
            >
              <span
                style={{
                  display: "block",
                  width: 18,
                  height: 1.5,
                  background: "#fff",
                  transition: "transform 0.3s",
                  transform: menuOpen
                    ? "translateY(6.5px) rotate(45deg)"
                    : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 18,
                  height: 1.5,
                  background: "#fff",
                  opacity: menuOpen ? 0 : 1,
                  transition: "opacity 0.2s",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 18,
                  height: 1.5,
                  background: "#fff",
                  transition: "transform 0.3s",
                  transform: menuOpen
                    ? "translateY(-6.5px) rotate(-45deg)"
                    : "none",
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 199,
            background: "rgba(13,13,13,0.97)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 36,
          }}
        >
          <button
            onClick={() => setMenuOpen(() => false)}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "1.4rem",
              cursor: "pointer",
            }}
          >
            &#x2715;
          </button>
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              onClick={() => setMenuOpen(() => false)}
              className="he-headline"
              style={{
                color: "#fff",
                fontSize: "2rem",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textDecoration: "none",
              }}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
