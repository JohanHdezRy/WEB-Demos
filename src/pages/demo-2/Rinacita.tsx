import { useRef, useState } from "react";
import { useLenis } from "../../hooks/useLenis";
import { useRinacitaAnimations } from "./hooks/useRinacitaAnimations";
import { C } from "./data/tokens";
import { RinacitaNav } from "./components/RinacitaNav";
import { RinacitaHero } from "./components/RinacitaHero";
import { RinacitaIntro } from "./components/RinacitaIntro";
import { RinacitaMenuSection } from "./components/RinacitaMenuSection";
import { RinacitaStory } from "./components/RinacitaStory";
import { RinacitaStats } from "./components/RinacitaStats";
import { RinacitaGallery } from "./components/RinacitaGallery";
import { RinacitaCta } from "./components/RinacitaCta";
import { RinacitaFooter } from "./components/RinacitaFooter";

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
  const [menuOpen, setMenuOpen] = useState(false);

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
  });

  return (
    <div
      style={{
        background: C.bg,
        color: C.dark,
        overflowX: "hidden",
        fontFamily: "system-ui,-apple-system,sans-serif",
      }}
    >
      <RinacitaNav
        navRef={navRef}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
      <RinacitaHero
        heroVidRef={heroVidRef}
        heroTitleRef={heroTitleRef}
        heroTagRef={heroTagRef}
        heroCtaRef={heroCtaRef}
      />
      <RinacitaIntro intrRef={intrRef} />
      <RinacitaMenuSection menuRef={menuRef} />
      <RinacitaStory storyRef={storyRef} storyVidRef={storyVidRef} />
      <RinacitaStats />
      <RinacitaGallery galleryRef={galleryRef} />
      <RinacitaCta />
      <RinacitaFooter />

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
