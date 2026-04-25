import { T } from "../data/tokens";
import { AUDIENCE_CARDS } from "../data/featuresData";

export function AudienceCards() {
  return (
    <section
      className="cx-two-cards"
      style={{
        padding: "0",
        borderTop: `1px solid ${T.border}`,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: 560,
      }}
    >
      {AUDIENCE_CARDS.map((card, i) => (
        <div
          key={i}
          style={{
            position: "relative",
            overflow: "hidden",
            minHeight: 560,
            borderRight: i === 0 ? `1px solid ${T.border}` : "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            const img = e.currentTarget.querySelector(
              ".card-img",
            ) as HTMLElement;
            if (img) img.style.transform = "scale(1.04)";
          }}
          onMouseLeave={(e) => {
            const img = e.currentTarget.querySelector(
              ".card-img",
            ) as HTMLElement;
            if (img) img.style.transform = "scale(1)";
          }}
        >
          <img
            className="card-img"
            src={card.img}
            alt={card.eyebrow}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
              filter: "brightness(0.45)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(9,9,11,0.88) 0%, rgba(9,9,11,0.2) 60%, transparent 100%)",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: "40px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <p
              style={{
                color: T.muted2,
                fontSize: "0.68rem",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                marginBottom: 16,
                fontWeight: 500,
              }}
            >
              {card.eyebrow}
            </p>
            <h2
              style={{
                fontSize: "clamp(1.8rem,3vw,2.8rem)",
                fontWeight: 300,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                margin: "0 0 16px",
                color: T.text,
                whiteSpace: "pre-line",
              }}
            >
              {card.title}
            </h2>
            <p
              style={{
                color: T.muted,
                fontSize: "0.9rem",
                lineHeight: 1.7,
                maxWidth: 380,
                margin: "0 0 28px",
              }}
            >
              {card.body}
            </p>
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: T.text,
                textDecoration: "none",
                fontSize: "0.82rem",
                fontWeight: 500,
                borderBottom: `1px solid ${T.borderHi}`,
                paddingBottom: 2,
                width: "fit-content",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {card.cta}
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
        </div>
      ))}
    </section>
  );
}
