import { useState } from "react";
import { Link } from "react-router-dom";
import { C } from "../data/tokens";

const NAV_ITEMS = ["Catalog", "The Roulette", "Artists", "City Sessions"];

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          background: `${C.bg}cc`,
          backdropFilter: "blur(20px)",
          boxShadow: `0 0 32px rgba(195,245,255,0.06)`,
          borderBottom: `1px solid ${C.outline}22`,
        }}
      >
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 2rem",
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: "1.1rem",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              color: C.text,
              textDecoration: "none",
            }}
          >
            NIGHTCITY RECORDS
          </Link>

          <div
            className="nc-nav-links"
            style={{ display: "flex", gap: "3rem", alignItems: "center" }}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "0.7rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: item === "The Roulette" ? C.accent : `${C.text}bb`,
                  borderBottom:
                    item === "The Roulette" ? `2px solid ${C.accent}` : "none",
                  paddingBottom: item === "The Roulette" ? "2px" : 0,
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                {item}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              className="nc-nav-cart"
              style={{
                background: "none",
                border: "none",
                color: C.primary,
                cursor: "pointer",
                fontSize: "1.25rem",
              }}
            >
              🛍
            </button>
            <button
              className="nc-hamburger"
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                display: "none",
                flexDirection: "column",
                gap: 5,
                background: "none",
                border: `1px solid ${C.outline}44`,
                borderRadius: 6,
                padding: "6px 8px",
                cursor: "pointer",
              }}
              aria-label="Menu"
            >
              <span
                style={{
                  display: "block",
                  width: 18,
                  height: 1.5,
                  background: C.text,
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
                  background: C.text,
                  opacity: menuOpen ? 0 : 1,
                  transition: "opacity 0.2s",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: 18,
                  height: 1.5,
                  background: C.text,
                  transition: "transform 0.3s",
                  transform: menuOpen
                    ? "translateY(-6.5px) rotate(-45deg)"
                    : "none",
                }}
              />
            </button>
          </div>
        </nav>
      </header>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 49,
            background: `${C.bg}f0`,
            backdropFilter: "blur(16px)",
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
              top: 20,
              right: 24,
              background: "none",
              border: "none",
              color: C.text,
              fontSize: "1.4rem",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href="#"
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "1.6rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                color: item === "The Roulette" ? C.accent : C.text,
                textDecoration: "none",
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
