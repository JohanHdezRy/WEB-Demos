import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useLenis } from "../../Hooks/useLenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

// ── DESIGN TOKENS ─────────────────────────────────────────────────────────────
const T = {
  bg: "#09090b",
  text: "#f5f5f0",
  muted: "rgba(245,245,240,0.45)",
  muted2: "rgba(245,245,240,0.22)",
  border: "rgba(255,255,255,0.08)",
  borderHi: "rgba(255,255,255,0.18)",
  surface: "#202020",
  glass: "rgba(200,200,200,0.1)",
  accentBg: "#f5f5f0",
  accentTx: "#09090b",
};

// ── DATA ──────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "300+", label: "Points of\nPresence" },
  { value: "20+", label: "Global\nRegions" },
  { value: "99.99%", label: "Uptime\nSLA" },
  { value: "$2bn+", label: "Infrastructure\nManaged" },
  { value: "10K+", label: "Teams\non Cloud X" },
];

const QUOTES = [
  {
    quote:
      "Cloud X cut our deployment time from 40 minutes to under 2. The auto-scaling alone saved us three full engineering sprints.",
    name: "Sarah Chen",
    role: "CTO & Co-Founder, Mira AI",
    stage: "Series B",
  },
  {
    quote:
      "We evaluated five platforms. Cloud X was the only one where the DevEx matched the reliability story. Zero cold starts is not marketing.",
    name: "Tobias Müller",
    role: "VP Engineering, Trackr",
    stage: "Series A",
  },
  {
    quote:
      "Their SRE team feels like an extension of ours. We passed our SOC 2 audit in six weeks. That was supposed to be impossible.",
    name: "Anika Osei",
    role: "Head of Platform, Parcel",
    stage: "Seed",
  },
  {
    quote:
      "The edge network alone was worth the switch. P99 latency dropped 68% globally overnight. Our users noticed before we told them.",
    name: "James Whitfield",
    role: "CEO & Co-Founder, Depot",
    stage: "Series A",
  },
];

const LOGOS = [
  "Stripe",
  "Vercel",
  "Linear",
  "Notion",
  "Figma",
  "Retool",
  "Supabase",
  "PlanetScale",
  "Loom",
  "Pitch",
];

const FEATURES = [
  {
    eyebrow: "Infrastructure",
    title: "Deploy anywhere.\nInstantly.",
    body: "One command sends your build to 20+ regions simultaneously. Automatic failover, zero-config CDN, and preview environments for every pull request.",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
  },
  {
    eyebrow: "Security",
    title: "Enterprise-grade\nby default.",
    body: "SOC 2 Type II, ISO 27001, zero-trust networking, RBAC and full audit logs — built in, not bolted on. Pass audits without slowing down.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
  },
];

