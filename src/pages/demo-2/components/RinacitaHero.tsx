import { type RefObject } from "react";
import { C } from "../data/tokens";

interface RinacitaHeroProps {
  heroVidRef: RefObject<HTMLVideoElement | null>;
  heroTitleRef: RefObject<HTMLHeadingElement | null>;
  heroTagRef: RefObject<HTMLParagraphElement | null>;
  heroCtaRef: RefObject<HTMLDivElement | null>;
}

export function RinacitaHero({
  heroVidRef,
  heroTitleRef,
  heroTagRef,
  heroCtaRef,
}: RinacitaHeroProps) {
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <video
        ref={heroVidRef}
        src="https://videos.pexels.com/video-files/6054010/6054010-uhd_2732_1440_25fps.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transformOrigin: "center center",
          filter: "brightness(0.5)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(28,26,22,0.88) 0%, rgba(28,26,22,0.05) 55%, transparent 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "0 64px 80px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div>
            <p
              style={{
                color: C.gold,
                fontSize: "0.65rem",
                letterSpacing: "3px",
                textTransform: "uppercase",
                margin: "0 0 18px",
                fontWeight: 500,
              }}
            >
              Trattoria · Milano, 1987
            </p>
            <div style={{ overflow: "hidden" }}>
              <h1
                ref={heroTitleRef}
                style={{
                  margin: 0,
                  fontSize: "clamp(4rem,11vw,10rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.9,
                  color: "#f7f4ef",
                  fontStyle: "italic",
                }}
              >
                Rinacita
              </h1>
            </div>
          </div>
          <div style={{ textAlign: "right", maxWidth: 300 }}>
            <p
              ref={heroTagRef}
              style={{
                color: "rgba(247,244,239,0.6)",
                fontSize: "0.9rem",
                lineHeight: 1.75,
                margin: "0 0 24px",
              }}
            >
              Cucina italiana auténtica.
              <br />
              Cada plato, una historia.
            </p>
            <div
              ref={heroCtaRef}
              style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}
            >
              <button
                style={{
                  background: "#f7f4ef",
                  color: C.dark,
                  border: "none",
                  padding: "12px 28px",
                  borderRadius: 9999,
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                Reservar mesa
              </button>
              <button
                style={{
                  background: "transparent",
                  color: "#f7f4ef",
                  border: "1px solid rgba(247,244,239,0.35)",
                  padding: "12px 28px",
                  borderRadius: 9999,
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "rgba(247,244,239,0.1)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                Ver carta
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            width: 1,
            height: 48,
            background:
              "linear-gradient(to bottom, transparent, rgba(247,244,239,0.35))",
          }}
        />
      </div>
    </div>
  );
}
