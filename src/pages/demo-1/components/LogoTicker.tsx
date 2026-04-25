import { T } from "../data/tokens";
import { LOGOS } from "../data/featuresData";

export function LogoTicker() {
  return (
    <section
      style={{
        borderTop: `1px solid ${T.border}`,
        padding: "20px 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 56,
          alignItems: "center",
          animation: "ticker 26s linear infinite",
          whiteSpace: "nowrap",
        }}
      >
        {[...LOGOS, ...LOGOS].map((name, i) => (
          <span
            key={i}
            style={{
              color: T.muted2,
              fontSize: "0.72rem",
              letterSpacing: "1px",
              textTransform: "uppercase",
              fontWeight: 500,
              flexShrink: 0,
            }}
          >
            {name}
          </span>
        ))}
      </div>
      <style>{`@keyframes ticker { from { transform:translateX(0) } to { transform:translateX(-50%) } }`}</style>
    </section>
  );
}
