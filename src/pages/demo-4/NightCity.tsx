import { useState } from "react";
import { Link } from "react-router-dom";
import FloatingLines from "../../Effects/FloatingLines";
import { FuzzyText } from "../../Effects/FuzzyText";
import Folder from "../../components/Folder";
import { useFonts } from "../../Hooks/useFonts";
import { useVinylRoulette } from "../../Hooks/useVinylRoulette";

import vinil0 from "../../Resources/img/vinil_0.png";
import vinil1 from "../../Resources/img/vinil_1.webp";
import vinil2 from "../../Resources/img/vinil_2.png";
import vinil3 from "../../Resources/img/vinil_3.png";
import vinil4 from "../../Resources/img/vinil_4.png";
import vinil5 from "../../Resources/img/vinil_5.webp";
import vinil6 from "../../Resources/img/vinil_6.webp";
import vinil7 from "../../Resources/img/vinil_7.webp";
import vinil8 from "../../Resources/img/vinil_8.webp";
import vinil9 from "../../Resources/img/vinil_9.webp";
import vinil10 from "../../Resources/img/vinil_10.webp";

// ── Fonts ──────────────────────────────────────────────────────────────────────
const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap";

// ── Color tokens ───────────────────────────────────────────────────────────────
const C = {
  bg: "#131313",
  bgLow: "#1c1b1b",
  bgHigh: "#2a2a2a",
  text: "#e5e2e1",
  textMuted: "#bac9cc",
  primary: "#c3f5ff",
  accent: "#00e5ff",
  secondary: "#ffabf3",
  outline: "#3b494c",
  onPrimary: "#00363d",
};

// ── Vinyl Roulette data ────────────────────────────────────────────────────────
const ROULETTE = [
  {
    img: vinil0,
    title: "EVANGELION FINALLY",
    artist: "Various Artists",
    genre: "Anime OST / 180G",
    label: "Special Press",
  },
  {
    img: vinil3,
    title: "HIT ME HARD & SOFT",
    artist: "Billie Eilish",
    genre: "Pop / Color Vinyl",
    label: "Featured Selection",
  },
  {
    img: vinil4,
    title: "DISCOVERY",
    artist: "Daft Punk",
    genre: "Electronic / 2LP",
    label: "Rare Pressing",
  },
  {
    img: vinil1,
    title: "PLASTIC BEACH",
    artist: "Gorillaz",
    genre: "Alternative / 2LP",
    label: "Now Spinning",
  },
  {
    img: vinil8,
    title: "ANALOG BLOOM",
    artist: "Aphex Twin",
    genre: "IDM / Limited Ed",
    label: "Collector's Pick",
  },
  {
    img: vinil6,
    title: "NEON CORRIDORS",
    artist: "Boards of Canada",
    genre: "IDM / Double LP",
    label: "Staff Favourite",
  },
  {
    img: vinil2,
    title: "PURPLE EP",
    artist: "Unknown Signal",
    genre: "Electronic / Ltd Ed",
    label: "Underground Cut",
  },
];

// ── City Sessions folder data ──────────────────────────────────────────────────
const FOLDERS = [
  {
    title: "SYNTHIA VOLT",
    subtitle: "Midnight Modulations",
    genre: "Electronic / 180G",
    price: "$34",
    imgs: [vinil0, vinil3, vinil8],
  },
  {
    title: "RAILWAY NOISE",
    subtitle: "Underpass Echoes",
    genre: "Techno / Ltd Ed",
    price: "$42",
    imgs: [vinil1, vinil4, vinil9],
  },
  {
    title: "OBLIVION CORE",
    subtitle: "Frozen Frequency",
    genre: "Ambient / Double LP",
    price: "$29",
    imgs: [vinil2, vinil5, vinil10],
  },
  {
    title: "NEON PULSE",
    subtitle: "Vector Subsets",
    genre: "Synthwave / Color",
    price: "$38",
    imgs: [vinil3, vinil6, vinil0],
  },
  {
    title: "METROPOLIS",
    subtitle: "Echo Chamber",
    genre: "Industrial / Dark",
    price: "$45",
    imgs: [vinil4, vinil7, vinil1],
  },
  {
    title: "VOID RATIO",
    subtitle: "The Glitch",
    genre: "Glitch / Experimental",
    price: "$31",
    imgs: [vinil5, vinil8, vinil2],
  },
];

