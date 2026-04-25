import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { NAV_LINKS } from "../data/fashionData";

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 },
    );
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 md:py-6 mix-blend-difference"
      >
        <Link
          to="/"
          className="text-white text-xs tracking-[0.2em] uppercase hover:opacity-60 transition-opacity duration-300"
        >
          ← Demos
        </Link>
        <span className="text-white font-[var(--font-cormorant)] text-2xl tracking-widest uppercase">
          Maison
        </span>
        <ul className="hidden md:flex gap-10">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a
                href="#"
                className="text-white text-xs tracking-[0.2em] uppercase hover:opacity-60 transition-opacity duration-300"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="md:hidden flex flex-col gap-[5px] bg-transparent border-none cursor-pointer p-1"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          <span
            className="block w-5 h-[1.5px] bg-white transition-transform duration-300"
            style={{
              transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="block w-5 h-[1.5px] bg-white transition-opacity duration-200"
            style={{ opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block w-5 h-[1.5px] bg-white transition-transform duration-300"
            style={{
              transform: menuOpen
                ? "translateY(-6.5px) rotate(-45deg)"
                : "none",
            }}
          />
        </button>
      </nav>
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 flex flex-col items-center justify-center gap-10">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-white text-2xl bg-transparent border-none cursor-pointer"
          >
            ✕
          </button>
          {NAV_LINKS.map((l) => (
            <a
              key={l}
              href="#"
              onClick={() => setMenuOpen(false)}
              className="text-white font-[var(--font-cormorant)] text-4xl font-light tracking-widest uppercase hover:opacity-60 transition-opacity"
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
