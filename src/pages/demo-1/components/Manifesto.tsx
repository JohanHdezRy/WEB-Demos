import type { RefObject } from "react";
import { T } from "../data/tokens";
import { BELIEFS } from "../data/featuresData";

interface ManifestoProps {
  manifRef: RefObject<HTMLElement | null>;
}

export function Manifesto({ manifRef }: ManifestoProps) {
  return (
    <section
      ref={manifRef}
      style={{
        padding: "120px 48px",
        borderTop: `1px solid ${T.border}`,
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <p
        className="reveal-up"
        style={{
          color: T.muted2,
          fontSize: "0.68rem",
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          marginBottom: 48,
          fontWeight: 500,
        }}
      >
        Our principles
      </p>
      <h2
        className="reveal-up"
        style={{
          fontSize: "clamp(2rem,4vw,3.2rem)",
          fontWeight: 300,
          letterSpacing: "-0.04em",
          lineHeight: 1.2,
          margin: "0 0 56px",
          color: T.text,
        }}
      >
        Cloud built for teams who refuse to slow down.
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {BELIEFS.map((belief, i) => (
          <div
            key={i}
            className="belief-line"
            style={{
              padding: "28px 0",
              borderTop: `1px solid ${T.border}`,
              display: "flex",
              alignItems: "center",
              gap: 24,
            }}
          >
            <span
              style={{
                color: T.muted2,
                fontSize: "0.7rem",
                fontVariantNumeric: "tabular-nums",
                minWidth: 24,
              }}
            >
              0{i + 1}
            </span>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(1rem,1.8vw,1.3rem)",
                fontWeight: 300,
                color: T.text,
                letterSpacing: "-0.02em",
                lineHeight: 1.4,
              }}
            >
              {belief}
            </p>
          </div>
        ))}
        <div style={{ padding: "28px 0", borderTop: `1px solid ${T.border}` }}>
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: T.muted,
              textDecoration: "none",
              fontSize: "0.82rem",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
          >
            Read our manifesto
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
      </div>
    </section>
  );
}
