import { T } from "../data/tokens";
import { FEATURES } from "../data/featuresData";

export function FeatureSections() {
  return (
    <>
      {FEATURES.map((feat, i) => (
        <section
          key={i}
          className="cx-feature"
          style={{
            borderTop: `1px solid ${T.border}`,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: 560,
          }}
        >
          <div
            style={{
              overflow: "hidden",
              order: i % 2 === 0 ? 2 : 1,
              borderLeft: i % 2 === 0 ? `1px solid ${T.border}` : "none",
              borderRight: i % 2 !== 0 ? `1px solid ${T.border}` : "none",
            }}
          >
            <img
              className="feat-img"
              src={feat.img}
              alt={feat.title}
              style={{
                width: "100%",
                height: "110%",
                objectFit: "cover",
                display: "block",
                filter: "brightness(0.7)",
              }}
            />
          </div>

          <div
            style={{
              padding: "80px 64px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              order: i % 2 === 0 ? 1 : 2,
            }}
          >
            <p
              className="reveal-up"
              style={{
                color: T.muted2,
                fontSize: "0.68rem",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                marginBottom: 28,
                fontWeight: 500,
              }}
            >
              {feat.eyebrow}
            </p>
            <h2
              className="reveal-up"
              style={{
                fontSize: "clamp(1.8rem,3.2vw,3rem)",
                fontWeight: 300,
                letterSpacing: "-0.04em",
                lineHeight: 1.15,
                margin: "0 0 24px",
                color: T.text,
                whiteSpace: "pre-line",
              }}
            >
              {feat.title}
            </h2>
            <p
              className="reveal-up"
              style={{
                color: T.muted,
                fontSize: "0.95rem",
                lineHeight: 1.8,
                maxWidth: 420,
                margin: "0 0 36px",
              }}
            >
              {feat.body}
            </p>
            <a
              href="#"
              className="reveal-up"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: T.text,
                textDecoration: "none",
                fontSize: "0.82rem",
                fontWeight: 500,
                width: "fit-content",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.55")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Learn more
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
      ))}
    </>
  );
}
