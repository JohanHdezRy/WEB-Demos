export function GlobalStyles() {
  return (
    <style>{`
      .cx-nav { padding: 16px 24px !important; }
      .cx-nav-links { display: flex; gap: 32px; }
      .cx-hamburger { display: none !important; }

      @media (max-width: 768px) {
        .cx-nav { padding: 14px 20px !important; gap: 12px !important; }
        .cx-nav-links { display: none !important; }
        .cx-signin { display: none !important; }
        .cx-cta-btn { display: none !important; }
        .cx-hamburger { display: flex !important; }

        .cx-two-cards { grid-template-columns: 1fr !important; }
        .cx-two-cards > div { border-right: none !important; border-top: 1px solid rgba(255,255,255,0.08); min-height: 320px !important; }

        .cx-feature { grid-template-columns: 1fr !important; min-height: auto !important; }
        .cx-feature > div[style*="order"] { order: unset !important; border: none !important; }
        .cx-feature > div:last-child { padding: 40px 24px !important; }
        .cx-feature > div:first-child { min-height: 260px; }

        .cx-testimonials { grid-template-columns: 1fr !important; }

        .cx-footer { grid-template-columns: 1fr 1fr !important; padding: 48px 24px 80px !important; gap: 32px !important; }
        .cx-footer > div:first-child { grid-column: 1 / -1; }

        .cx-bottom-bar { padding: 10px 20px !important; }
        .cx-bottom-bar > div { display: none !important; }
      }

      @media (max-width: 480px) {
        .cx-footer { grid-template-columns: 1fr !important; }
      }
    `}</style>
  );
}
