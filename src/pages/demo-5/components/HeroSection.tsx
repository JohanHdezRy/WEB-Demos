import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HERO_VIDEO } from "../data/fashionData";

export function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-line",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.4,
          ease: "power4.out",
          stagger: 0.12,
          delay: 0.8,
        },
      );
    }, titleRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

      <div
        ref={titleRef}
        className="absolute bottom-20 left-10 md:left-16 max-w-2xl"
      >
        <div className="overflow-hidden mb-2">
          <p className="hero-line text-white/60 text-xs tracking-[0.4em] uppercase">
            Spring / Summer 2025
          </p>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-line text-white font-[var(--font-cormorant)] text-[clamp(4rem,10vw,9rem)] leading-none font-light">
            Élégance
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-line text-white font-[var(--font-cormorant)] text-[clamp(4rem,10vw,9rem)] leading-none italic font-light">
            Intemporelle
          </h1>
        </div>
        <div className="overflow-hidden mt-6">
          <a
            href="#collection"
            className="hero-line inline-block text-white text-xs tracking-[0.3em] uppercase border-b border-white/40 pb-1 hover:border-white transition-colors duration-300"
          >
            Discover the Collection
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 right-10 flex flex-col items-center gap-2">
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 w-full h-1/2 bg-white animate-[slideDown_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
