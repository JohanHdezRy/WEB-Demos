import { T } from "../data/tokens";
import lupaVideo from "../../../styles/video/lupa.mp4";

export function ReelSection() {
  return (
    <section style={{ background: T.bgLow }}>
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "4rem 2.5rem 2rem",
        }}
      >
        <h3
          className="he-headline"
          style={{
            fontSize: "1.4rem",
            fontWeight: 700,
            fontStyle: "italic",
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}
        >
          THE REEL
        </h3>
        <div
          style={{
            width: 36,
            height: 2,
            background: T.primary,
            margin: "0.8rem auto 0",
          }}
        />
      </div>
      <div
        style={{
          width: "100vw",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          overflow: "hidden",
        }}
      >
        <video
          src={lupaVideo}
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            display: "block",
            maxHeight: "75vh",
            objectFit: "cover",
            background: "#000",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0.75rem 2rem",
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${T.primary}22`,
          }}
        >
          <span
            className="he-body"
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              color: T.onSurfaceVar,
              fontWeight: 700,
            }}
          >
            COMMERCIAL VIDEO 2024
          </span>
          <span
            className="he-body"
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              color: T.primary,
              fontWeight: 700,
            }}
          >
            RED WOLF
          </span>
        </div>
      </div>
    </section>
  );
}
