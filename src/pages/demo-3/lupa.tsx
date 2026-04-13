import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFonts } from "../../Hooks/useFonts";
import { useLenis } from "../../Hooks/useLenis";
import lupaVideo from "../../Resources/video/lupa.mp4";
import lupaCan from "../../Resources/img/lupa_bebida2.png";

gsap.registerPlugin(ScrollTrigger);

// ── Design Tokens — berry-pink palette from the can ──────────────────────────
const T = {
  bg: "#0d0d0d",
  bgLow: "#000000",
  surface: "#161616",
  surfaceVar: "#222222",
  primary: "#f72585", // vivid berry-pink
  primaryDim: "#b5179e", // deeper purple-pink
  primaryGlow: "rgba(247,37,133,0.25)",
  secondaryDim: "#e8c4f0",
  outline: "#767575",
  outlineVar: "#3a3a3a",
  onBg: "#ffffff",
  onPrimary: "#1a0010",
  onSurfaceVar: "#909090",
};

// ── Fonts ─────────────────────────────────────────────────────────────────────
const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;700;800&display=swap";

// ── Lab Specs ─────────────────────────────────────────────────────────────────
const SPECS = [
  {
    tag: "ENERGY",
    value: "150",
    unit: "MG",
    label: "NATURAL CAFFEINE",
    highlight: true,
  },
  {
    tag: "SUGAR",
    value: "00",
    unit: "",
    label: "ZERO SUGAR BLEND",
    highlight: false,
  },
  {
    tag: "NOOTROPICS",
    value: "B12",
    unit: "",
    label: "BRAIN ENHANCEMENT",
    highlight: true,
  },
  {
    tag: "CALORIES",
    value: "15",
    unit: "",
    label: "PER SERVING SIZE",
    highlight: false,
  },
];

// ── Gallery — 4 equal-width images ───────────────────────────────────────────
const GALLERY = [
  {
    src: "https://preview.redd.it/what-does-heartpour-taste-like-v0-69r545egss6f1.jpeg?auto=webp&s=d9f6d4979ac3c072b367a99a3b98a32ec7a3fe9c",
    label: "BERRY SURGE",
    tag: "FLAVOR DROP",
    scrubY: 90,
  },
  {
    src: "https://pbs.twimg.com/media/Gu3fwsdWwAA_2Jb.jpg",
    label: "RED WOLF PACK",
    tag: "COLLECTION",
    scrubY: -70,
  },
  {
    src: "https://i.redd.it/lupa-is-too-cute-v0-ejhxd67yfn6f1.png?width=2560&format=png&auto=webp&s=9269e4bbe5f3b4108614503acab6f941d60660fe",
    label: "WOLF ENERGY",
    tag: "ICON",
    scrubY: 110,
  },
  {
    src: "https://preview.redd.it/lupa-is-adorable-v0-jb4ewm8xjj6f1.png?auto=webp&s=f6b1852b09c7f4f4686de0b6f420898b06dc4759",
    label: "SURGE FACE",
    tag: "MASCOT",
    scrubY: -50,
  },
];

