import { C } from "../data/tokens";

export function RinacitaCta() {
  return (
    <section
      style={{
        borderTop: `1px solid ${C.border}`,
        padding: "120px 64px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <p
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          fontSize: "clamp(6rem,18vw,16rem)",
          fontWeight: 700,
          color: "rgba(28,26,22,0.04)",
          margin: 0,
          letterSpacing: "-0.05em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          fontStyle: "italic",
        }}
      >
        Rinacita
      </p>
      <p
        className="reveal"
        style={{
          color: C.muted,
          fontSize: "0.65rem",
          letterSpacing: "2.5px",
          textTransform: "uppercase",
          marginBottom: 24,
          fontWeight: 500,
        }}
      >
        Reservaciones
      </p>
      <h2
        className="reveal"
        style={{
          fontSize: "clamp(2rem,5vw,4.5rem)",
          fontWeight: 300,
          letterSpacing: "-0.05em",
          lineHeight: 1.1,
          margin: "0 auto 20px",
          maxWidth: 700,
          color: C.dark,
        }}
      >
        Una mesa para
        <br />
        <span style={{ fontStyle: "italic", color: C.gold }}>
          una noche especial.
        </span>
      </h2>
      <p
        className="reveal"
        style={{
          color: C.muted,
          fontSize: "1rem",
          lineHeight: 1.75,
          margin: "0 auto 48px",
          maxWidth: 420,
        }}
      >
        Reserva con antelación para garantizar tu lugar. Disponibles para grupos
        de 2 a 20 personas.
      </p>
      <div
        className="reveal"
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          style={{
            background: C.dark,
            color: C.bg,
            border: "none",
            padding: "16px 40px",
            borderRadius: 9999,
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.72")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Reservar ahora
        </button>
        <button
          style={{
            background: "transparent",
            color: C.dark,
            border: `1px solid ${C.border}`,
            padding: "16px 36px",
            borderRadius: 9999,
            fontSize: "0.9rem",
            cursor: "pointer",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = C.muted)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
        >
          Eventos privados
        </button>
      </div>
    </section>
  );
}
