import { useRef, useState } from "react";
import { useLenis } from "../../hooks/useLenis";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useRinacitaAnimations } from "./hooks/useRinacitaAnimations";
import { C } from "./data/tokens";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Intro } from "./components/Intro";
import { MenuSection } from "./components/MenuSection";
import { Story } from "./components/Story";
import { Stats } from "./components/Stats";
import { Gallery } from "./components/Gallery";
import { Cta } from "./components/Cta";
import { Footer } from "./components/Footer";

export function Rinacita() {
  const navRef = useRef<HTMLElement>(null);
  const heroVidRef = useRef<HTMLVideoElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroTagRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const intrRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const storyRef = useRef<HTMLElement>(null);
  const storyVidRef = useRef<HTMLVideoElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useDocumentTitle("Rinacita · Trattoria Italiana", "es");
  useLenis();
  useRinacitaAnimations({
    navRef,
    heroVidRef,
    heroTitleRef,
    heroTagRef,
    heroCtaRef,
    intrRef,
    menuRef,
    storyRef,
    storyVidRef,
    galleryRef,
    pageRef,
  });

  return (
    <div
      ref={pageRef}
      style={{
        background: C.bg,
        color: C.dark,
        overflowX: "hidden",
        fontFamily: "system-ui,-apple-system,sans-serif",
      }}
    >
      <Nav
        navRef={navRef}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <Hero
        heroVidRef={heroVidRef}
        heroTitleRef={heroTitleRef}
        heroTagRef={heroTagRef}
        heroCtaRef={heroCtaRef}
      />
      <Intro intrRef={intrRef} />
      <MenuSection menuRef={menuRef} />
      <Story storyRef={storyRef} storyVidRef={storyVidRef} />
      <Stats />
      <Gallery galleryRef={galleryRef} />
      <Cta />
      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .ri-nav-links { display: none !important; }
          .ri-hamburger { display: flex !important; }
          .ri-intro-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .ri-menu-grid { grid-template-columns: 1fr !important; }
          .ri-story-grid { grid-template-columns: 1fr !important; }
          .ri-stats-grid { grid-template-columns: 1fr !important; }
          .ri-footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; padding: 40px 24px !important; }
        }
        @media (max-width: 480px) {
          .ri-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
