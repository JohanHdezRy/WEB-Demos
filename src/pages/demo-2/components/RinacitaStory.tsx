import { type RefObject } from "react";
import { C } from "../data/tokens";

interface RinacitaStoryProps {
  storyRef: RefObject<HTMLElement | null>;
  storyVidRef: RefObject<HTMLVideoElement | null>;
}

export function RinacitaStory({ storyRef, storyVidRef }: RinacitaStoryProps) {
  return (
    <section
      ref={storyRef}
      className="ri-story-grid"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        borderTop: `1px solid ${C.border}`,
        minHeight: 600,
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", overflow: "hidden" }}>
        <video
          ref={storyVidRef}
          src="https://videos.pexels.com/video-files/4551832/4551832-hd_1920_1080_25fps.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "110%",
            objectFit: "cover",
            display: "block",
            filter: "brightness(0.8)",
          }}
        />
      </div>
      <div
        style={{
          padding: "80px 72px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderLeft: `1px solid ${C.border}`,
        }}
      >
        <p
          className="story-el"
          style={{
            color: C.muted,
            fontSize: "0.65rem",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            marginBottom: 28,
            fontWeight: 500,
          }}
        >
          La historia
        </p>
        <h2
          className="story-el"
          style={{
            fontSize: "clamp(1.8rem,3vw,2.8rem)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            lineHeight: 1.2,
            margin: "0 0 28px",
            color: C.dark,
          }}
        >
          Una rinascita,
          <br />
          <span style={{ color: C.gold, fontStyle: "italic" }}>
            un renacimiento.
          </span>
        </h2>
        <p
          className="story-el"
          style={{
            color: C.muted,
            fontSize: "0.92rem",
            lineHeight: 1.85,
            maxWidth: 400,
            margin: "0 0 18px",
          }}
        >
          El restaurante nació en el barrio de Navigli en Milán. Antonella
          Russo, nuestra fundadora, quería crear un lugar donde la comida fuera
          memoria y conversación al mismo tiempo.
        </p>
        <p
          className="story-el"
          style={{
            color: C.muted,
            fontSize: "0.92rem",
            lineHeight: 1.85,
            maxWidth: 400,
            margin: "0 0 40px",
          }}
        >
          Hoy, su nieta lleva la cocina con la misma filosofía: productos
          honestos, técnica italiana, y el calor de una mesa compartida.
        </p>
        <a
          href="#"
          className="story-el"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            color: C.dark,
            textDecoration: "none",
            fontSize: "0.82rem",
            fontWeight: 500,
            width: "fit-content",
            transition: "opacity 0.2s",
            borderBottom: `1px solid ${C.muted2}`,
            paddingBottom: 2,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Conocer más
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
    </section>
  );
}
