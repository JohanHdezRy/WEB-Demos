import type { RefObject } from "react";
import { T } from "../data/tokens";
import { SPECS } from "../data/specsData";
import lupaCan from "../../../styles/img/lupa_bebida2.png";

interface LabSpecsSectionProps {
  specCanRef: RefObject<HTMLDivElement | null>;
  specRef: RefObject<HTMLDivElement | null>;
}

export function LabSpecsSection({ specCanRef, specRef }: LabSpecsSectionProps) {
  return (
    <section
      style={{
        background: T.bgLow,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "25%",
          transform: "translate(-50%,-50%)",
          width: 600,
          height: 600,
          background: `${T.primary}12`,
          borderRadius: "50%",
          filter: "blur(120px)",
          pointerEvents: "none",
        }}
      />

      <div
        className="lp-specs-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "85vh",
          maxWidth: 1440,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          ref={specCanRef}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "4rem 3rem",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at 50% 50%, ${T.primary}18 0%, transparent 65%)`,
            }}
          />
          <img
            src={lupaCan}
            alt="Lupa Energy Can"
            style={{
              position: "relative",
              zIndex: 1,
              width: "72%",
              maxWidth: 400,
              filter: `drop-shadow(0 0 90px rgba(247,37,133,0.6)) drop-shadow(0 40px 60px rgba(0,0,0,0.5))`,
            }}
          />
        </div>

        <div
          ref={specRef}
          style={{
            padding: "clamp(3rem,6vw,6rem) clamp(2rem,5vw,5rem)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            borderLeft: `1px solid ${T.outlineVar}`,
          }}
        >
          <span
            className="he-body"
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.35em",
              color: T.primary,
              fontWeight: 700,
              marginBottom: "1.2rem",
            }}
          >
            // PERFORMANCE ANALYSIS V2.4
          </span>
          <h2
            className="he-headline"
            style={{
              fontSize: "clamp(3.5rem,5.5vw,6.5rem)",
              fontWeight: 900,
              fontStyle: "italic",
              letterSpacing: "-0.04em",
              lineHeight: 0.85,
              marginBottom: "3.5rem",
            }}
          >
            LAB
            <br />
            SPECS
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              borderTop: `1px solid ${T.outlineVar}`,
            }}
          >
            {SPECS.map((s) => (
              <div
                key={s.tag}
                className="spec-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "center",
                  padding: "1.8rem 0.5rem",
                  borderBottom: `1px solid ${T.outlineVar}`,
                  gap: "1.5rem",
                }}
              >
                <div>
                  <span
                    className="he-body"
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.18em",
                      color: T.onSurfaceVar,
                      fontWeight: 700,
                      display: "block",
                    }}
                  >
                    {s.tag}
                  </span>
                  <span
                    className="he-body"
                    style={{
                      fontSize: "0.58rem",
                      letterSpacing: "0.1em",
                      color: `${T.onSurfaceVar}88`,
                      marginTop: 4,
                      display: "block",
                    }}
                  >
                    {s.label}
                  </span>
                </div>
                <div
                  style={{
                    textAlign: "right",
                    display: "flex",
                    alignItems: "baseline",
                    gap: 6,
                  }}
                >
                  <span
                    className="he-headline"
                    style={{
                      fontSize: "clamp(2.8rem,4vw,4.5rem)",
                      fontWeight: 700,
                      lineHeight: 1,
                      color: s.highlight ? T.primary : T.onBg,
                      textShadow: s.highlight
                        ? `0 0 30px ${T.primaryGlow}`
                        : "none",
                    }}
                  >
                    {s.value}
                  </span>
                  {s.unit && (
                    <span
                      className="he-headline"
                      style={{
                        fontSize: "1rem",
                        color: T.onSurfaceVar,
                        fontWeight: 400,
                      }}
                    >
                      {s.unit}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "2.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <div style={{ flex: 1, height: 1, background: T.outlineVar }} />
            <span
              className="he-headline"
              style={{ fontSize: "2.2rem", fontWeight: 900, color: T.primary }}
            >
              100%
            </span>
            <span
              className="he-body"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                color: T.onSurfaceVar,
                fontWeight: 700,
              }}
            >
              KINETIC
              <br />
              UPTAKE
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
