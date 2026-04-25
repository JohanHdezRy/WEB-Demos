import type { RefObject } from "react";
import { T } from "../data/tokens";
import lupaCan from "../../../styles/img/lupa_bebida2.png";

interface HeroSectionProps {
  heroTagRef: RefObject<HTMLSpanElement | null>;
  heroH1Ref: RefObject<HTMLHeadingElement | null>;
  heroSubRef: RefObject<HTMLParagraphElement | null>;
  heroCtaRef: RefObject<HTMLDivElement | null>;
  canRef: RefObject<HTMLDivElement | null>;
}

export function HeroSection({
  heroTagRef,
  heroH1Ref,
  heroSubRef,
  heroCtaRef,
  canRef,
}: HeroSectionProps) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        className="hero-glow"
        style={{ position: "absolute", inset: 0, zIndex: 0 }}
      />
      <div
        className="grid-overlay"
        style={{ position: "absolute", inset: 0, zIndex: 1 }}
      />

      <div
        className="lp-hero-grid"
        style={{
          position: "relative",
          zIndex: 2,
          flex: 1,
          display: "grid",
          gridTemplateColumns: "7fr 5fr",
          gap: "2rem",
          alignItems: "center",
          maxWidth: 1440,
          margin: "0 auto",
          padding: "8rem 2.5rem 6rem",
          width: "100%",
        }}
      >
        <div>
          <span
            ref={heroTagRef}
            className="he-headline"
            style={{
              display: "block",
              color: T.primary,
              letterSpacing: "0.4em",
              fontSize: "0.68rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
            }}
          >
            BERRY SURGE FUEL
          </span>
          <h1
            ref={heroH1Ref}
            className="he-headline"
            style={{
              fontSize: "clamp(4.5rem,9.5vw,9.5rem)",
              lineHeight: 0.82,
              fontWeight: 900,
              fontStyle: "italic",
              letterSpacing: "-0.04em",
              marginBottom: "2rem",
            }}
          >
            RED
            <br />
            WOLF
          </h1>
          <p
            ref={heroSubRef}
            className="he-headline"
            style={{
              fontSize: "clamp(1rem,2vw,1.6rem)",
              fontWeight: 300,
              letterSpacing: "0.2em",
              color: T.secondaryDim,
              opacity: 0.75,
              maxWidth: 520,
            }}
          >
            We Fuel. We Ignite. We Surge.
            <br />
            Step into the electric frequency.
          </p>
          <div
            ref={heroCtaRef}
            style={{
              marginTop: "2.5rem",
              display: "flex",
              gap: "1.2rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <button
              className="btn-primary he-headline"
              style={{
                padding: "0.9rem 2.2rem",
                borderRadius: 9999,
                fontWeight: 700,
                letterSpacing: "0.12em",
                fontSize: "0.72rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Discover
            </button>
            <span
              style={{ color: "rgba(255,255,255,0.2)", fontSize: "1.2rem" }}
            >
              &bull;&bull;&bull;
            </span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                color: "rgba(255,255,255,0.5)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.85rem",
                }}
              >
                &#9654;
              </div>
              <span
                className="he-body"
                style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
              >
                Watch the reel
              </span>
            </div>
          </div>
        </div>

        <div
          ref={canRef}
          style={{
            position: "relative",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: -60,
              background: `${T.primary}22`,
              borderRadius: "50%",
              filter: "blur(90px)",
            }}
          />
          <img
            src={lupaCan}
            alt="Red Wolf Energy Can"
            style={{
              position: "relative",
              zIndex: 1,
              width: "90%",
              maxWidth: 420,
              height: "auto",
              filter: `drop-shadow(0 0 70px rgba(247,37,133,0.55))`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
