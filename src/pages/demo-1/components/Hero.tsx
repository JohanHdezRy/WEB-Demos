import type { RefObject } from "react";
import { T } from "../data/tokens";

interface HeroProps {
  heroOverlayRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLDivElement | null>;
  taglineRef: RefObject<HTMLParagraphElement | null>;
  btnsRef: RefObject<HTMLDivElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
}

const TITLE_LETTERS = "Cloud X".split("");

export function Hero({
  heroOverlayRef,
  titleRef,
  taglineRef,
  btnsRef,
  videoRef,
}: HeroProps) {
  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <video
        ref={videoRef}
        src="https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_25fps.mp4"
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
        }}
      />
      <div
        ref={heroOverlayRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(9,9,11,0.55) 0%, rgba(9,9,11,0.28) 50%, rgba(9,9,11,0.9) 100%)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: 860,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: T.glass,
            border: `1px solid rgba(255,255,255,0.13)`,
            backdropFilter: "blur(12px)",
            borderRadius: 9999,
            padding: "6px 16px",
            marginBottom: 40,
            fontSize: "0.72rem",
            color: T.muted,
            letterSpacing: "1px",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#4ade80",
              boxShadow: "0 0 8px #4ade80",
              flexShrink: 0,
            }}
          />
          All systems operational · 99.99% uptime
        </div>

        <div
          ref={titleRef}
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 28,
          }}
        >
          {TITLE_LETTERS.map((ch, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                overflow: "hidden",
                lineHeight: 1,
              }}
            >
              <span
                className="cx-inner"
                style={{
                  display: "inline-block",
                  fontSize: "clamp(4.5rem,10vw,9rem)",
                  fontWeight: 300,
                  letterSpacing: ch === " " ? "0.08em" : "-0.04em",
                  color: ch === "X" ? "transparent" : T.text,
                  WebkitTextStroke:
                    ch === "X" ? `1.5px rgba(245,245,240,0.35)` : undefined,
                  paddingLeft: ch === " " ? "0.08em" : undefined,
                }}
              >
                {ch === " " ? " " : ch}
              </span>
            </span>
          ))}
        </div>

        <p
          ref={taglineRef}
          style={{
            color: T.muted,
            fontSize: "clamp(0.9rem,1.8vw,1.1rem)",
            lineHeight: 1.75,
            maxWidth: 520,
            margin: "0 auto 40px",
          }}
        >
          Deploy anywhere. Scale instantly. Sleep better.
          <br />
          The cloud platform built for teams that move fast.
        </p>

        <div
          ref={btnsRef}
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              background: T.accentBg,
              color: T.accentTx,
              border: "none",
              padding: "14px 32px",
              borderRadius: 9999,
              fontSize: "0.88rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 32px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
            }}
          >
            Start for free
          </button>
          <button
            style={{
              background: T.glass,
              color: T.text,
              border: `1px solid rgba(255,255,255,0.13)`,
              padding: "14px 32px",
              borderRadius: 9999,
              fontSize: "0.88rem",
              cursor: "pointer",
              backdropFilter: "blur(12px)",
              transition: "background 0.2s, transform 0.2s",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.14)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = T.glass;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Watch demo
          </button>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 36,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 1,
            height: 52,
            background:
              "linear-gradient(to bottom, transparent, rgba(245,245,240,0.25))",
          }}
        />
        <span
          style={{
            color: T.muted2,
            fontSize: "0.62rem",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
      </div>
    </div>
  );
}
