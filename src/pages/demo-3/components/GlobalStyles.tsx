import { T } from "../data/tokens";

export function GlobalStyles() {
  return (
    <style>{`
      .he-headline { font-family: 'Space Grotesk', sans-serif; }
      .he-body     { font-family: 'Plus Jakarta Sans', sans-serif; }
      .grid-overlay {
        background-image:
          linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px);
        background-size: 60px 60px;
      }
      .hero-glow {
        background:
          radial-gradient(circle at 20% 30%, rgba(247,37,133,0.20) 0%, transparent 55%),
          radial-gradient(circle at 80% 70%, rgba(181,23,158,0.10) 0%, transparent 50%);
      }
      .btn-primary {
        background: linear-gradient(135deg, ${T.primary} 0%, ${T.primaryDim} 100%);
        color: ${T.onPrimary};
        box-shadow: 0 0 32px ${T.primaryGlow};
        transition: box-shadow 0.3s, transform 0.2s;
      }
      .btn-primary:hover {
        box-shadow: 0 0 60px rgba(247,37,133,0.55);
        transform: scale(1.04);
      }
      .nav-link { transition: color 0.2s; text-decoration: none; }
      .nav-link:hover { color: #fff !important; }
      .nav-menu-btn {
        background: rgba(255,255,255,0.08);
        border: 1px solid rgba(255,255,255,0.12);
        backdrop-filter: blur(12px);
        transition: background 0.2s;
      }
      .nav-menu-btn:hover { background: rgba(255,255,255,0.18); }

      .bento-cell { overflow: hidden; border-radius: 10px; position: relative; cursor: default; }
      .bento-cell img { transition: transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94); width: 100%; height: 100%; object-fit: cover; display: block; }
      .bento-cell:hover img { transform: scale(1.06); }
      .bento-overlay {
        position: absolute; inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%);
        z-index: 1;
      }
      .bento-label {
        position: absolute; bottom: 0; left: 0; right: 0;
        padding: 1.5rem 1.8rem;
        z-index: 2;
      }
      .bento-tag {
        position: absolute; top: 1.2rem; left: 1.4rem;
        background: rgba(247,37,133,0.85);
        backdrop-filter: blur(8px);
        border-radius: 9999px;
        padding: 0.3rem 0.9rem;
        z-index: 2;
      }

      .spec-row { transition: background 0.2s; }
      .spec-row:hover { background: rgba(247,37,133,0.04); }

      .gal-arrow {
        width: 40px; height: 40px; border-radius: 50%;
        background: rgba(255,255,255,0.07);
        border: 1px solid rgba(255,255,255,0.12);
        color: #fff; cursor: pointer; font-size: 1rem;
        display: flex; align-items: center; justify-content: center;
        transition: background 0.2s, border-color 0.2s;
      }
      .gal-arrow:hover { background: ${T.primary}; border-color: ${T.primary}; }

      @media (max-width: 768px) {
        .lp-nav-links { display: none !important; }
        .lp-nav-cta { display: none !important; }
        .lp-hamburger { display: flex !important; }
        .lp-hero-grid { grid-template-columns: 1fr !important; padding: 6rem 1.5rem 3rem !important; }
        .lp-specs-grid { grid-template-columns: 1fr !important; min-height: unset !important; }
        .lp-gallery-grid { grid-template-columns: repeat(2, 1fr) !important; height: auto !important; min-height: unset !important; }
      }
      @media (max-width: 480px) {
        .lp-gallery-grid { grid-template-columns: 1fr !important; }
      }
    `}</style>
  );
}
