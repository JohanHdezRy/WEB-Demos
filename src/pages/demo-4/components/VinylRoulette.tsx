import { useVinylRoulette } from "../../../hooks/useVinylRoulette";
import { C } from "../data/tokens";
import { ROULETTE } from "../data/vinylData";

export function VinylRoulette() {
  const { active, leftIdx, rightIdx, prev, next } = useVinylRoulette(
    ROULETTE.length,
  );
  const item = ROULETTE[active];

  return (
    <section
      style={{ padding: "8rem 0", background: C.bgLow, overflow: "hidden" }}
    >
      <div
        style={{ textAlign: "center", marginBottom: "5rem", padding: "0 2rem" }}
      >
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "-0.04em",
            color: C.text,
            margin: 0,
          }}
        >
          Vinyl Roulette
        </h2>
        <p
          style={{
            fontFamily: "'Newsreader', serif",
            fontStyle: "italic",
            fontSize: "1.2rem",
            color: C.textMuted,
            marginTop: "0.75rem",
          }}
        >
          A curated rotation of essential spins.
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "3rem",
          padding: "0 2rem",
        }}
      >
        <div
          style={{
            width: 260,
            flexShrink: 0,
            opacity: 0.18,
            transform: "scale(0.88)",
            filter: "grayscale(1)",
            transition: "all 0.5s",
          }}
          className="hidden md:block"
        >
          <img
            src={ROULETTE[leftIdx].img}
            alt=""
            style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }}
          />
        </div>

        <div
          style={{
            position: "relative",
            width: "min(480px, 80vw)",
            flexShrink: 0,
            transition: "all 0.7s",
          }}
        >
          <div
            style={{
              aspectRatio: "1/1",
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 20px 60px rgba(0,218,243,0.18)`,
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            <div className="nc-roulette-overlay">
              <span className="nc-roulette-label">{item.label}</span>
              <h3 className="nc-roulette-title">{item.title}</h3>
              <p className="nc-roulette-artist">{item.artist}</p>
              <button className="nc-roulette-cta">View Details</button>
            </div>

            <div className="nc-spinning-badge">
              <span className="nc-badge-text">
                NOW SPINNING · ROULETTE · RARE PRESSING ·
              </span>
            </div>
          </div>

          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 1rem",
            }}
          >
            <button className="nc-arrow-btn" onClick={prev}>
              ←
            </button>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              {ROULETTE.map((_, i) => (
                <span
                  key={i}
                  className={i === active ? "nc-dot nc-dot-active" : "nc-dot"}
                />
              ))}
            </div>

            <button className="nc-arrow-btn" onClick={next}>
              →
            </button>
          </div>
        </div>

        <div
          style={{
            width: 260,
            flexShrink: 0,
            opacity: 0.18,
            transform: "scale(0.88)",
            filter: "grayscale(1)",
            transition: "all 0.5s",
          }}
          className="hidden md:block"
        >
          <img
            src={ROULETTE[rightIdx].img}
            alt=""
            style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
