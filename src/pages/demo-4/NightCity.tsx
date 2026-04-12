import React, { useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
//import { Beams } from './Beams'
import PrismaticBurst from "./PrismaticBurst";
import { FuzzyText } from "./FuzzyText";

import vinil0 from "../../Resources/img/vinil_0.png";
import vinil1 from "../../Resources/img/vinil_1.webp";
import vinil2 from "../../Resources/img/vinil_2.png";
import vinil3 from "../../Resources/img/vinil_3.png";
import vinil4 from "../../Resources/img/vinil_4.png";

gsap.registerPlugin(ScrollTrigger);

// ── Fonts ─────────────────────────────────────────────────────────────────────
const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=Space+Mono:wght@400;700&family=Inter:wght@300;400;500;700&display=swap";

// ── Color tokens ──────────────────────────────────────────────────────────────
const C = {
  bg: "#060608",
  surface: "rgba(14,13,18,0.75)",
  accent: "#9B5DE5",
  gold: "#F5A623",
  white: "#F0EEF5",
  dim: "#6B6880",
  border: "rgba(155,93,229,0.22)",
};

// ── Vinyl catalog ─────────────────────────────────────────────────────────────
const VINYLS = [
  {
    image: vinil0,
    text: "Evangelion Finally",
    artist: "Various Artists",
    price: "$38",
  },
  { image: vinil1, text: "Plastic Beach", artist: "Gorillaz", price: "$32" },
  { image: vinil2, text: "Purple EP", artist: "Unknown Signal", price: "$28" },
  {
    image: vinil3,
    text: "Hit Me Hard & Soft",
    artist: "Billie Eilish",
    price: "$34",
  },
  { image: vinil4, text: "Discovery", artist: "Daft Punk", price: "$45" },
];

// ── Ad cards for ScrollStack ──────────────────────────────────────────────────
const ADS = [
  {
    border: "#9B5DE5",
    tag: "JUST LANDED",
    title: "BRAND NEW",
    sub: "Fresh pressings — just arrived this week.",
  },
  {
    border: "#E5375D",
    tag: "EDITOR'S PICK",
    title: "BEST VINYLS",
    sub: "Handpicked collection from our curators.",
  },
  {
    border: "#3DD9C5",
    tag: "WORLDWIDE",
    title: "FREE SHIPPING",
    sub: "On every order. No minimum, no excuses.",
  },
  {
    border: "#F5A623",
    tag: "MEMBERS ONLY",
    title: "JOIN THE CLUB",
    sub: "First access to limited pressings.",
  },
];

// ── Gallery rows ──────────────────────────────────────────────────────────────
const GALLERY_ROWS = [
  [...VINYLS, ...VINYLS], // row 0 — scroll right→left
  [...VINYLS, ...VINYLS].reverse(), // row 1 — scroll left→right
  [...VINYLS, ...VINYLS], // row 2 — scroll right→left
];

// ─────────────────────────────────────────────────────────────────────────────
// ScrollStack
// ─────────────────────────────────────────────────────────────────────────────
const ScrollStackItem = ({ children }: { children: React.ReactNode }) => (
  <div className="ss-card">{children}</div>
);

function ScrollStack({
  children,
  itemDistance = 30,
  itemScale = 0.04,
  itemStackDistance = 20,
  stackPosition = "18%",
  scaleEndPosition = "8%",
  baseScale = 0.84,
}: {
  children: React.ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTRef = useRef(new Map<number, Record<string, number>>());
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  const parsePct = useCallback(
    (v: string | number, h: number) =>
      typeof v === "string" && v.includes("%")
        ? (parseFloat(v) / 100) * h
        : parseFloat(v as string),
    [],
  );

  const updateCards = useCallback(() => {
    const scrollTop = window.scrollY;
    const ch = window.innerHeight;
    const stackPx = parsePct(stackPosition, ch);
    const scaleEndPx = parsePct(scaleEndPosition, ch);
    const endEl = document.querySelector(".ss-end") as HTMLElement;
    const endTop = endEl
      ? endEl.getBoundingClientRect().top + window.scrollY
      : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const cardTop = card.getBoundingClientRect().top + window.scrollY;
      const triggerStart = cardTop - stackPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPx;
      const pinStart = triggerStart;
      const pinEnd = endTop - ch / 2;

      const sp =
        scrollTop < triggerStart
          ? 0
          : scrollTop > triggerEnd
            ? 1
            : (scrollTop - triggerStart) / (triggerEnd - triggerStart);
      const scale = 1 - sp * (1 - (baseScale + i * itemScale));

      let ty = 0;
      if (scrollTop >= pinStart && scrollTop <= pinEnd)
        ty = scrollTop - cardTop + stackPx + itemStackDistance * i;
      else if (scrollTop > pinEnd)
        ty = pinEnd - cardTop + stackPx + itemStackDistance * i;

      const nT = {
        ty: Math.round(ty * 100) / 100,
        sc: Math.round(scale * 1000) / 1000,
      };
      const lT = lastTRef.current.get(i);
      if (
        !lT ||
        Math.abs((lT.ty ?? 0) - nT.ty) > 0.1 ||
        Math.abs((lT.sc ?? 1) - nT.sc) > 0.001
      ) {
        card.style.transform = `translate3d(0,${nT.ty}px,0) scale(${nT.sc})`;
        lastTRef.current.set(i, nT);
      }
    });
  }, [
    parsePct,
    stackPosition,
    scaleEndPosition,
    itemStackDistance,
    itemScale,
    baseScale,
  ]);

  useLayoutEffect(() => {
    const cards = Array.from(
      document.querySelectorAll(".ss-card"),
    ) as HTMLElement[];
    cardsRef.current = cards;
    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = "transform";
      card.style.transformOrigin = "top center";
    });
    const lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", updateCards);
    const raf = (t: number) => {
      lenis.raf(t);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);
    lenisRef.current = lenis;
    updateCards();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      cardsRef.current = [];
      lastTRef.current.clear();
    };
  }, [itemDistance, updateCards]);

  return (
    <div ref={scrollerRef} style={{ position: "relative" }}>
      <div>
        {children}
        <div className="ss-end" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GSAP Horizontal Scrolling Gallery
// ─────────────────────────────────────────────────────────────────────────────
function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      rowRefs.current.forEach((wrapper, i) => {
        if (!wrapper || !wrapper.parentElement) return;
        const section = wrapper.parentElement;

        // Odd rows go right→left (start at 0, end negative)
        // Even rows go left→right (start negative, end at 0)
        const scrollWidth = wrapper.scrollWidth - section.offsetWidth;
        const [xStart, xEnd] =
          i % 2 === 0 ? [0, -scrollWidth] : [-scrollWidth, 0];

        gsap.fromTo(
          wrapper,
          { x: xStart },
          {
            x: xEnd,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="hg-section">
      {GALLERY_ROWS.map((row, ri) => (
        <div key={ri} className="hg-row">
          <div
            ref={(el) => {
              rowRefs.current[ri] = el;
            }}
            className="hg-wrapper"
          >
            {row.map((v, ci) => (
              <div key={ci} className="hg-card">
                <div className="hg-img-wrap">
                  <img src={v.image} alt={v.text} className="hg-img" />
                </div>
                <div className="hg-info">
                  <span className="hg-artist">{v.artist}</span>
                  <span className="hg-title">{v.text}</span>
                  <span className="hg-price">{v.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────
export function NightCity() {
  useEffect(() => {
    if (!document.querySelector(`link[href="${FONTS_HREF}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = FONTS_HREF;
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div style={{ color: C.white, overflowX: "hidden", position: "relative" }}>
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; background: ${C.bg}; }

        /* ── Fixed Beams background ── */
        .nc-beams-bg { position: fixed; inset: 0; z-index: 0; background: ${C.bg}; }
        .nc-beams-overlay { position: fixed; inset: 0; z-index: 1; background: rgba(6,6,8,0.72); }

        /* All page content sits above the bg */
        .nc-content { position: relative; z-index: 2; }

        /* Hero */
        .nc-hero {
          height: 100vh; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
        }
        .nc-hero-fuzzy { display: flex; flex-direction: column; align-items: center; gap: 0; }
        .nc-hero-sub {
          font-family: 'Space Mono', monospace; font-size: 0.62rem;
          letter-spacing: 0.38em; color: ${C.accent}; margin-top: 1.5rem;
          text-transform: uppercase;
        }
        .nc-scroll-hint { margin-top: 3.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
        .nc-scroll-hint span { font-family: 'Space Mono', monospace; font-size: 0.48rem; letter-spacing: 0.3em; color: rgba(255,255,255,0.25); }
        .nc-scroll-line { width: 1px; height: 56px; background: linear-gradient(to bottom, rgba(155,93,229,0.8), transparent); animation: spulse 2s ease-in-out infinite; }
        @keyframes spulse { 0%,100%{opacity:0.3} 50%{opacity:1} }

        /* ScrollStack section */
        .ss-section { padding: 8rem 0; }
        .ss-inner { max-width: min(1360px, 95vw); margin: 0 auto; padding: 0 2rem; }
        .ss-head { text-align: center; margin-bottom: 4rem; }
        .ss-head h2 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 700; font-style: italic; margin: 0 0 0.75rem; }
        .ss-head p { font-family: 'Space Mono', monospace; font-size: 0.58rem; letter-spacing: 0.3em; color: ${C.accent}; margin: 0; }

        /* Ad cards — full width within container */
        .ss-card { width: 100%; }
        .ss-card-inner {
          width: 100%; border-radius: 20px; overflow: hidden;
          padding: clamp(3rem, 5vw, 5rem) clamp(3rem, 6vw, 7rem);
          position: relative;
          background: rgba(10,9,14,0.88);
          backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.07);
          min-height: 52vh;
          display: flex; flex-direction: column; justify-content: flex-end;
        }
        .ss-card-tag { font-family: 'Space Mono', monospace; font-size: 0.6rem; letter-spacing: 0.3em; font-weight: 700; margin-bottom: 1.25rem; display: block; }
        .ss-card-title { font-family: 'Playfair Display', serif; font-size: clamp(3.5rem, 7vw, 7rem); font-weight: 900; line-height: 0.88; margin-bottom: 1.5rem; letter-spacing: -0.03em; }
        .ss-card-sub { font-family: 'Inter', sans-serif; font-size: 1.05rem; color: rgba(255,255,255,0.45); max-width: 520px; line-height: 1.6; margin-bottom: 2.5rem; }
        .ss-card-cta { display: inline-block; font-family: 'Space Mono', monospace; font-size: 0.65rem; letter-spacing: 0.22em; font-weight: 700; padding: 0.9rem 2.2rem; border-radius: 9999px; cursor: pointer; border: none; transition: transform 0.2s; }
        .ss-card-cta:hover { transform: scale(1.04); }
        .ss-card-num { position: absolute; top: 0; right: 5%; font-family: 'Playfair Display', serif; font-size: clamp(8rem, 18vw, 18rem); font-weight: 900; font-style: italic; color: rgba(255,255,255,0.025); line-height: 1; pointer-events: none; user-select: none; }

        /* Horizontal Gallery */
        .hg-section { padding: 6rem 0 8rem; overflow: hidden; }
        .hg-section-head { max-width: min(1360px, 95vw); margin: 0 auto; padding: 0 2rem 3.5rem; }
        .hg-section-head h3 { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 3.5vw, 3rem); font-weight: 700; font-style: italic; margin: 0 0 0.5rem; }
        .hg-section-head p { font-family: 'Space Mono', monospace; font-size: 0.58rem; letter-spacing: 0.3em; color: ${C.accent}; margin: 0; }
        .nc-badge { display: inline-block; font-family: 'Space Mono', monospace; font-size: 0.52rem; letter-spacing: 0.25em; padding: 0.3rem 0.9rem; border-radius: 9999px; border: 1px solid ${C.accent}; color: ${C.accent}; margin-bottom: 1.2rem; }

        .hg-row { overflow: hidden; margin-bottom: 1.25rem; }
        .hg-wrapper { display: flex; gap: 1rem; width: max-content; padding: 0.5rem 0; }

        .hg-card {
          width: clamp(200px, 20vw, 280px); flex-shrink: 0;
          background: rgba(14,13,18,0.85);
          border: 1px solid ${C.border};
          border-radius: 12px; overflow: hidden;
          transition: box-shadow 0.3s;
        }
        .hg-card:hover { box-shadow: 0 12px 40px rgba(155,93,229,0.25); }

        .hg-img-wrap { aspect-ratio: 1; overflow: hidden; background: #0d0c12; }
        .hg-img { width: 100%; height: 100%; object-fit: contain; display: block; transition: transform 0.5s ease; }
        .hg-card:hover .hg-img { transform: scale(1.06); }

        .hg-info { padding: 0.9rem 1.1rem 1.1rem; display: flex; flex-direction: column; gap: 0.25rem; }
        .hg-artist { font-family: 'Space Mono', monospace; font-size: 0.5rem; letter-spacing: 0.2em; color: ${C.accent}; text-transform: uppercase; }
        .hg-title { font-family: 'Playfair Display', serif; font-size: 0.95rem; font-weight: 700; color: ${C.white}; }
        .hg-price { font-family: 'Space Mono', monospace; font-size: 0.85rem; font-weight: 700; color: ${C.gold}; margin-top: 0.35rem; }

        /* Divider */
        .nc-rule { width: 100%; height: 1px; background: linear-gradient(to right, transparent, rgba(155,93,229,0.3), transparent); margin: 4rem 0; }
      `}</style>

      {/* ── Fixed Beams background ────────────────────────────────────────── */}
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <PrismaticBurst
          animationType="hover"
          intensity={2}
          speed={0.5}
          distort={0}
          paused={false}
          offset={{ x: 0, y: 0 }}
          hoverDampness={0.25}
          rayCount={0}
          mixBlendMode="lighten"
          colors={["#ff007a", "#4d3dff", "#ffffff"]}
          // color="#62a0ea"
          // color1="#62a0ea"
          // color2="#62a0ea"
        />
      </div>
      {/* Dark overlay for readability */}
      <div className="nc-beams-overlay" />

      {/* ── All page content ──────────────────────────────────────────────── */}
      <div className="nc-content">
        {/* Hero */}
        <section className="nc-hero">
          <div className="nc-hero-fuzzy">
            <FuzzyText
              fontSize="clamp(3.5rem,9vw,9rem)"
              fontWeight={900}
              fontFamily="'Playfair Display', serif"
              color="#F0EEF5"
              baseIntensity={0.15}
              hoverIntensity={0.55}
              fuzzRange={28}
            >
              NightCity
            </FuzzyText>
            <FuzzyText
              fontSize="clamp(3.5rem,9vw,9rem)"
              fontWeight={900}
              fontFamily="'Playfair Display', serif"
              color="#9B5DE5"
              baseIntensity={0.2}
              hoverIntensity={0.65}
              fuzzRange={32}
            >
              Records
            </FuzzyText>
          </div>
          <p className="nc-hero-sub">
            // Rare Vinyl · Underground Pressings · Est. 2019
          </p>
          <div className="nc-scroll-hint">
            <span>SCROLL</span>
            <div className="nc-scroll-line" />
          </div>
        </section>

        {/* ScrollStack — ads */}
        <div className="ss-section">
          <div className="ss-inner">
            <div className="ss-head">
              <h2>What's Spinning</h2>
              <p>// NIGHTCITY RECORDS · WEEKLY BROADCAST</p>
            </div>
            <ScrollStack
              itemDistance={30}
              itemStackDistance={20}
              stackPosition="18%"
              baseScale={0.84}
            >
              {ADS.map((ad, i) => (
                <ScrollStackItem key={i}>
                  <div className="ss-card-inner">
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `radial-gradient(ellipse at 80% 20%, ${ad.border}15 0%, transparent 60%)`,
                        pointerEvents: "none",
                      }}
                    />
                    <span className="ss-card-num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="ss-card-tag" style={{ color: ad.border }}>
                      {ad.tag}
                    </span>
                    <div className="ss-card-title">{ad.title}</div>
                    <p className="ss-card-sub">{ad.sub}</p>
                    <button
                      className="ss-card-cta"
                      style={{ background: ad.border, color: "#000" }}
                    >
                      SHOP NOW →
                    </button>
                  </div>
                </ScrollStackItem>
              ))}
            </ScrollStack>
          </div>
        </div>

        <div className="nc-rule" />

        {/* GSAP Horizontal Gallery */}
        <div className="hg-section-head">
          <span className="nc-badge">CATALOG</span>
          <h3 className="hg-section-head">Vinyl Collection</h3>
          <p>// SCROLL TO BROWSE · {VINYLS.length} TITLES</p>
        </div>
        <HorizontalGallery />
      </div>
    </div>
  );
}
