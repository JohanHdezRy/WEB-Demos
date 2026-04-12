import { useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "../Hooks/useInView";

// vite base path
const BASE = import.meta.env.BASE_URL;

const demos = [
  {
    path: "/demo-1",
    name: "NEONIX",
    category: "Tech Agency",
    desc: "Full crimson-red tech agency landing page with futuristic hero, GSAP letter animations, and mission cards.",
    colors: ["#5C0A14", "#8B1A28", "#FFFFFF"],
    accent: "#C0303F",
    demo: "01",
    screenshot: `${BASE}screenshots/demo-1.png`,
  },
  {
    path: "/demo-2",
    name: "Piyee",
    category: "Fintech App",
    desc: "Clean white fintech landing with glassmorphism card, teal accents, SVG oval animation, and count-up stats.",
    colors: ["#FFFFFF", "#0D9488", "#0D1117"],
    accent: "#0D9488",
    demo: "02",
    screenshot: `${BASE}screenshots/demo-2.png`,
  },
  {
    path: "/demo-3",
    name: "Pepsi",
    category: "Product Page",
    desc: "Dark royal blue product showcase with Pepsi can, nutrition facts table, and size selector bar.",
    colors: ["#1134B5", "#0A2090", "#C8102E"],
    accent: "#4A6FFF",
    demo: "03",
    screenshot: `${BASE}screenshots/demo-3.png`,
  },
  {
    path: "/demo-4",
    name: "Beats",
    category: "Headphones",
    desc: "Luxury white/gold headphones page with Balmain branding, color swatches, and GSAP entrance animations.",
    colors: ["#FAFAF8", "#C4A265", "#1A1A1A"],
    accent: "#C4A265",
    demo: "04",
    screenshot: `${BASE}screenshots/demo-4.png`,
  },
  {
    path: "/demo-5",
    name: "NFC Culture",
    category: "NFT Fashion",
    desc: "Split black/pink NFT fashion brand page with rotating text ring, clip-path reveal, and AI prompts card.",
    colors: ["#000000", "#C2185B", "#FFFFFF"],
    accent: "#E91E8C",
    demo: "05",
    screenshot: `${BASE}screenshots/demo-5.png`,
  },
  {
    path: "/demo-6",
    name: "BROWN",
    category: "Cosmetics",
    desc: "Clean light gray cosmetics brand with floating bottle, butterfly SVGs, cream blob, and product cards.",
    colors: ["#F0EEEB", "#FFFFFF", "#1A1A1A"],
    accent: "#8B7355",
    demo: "06",
    screenshot: `${BASE}screenshots/demo-6.png`,
  },
];

function Card({ demo, index }: { demo: (typeof demos)[0]; index: number }) {
  const [ref, vis] = useInView(0.08);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: `opacity .6s ease ${index * 0.08}s, transform .6s ease ${index * 0.08}s`,
      }}
    >
      <Link
        to={demo.path}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block",
          background: "#161616",
          borderRadius: 14,
          overflow: "hidden",
          textDecoration: "none",
          border: `1px solid ${hovered ? demo.accent + "40" : "rgba(255,255,255,0.06)"}`,
          transition:
            "border-color .3s, transform .4s cubic-bezier(0.16,1,0.3,1), box-shadow .4s",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered
            ? `0 24px 60px rgba(0,0,0,.5), 0 0 0 1px ${demo.accent}20`
            : "0 2px 12px rgba(0,0,0,.2)",
        }}
      >
        {/* Screenshot preview */}
        <div
          style={{
            position: "relative",
            height: 200,
            overflow: "hidden",
            background: "#0a0a0a",
          }}
        >
          <img
            src={demo.screenshot}
            alt={`${demo.name} preview`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top",
              display: "block",
              transition: "transform .6s cubic-bezier(0.16,1,0.3,1)",
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
          />

          {/* Gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, transparent 40%, rgba(22,22,22,0.95) 100%)",
              transition: "opacity .3s",
            }}
          />

          {/* DEMO badge */}
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff",
              fontSize: "0.58rem",
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: 4,
              fontFamily: "var(--font-dm-sans)",
              fontWeight: 500,
            }}
          >
            DEMO {demo.demo}
          </div>

          {/* Color palette */}
          <div
            style={{
              position: "absolute",
              bottom: 12,
              left: 14,
              display: "flex",
              gap: 6,
              alignItems: "center",
            }}
          >
            {demo.colors.map((c, i) => (
              <div
                key={i}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  background: c,
                  border: "1.5px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 1px 4px rgba(0,0,0,.4)",
                }}
              />
            ))}
          </div>

          {/* Hover arrow */}
          <div
            style={{
              position: "absolute",
              bottom: 12,
              right: 14,
              display: "flex",
              alignItems: "center",
              gap: 6,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateX(0)" : "translateX(-8px)",
              transition: "opacity .3s, transform .3s",
            }}
          >
            <span
              style={{
                fontSize: "0.62rem",
                letterSpacing: "2px",
                color: demo.accent,
                textTransform: "uppercase",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              Ver Demo
            </span>
            <span style={{ color: demo.accent, fontSize: "0.9rem" }}>→</span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "18px 22px 22px" }}>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.6rem",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: demo.accent,
              marginBottom: 6,
              opacity: 0.8,
            }}
          >
            {demo.category}
          </p>
          <h3
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#f0f0f0",
              marginBottom: 8,
            }}
          >
            {demo.name}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.78rem",
              color: "#555",
              lineHeight: 1.7,
            }}
          >
            {demo.desc}
          </p>
        </div>
      </Link>
    </div>
  );
}

export function Landing() {
  return (
    <div style={{ background: "#0e0e0e", minHeight: "100vh" }}>
      {/* Hero */}
      <header
        style={{
          padding:
            "clamp(80px, 12vw, 120px) clamp(24px, 6vw, 60px) clamp(48px, 8vw, 72px)",
          textAlign: "center",
          background: "linear-gradient(to bottom, #080808, #0e0e0e)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle grid bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 200,
            background:
              "radial-gradient(ellipse, rgba(108,99,255,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative" }}>
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: "0.65rem",
              letterSpacing: "6px",
              textTransform: "uppercase",
              color: "#555",
              marginBottom: 16,
            }}
          >
            Portfolio de Demos
          </p>
          <h1
            style={{
              fontFamily: "var(--font-poppins)",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 700,
              color: "#f0f0f0",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            WEB Demo
            <br />
            <span style={{ color: "#6C63FF" }}>Collection</span>
          </h1>
          <div
            style={{
              width: 48,
              height: 2,
              background: "#6C63FF",
              margin: "0 auto 16px",
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              color: "#555",
              fontSize: "0.9rem",
              maxWidth: 480,
              margin: "0 auto 8px",
              lineHeight: 1.8,
            }}
          >
            {demos.length} demos de páginas web para los servicios más
            solicitados. Construidos con React 19 + TypeScript + Tailwind CSS.
          </p>
        </div>
      </header>

      {/* Grid */}
      <section
        style={{
          padding: "40px clamp(24px, 5vw, 60px) 96px",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(100%, 400px), 1fr))",
            gap: 24,
          }}
        >
          {demos.map((d, i) => (
            <Card key={d.path} demo={d} index={i} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "24px 24px 32px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          fontFamily: "var(--font-dm-sans)",
          fontSize: "0.72rem",
          color: "#333",
        }}
      >
        React 19 + TypeScript + Vite · Tailwind CSS v4 — {demos.length} Demos ·
        JohanHdezRy
      </footer>
    </div>
  );
}
