import type { RefObject } from "react";
import { T } from "../data/tokens";
import { GALLERY } from "../data/galleryData";

interface GallerySectionProps {
  galleryRef: RefObject<HTMLElement | null>;
}

export function GallerySection({ galleryRef }: GallerySectionProps) {
  return (
    <section
      ref={galleryRef}
      style={{
        padding: "8rem 0 0",
        background: T.bg,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 2.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "4rem",
          }}
        >
          <div>
            <h3
              className="he-headline"
              style={{
                fontSize: "clamp(2rem,3.5vw,3.2rem)",
                fontWeight: 700,
                fontStyle: "italic",
                letterSpacing: "-0.02em",
              }}
            >
              FLAVOR GALLERY
            </h3>
            <p
              className="he-body"
              style={{
                color: T.primary,
                letterSpacing: "0.3em",
                fontSize: "0.62rem",
                fontWeight: 700,
                marginTop: 10,
              }}
            >
              // RED WOLF LOOKBOOK 2024
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="gal-arrow">&#8592;</button>
            <button className="gal-arrow">&#8594;</button>
          </div>
        </div>
      </div>

      <div
        className="lp-gallery-grid"
        style={{
          width: "100vw",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          height: "65vh",
          minHeight: 480,
          gap: 0,
        }}
      >
        {GALLERY.map((item) => (
          <div
            key={item.label}
            className="bento-cell gal-item"
            style={{ height: "100%", borderRadius: 0 }}
          >
            <div className="bento-overlay" />
            <img src={item.src} alt={item.label} />
            <span
              className="bento-tag he-body"
              style={{
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {item.tag}
            </span>
            <div className="bento-label">
              <p
                className="he-headline"
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  fontStyle: "italic",
                  letterSpacing: "-0.02em",
                }}
              >
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
