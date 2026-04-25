import { T } from "../data/tokens";
import { STATS } from "../data/statsData";

export function Stats() {
  return (
    <section
      style={{
        borderTop: `1px solid ${T.border}`,
        padding: "0 48px 0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          scrollbarWidth: "none",
          gap: 0,
          paddingBottom: 0,
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={i}
            className="reveal-up"
            style={{
              flexShrink: 0,
              width: "clamp(200px,21vw,280px)",
              minHeight: "clamp(200px,21vw,280px)",
              padding: "1.4rem",
              borderLeft: `1px solid ${T.border}`,
              borderRight:
                i === STATS.length - 1 ? `1px solid ${T.border}` : "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              gap: 8,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "clamp(0.65rem,0.85vw,0.75rem)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: T.muted2,
                fontWeight: 500,
              }}
            >
              Cloud X
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(2.6rem,4vw,3.4rem)",
                fontWeight: 300,
                letterSpacing: "-0.05em",
                lineHeight: 1.1,
                color: T.text,
              }}
            >
              {stat.value}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "clamp(0.65rem,0.85vw,0.75rem)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: T.muted,
                whiteSpace: "pre-line",
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
