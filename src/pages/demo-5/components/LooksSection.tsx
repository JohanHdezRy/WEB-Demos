import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { LOOKS } from "../data/fashionData";

export function LooksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const totalWidth = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-stone-900 overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-6 px-10 py-20 h-screen items-center"
        style={{ width: "max-content" }}
      >
        <div className="flex-none w-[40vw] flex flex-col justify-center">
          <p className="text-stone-500 text-xs tracking-[0.4em] uppercase mb-4">
            Seasonal Looks
          </p>
          <h2 className="text-white font-[var(--font-cormorant)] text-[clamp(3rem,6vw,5rem)] font-light leading-tight">
            Curated
            <br />
            <em>Selections</em>
          </h2>
          <p className="text-stone-400 text-sm mt-6 max-w-xs leading-relaxed">
            Timeless silhouettes for the modern wardrobe. Each look is
            considered, every detail deliberate.
          </p>
        </div>

        {LOOKS.map((look) => (
          <div
            key={look.id}
            className="group flex-none w-[28vw] cursor-pointer"
          >
            <div className="relative aspect-[7/10] overflow-hidden rounded-sm">
              <img
                src={look.src}
                alt={look.label}
                width={700}
                height={1000}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white/60 text-xs tracking-[0.3em] uppercase">
                  {look.desc}
                </p>
                <p className="text-white font-[var(--font-cormorant)] text-2xl mt-1">
                  {look.label}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="flex-none w-[20vw] flex items-center justify-center">
          <a
            href="#"
            className={cn(
              "text-white/60 text-xs tracking-[0.3em] uppercase",
              "border border-white/20 px-6 py-3",
              "hover:text-white hover:border-white transition-colors duration-300",
            )}
          >
            View All Looks
          </a>
        </div>
      </div>
    </section>
  );
}