// ── NavBar ─────────────────────────────────────────────────────────────────────
function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          background: `${C.bg}cc`,
          backdropFilter: "blur(20px)",
          boxShadow: `0 0 32px rgba(195,245,255,0.06)`,
          borderBottom: `1px solid ${C.outline}22`,
        }}
      >
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 2rem",
            maxWidth: 1280,
            margin: "0 auto",
          }}
        >
          <Link
            to="/"
            style={{
              fontSize: "1.1rem",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              color: C.text,
              textDecoration: "none",
            }}
          >
            NIGHTCITY RECORDS
          </Link>

          <div className="nc-nav-links" style={{ display: "flex", gap: "3rem", alignItems: "center" }}>
            {["Catalog", "The Roulette", "Artists", "City Sessions"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.7rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: item === "The Roulette" ? C.accent : `${C.text}bb`,
                    borderBottom:
                      item === "The Roulette" ? `2px solid ${C.accent}` : "none",
                    paddingBottom: item === "The Roulette" ? "2px" : 0,
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {item}
                </a>
              ),
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              className="nc-nav-cart"
              style={{
                background: "none",
                border: "none",
                color: C.primary,
                cursor: "pointer",
                fontSize: "1.25rem",
              }}
            >
              🛍
            </button>
            <button
              className="nc-hamburger"
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                display: "none",
                flexDirection: "column",
                gap: 5,
                background: "none",
                border: `1px solid ${C.outline}44`,
                borderRadius: 6,
                padding: "6px 8px",
                cursor: "pointer",
              }}
              aria-label="Menu"
            >
              <span style={{ display: "block", width: 18, height: 1.5, background: C.text, transition: "transform 0.3s", transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }} />
              <span style={{ display: "block", width: 18, height: 1.5, background: C.text, opacity: menuOpen ? 0 : 1, transition: "opacity 0.2s" }} />
              <span style={{ display: "block", width: 18, height: 1.5, background: C.text, transition: "transform 0.3s", transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </nav>
      </header>
      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 49, background: `${C.bg}f0`, backdropFilter: "blur(16px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          <button onClick={() => setMenuOpen(false)} style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", color: C.text, fontSize: "1.4rem", cursor: "pointer" }}>✕</button>
          {["Catalog", "The Roulette", "Artists", "City Sessions"].map((item) => (
            <a key={item} href="#" onClick={() => setMenuOpen(false)} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.6rem", fontWeight: 700, letterSpacing: "0.05em", color: item === "The Roulette" ? C.accent : C.text, textDecoration: "none" }}>
              {item}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

// ── VinylRoulette ──────────────────────────────────────────────────────────────
function VinylRoulette() {
  const { active, leftIdx, rightIdx, prev, next } = useVinylRoulette(
    ROULETTE.length,
  );
  const item = ROULETTE[active];

  return (
    <section
      style={{ padding: "8rem 0", background: C.bgLow, overflow: "hidden" }}
    >
      {/* Heading */}
      <div
        style={{ textAlign: "center", marginBottom: "5rem", padding: "0 2rem" }}
      >
        <h2
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "-0.04em",
            color: C.text,
            margin: 0,
          }}
        >
          Vinyl Roulette
        </h2>
        <p
          style={{
            fontFamily: "'Newsreader', serif",
            fontStyle: "italic",
            fontSize: "1.2rem",
            color: C.textMuted,
            marginTop: "0.75rem",
          }}
        >
          A curated rotation of essential spins.
        </p>
      </div>

      {/* Carousel */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "3rem",
          padding: "0 2rem",
        }}
      >
        {/* Left ghost */}
        <div
          style={{
            width: 260,
            flexShrink: 0,
            opacity: 0.18,
            transform: "scale(0.88)",
            filter: "grayscale(1)",
            transition: "all 0.5s",
          }}
          className="hidden md:block"
        >
          <img
            src={ROULETTE[leftIdx].img}
            alt=""
            style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }}
          />
        </div>

        {/* Active card */}
        <div
          style={{
            position: "relative",
            width: "min(480px, 80vw)",
            flexShrink: 0,
            transition: "all 0.7s",
          }}
        >
          <div
            style={{
              aspectRatio: "1/1",
              position: "relative",
              overflow: "hidden",
              boxShadow: `0 20px 60px rgba(0,218,243,0.18)`,
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            {/* Hover overlay — CSS driven */}
            <div className="nc-roulette-overlay">
              <span className="nc-roulette-label">{item.label}</span>
              <h3 className="nc-roulette-title">{item.title}</h3>
              <p className="nc-roulette-artist">{item.artist}</p>
              <button className="nc-roulette-cta">View Details</button>
            </div>

            {/* Spinning badge */}
            <div className="nc-spinning-badge">
              <span className="nc-badge-text">
                NOW SPINNING · ROULETTE · RARE PRESSING ·
              </span>
            </div>
          </div>

          {/* Controls */}
          <div
            style={{
              marginTop: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 1rem",
            }}
          >
            <button className="nc-arrow-btn" onClick={prev}>
              ←
            </button>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              {ROULETTE.map((_, i) => (
                <span
                  key={i}
                  className={i === active ? "nc-dot nc-dot-active" : "nc-dot"}
                />
              ))}
            </div>

            <button className="nc-arrow-btn" onClick={next}>
              →
            </button>
          </div>
        </div>

        {/* Right ghost */}
        <div
          style={{
            width: 260,
            flexShrink: 0,
            opacity: 0.18,
            transform: "scale(0.88)",
            filter: "grayscale(1)",
            transition: "all 0.5s",
          }}
          className="hidden md:block"
        >
          <img
            src={ROULETTE[rightIdx].img}
            alt=""
            style={{ width: "100%", aspectRatio: "1/1", objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}

// ── Manifesto ──────────────────────────────────────────────────────────────────
function Manifesto() {
  return (
    <section
      style={{ padding: "8rem 4vw", background: C.bg, overflow: "hidden" }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "6rem",
          alignItems: "center",
        }}
      >
        {/* Video */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: -48,
              left: -48,
              width: 256,
              height: 256,
              background: `${C.primary}0d`,
              filter: "blur(100px)",
              pointerEvents: "none",
            }}
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            src="https://cdn.pixabay.com/video/2025/03/18/265815_large.mp4"
            style={{
              width: "100%",
              aspectRatio: "4/5",
              objectFit: "cover",
              filter: "grayscale(1)",
              border: `1px solid ${C.outline}22`,
              display: "block",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -32,
              right: -32,
              background: C.bgHigh,
              padding: "2rem",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              borderLeft: `2px solid ${C.primary}`,
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.4em",
                color: C.secondary,
              }}
            >
              Est. 2024
            </span>
          </div>
        </div>

        {/* Text */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.5em",
              color: C.primary,
            }}
          >
            Manifesto
          </span>
          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              color: C.text,
              margin: 0,
            }}
          >
            The Nightcity
            <br />
            Philosophy
          </h2>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <p
              style={{
                fontFamily: "'Newsreader', serif",
                fontSize: "1.15rem",
                lineHeight: 1.75,
                color: C.textMuted,
                margin: 0,
              }}
            >
              We don't just sell vinyl; we archive culture. Born from the
              concrete echoes and neon hum of the metropolis, Nightcity Records
              is a sanctuary for the nocturnally inclined.
            </p>
            <p
              style={{
                fontFamily: "'Newsreader', serif",
                fontSize: "1.15rem",
                lineHeight: 1.75,
                color: C.textMuted,
                margin: 0,
              }}
            >
              Our curation focuses on the deep cuts, electronic gems, and
              nighttime vibes that define urban life after the sun sets.
            </p>
          </div>

          <div
            style={{
              paddingTop: "2rem",
              display: "flex",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            {[
              { val: "2.5k+", label: "Curated Titles" },
              { val: "12", label: "City Chapters" },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "2rem",
                    fontWeight: 700,
                    color: C.primary,
                  }}
                >
                  {s.val}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.55rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.25em",
                    color: C.textMuted,
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── City Sessions (3×2 Folder grid) ───────────────────────────────────────────
const FOLDER_SCALE = 2.6;
const FOLDER_CELL_H = Math.round(80 * FOLDER_SCALE) + 80; // visual folder height + paper overflow

function FolderCell({ folder }: { folder: (typeof FOLDERS)[number] }) {
  const items = folder.imgs.map((src, i) => (
    <img
      key={i}
      src={src}
      alt=""
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: 10,
      }}
    />
  ));

  return (
    <div className="nc-folder-cell">
      {/* Folder display area */}
      <div
        style={{
          width: "100%",
          height: FOLDER_CELL_H,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          overflow: "visible",
          paddingBottom: "0.5rem",
        }}
      >
        <div
          style={{
            transformOrigin: "bottom center",
            transform: `scale(${FOLDER_SCALE})`,
          }}
        >
          <Folder size={1} color={C.accent} items={items} />
        </div>
      </div>

      {/* Info */}
      <div style={{ width: "100%", textAlign: "center", padding: "0 0.5rem" }}>
        <h3
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: C.text,
            margin: "0 0 0.25rem",
          }}
        >
          {folder.title}
        </h3>
        <p
          style={{
            fontFamily: "'Newsreader', serif",
            fontStyle: "italic",
            fontSize: "1rem",
            color: C.textMuted,
            margin: "0 0 0.75rem",
          }}
        >
          {folder.subtitle}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${C.outline}33`,
            paddingTop: "0.75rem",
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.58rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: `${C.textMuted}88`,
            }}
          >
            {folder.genre}
          </span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: C.primary,
            }}
          >
            {folder.price}
          </span>
        </div>
      </div>
    </div>
  );
}

function CitySessions() {
  return (
    <section style={{ padding: "8rem 4vw", background: C.bgLow }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "5rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.4em",
                color: C.secondary,
              }}
            >
              Catalog Update
            </span>
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(3rem, 6vw, 5rem)",
                fontWeight: 700,
                color: C.text,
                margin: "0.5rem 0 0",
                lineHeight: 1,
              }}
            >
              City Sessions
            </h2>
          </div>
          <button className="nc-outline-btn">View All</button>
        </div>

        {/* 3×2 Folder Grid */}
        <div
          className="nc-folder-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
          }}
        >
          {FOLDERS.map((folder) => (
            <FolderCell key={folder.title} folder={folder} />
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: "5rem", textAlign: "center" }}>
          <button className="nc-primary-btn">Explore Full Catalog</button>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  const cols = [
    {
      heading: "Discover",
      links: [
        "New Arrivals",
        "Best Sellers",
        "Artist Exclusives",
        "Vinyl Roulette",
      ],
    },
    {
      heading: "Connect",
      links: ["Instagram", "Soundcloud", "Newsletter", "Discord"],
    },
    {
      heading: "In-Store",
      links: ["Mon – Sat: 12PM – 10PM", "Sun: 2PM – 8PM", "Locate Studio"],
    },
  ];

  return (
    <footer
      style={{
        background: "#0e0e0e",
        paddingTop: "4rem",
        paddingBottom: "8rem",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 3rem",
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: "3rem",
        }}
      >
        <div>
          <Link
            to="/"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: C.text,
              textDecoration: "none",
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            NIGHTCITY RECORDS
          </Link>
          <p
            style={{
              fontFamily: "'Newsreader', serif",
              fontStyle: "italic",
              fontSize: "0.9rem",
              color: `${C.textMuted}88`,
              maxWidth: 240,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Curators of the sonic underworld. We bridge the gap between human
            emotion and synthesized precision.
          </p>
        </div>

        {cols.map((col) => (
          <div key={col.heading}>
            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "0.6rem",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: C.primary,
                marginBottom: "1.25rem",
              }}
            >
              {col.heading}
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="nc-footer-link">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: "5rem auto 0",
          padding: "2rem 3rem 0",
          borderTop: `1px solid ${C.outline}22`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.58rem",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            color: `${C.text}44`,
            margin: 0,
          }}
        >
          © 2024 NIGHTCITY RECORDS. ENGINEERED FOR THE NIGHT.
        </p>
        <div style={{ display: "flex", gap: "2rem" }}>
          {["Privacy Policy", "Terms of Service"].map((t) => (
            <span key={t} className="nc-footer-policy">
              {t}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ── Now Playing Bar ────────────────────────────────────────────────────────────
function NowPlayingBar() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: `${C.bg}bb`,
        backdropFilter: "blur(24px)",
        borderTop: `1px solid ${C.outline}22`,
        padding: "0.75rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Track info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          width: "33%",
        }}
      >
        <div
          style={{ width: 48, height: 48, overflow: "hidden", flexShrink: 0 }}
        >
          <img
            src={vinil3}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "grayscale(1)",
            }}
          />
        </div>
        <div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: C.primary,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: 220,
            }}
          >
            NEON PULSE — VECTOR SUBSETS
          </div>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "0.52rem",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: C.textMuted,
            }}
          >
            Now Playing in Gallery
          </div>
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          width: "33%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {(["⇄", "⏮", null, "⏭", "↻"] as (string | null)[]).map((icon, i) =>
            icon === null ? (
              <button key={i} className="nc-play-btn">
                ▶
              </button>
            ) : (
              <button key={i} className="nc-ctrl-btn">
                {icon}
              </button>
            ),
          )}
        </div>
        <div
          style={{
            width: "100%",
            maxWidth: 400,
            height: 2,
            background: `${C.outline}44`,
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              height: "100%",
              width: "33%",
              background: C.secondary,
              boxShadow: `0 0 8px rgba(255,171,243,0.8)`,
            }}
          />
        </div>
      </div>

      {/* Extra */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "1.5rem",
          width: "33%",
        }}
      >
        {["🔊", "🎵", "⛶"].map((icon) => (
          <button key={icon} className="nc-ctrl-btn">
            {icon}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export function NightCity() {
  useFonts(FONTS_HREF);

  return (
    <div
      style={{
        background: C.bg,
        color: C.text,
        overflowX: "hidden",
        minHeight: "100vh",
      }}
    >
      <style>{`
        /* ── Keyframes ── */
        @keyframes nc-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes nc-pulse { 0%,100%{opacity:.3} 50%{opacity:1} }

        /* ── Fixed layers ── */
        .nc-bg { position:fixed; inset:0; z-index:0; background:${C.bg}; }
        .nc-overlay { position:fixed; inset:0; z-index:1; background:rgba(19,19,19,.55); pointer-events:none; }
        .nc-content { position:relative; z-index:2; }

        /* ── Hero ── */
        .nc-hero {
          position:relative; height:100vh;
          display:flex; flex-direction:column; align-items:center; justify-content:center;
          padding-top:5rem;
        }
        .nc-hero-sub {
          font-family:'Space Grotesk',sans-serif; font-size:.62rem;
          letter-spacing:.38em; color:${C.accent}; margin-top:1.5rem; text-transform:uppercase;
        }
        .nc-scroll-hint { margin-top:3rem; display:flex; flex-direction:column; align-items:center; gap:.5rem; }
        .nc-scroll-hint span { font-family:'Space Grotesk',monospace; font-size:.48rem; letter-spacing:.3em; color:rgba(255,255,255,.25); }
        .nc-scroll-line { width:1px; height:56px; background:linear-gradient(to bottom,rgba(0,229,255,.8),transparent); animation:nc-pulse 2s ease-in-out infinite; }
        .nc-hero-cta {
          margin-top:2.5rem;
          background:linear-gradient(135deg,${C.primary},${C.accent});
          color:${C.onPrimary}; font-family:'Space Grotesk',sans-serif; font-size:.7rem; font-weight:700;
          text-transform:uppercase; letter-spacing:.2em; border:none;
          padding:1.25rem 2.5rem; cursor:pointer;
          transition:box-shadow .3s,transform .2s;
          box-shadow:0 0 32px rgba(0,218,243,.2);
        }
        .nc-hero-cta:hover { box-shadow:0 0 48px rgba(0,218,243,.45); transform:translateY(-2px); }

        /* ── Roulette ── */
        .nc-roulette-overlay {
          position:absolute; inset:0;
          background:rgba(0,0,0,.75); backdrop-filter:blur(2px);
          display:flex; flex-direction:column; justify-content:flex-end;
          padding:2.5rem; opacity:0; transition:opacity .5s;
        }
        .nc-roulette-overlay:hover { opacity:1 !important; }
        .nc-roulette-label { font-family:'Space Grotesk',sans-serif; font-size:.58rem; letter-spacing:.3em; text-transform:uppercase; color:${C.primary}; margin-bottom:.5rem; }
        .nc-roulette-title { font-family:'Space Grotesk',sans-serif; font-size:2rem; font-weight:700; color:${C.text}; margin:0; line-height:1.1; }
        .nc-roulette-artist { font-family:'Newsreader',serif; font-style:italic; font-size:1.2rem; color:${C.textMuted}; margin:.3rem 0 1.5rem; }
        .nc-roulette-cta {
          width:fit-content; font-family:'Space Grotesk',sans-serif; font-size:.62rem;
          text-transform:uppercase; letter-spacing:.2em; color:${C.primary};
          background:none; border:none; border-bottom:1px solid ${C.primary}; padding-bottom:2px; cursor:pointer;
        }
        .nc-spinning-badge {
          position:absolute; top:2rem; right:2rem; width:88px; height:88px;
          border-radius:50%; background:${C.primary};
          display:flex; align-items:center; justify-content:center; padding:.75rem;
          animation:nc-spin 12s linear infinite;
          box-shadow:0 0 20px rgba(0,218,243,.3);
        }
        .nc-badge-text { font-family:'Space Grotesk',sans-serif; font-size:.5rem; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:${C.onPrimary}; text-align:center; line-height:1.3; }
        .nc-arrow-btn {
          background:none; border:none; color:${C.textMuted}; font-size:1.5rem;
          cursor:pointer; transition:color .2s; line-height:1;
        }
        .nc-arrow-btn:hover { color:${C.primary}; }
        .nc-dot {
          display:inline-block; width:10px; height:10px; border-radius:50%;
          background:${C.outline}88; transition:all .3s; cursor:pointer;
        }
        .nc-dot-active { background:${C.primary}; box-shadow:0 0 8px rgba(0,218,243,.8); }

        /* ── Folder cell ── */
        .nc-folder-cell {
          display:flex; flex-direction:column; align-items:center; gap:1.25rem;
          padding:1.5rem; background:${C.bgHigh};
          border:1px solid transparent; transition:border-color .5s; cursor:pointer;
          overflow:visible;
        }
        .nc-folder-cell:hover { border-color:${C.accent}33; }

        /* ── Buttons ── */
        .nc-outline-btn {
          padding:.75rem 2rem; border:1px solid ${C.outline}55; background:none;
          color:${C.text}; font-family:'Space Grotesk',sans-serif; font-size:.6rem;
          text-transform:uppercase; letter-spacing:.2em; font-weight:700;
          cursor:pointer; transition:border-color .3s;
        }
        .nc-outline-btn:hover { border-color:${C.primary}; }
        .nc-primary-btn {
          padding:1.25rem 3rem; border:1px solid ${C.primary}; background:none; color:${C.primary};
          font-family:'Space Grotesk',sans-serif; font-size:.75rem; text-transform:uppercase;
          letter-spacing:.2em; font-weight:700; cursor:pointer; transition:background .5s,color .5s;
        }
        .nc-primary-btn:hover { background:${C.primary}; color:${C.onPrimary}; }

        /* ── Footer ── */
        .nc-footer-link {
          font-family:'Space Grotesk',sans-serif; font-size:.8rem;
          color:${C.text}88; text-decoration:none; display:block; transition:color .2s;
        }
        .nc-footer-link:hover { color:${C.accent}; }
        .nc-footer-policy {
          font-family:'Space Grotesk',sans-serif; font-size:.58rem;
          text-transform:uppercase; letter-spacing:.2em; color:${C.text}44;
          cursor:pointer; transition:color .2s;
        }
        .nc-footer-policy:hover { color:${C.primary}; }

        /* ── Now Playing ── */
        .nc-play-btn {
          width:40px; height:40px; border-radius:50%; background:${C.primary};
          border:none; color:${C.onPrimary}; font-size:1.1rem; cursor:pointer;
          display:flex; align-items:center; justify-content:center; transition:transform .2s;
        }
        .nc-play-btn:hover { transform:scale(1.1); }
        .nc-ctrl-btn {
          background:none; border:none; color:${C.textMuted}; font-size:1rem;
          cursor:pointer; transition:color .2s;
        }
        .nc-ctrl-btn:hover { color:${C.primary}; }

        /* ── Responsive ── */
        @media (max-width:900px) { .nc-folder-grid { grid-template-columns:repeat(2,1fr) !important; } }
        @media (max-width:580px) { .nc-folder-grid { grid-template-columns:1fr !important; } }
        @media (max-width:768px) {
          .nc-nav-links { display:none !important; }
          .nc-hamburger { display:flex !important; }
          .nc-nav-cart { display:none !important; }
        }
      `}</style>

      <NavBar />

      {/* Animated background */}
      <div className="nc-bg">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive
          parallax
        />
      </div>
      <div className="nc-overlay" />

      <div className="nc-content">
        {/* Hero */}
        <section className="nc-hero">
          <FuzzyText
            fontSize="clamp(3rem,9vw,8.5rem)"
            fontWeight={900}
            fontFamily="'Space Grotesk', sans-serif"
            color={C.text}
            baseIntensity={0.12}
            hoverIntensity={0.5}
            fuzzRange={26}
          >
            NightCity
          </FuzzyText>
          <FuzzyText
            fontSize="clamp(3rem,9vw,8.5rem)"
            fontWeight={900}
            fontFamily="'Space Grotesk', sans-serif"
            color={C.accent}
            baseIntensity={0.18}
            hoverIntensity={0.6}
            fuzzRange={30}
          >
            Records
          </FuzzyText>

          <p className="nc-hero-sub">
            // Rare Vinyl · Underground Pressings · Est. 2019
          </p>
          <button className="nc-hero-cta">Enter the Archive</button>

          <div className="nc-scroll-hint">
            <span>SCROLL</span>
            <div className="nc-scroll-line" />
          </div>
        </section>

        <VinylRoulette />
        <Manifesto />
        <CitySessions />
        <Footer />
      </div>

      <NowPlayingBar />
    </div>
  );
}
