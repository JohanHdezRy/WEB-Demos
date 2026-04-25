import { T } from "../data/tokens";
import {
  FOOTER_NAV_LINKS,
  FOOTER_COMPANY_LINKS,
  FOOTER_LOCATIONS,
  FOOTER_SOCIAL_ICONS,
} from "../data/footerData";

export function Footer() {
  return (
    <footer
      className="cx-footer"
      style={{
        borderTop: `1px solid ${T.border}`,
        padding: "64px 48px 100px",
        marginBottom: 60,
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
        gap: 48,
      }}
    >
      <div>
        <p
          style={{
            fontWeight: 700,
            fontSize: "1.1rem",
            letterSpacing: "-0.03em",
            margin: "0 0 12px",
            color: T.text,
          }}
        >
          Cloud<span style={{ opacity: 0.35 }}>X</span>
        </p>
        <p
          style={{
            color: T.muted,
            fontSize: "0.82rem",
            lineHeight: 1.7,
            maxWidth: 220,
            margin: "0 0 24px",
          }}
        >
          Infrastructure that disappears. Scale that doesn't.
        </p>
        <div style={{ display: "flex", gap: 16 }}>
          {FOOTER_SOCIAL_ICONS.map((ic) => (
            <a
              key={ic}
              href="#"
              style={{
                color: T.muted2,
                fontSize: "0.7rem",
                fontWeight: 700,
                textDecoration: "none",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.muted)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.muted2)}
            >
              {ic}
            </a>
          ))}
        </div>
      </div>

      <div>
        <p
          style={{
            color: T.muted2,
            fontSize: "0.68rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            margin: "0 0 20px",
            fontWeight: 500,
          }}
        >
          Navigation
        </p>
        {FOOTER_NAV_LINKS.map((l) => (
          <a
            key={l}
            href="#"
            style={{
              display: "block",
              color: T.muted,
              fontSize: "0.82rem",
              textDecoration: "none",
              marginBottom: 10,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
          >
            {l}
          </a>
        ))}
      </div>

      <div>
        <p
          style={{
            color: T.muted2,
            fontSize: "0.68rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            margin: "0 0 20px",
            fontWeight: 500,
          }}
        >
          Company
        </p>
        {FOOTER_COMPANY_LINKS.map((l) => (
          <a
            key={l}
            href="#"
            style={{
              display: "block",
              color: T.muted,
              fontSize: "0.82rem",
              textDecoration: "none",
              marginBottom: 10,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
          >
            {l}
          </a>
        ))}
      </div>

      <div>
        <p
          style={{
            color: T.muted2,
            fontSize: "0.68rem",
            letterSpacing: "2px",
            textTransform: "uppercase",
            margin: "0 0 20px",
            fontWeight: 500,
          }}
        >
          Find us
        </p>
        {FOOTER_LOCATIONS.map((loc) => (
          <div key={loc.city} style={{ marginBottom: 20 }}>
            <p
              style={{
                color: T.muted,
                fontSize: "0.82rem",
                margin: "0 0 2px",
                fontWeight: 500,
              }}
            >
              {loc.city}
            </p>
            <p
              style={{
                color: T.muted2,
                fontSize: "0.75rem",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              {loc.addr}
            </p>
          </div>
        ))}
        <a
          href="mailto:hello@cloudx.io"
          style={{
            color: T.muted,
            fontSize: "0.82rem",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
          onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
        >
          hello@cloudx.io
        </a>
      </div>
    </footer>
  );
}
