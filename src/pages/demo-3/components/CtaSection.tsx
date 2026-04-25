import type { RefObject } from "react";
import { T } from "../data/tokens";

interface CtaSectionProps {
  ctaRef: RefObject<HTMLDivElement | null>;
}

export function CtaSection({ ctaRef }: CtaSectionProps) {
  return (
    <section
      style={{
        padding: "8rem 0",
        background: T.surface,
        position: "relative",
        overflow: "hidden",
        borderTop: `1px solid ${T.outlineVar}33`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "40%",
          height: "100%",
          background: `${T.primary}07`,
          borderRadius: "50%",
          filter: "blur(120px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "10%",
          width: "30%",
          height: "60%",
          background: `${T.primaryDim}06`,
          borderRadius: "50%",
          filter: "blur(100px)",
        }}
      />
      <div
        ref={ctaRef}
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "0 2.5rem",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h2
          className="he-headline"
          style={{
            fontSize: "clamp(3rem,8vw,7rem)",
            fontWeight: 900,
            fontStyle: "italic",
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            marginBottom: "2rem",
          }}
        >
          READY TO
          <br />
          SURGE?
        </h2>
        <p
          className="he-body"
          style={{
            color: `${T.secondaryDim}88`,
            fontSize: "1.05rem",
            maxWidth: 540,
            margin: "0 auto 3rem",
          }}
        >
          Join the collective of elite kinetics. Get the v2.4 formula delivered
          directly to your lab monthly. No contracts. Pure performance.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <button
            className="btn-primary he-headline"
            style={{
              padding: "1.2rem 3.5rem",
              borderRadius: 9999,
              fontWeight: 700,
              letterSpacing: "0.18em",
              fontSize: "0.75rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            SUBSCRIBE NOW
          </button>
          <button
            className="he-headline"
            style={{
              background: "none",
              border: "none",
              borderBottom: `1px solid ${T.primary}`,
              padding: "0.5rem 0",
              color: T.onBg,
              fontWeight: 700,
              letterSpacing: "0.18em",
              fontSize: "0.7rem",
              cursor: "pointer",
            }}
          >
            FIND A RETAILER
          </button>
        </div>
      </div>
    </section>
  );
}