// ── Nav links ─────────────────────────────────────────────────────────────────
const NAV_LINKS = ["HOME", "SCIENCE", "ETHOS", "SHOP"];

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

  useFonts(FONTS_HREF);
  useLenis({ lerp: 0.08 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero entrance ────────────────────────────────────────────────────
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(heroTagRef.current, { opacity: 0, y: 16, duration: 0.7 }, 0.3)
        .from(heroH1Ref.current, { opacity: 0, y: 60, duration: 1.1 }, 0.5)
        .from(heroSubRef.current, { opacity: 0, y: 24, duration: 0.8 }, 0.8)
        .from(heroCtaRef.current, { opacity: 0, y: 20, duration: 0.7 }, 1.0)
        .from(
          canRef.current,
          {
            opacity: 0,
            x: 60,
            rotation: 12,
            duration: 1.2,
            ease: "power3.out",
          },
          0.4,
        );

      // ── Nav darkens on scroll ─────────────────────────────────────────────
      ScrollTrigger.create({
        trigger: "body",
        start: "top -80px",
        onEnter: () =>
          gsap.to(navRef.current, {
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(24px)",
            duration: 0.4,
          }),
        onLeaveBack: () =>
          gsap.to(navRef.current, {
            background: "rgba(13,13,13,0.0)",
            backdropFilter: "blur(0px)",
            duration: 0.3,
          }),
      });

      // ── Lab Specs — can float in + rows stagger ───────────────────────────
      gsap.from(specCanRef.current, {
        opacity: 0,
        x: -60,
        rotation: -8,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: specRef.current, start: "top 80%" },
      });
      gsap.from(specRef.current?.querySelectorAll(".spec-row") ?? [], {
        opacity: 0,
        x: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: specRef.current, start: "top 75%" },
      });

      // ── Gallery — scrubbed per-cell parallax (4 columns) ─────────────────
      const bentoCells =
        galleryRef.current?.querySelectorAll(".bento-cell") ?? [];
      bentoCells.forEach((cell, i) => {
        gsap.fromTo(
          cell,
          { y: GALLERY[i]?.scrubY ?? 60, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 90%",
              end: "center 30%",
              scrub: 2,
            },
          },
        );
      });

      // ── CTA reveal ────────────────────────────────────────────────────────
      gsap.from(ctaRef.current?.children ?? [], {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 80%" },
      });

      // ── Hero can hover ────────────────────────────────────────────────────
      const el = canRef.current;
      const onEnter = () =>
        gsap.to(el, { rotation: 4, y: -10, duration: 0.4, ease: "power2.out" });
      const onLeave = () =>
        gsap.to(el, { rotation: 0, y: 0, duration: 0.5, ease: "power2.out" });
      el?.addEventListener("mouseenter", onEnter);
      el?.addEventListener("mouseleave", onLeave);
      return () => {
        el?.removeEventListener("mouseenter", onEnter);
        el?.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: T.bg,
        color: T.onBg,
        overflowX: "hidden",
      }}
    >
      {/* ── Back button ─────────────────────────────────────────────────── */}
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
        ← Demos
      </Link>
      {/* ── Global CSS ─────────────────────────────────────────────────────── */}
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

        /* Bento hover */
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

        /* Spec rows */
        .spec-row { transition: background 0.2s; }
        .spec-row:hover { background: rgba(247,37,133,0.04); }

        /* Nav arrows */
        .gal-arrow {
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          color: #fff; cursor: pointer; font-size: 1rem;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, border-color 0.2s;
        }
        .gal-arrow:hover { background: ${T.primary}; border-color: ${T.primary}; }
      `}</style>

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          background: "transparent",
          transition: "background 0.4s, backdrop-filter 0.4s",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.6rem 2.5rem",
            maxWidth: 1440,
            margin: "0 auto",
          }}
        >
          <div style={{ display: "flex", gap: "2.8rem", alignItems: "center" }}>
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href="#"
                className="nav-link he-body"
                style={{
                  fontSize: "0.78rem",
                  letterSpacing: "0.05em",
                  fontWeight: i === 0 ? 700 : 400,
                  color: i === 0 ? T.onBg : "rgba(255,255,255,0.5)",
                }}
              >
                {link}
              </a>
            ))}
          </div>
          <div
            style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}
          >
            <button
              className="nav-menu-btn he-body"
              style={{
                padding: "0.55rem 1.4rem",
                borderRadius: 9999,
                color: T.onBg,
                fontSize: "0.78rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                cursor: "pointer",
              }}
            >
              Menu
            </button>
            <button
              className="nav-menu-btn"
              style={{
                width: 40,
                height: 40,
                borderRadius: 9999,
                color: T.onBg,
                fontSize: "1rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                letterSpacing: 2,
              }}
            >
              •••
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          className="hero-glow"
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        />
        <div
          className="grid-overlay"
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            flex: 1,
            display: "grid",
            gridTemplateColumns: "7fr 5fr",
            gap: "2rem",
            alignItems: "center",
            maxWidth: 1440,
            margin: "0 auto",
            padding: "8rem 2.5rem 6rem",
            width: "100%",
          }}
        >
          {/* Text */}
          <div>
            <span
              ref={heroTagRef}
              className="he-headline"
              style={{
                display: "block",
                color: T.primary,
                letterSpacing: "0.4em",
                fontSize: "0.68rem",
                fontWeight: 700,
                marginBottom: "1.5rem",
              }}
            >
              BERRY SURGE FUEL
            </span>
            <h1
              ref={heroH1Ref}
              className="he-headline"
              style={{
                fontSize: "clamp(4.5rem,9.5vw,9.5rem)",
                lineHeight: 0.82,
                fontWeight: 900,
                fontStyle: "italic",
                letterSpacing: "-0.04em",
                marginBottom: "2rem",
              }}
            >
              RED
              <br />
              WOLF
            </h1>
            <p
              ref={heroSubRef}
              className="he-headline"
              style={{
                fontSize: "clamp(1rem,2vw,1.6rem)",
                fontWeight: 300,
                letterSpacing: "0.2em",
                color: T.secondaryDim,
                opacity: 0.75,
                maxWidth: 520,
              }}
            >
              We Fuel. We Ignite. We Surge.
              <br />
              Step into the electric frequency.
            </p>
            <div
              ref={heroCtaRef}
              style={{
                marginTop: "2.5rem",
                display: "flex",
                gap: "1.2rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <button
                className="btn-primary he-headline"
                style={{
                  padding: "0.9rem 2.2rem",
                  borderRadius: 9999,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  fontSize: "0.72rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Discover
              </button>
              <span
                style={{ color: "rgba(255,255,255,0.2)", fontSize: "1.2rem" }}
              >
                •••
              </span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.8rem",
                  color: "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.85rem",
                  }}
                >
                  ▶
                </div>
                <span
                  className="he-body"
                  style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
                >
                  Watch the reel
                </span>
              </div>
            </div>
          </div>

          {/* Can */}
          <div
            ref={canRef}
            style={{
              position: "relative",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: -60,
                background: `${T.primary}22`,
                borderRadius: "50%",
                filter: "blur(90px)",
              }}
            />
            <img
              src={lupaCan}
              alt="Red Wolf Energy Can"
              style={{
                position: "relative",
                zIndex: 1,
                width: "90%",
                maxWidth: 420,
                height: "auto",
                filter: `drop-shadow(0 0 70px rgba(247,37,133,0.55))`,
              }}
            />
          </div>
        </div>
      </section>

      {/* ── The Reel — full-width video, right below hero ─────────────────── */}
      <section style={{ background: T.bgLow }}>
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "4rem 2.5rem 2rem",
          }}
        >
          <h3
            className="he-headline"
            style={{
              fontSize: "1.4rem",
              fontWeight: 700,
              fontStyle: "italic",
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            THE REEL
          </h3>
          <div
            style={{
              width: 36,
              height: 2,
              background: T.primary,
              margin: "0.8rem auto 0",
            }}
          />
        </div>
        <div
          style={{
            width: "100vw",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
            overflow: "hidden",
          }}
        >
          <video
            src={lupaVideo}
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              display: "block",
              maxHeight: "75vh",
              objectFit: "cover",
              background: "#000",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "0.75rem 2rem",
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: `1px solid ${T.primary}22`,
            }}
          >
            <span
              className="he-body"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
                color: T.onSurfaceVar,
                fontWeight: 700,
              }}
            >
              COMMERCIAL VIDEO 2024
            </span>
            <span
              className="he-body"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                color: T.primary,
                fontWeight: 700,
              }}
            >
              RED WOLF
            </span>
          </div>
        </div>
      </section>

      {/* ── Lab Specs ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: T.bgLow,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* bg glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "25%",
            transform: "translate(-50%,-50%)",
            width: 600,
            height: 600,
            background: `${T.primary}12`,
            borderRadius: "50%",
            filter: "blur(120px)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: "85vh",
            maxWidth: 1440,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Left — Can */}
          <div
            ref={specCanRef}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "4rem 3rem",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(circle at 50% 50%, ${T.primary}18 0%, transparent 65%)`,
              }}
            />
            <img
              src={lupaCan}
              alt="Lupa Energy Can"
              style={{
                position: "relative",
                zIndex: 1,
                width: "72%",
                maxWidth: 400,
                filter: `drop-shadow(0 0 90px rgba(247,37,133,0.6)) drop-shadow(0 40px 60px rgba(0,0,0,0.5))`,
              }}
            />
          </div>

          {/* Right — Specs info */}
          <div
            ref={specRef}
            style={{
              padding: "clamp(3rem,6vw,6rem) clamp(2rem,5vw,5rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderLeft: `1px solid ${T.outlineVar}`,
            }}
          >
            <span
              className="he-body"
              style={{
                fontSize: "0.62rem",
                letterSpacing: "0.35em",
                color: T.primary,
                fontWeight: 700,
                marginBottom: "1.2rem",
              }}
            >
              // PERFORMANCE ANALYSIS V2.4
            </span>
            <h2
              className="he-headline"
              style={{
                fontSize: "clamp(3.5rem,5.5vw,6.5rem)",
                fontWeight: 900,
                fontStyle: "italic",
                letterSpacing: "-0.04em",
                lineHeight: 0.85,
                marginBottom: "3.5rem",
              }}
            >
              LAB
              <br />
              SPECS
            </h2>

            {/* Spec rows */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                borderTop: `1px solid ${T.outlineVar}`,
              }}
            >
              {SPECS.map((s) => (
                <div
                  key={s.tag}
                  className="spec-row"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center",
                    padding: "1.8rem 0.5rem",
                    borderBottom: `1px solid ${T.outlineVar}`,
                    gap: "1.5rem",
                  }}
                >
                  <div>
                    <span
                      className="he-body"
                      style={{
                        fontSize: "0.7rem",
                        letterSpacing: "0.18em",
                        color: T.onSurfaceVar,
                        fontWeight: 700,
                        display: "block",
                      }}
                    >
                      {s.tag}
                    </span>
                    <span
                      className="he-body"
                      style={{
                        fontSize: "0.58rem",
                        letterSpacing: "0.1em",
                        color: `${T.onSurfaceVar}88`,
                        marginTop: 4,
                        display: "block",
                      }}
                    >
                      {s.label}
                    </span>
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                      display: "flex",
                      alignItems: "baseline",
                      gap: 6,
                    }}
                  >
                    <span
                      className="he-headline"
                      style={{
                        fontSize: "clamp(2.8rem,4vw,4.5rem)",
                        fontWeight: 700,
                        lineHeight: 1,
                        color: s.highlight ? T.primary : T.onBg,
                        textShadow: s.highlight
                          ? `0 0 30px ${T.primaryGlow}`
                          : "none",
                      }}
                    >
                      {s.value}
                    </span>
                    {s.unit && (
                      <span
                        className="he-headline"
                        style={{
                          fontSize: "1rem",
                          color: T.onSurfaceVar,
                          fontWeight: 400,
                        }}
                      >
                        {s.unit}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom badge */}
            <div
              style={{
                marginTop: "2.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
              }}
            >
              <div style={{ flex: 1, height: 1, background: T.outlineVar }} />
              <span
                className="he-headline"
                style={{
                  fontSize: "2.2rem",
                  fontWeight: 900,
                  color: T.primary,
                }}
              >
                100%
              </span>
              <span
                className="he-body"
                style={{
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  color: T.onSurfaceVar,
                  fontWeight: 700,
                }}
              >
                KINETIC
                <br />
                UPTAKE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Flavor Gallery — full-width 4 equal columns, scrub ────────────── */}
      <section
        ref={galleryRef}
        style={{
          padding: "8rem 0 0",
          background: T.bg,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Header — inside max-width */}
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
              <button className="gal-arrow">←</button>
              <button className="gal-arrow">→</button>
            </div>
          </div>
        </div>

        {/* Full-width grid — 4 equal columns */}
        <div
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

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section
        style={{
          padding: "8rem 0",
          background: T.surface,
          position: "relative",
          overflow: "hidden",
          borderTop: `1px solid ${T.outlineVar}33`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "40%",
            height: "100%",
            background: `${T.primary}07`,
            borderRadius: "50%",
            filter: "blur(120px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "10%",
            width: "30%",
            height: "60%",
            background: `${T.primaryDim}06`,
            borderRadius: "50%",
            filter: "blur(100px)",
          }}
        />
        <div
          ref={ctaRef}
          style={{
            maxWidth: 860,
            margin: "0 auto",
            padding: "0 2.5rem",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h2
            className="he-headline"
            style={{
              fontSize: "clamp(3rem,8vw,7rem)",
              fontWeight: 900,
              fontStyle: "italic",
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              marginBottom: "2rem",
            }}
          >
            READY TO
            <br />
            SURGE?
          </h2>
          <p
            className="he-body"
            style={{
              color: `${T.secondaryDim}88`,
              fontSize: "1.05rem",
              maxWidth: 540,
              margin: "0 auto 3rem",
            }}
          >
            Join the collective of elite kinetics. Get the v2.4 formula
            delivered directly to your lab monthly. No contracts. Pure
            performance.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn-primary he-headline"
              style={{
                padding: "1.2rem 3.5rem",
                borderRadius: 9999,
                fontWeight: 700,
                letterSpacing: "0.18em",
                fontSize: "0.75rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              SUBSCRIBE NOW
            </button>
            <button
              className="he-headline"
              style={{
                background: "none",
                border: "none",
                borderBottom: `1px solid ${T.primary}`,
                padding: "0.5rem 0",
                color: T.onBg,
                fontWeight: 700,
                letterSpacing: "0.18em",
                fontSize: "0.7rem",
                cursor: "pointer",
              }}
            >
              FIND A RETAILER
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
