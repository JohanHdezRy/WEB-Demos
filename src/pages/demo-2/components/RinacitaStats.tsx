import { C } from "../data/tokens";
import { STATS } from "../data/statsData";

export function RinacitaStats() {
  return (
    <section
      className="ri-stats-grid"
      style={{
        borderTop: `1px solid ${C.border}`,
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
      }}
    >
      {STATS.map((item, i) => (
        <div
          key={i}
          className="reveal"
          style={{
            padding: "56px 52px",
            borderRight: i < 2 ? `1px solid ${C.border}` : "none",
          }}
        >
          <p
            style={{
              margin: "0 0 8px",
              fontSize: "clamp(2.4rem,4vw,3.4rem)",
              fontWeight: 300,
              letterSpacing: "-0.05em",
              color: C.dark,
            }}
          >
            {item.n}
          </p>
          <p
            style={{
              margin: "0 0 4px",
              fontSize: "0.88rem",
              fontWeight: 500,
              color: C.dark,
            }}
          >
            {item.label}
          </p>
          <p style={{ margin: 0, fontSize: "0.75rem", color: C.muted }}>
            {item.sub}
          </p>
        </div>
      ))}
    </section>
  );
}
