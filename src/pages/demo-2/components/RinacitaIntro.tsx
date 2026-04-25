import { type RefObject } from "react";
import { C } from "../data/tokens";

const INTRO_LINES = [
  "En Rinacita creemos que comer bien es un acto de amor.",
  "Cada ingrediente viene de productores locales con quienes compartimos valores.",
  "La cocina italiana no es una técnica. Es una conversación con la memoria.",
];

interface RinacitaIntroProps {
  intrRef: RefObject<HTMLElement | null>;
}

export function RinacitaIntro({ intrRef }: RinacitaIntroProps) {
  return (
    <section
      ref={intrRef}
      style={{
        padding: "100px 64px",
        borderBottom: `1px solid ${C.border}`,
        maxWidth: 1060,
        margin: "0 auto",
      }}
    >
      <div
        className="ri-intro-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 80,
          alignItems: "start",
        }}
      >
        <div>
          <p
            className="intr-line"
            style={{
              color: C.muted,
              fontSize: "0.65rem",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              margin: "0 0 10px",
              fontWeight: 500,
            }}
          >
            Nuestra filosofía
          </p>
          <p
            className="intr-line"
            style={{
              color: C.gold,
              fontSize: "0.78rem",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Desde 1987
          </p>
        </div>
        <div>
          {INTRO_LINES.map((line, i) => (
            <p
              key={i}
              className="intr-line"
              style={{
                margin: i === 2 ? 0 : "0 0 30px",
                fontSize: "clamp(1rem,1.8vw,1.5rem)",
                fontWeight: 300,
                lineHeight: 1.5,
                letterSpacing: "-0.02em",
                color: C.dark,
                borderTop: i === 0 ? `1px solid ${C.border}` : "none",
                paddingTop: i === 0 ? 30 : 0,
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
