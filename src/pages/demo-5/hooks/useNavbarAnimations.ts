import { type RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function useNavbarAnimations(navRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          navRef.current,
          { y: -80, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 },
        );
      });
    },
    { scope: navRef },
  );
}
