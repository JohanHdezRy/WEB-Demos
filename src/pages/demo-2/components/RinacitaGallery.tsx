import { type RefObject } from "react";
import Masonry from "../../../components/animations/Masonry";
import { C } from "../data/tokens";
import { GALLERY } from "../data/galleryData";

interface RinacitaGalleryProps {
  galleryRef: RefObject<HTMLElement | null>;
}

export function RinacitaGallery({ galleryRef }: RinacitaGalleryProps) {
  return (
    <section
      ref={galleryRef}
      style={{ borderTop: `1px solid ${C.border}`, padding: "80px 48px" }}
    >
      <div
        className="gallery-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          maxWidth: 1200,
          margin: "0 auto 48px",
        }}
      >
        <div>
          <p
            style={{
              color: C.muted,
              fontSize: "0.65rem",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              margin: "0 0 8px",
              fontWeight: 500,
            }}
          >
            Galería
          </p>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(1.6rem,3vw,2.4rem)",
              fontWeight: 300,
              letterSpacing: "-0.03em",
              color: C.dark,
            }}
          >
            Momentos en Rinacita
          </h2>
        </div>
        <a
          href="#"
          style={{
            color: C.muted,
            fontSize: "0.78rem",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = C.dark)}
          onMouseLeave={(e) => (e.currentTarget.style.color = C.muted)}
        >
          Ver todo
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

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Masonry
          items={GALLERY}
          columns={[5, 4, 3, 2, 1]}
          animateFrom="bottom"
          scaleOnHover
          hoverScale={0.97}
          blurToFocus
          stagger={0.04}
        />
      </div>
    </section>
  );
}
