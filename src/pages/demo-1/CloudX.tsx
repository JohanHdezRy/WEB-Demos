import { useRef, useState } from "react";
import { useLenis } from "../../hooks/useLenis";
import { T } from "./data/tokens";
import {
  useHeroAnimation,
  useScrollAnimations,
} from "./hooks/useCloudXAnimations";
import { Navbar } from "./components/Navbar";
import { MobileDrawer } from "./components/MobileDrawer";
import { Hero } from "./components/Hero";
import { AudienceCards } from "./components/AudienceCards";
import { Manifesto } from "./components/Manifesto";
import { Stats } from "./components/Stats";
import { LogoTicker } from "./components/LogoTicker";
import { FeatureSections } from "./components/FeatureSections";
import { Testimonials } from "./components/Testimonials";
import { PartnerCTA } from "./components/PartnerCTA";
import { Footer } from "./components/Footer";
import { BottomBar } from "./components/BottomBar";
import { GlobalStyles } from "./components/GlobalStyles";

export function CloudX() {
  const navRef = useRef<HTMLElement>(null);
  const heroOverlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const manifRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useLenis();

  useHeroAnimation({
    heroOverlayRef,
    titleRef,
    taglineRef,
    btnsRef,
    bottomBarRef,
    videoRef,
  });

  useScrollAnimations({ navRef, manifRef });

  return (
    <div
      style={{
        background: T.bg,
        color: T.text,
        overflowX: "hidden",
        fontFamily: "system-ui,-apple-system,sans-serif",
      }}
    >
      <Navbar
        navRef={navRef}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((o) => !o)}
      />

      {menuOpen && <MobileDrawer onClose={() => setMenuOpen(false)} />}

      <Hero
        heroOverlayRef={heroOverlayRef}
        titleRef={titleRef}
        taglineRef={taglineRef}
        btnsRef={btnsRef}
        videoRef={videoRef}
      />

      <AudienceCards />
      <Manifesto manifRef={manifRef} />
      <Stats />
      <LogoTicker />
      <FeatureSections />
      <Testimonials />
      <PartnerCTA />
      <Footer />
      <BottomBar bottomBarRef={bottomBarRef} />
      <GlobalStyles />
    </div>
  );
}
