import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useFonts } from "../../hooks/useFonts";
import { useLenis } from "../../hooks/useLenis";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { FONTS_HREF, T } from "./data/tokens";
import { useLupaAnimations } from "./hooks/useLupaAnimations";
import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import { ReelSection } from "./components/ReelSection";
import { LabSpecsSection } from "./components/LabSpecsSection";
import { GallerySection } from "./components/GallerySection";
import { CtaSection } from "./components/CtaSection";

export function Lupa() {
  const navRef = useRef<HTMLElement>(null);
  const heroTagRef = useRef<HTMLSpanElement>(null);
  const heroH1Ref = useRef<HTMLHeadingElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const canRef = useRef<HTMLDivElement>(null);
  const specCanRef = useRef<HTMLDivElement>(null);
  const specRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);

  useDocumentTitle("Red Wolf · Energy Drink", "en");
  useFonts(FONTS_HREF);
  useLenis({ lerp: 0.08 });
  useLupaAnimations({
    navRef,
    heroTagRef,
    heroH1Ref,
    heroSubRef,
    heroCtaRef,
    canRef,
    specCanRef,
    specRef,
    galleryRef,
    ctaRef,
  });

  return (
    <div
      className="theme-lupa lupa-page font-[Plus_Jakarta_Sans] overflow-x-hidden"
      style={{ background: T.bg, color: T.onBg }}
    >
      <Link
        to="/"
        className="fixed top-4 left-4 z-[200] text-[0.72rem] tracking-[0.05em] px-3 py-1.5 rounded-[20px] border border-white/10 bg-black/35 backdrop-blur-[8px] text-white/55 transition-colors hover:text-white hover:bg-black/60"
      >
        &#8592; Demos
      </Link>
      <NavBar navRef={navRef} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroSection
        heroTagRef={heroTagRef}
        heroH1Ref={heroH1Ref}
        heroSubRef={heroSubRef}
        heroCtaRef={heroCtaRef}
        canRef={canRef}
      />
      <ReelSection />
      <LabSpecsSection specCanRef={specCanRef} specRef={specRef} />
      <GallerySection galleryRef={galleryRef} />
      <CtaSection ctaRef={ctaRef} />
    </div>
  );
}
