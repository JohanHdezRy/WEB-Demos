import { C } from "../data/tokens";
import { vinil3 } from "../data/vinylData";

export function NowPlayingBar() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: `${C.bg}bb`,
        backdropFilter: "blur(24px)",
        borderTop: `1px solid ${C.outline}22`,
        padding: "0.75rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          width: "33%",
        }}
      >
        <div
          style={{ width: 48, height: 48, overflow: "hidden", flexShrink: 0 }}
        >
          <img
            src={vinil3}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "grayscale(1)",
            }}
          />
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: C.primary,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: 220,
            }}
          >
            NEON PULSE — VECTOR SUBSETS
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.52rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: C.textMuted,
            }}
          >
            Now Playing in Gallery
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          width: "33%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {(["⇄", "⏮", null, "⏭", "↻"] as (string | null)[]).map((icon, i) =>
            icon === null ? (
              <button key={i} className="nc-play-btn">
                ▶
              </button>
            ) : (
              <button key={i} className="nc-ctrl-btn">
                {icon}
              </button>
            ),
          )}
        </div>
        <div
          style={{
            width: "100%",
            maxWidth: 400,
            height: 2,
            background: `${C.outline}44`,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: "33%",
              background: C.secondary,
              boxShadow: `0 0 8px rgba(255,171,243,0.8)`,
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "1.5rem",
          width: "33%",
        }}
      >
        {["🔊", "🎵", "⛶"].map((icon) => (
          <button key={icon} className="nc-ctrl-btn">
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}
