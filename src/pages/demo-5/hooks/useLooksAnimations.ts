import { type RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function useLooksAnimations(
  sectionRef: RefObject<HTMLDivElement | null>,
  trackRef: RefObject<HTMLDivElement | null>,
) {
  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
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
    },
    { scope: sectionRef },
  );
}
