import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useFonts } from "../../hooks/useFonts";
import { useLenis } from "../../hooks/useLenis";
import { FONTS_HREF, T } from "./data/tokens";
import { useLupaAnimations } from "./hooks/useLupaAnimations";
import { GlobalStyles } from "./components/GlobalStyles";
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
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: T.bg,
        color: T.onBg,
        overflowX: "hidden",
      }}
    >
      <GlobalStyles />
      <Link
        to="/"
        style={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 200,
          color: "rgba(255,255,255,0.55)",
          fontSize: "0.72rem",
          textDecoration: "none",
          letterSpacing: "0.05em",
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.12)",
          padding: "6px 12px",
          borderRadius: 20,
          transition: "color 0.2s, background 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = "#fff";
          (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.6)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.color =
            "rgba(255,255,255,0.55)";
          (e.currentTarget as HTMLElement).style.background =
            "rgba(0,0,0,0.35)";
        }}
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