const BELIEFS = [
  "Infrastructure should disappear, not demand attention.",
  "Developer experience is a product decision, not an afterthought.",
  "Security and velocity are not a trade-off.",
  "Great cloud is invisible. You only notice it when it's gone.",
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────
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

  // ── HERO TIMELINE ──────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(heroOverlayRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
      });

      const inners = titleRef.current?.querySelectorAll(".cx-inner");
      if (inners?.length) {
        tl.from(
          inners,
          { y: "115%", duration: 0.9, stagger: 0.06, ease: "power4.out" },
          "-=0.7",
        );
      }

      const split = SplitText.create(taglineRef.current, { type: "words" });
      tl.from(
        split.words,
        { opacity: 0, y: 18, stagger: 0.04, duration: 0.5, ease: "power2.out" },
        "-=0.45",
      );

      tl.from(
        Array.from(btnsRef.current?.children ?? []),
        { opacity: 0, y: 16, stagger: 0.1, duration: 0.45 },
        "-=0.35",
      );
      tl.from(
        bottomBarRef.current,
        { y: 64, opacity: 0, duration: 0.7 },
        "-=0.25",
      );

      tl.call(() => {
        if (videoRef.current) {
          gsap.to(videoRef.current, {
            scale: 1.07,
            duration: 14,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      });
    });
    return () => ctx.revert();
  }, []);

  // ── SCROLL TRIGGERS ────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      // navbar frost
      ScrollTrigger.create({
        start: "top -60",
        onEnter: () =>
          gsap.to(navRef.current, {
            background: "rgba(9,9,11,0.85)",
            backdropFilter: "blur(20px)",
            duration: 0.4,
          }),
        onLeaveBack: () =>
          gsap.to(navRef.current, {
            background: "transparent",
            backdropFilter: "blur(0px)",
            duration: 0.3,
          }),
      });

      // manifesto lines reveal
      if (manifRef.current) {
        gsap.from(manifRef.current.querySelectorAll(".belief-line"), {
          opacity: 0,
          x: -24,
          stagger: 0.12,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: manifRef.current, start: "top 75%" },
        });
      }

      // generic fade-up for sections
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });

      // feature images parallax
      gsap.utils.toArray<HTMLElement>(".feat-img").forEach((img) => {
        gsap.to(img, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: img.parentElement, scrub: true },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  const titleLetters = "Cloud X".split("");

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        background: T.bg,
        color: T.text,
        overflowX: "hidden",
        fontFamily: "system-ui,-apple-system,sans-serif",
      }}
    >
      {/* ══ NAVBAR ══════════════════════════════════════════════════════════ */}
      <nav
        ref={navRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          padding: "16px 24px",
          gap: 32,
          transition: "background 0.4s, backdrop-filter 0.4s",
        }}
        className="cx-nav"
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: "-0.03em",
            color: T.text,
            marginRight: 8,
          }}
        >
          Cloud<span style={{ opacity: 0.4 }}>X</span>
        </span>
        <Link
          to="/"
          style={{
            color: T.muted,
            fontSize: "0.75rem",
            textDecoration: "none",
          }}
        >
          ← Demos
        </Link>
        {/* Desktop links */}
        <div className="cx-nav-links">
          {["Platform", "Pricing", "Docs", "Status"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                color: T.muted,
                fontSize: "0.82rem",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
            >
              {l}
            </a>
          ))}
        </div>
        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <a
            href="#"
            className="cx-signin"
            style={{
              color: T.muted,
              fontSize: "0.82rem",
              textDecoration: "none",
              padding: "9px 20px",
            }}
          >
            Sign in
          </a>
          <button
            className="cx-cta-btn"
            style={{
              background: T.accentBg,
              color: T.accentTx,
              border: "none",
              padding: "9px 22px",
              borderRadius: 9999,
              fontSize: "0.82rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(0,0,0,0.26)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.26)";
            }}
          >
            Get started
          </button>
          {/* Hamburger */}
          <button
            className="cx-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: T.text,
              display: "flex",
              flexDirection: "column",
              gap: 5,
              padding: 4,
            }}
            aria-label="Toggle menu"
          >
            <span
              style={{
                display: "block",
                width: 22,
                height: 2,
                background: "currentColor",
                transition: "transform 0.3s, opacity 0.3s",
                transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: 22,
                height: 2,
                background: "currentColor",
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.3s",
              }}
            />
            <span
              style={{
                display: "block",
                width: 22,
                height: 2,
                background: "currentColor",
                transition: "transform 0.3s",
                transform: menuOpen
                  ? "translateY(-7px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: T.bg,
            zIndex: 90,
            display: "flex",
            flexDirection: "column",
            padding: "100px 32px 48px",
            gap: 32,
          }}
        >
          {["Platform", "Pricing", "Docs", "Status"].map((l) => (
            <a
              key={l}
              href="#"
              onClick={() => setMenuOpen(false)}
              style={{
                color: T.text,
                fontSize: "1.6rem",
                fontWeight: 300,
                letterSpacing: "-0.03em",
                textDecoration: "none",
              }}
            >
              {l}
            </a>
          ))}
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <a
              href="#"
              style={{
                color: T.muted,
                fontSize: "0.9rem",
                textDecoration: "none",
              }}
            >
              Sign in
            </a>
            <button
              style={{
                background: T.accentBg,
                color: T.accentTx,
                border: "none",
                padding: "14px 24px",
                borderRadius: 9999,
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              Get started
            </button>
          </div>
        </div>
      )}

      {/* ══ HERO — fullscreen video ══════════════════════════════════════════ */}
      <div
        style={{
          position: "relative",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <video
          ref={videoRef}
          src="https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_25fps.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transformOrigin: "center center",
          }}
        />
        <div
          ref={heroOverlayRef}
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(9,9,11,0.55) 0%, rgba(9,9,11,0.28) 50%, rgba(9,9,11,0.9) 100%)",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            padding: "0 24px",
            maxWidth: 860,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: T.glass,
              border: `1px solid rgba(255,255,255,0.13)`,
              backdropFilter: "blur(12px)",
              borderRadius: 9999,
              padding: "6px 16px",
              marginBottom: 40,
              fontSize: "0.72rem",
              color: T.muted,
              letterSpacing: "1px",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#4ade80",
                boxShadow: "0 0 8px #4ade80",
                flexShrink: 0,
              }}
            />
            All systems operational · 99.99% uptime
          </div>

          <div
            ref={titleRef}
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              marginBottom: 28,
            }}
          >
            {titleLetters.map((ch, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  lineHeight: 1,
                }}
              >
                <span
                  className="cx-inner"
                  style={{
                    display: "inline-block",
                    fontSize: "clamp(4.5rem,10vw,9rem)",
                    fontWeight: 300,
                    letterSpacing: ch === " " ? "0.08em" : "-0.04em",
                    color: ch === "X" ? "transparent" : T.text,
                    WebkitTextStroke:
                      ch === "X" ? `1.5px rgba(245,245,240,0.35)` : undefined,
                    paddingLeft: ch === " " ? "0.08em" : undefined,
                  }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              </span>
            ))}
          </div>

          <p
            ref={taglineRef}
            style={{
              color: T.muted,
              fontSize: "clamp(0.9rem,1.8vw,1.1rem)",
              lineHeight: 1.75,
              maxWidth: 520,
              margin: "0 auto 40px",
            }}
          >
            Deploy anywhere. Scale instantly. Sleep better.
            <br />
            The cloud platform built for teams that move fast.
          </p>

          <div
            ref={btnsRef}
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              style={{
                background: T.accentBg,
                color: T.accentTx,
                border: "none",
                padding: "14px 32px",
                borderRadius: 9999,
                fontSize: "0.88rem",
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 10px 32px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
              }}
            >
              Start for free
            </button>
            <button
              style={{
                background: T.glass,
                color: T.text,
                border: `1px solid rgba(255,255,255,0.13)`,
                padding: "14px 32px",
                borderRadius: 9999,
                fontSize: "0.88rem",
                cursor: "pointer",
                backdropFilter: "blur(12px)",
                transition: "background 0.2s, transform 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.14)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = T.glass;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Watch demo
            </button>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 36,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 1,
              height: 52,
              background:
                "linear-gradient(to bottom, transparent, rgba(245,245,240,0.25))",
            }}
          />
          <span
            style={{
              color: T.muted2,
              fontSize: "0.62rem",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
            }}
          >
            scroll
          </span>
        </div>
      </div>

      {/* ══ TWO CARDS — For Developers / For Enterprise ══════════════════════ */}
      <section
        className="cx-two-cards"
        style={{
          padding: "0",
          borderTop: `1px solid ${T.border}`,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: 560,
        }}
      >
        {[
          {
            eyebrow: "For developers",
            title: "Ship faster.\nBreak nothing.",
            body: "Git-push deploys, instant rollbacks, preview environments and a CLI that stays out of your way. Build the thing — we handle the rest.",
            cta: "Explore the platform",
            img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
          },
          {
            eyebrow: "For enterprise",
            title: "Scale without\ncompromise.",
            body: "SOC 2 Type II, RBAC, dedicated SRE support, and SLAs that mean something. Production-grade reliability from day one.",
            cta: "Talk to sales",
            img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
          },
        ].map((card, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              overflow: "hidden",
              minHeight: 560,
              borderRight: i === 0 ? `1px solid ${T.border}` : "none",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector(
                ".card-img",
              ) as HTMLElement;
              if (img) img.style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector(
                ".card-img",
              ) as HTMLElement;
              if (img) img.style.transform = "scale(1)";
            }}
          >
            <img
              className="card-img"
              src={card.img}
              alt={card.eyebrow}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)",
                filter: "brightness(0.45)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(9,9,11,0.88) 0%, rgba(9,9,11,0.2) 60%, transparent 100%)",
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 2,
                padding: "40px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <p
                style={{
                  color: T.muted2,
                  fontSize: "0.68rem",
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  marginBottom: 16,
                  fontWeight: 500,
                }}
              >
                {card.eyebrow}
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.8rem,3vw,2.8rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                  margin: "0 0 16px",
                  color: T.text,
                  whiteSpace: "pre-line",
                }}
              >
                {card.title}
              </h2>
              <p
                style={{
                  color: T.muted,
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  maxWidth: 380,
                  margin: "0 0 28px",
                }}
              >
                {card.body}
              </p>
              <a
                href="#"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  color: T.text,
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  borderBottom: `1px solid ${T.borderHi}`,
                  paddingBottom: 2,
                  width: "fit-content",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.65")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {card.cta}
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* ══ MANIFESTO ════════════════════════════════════════════════════════ */}
      <section
        ref={manifRef}
        style={{
          padding: "120px 48px",
          borderTop: `1px solid ${T.border}`,
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <p
          className="reveal-up"
          style={{
            color: T.muted2,
            fontSize: "0.68rem",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            marginBottom: 48,
            fontWeight: 500,
          }}
        >
          Our principles
        </p>
        <h2
          className="reveal-up"
          style={{
            fontSize: "clamp(2rem,4vw,3.2rem)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            lineHeight: 1.2,
            margin: "0 0 56px",
            color: T.text,
          }}
        >
          Cloud built for teams who refuse to slow down.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {BELIEFS.map((belief, i) => (
            <div
              key={i}
              className="belief-line"
              style={{
                padding: "28px 0",
                borderTop: `1px solid ${T.border}`,
                display: "flex",
                alignItems: "center",
                gap: 24,
              }}
            >
              <span
                style={{
                  color: T.muted2,
                  fontSize: "0.7rem",
                  fontVariantNumeric: "tabular-nums",
                  minWidth: 24,
                }}
              >
                0{i + 1}
              </span>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(1rem,1.8vw,1.3rem)",
                  fontWeight: 300,
                  color: T.text,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.4,
                }}
              >
                {belief}
              </p>
            </div>
          ))}
          <div
            style={{ padding: "28px 0", borderTop: `1px solid ${T.border}` }}
          >
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: T.muted,
                textDecoration: "none",
                fontSize: "0.82rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
            >
              Read our manifesto
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ══ STATS ════════════════════════════════════════════════════════════ */}
      <section
        style={{
          borderTop: `1px solid ${T.border}`,
          padding: "0 48px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            scrollbarWidth: "none",
            gap: 0,
            paddingBottom: 0,
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="reveal-up"
              style={{
                flexShrink: 0,
                width: "clamp(200px,21vw,280px)",
                minHeight: "clamp(200px,21vw,280px)",
                padding: "1.4rem",
                borderLeft: `1px solid ${T.border}`,
                borderRight:
                  i === STATS.length - 1 ? `1px solid ${T.border}` : "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                gap: 8,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(0.65rem,0.85vw,0.75rem)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  color: T.muted2,
                  fontWeight: 500,
                }}
              >
                Cloud X
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(2.6rem,4vw,3.4rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.05em",
                  lineHeight: 1.1,
                  color: T.text,
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(0.65rem,0.85vw,0.75rem)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: T.muted,
                  whiteSpace: "pre-line",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ LOGO TICKER ══════════════════════════════════════════════════════ */}
      <section
        style={{
          borderTop: `1px solid ${T.border}`,
          padding: "20px 0",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 56,
            alignItems: "center",
            animation: "ticker 26s linear infinite",
            whiteSpace: "nowrap",
          }}
        >
          {[...LOGOS, ...LOGOS].map((name, i) => (
            <span
              key={i}
              style={{
                color: T.muted2,
                fontSize: "0.72rem",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontWeight: 500,
                flexShrink: 0,
              }}
            >
              {name}
            </span>
          ))}
        </div>
        <style>{`@keyframes ticker { from { transform:translateX(0) } to { transform:translateX(-50%) } }`}</style>
      </section>

      {/* ══ FEATURE SECTIONS ═════════════════════════════════════════════════ */}
      {FEATURES.map((feat, i) => (
        <section
          key={i}
          className="cx-feature"
          style={{
            borderTop: `1px solid ${T.border}`,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            minHeight: 560,
          }}
        >
          {/* image side */}
          <div
            style={{
              overflow: "hidden",
              order: i % 2 === 0 ? 2 : 1,
              borderLeft: i % 2 === 0 ? `1px solid ${T.border}` : "none",
              borderRight: i % 2 !== 0 ? `1px solid ${T.border}` : "none",
            }}
          >
            <img
              className="feat-img"
              src={feat.img}
              alt={feat.title}
              style={{
                width: "100%",
                height: "110%",
                objectFit: "cover",
                display: "block",
                filter: "brightness(0.7)",
              }}
            />
          </div>

          {/* text side */}
          <div
            style={{
              padding: "80px 64px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              order: i % 2 === 0 ? 1 : 2,
            }}
          >
            <p
              className="reveal-up"
              style={{
                color: T.muted2,
                fontSize: "0.68rem",
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                marginBottom: 28,
                fontWeight: 500,
              }}
            >
              {feat.eyebrow}
            </p>
            <h2
              className="reveal-up"
              style={{
                fontSize: "clamp(1.8rem,3.2vw,3rem)",
                fontWeight: 300,
                letterSpacing: "-0.04em",
                lineHeight: 1.15,
                margin: "0 0 24px",
                color: T.text,
                whiteSpace: "pre-line",
              }}
            >
              {feat.title}
            </h2>
            <p
              className="reveal-up"
              style={{
                color: T.muted,
                fontSize: "0.95rem",
                lineHeight: 1.8,
                maxWidth: 420,
                margin: "0 0 36px",
              }}
            >
              {feat.body}
            </p>
            <a
              href="#"
              className="reveal-up"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                color: T.text,
                textDecoration: "none",
                fontSize: "0.82rem",
                fontWeight: 500,
                width: "fit-content",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.55")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Learn more
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </section>
      ))}

      {/* ══ TESTIMONIALS ═════════════════════════════════════════════════════ */}
      <section
        style={{ borderTop: `1px solid ${T.border}`, padding: "100px 48px" }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p
            className="reveal-up"
            style={{
              color: T.muted2,
              fontSize: "0.68rem",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              marginBottom: 16,
              fontWeight: 500,
            }}
          >
            What teams say
          </p>
          <h2
            className="reveal-up"
            style={{
              fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
              fontWeight: 300,
              letterSpacing: "-0.04em",
              lineHeight: 1.2,
              margin: "0 0 56px",
              maxWidth: 560,
              color: T.text,
            }}
          >
            From early-stage to global scale.
          </h2>
          <div
            className="cx-testimonials"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 12,
            }}
          >
            {QUOTES.map((q, i) => (
              <div
                key={i}
                className="reveal-up"
                style={{
                  background: T.surface,
                  borderRadius: 10,
                  padding: "1.4rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  minHeight: 160,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(0.875rem,1.2vw,1rem)",
                    fontWeight: 400,
                    lineHeight: 1.55,
                    color: T.text,
                    flex: 1,
                  }}
                >
                  "{q.quote}"
                </p>
                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "clamp(0.7rem,0.9vw,0.78rem)",
                      color: T.muted,
                      fontWeight: 500,
                    }}
                  >
                    {q.name}
                  </p>
                  <p
                    style={{
                      margin: "2px 0 0",
                      fontSize: "clamp(0.62rem,0.78vw,0.7rem)",
                      color: T.muted2,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {q.role} · {q.stage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LONG-FORM PARTNERSHIP CTA ════════════════════════════════════════ */}
      <section
        style={{
          borderTop: `1px solid ${T.border}`,
          padding: "120px 48px",
          textAlign: "center",
          maxWidth: 800,
          margin: "0 auto",
        }}
      >
        <p
          className="reveal-up"
          style={{
            color: T.muted2,
            fontSize: "0.68rem",
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            marginBottom: 32,
            fontWeight: 500,
          }}
        >
          Long-term partners
        </p>
        <h2
          className="reveal-up"
          style={{
            fontSize: "clamp(2rem,5vw,4rem)",
            fontWeight: 300,
            letterSpacing: "-0.05em",
            lineHeight: 1.12,
            margin: "0 0 24px",
            color: T.text,
          }}
        >
          Build what endures,
          <br />
          <span style={{ color: T.muted }}>with reliable infrastructure.</span>
        </h2>
        <p
          className="reveal-up"
          style={{
            color: T.muted,
            fontSize: "1rem",
            lineHeight: 1.75,
            maxWidth: 480,
            margin: "0 auto 48px",
          }}
        >
          We're not just a vendor. Cloud X grows with you — from first deploy to
          billion-request scale, with a team that picks up the phone.
        </p>
        <div
          className="reveal-up"
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              background: T.accentBg,
              color: T.accentTx,
              border: "none",
              padding: "16px 36px",
              borderRadius: 9999,
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 32px rgba(0,0,0,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
            }}
          >
            Start building today
          </button>
          <button
            style={{
              background: "transparent",
              color: T.muted,
              border: `1px solid ${T.border}`,
              padding: "16px 36px",
              borderRadius: 9999,
              fontSize: "0.9rem",
              cursor: "pointer",
              transition: "color 0.2s, border-color 0.2s, transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = T.text;
              e.currentTarget.style.borderColor = T.borderHi;
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = T.muted;
              e.currentTarget.style.borderColor = T.border;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Talk to sales
          </button>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
      <footer
        className="cx-footer"
        style={{
          borderTop: `1px solid ${T.border}`,
          padding: "64px 48px 100px",
          marginBottom: 60,
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr",
          gap: 48,
        }}
      >
        {/* brand */}
        <div>
          <p
            style={{
              fontWeight: 700,
              fontSize: "1.1rem",
              letterSpacing: "-0.03em",
              margin: "0 0 12px",
              color: T.text,
            }}
          >
            Cloud<span style={{ opacity: 0.35 }}>X</span>
          </p>
          <p
            style={{
              color: T.muted,
              fontSize: "0.82rem",
              lineHeight: 1.7,
              maxWidth: 220,
              margin: "0 0 24px",
            }}
          >
            Infrastructure that disappears. Scale that doesn't.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            {["ig", "tt", "yt", "x", "li"].map((ic) => (
              <a
                key={ic}
                href="#"
                style={{
                  color: T.muted2,
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  textDecoration: "none",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = T.muted)}
                onMouseLeave={(e) => (e.currentTarget.style.color = T.muted2)}
              >
                {ic}
              </a>
            ))}
          </div>
        </div>

        {/* nav */}
        <div>
          <p
            style={{
              color: T.muted2,
              fontSize: "0.68rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              margin: "0 0 20px",
              fontWeight: 500,
            }}
          >
            Navigation
          </p>
          {["Home", "Platform", "Pricing", "Docs", "Status", "Changelog"].map(
            (l) => (
              <a
                key={l}
                href="#"
                style={{
                  display: "block",
                  color: T.muted,
                  fontSize: "0.82rem",
                  textDecoration: "none",
                  marginBottom: 10,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
                onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
              >
                {l}
              </a>
            ),
          )}
        </div>

        {/* company */}
        <div>
          <p
            style={{
              color: T.muted2,
              fontSize: "0.68rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              margin: "0 0 20px",
              fontWeight: 500,
            }}
          >
            Company
          </p>
          {[
            "Manifesto",
            "About",
            "Blog",
            "Careers",
            "Security",
            "Privacy policy",
          ].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                display: "block",
                color: T.muted,
                fontSize: "0.82rem",
                textDecoration: "none",
                marginBottom: 10,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
            >
              {l}
            </a>
          ))}
        </div>

        {/* locations */}
        <div>
          <p
            style={{
              color: T.muted2,
              fontSize: "0.68rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              margin: "0 0 20px",
              fontWeight: 500,
            }}
          >
            Find us
          </p>
          {[
            { city: "San Francisco", addr: "548 Market St, CA 94104" },
            { city: "London", addr: "1 Canada Square, E14 5AB" },
            { city: "Singapore", addr: "1 Raffles Quay, 048583" },
          ].map((loc) => (
            <div key={loc.city} style={{ marginBottom: 20 }}>
              <p
                style={{
                  color: T.muted,
                  fontSize: "0.82rem",
                  margin: "0 0 2px",
                  fontWeight: 500,
                }}
              >
                {loc.city}
              </p>
              <p
                style={{
                  color: T.muted2,
                  fontSize: "0.75rem",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {loc.addr}
              </p>
            </div>
          ))}
          <a
            href="mailto:hello@cloudx.io"
            style={{
              color: T.muted,
              fontSize: "0.82rem",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = T.text)}
            onMouseLeave={(e) => (e.currentTarget.style.color = T.muted)}
          >
            hello@cloudx.io
          </a>
        </div>
      </footer>

      {/* copyright bar */}
      <div
        className="cx-bottom-bar"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          borderTop: `1px solid ${T.border}`,
          background: "rgba(9,9,11,0.92)",
          backdropFilter: "blur(20px)",
          padding: "12px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            color: T.muted2,
            fontSize: "0.7rem",
            letterSpacing: "0.5px",
          }}
        >
          ©2026 Cloud X · All rights reserved
        </span>
        <div ref={bottomBarRef} style={{ display: "flex", gap: 24 }}>
          {["Privacy", "Terms", "Security", "Status"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                color: T.muted2,
                fontSize: "0.7rem",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = T.muted)}
              onMouseLeave={(e) => (e.currentTarget.style.color = T.muted2)}
            >
              {l}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        /* ── CloudX Responsive ─────────────────────────────── */
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
    </div>
  );
}
