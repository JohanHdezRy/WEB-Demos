import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface AnimationRefs {
  navRef: RefObject<HTMLElement | null>;
  heroVidRef: RefObject<HTMLVideoElement | null>;
  heroTitleRef: RefObject<HTMLHeadingElement | null>;
  heroTagRef: RefObject<HTMLParagraphElement | null>;
  heroCtaRef: RefObject<HTMLDivElement | null>;
  intrRef: RefObject<HTMLElement | null>;
  menuRef: RefObject<HTMLElement | null>;
  storyRef: RefObject<HTMLElement | null>;
  storyVidRef: RefObject<HTMLVideoElement | null>;
  galleryRef: RefObject<HTMLElement | null>;
}

export function useRinacitaAnimations({
  navRef,
  heroVidRef,
  heroTitleRef,
  heroTagRef,
  heroCtaRef,
  intrRef,
  menuRef,
  storyRef,
  storyVidRef,
  galleryRef,
}: AnimationRefs) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.call(() => {
        if (heroVidRef.current)
          gsap.to(heroVidRef.current, {
            scale: 1.06,
            duration: 14,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
      });
      if (heroTitleRef.current) {
        const split = SplitText.create(heroTitleRef.current, { type: "chars" });
        tl.from(
          split.chars,
          {
            y: "110%",
            opacity: 0,
            stagger: 0.04,
            duration: 1.1,
            ease: "power4.out",
          },
          0.3,
        );
      }
      tl.from(heroTagRef.current, { opacity: 0, y: 16, duration: 0.8 }, "-=0.4");
      tl.from(heroCtaRef.current, { opacity: 0, y: 16, duration: 0.6 }, "-=0.5");
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top -60",
        onEnter: () =>
          gsap.to(navRef.current, {
            background: "rgba(247,244,239,0.9)",
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

      if (intrRef.current) {
        gsap.from(intrRef.current.querySelectorAll(".intr-line"), {
          opacity: 0,
          y: 28,
          stagger: 0.12,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: intrRef.current, start: "top 80%" },
        });
      }
      if (menuRef.current) {
        gsap.from(menuRef.current.querySelectorAll(".menu-card"), {
          opacity: 0,
          y: 48,
          stagger: 0.1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: menuRef.current, start: "top 78%" },
        });
      }
      if (storyRef.current) {
        gsap.from(storyRef.current.querySelectorAll(".story-el"), {
          opacity: 0,
          y: 32,
          stagger: 0.1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: storyRef.current, start: "top 78%" },
        });
        if (storyVidRef.current) {
          gsap.to(storyVidRef.current, {
            yPercent: -8,
            ease: "none",
            scrollTrigger: { trigger: storyRef.current, scrub: true },
          });
        }
      }
      if (galleryRef.current) {
        gsap.from(galleryRef.current.querySelector(".gallery-header"), {
          opacity: 0,
          y: 24,
          duration: 0.8,
          scrollTrigger: { trigger: galleryRef.current, start: "top 82%" },
        });
      }

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });
    });
    return () => ctx.revert();
  }, []);
}
