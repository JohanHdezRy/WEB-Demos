import { C } from "../data/tokens";
import { FOOTER_COLUMNS, SOCIAL_LINKS, LEGAL_LINKS } from "../data/footerData";

export function RinacitaFooter() {
  return (
    <>
      <footer
        className="ri-footer-grid"
        style={{
          borderTop: `1px solid ${C.border}`,
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
          gap: 48,
          padding: "64px 64px 48px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "1rem",
              fontWeight: 500,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              margin: "0 0 14px",
              color: C.dark,
            }}
          >
            Rinacita
          </p>
          <p
            style={{
              color: C.muted,
              fontSize: "0.82rem",
              lineHeight: 1.75,
              maxWidth: 220,
              margin: "0 0 24px",
            }}
          >
            Cucina italiana auténtica desde 1987.
            <br />
            Via Navigli 14, Milano.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            {SOCIAL_LINKS.map((ic) => (
              <a
                key={ic}
                href="#"
                style={{
                  color: C.muted2,
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.muted)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.muted2)}
              >
                {ic}
              </a>
            ))}
          </div>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <div key={col.title}>
            <p
              style={{
                color: C.muted2,
                fontSize: "0.62rem",
                letterSpacing: "2px",
                textTransform: "uppercase",
                margin: "0 0 20px",
                fontWeight: 500,
              }}
            >
              {col.title}
            </p>
            {col.links.map((l) => (
              <a
                key={l}
                href="#"
                style={{
                  display: "block",
                  color: C.muted,
                  fontSize: "0.82rem",
                  textDecoration: "none",
                  marginBottom: 10,
                  lineHeight: 1.4,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.dark)}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
              >
                {l}
              </a>
            ))}
          </div>
        ))}
      </footer>

      <div
        style={{
          borderTop: `1px solid ${C.border}`,
          padding: "16px 64px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: C.muted2, fontSize: "0.7rem" }}>
          ©2026 Rinacita Trattoria · Todos los derechos reservados
        </span>
        <div style={{ display: "flex", gap: 20 }}>
          {LEGAL_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              style={{
                color: C.muted2,
                fontSize: "0.7rem",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = C.muted)}
              onMouseLeave={(e) => (e.currentTarget.style.color = C.muted2)}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
