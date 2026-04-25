import { Link } from "react-router-dom";
import { C } from "../data/tokens";
import { FOOTER_COLS } from "../data/footerData";

export function Footer() {
  return (
    <footer
      style={{
        background: "#0e0e0e",
        paddingTop: "4rem",
        paddingBottom: "8rem",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 3rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "3rem",
        }}
      >
        <div>
          <Link
            to="/"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: C.text,
              textDecoration: "none",
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            NIGHTCITY RECORDS
          </Link>
          <p
            style={{
              fontFamily: "'Newsreader', serif",
              fontStyle: "italic",
              fontSize: "0.9rem",
              color: `${C.textMuted}88`,
              maxWidth: 240,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Curators of the sonic underworld. We bridge the gap between human
            emotion and synthesized precision.
          </p>
        </div>

        {FOOTER_COLS.map((col) => (
          <div key={col.heading}>
            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: C.primary,
                marginBottom: "1.25rem",
              }}
            >
              {col.heading}
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="nc-footer-link">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: "5rem auto 0",
          padding: "2rem 3rem 0",
          borderTop: `1px solid ${C.outline}22`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.58rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: `${C.text}44`,
            margin: 0,
          }}
        >
          © 2024 NIGHTCITY RECORDS. ENGINEERED FOR THE NIGHT.
        </p>
        <div style={{ display: "flex", gap: "2rem" }}>
          {["Privacy Policy", "Terms of Service"].map((t) => (
            <span key={t} className="nc-footer-policy">
              {t}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
