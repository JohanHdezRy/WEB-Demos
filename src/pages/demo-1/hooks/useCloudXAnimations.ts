import { useEffect } from "react";
import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

interface HeroRefs {
  heroOverlayRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLDivElement | null>;
  taglineRef: RefObject<HTMLParagraphElement | null>;
  btnsRef: RefObject<HTMLDivElement | null>;
  bottomBarRef: RefObject<HTMLDivElement | null>;
  videoRef: RefObject<HTMLVideoElement | null>;
}

export function useHeroAnimation({
  heroOverlayRef,
  titleRef,
  taglineRef,
  btnsRef,
  bottomBarRef,
  videoRef,
}: HeroRefs) {
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
}

interface ScrollRefs {
  navRef: RefObject<HTMLElement | null>;
  manifRef: RefObject<HTMLElement | null>;
}

export function useScrollAnimations({ navRef, manifRef }: ScrollRefs) {
  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });

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
}
