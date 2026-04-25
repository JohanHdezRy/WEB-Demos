import { T } from "../data/tokens";

export function PartnerCTA() {
  return (
    <section
      style={{
        borderTop: `1px solid ${T.border}`,
        padding: "120px 48px",
        textAlign: "center",
        maxWidth: 800,
        margin: "0 auto",
      }}
    >
      <p
        className="reveal-up"
        style={{
          color: T.muted2,
          fontSize: "0.68rem",
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          marginBottom: 32,
          fontWeight: 500,
        }}
      >
        Long-term partners
      </p>
      <h2
        className="reveal-up"
        style={{
          fontSize: "clamp(2rem,5vw,4rem)",
          fontWeight: 300,
          letterSpacing: "-0.05em",
          lineHeight: 1.12,
          margin: "0 0 24px",
          color: T.text,
        }}
      >
        Build what endures,
        <br />
        <span style={{ color: T.muted }}>with reliable infrastructure.</span>
      </h2>
      <p
        className="reveal-up"
        style={{
          color: T.muted,
          fontSize: "1rem",
          lineHeight: 1.75,
          maxWidth: 480,
          margin: "0 auto 48px",
        }}
      >
        We're not just a vendor. Cloud X grows with you — from first deploy to
        billion-request scale, with a team that picks up the phone.
      </p>
      <div
        className="reveal-up"
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
            padding: "16px 36px",
            borderRadius: 9999,
            fontSize: "0.9rem",
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
          Start building today
        </button>
        <button
          style={{
            background: "transparent",
            color: T.muted,
            border: `1px solid ${T.border}`,
            padding: "16px 36px",
            borderRadius: 9999,
            fontSize: "0.9rem",
            cursor: "pointer",
            transition: "color 0.2s, border-color 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = T.text;
            e.currentTarget.style.borderColor = T.borderHi;
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = T.muted;
            e.currentTarget.style.borderColor = T.border;
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          Talk to sales
        </button>
      </div>
    </section>
  );
}
