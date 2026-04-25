import { T } from "../data/tokens";
import { QUOTES } from "../data/quotesData";

export function Testimonials() {
  return (
    <section
      style={{ borderTop: `1px solid ${T.border}`, padding: "100px 48px" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p
          className="reveal-up"
          style={{
            color: T.muted2,
            fontSize: "0.68rem",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            marginBottom: 16,
            fontWeight: 500,
          }}
        >
          What teams say
        </p>
        <h2
          className="reveal-up"
          style={{
            fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            lineHeight: 1.2,
            margin: "0 0 56px",
            maxWidth: 560,
            color: T.text,
          }}
        >
          From early-stage to global scale.
        </h2>
        <div
          className="cx-testimonials"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 12,
          }}
        >
          {QUOTES.map((q, i) => (
            <div
              key={i}
              className="reveal-up"
              style={{
                background: T.surface,
                borderRadius: 10,
                padding: "1.4rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                minHeight: 160,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(0.875rem,1.2vw,1rem)",
                  fontWeight: 400,
                  lineHeight: 1.55,
                  color: T.text,
                  flex: 1,
                }}
              >
                "{q.quote}"
              </p>
              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(0.7rem,0.9vw,0.78rem)",
                    color: T.muted,
                    fontWeight: 500,
                  }}
                >
                  {q.name}
                </p>
                <p
                  style={{
                    margin: "2px 0 0",
                    fontSize: "clamp(0.62rem,0.78vw,0.7rem)",
                    color: T.muted2,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {q.role} · {q.stage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
