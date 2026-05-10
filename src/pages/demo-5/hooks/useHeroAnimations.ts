import { type RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function useHeroAnimations(scope: RefObject<HTMLDivElement | null>) {
  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
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
      });
    },
    { scope },
  );
}
