import { C } from "../data/tokens";

const STATS = [
  { val: "2.5k+", label: "Curated Titles" },
  { val: "12", label: "City Chapters" },
];

export function Manifesto() {
  return (
    <section
      style={{ padding: "8rem 4vw", background: C.bg, overflow: "hidden" }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "6rem",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: -48,
              left: -48,
              width: 256,
              height: 256,
              background: `${C.primary}0d`,
              filter: "blur(100px)",
              pointerEvents: "none",
            }}
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            src="https://cdn.pixabay.com/video/2025/03/18/265815_large.mp4"
            style={{
              width: "100%",
              aspectRatio: "4/5",
              objectFit: "cover",
              filter: "grayscale(1)",
              border: `1px solid ${C.outline}22`,
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -32,
              right: -32,
              background: C.bgHigh,
              padding: "2rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              borderLeft: `2px solid ${C.primary}`,
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.4em",
                color: C.secondary,
              }}
            >
              Est. 2024
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.5em",
              color: C.primary,
            }}
          >
            Manifesto
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              color: C.text,
              margin: 0,
            }}
          >
            The Nightcity
            <br />
            Philosophy
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <p
              style={{
                fontFamily: "'Newsreader', serif",
                fontSize: "1.15rem",
                lineHeight: 1.75,
                color: C.textMuted,
                margin: 0,
              }}
            >
              We don't just sell vinyl; we archive culture. Born from the
              concrete echoes and neon hum of the metropolis, Nightcity Records
              is a sanctuary for the nocturnally inclined.
            </p>
            <p
              style={{
                fontFamily: "'Newsreader', serif",
                fontSize: "1.15rem",
                lineHeight: 1.75,
                color: C.textMuted,
                margin: 0,
              }}
            >
              Our curation focuses on the deep cuts, electronic gems, and
              nighttime vibes that define urban life after the sun sets.
            </p>
          </div>

          <div
            style={{
              paddingTop: "2rem",
              display: "flex",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            {STATS.map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: C.primary,
                  }}
                >
                  {s.val}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.55rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.25em",
                    color: C.textMuted,
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
