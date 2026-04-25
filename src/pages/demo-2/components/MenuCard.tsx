import { useMenuCard } from "../../../hooks/useMenuCard";
import { C } from "../data/tokens";
import type { MenuCardData } from "../types";

interface MenuCardProps {
  card: MenuCardData;
  idx: number;
}

export function MenuCard({ card, idx }: MenuCardProps) {
  const { current, incoming, isSliding, hovered, setHovered } = useMenuCard(
    card.images.length,
    idx,
  );

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        height: "clamp(380px,48vh,600px)",
        cursor: "pointer",
        background: C.dark,
        borderRadius: 4,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <style>{`
        @keyframes rinSlideOut { from { transform: translateX(0) } to { transform: translateX(-100%) } }
        @keyframes rinSlideIn  { from { transform: translateX(100%) } to { transform: translateX(0) } }
      `}</style>

      <img
        src={card.images[current]}
        alt={card.label}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.68)",
          animation: isSliding
            ? "rinSlideOut 1.8s cubic-bezier(0.76,0,0.24,1) forwards"
            : "none",
        }}
      />

      {incoming !== null && (
        <img
          src={card.images[incoming]}
          alt={card.label}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.68)",
            animation: isSliding
              ? "rinSlideIn 1.1s cubic-bezier(0.76,0,0.24,1) forwards"
              : "none",
            transform: isSliding ? undefined : "translateX(100%)",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "48px 36px 36px",
          background:
            "linear-gradient(to top, rgba(28,26,22,0.9) 0%, transparent 100%)",
          zIndex: 2,
        }}
      >
        <p
          style={{
            margin: "0 0 6px",
            fontSize: "0.65rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            color: C.gold,
            fontWeight: 500,
          }}
        >
          {card.time}
        </p>
        <h3
          style={{
            margin: "0 0 12px",
            fontSize: "clamp(1.6rem,3vw,2.4rem)",
            fontWeight: 300,
            color: "#f7f4ef",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          {card.label}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: "0.85rem",
            color: "rgba(247,244,239,0.65)",
            lineHeight: 1.6,
            maxHeight: hovered ? 60 : 0,
            overflow: "hidden",
            transition: "max-height 0.4s ease, opacity 0.4s ease",
            opacity: hovered ? 1 : 0,
          }}
        >
          {card.desc}
        </p>
      </div>

      <div
        style={{
          position: "absolute",
          top: 24,
          right: 24,
          zIndex: 2,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        <span
          style={{
            display: "inline-block",
            background: "rgba(247,244,239,0.12)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(247,244,239,0.25)",
            color: "#f7f4ef",
            padding: "8px 18px",
            borderRadius: 9999,
            fontSize: "0.68rem",
            letterSpacing: "1.5px",
            textTransform: "uppercase",
          }}
        >
          Ver menú
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          top: 20,
          left: 24,
          zIndex: 2,
          display: "flex",
          gap: 5,
        }}
      >
        {card.images.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === current ? 18 : 5,
              height: 5,
              borderRadius: 9999,
              background: i === current ? "#f7f4ef" : "rgba(247,244,239,0.3)",
              transition: "all 0.4s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
