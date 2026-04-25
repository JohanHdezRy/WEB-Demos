import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GALLERY } from "../data/galleryData";

gsap.registerPlugin(ScrollTrigger);

interface UseLupaAnimationsParams {
  navRef: RefObject<HTMLElement | null>;
  heroTagRef: RefObject<HTMLSpanElement | null>;
  heroH1Ref: RefObject<HTMLHeadingElement | null>;
  heroSubRef: RefObject<HTMLParagraphElement | null>;
  heroCtaRef: RefObject<HTMLDivElement | null>;
  canRef: RefObject<HTMLDivElement | null>;
  specCanRef: RefObject<HTMLDivElement | null>;
  specRef: RefObject<HTMLDivElement | null>;
  galleryRef: RefObject<HTMLElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
}

export function useLupaAnimations({
  navRef,
  heroTagRef,
  heroH1Ref,
  heroSubRef,
  heroCtaRef,
  canRef,
  specCanRef,
  specRef,
  galleryRef,
  ctaRef,
}: UseLupaAnimationsParams) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(heroTagRef.current, { opacity: 0, y: 16, duration: 0.7 }, 0.3)
        .from(heroH1Ref.current, { opacity: 0, y: 60, duration: 1.1 }, 0.5)
        .from(heroSubRef.current, { opacity: 0, y: 24, duration: 0.8 }, 0.8)
        .from(heroCtaRef.current, { opacity: 0, y: 20, duration: 0.7 }, 1.0)
        .from(
          canRef.current,
          { opacity: 0, x: 60, rotation: 12, duration: 1.2, ease: "power3.out" },
          0.4,
        );

      ScrollTrigger.create({
        trigger: "body",
        start: "top -80px",
        onEnter: () =>
          gsap.to(navRef.current, {
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(24px)",
            duration: 0.4,
          }),
        onLeaveBack: () =>
          gsap.to(navRef.current, {
            background: "rgba(13,13,13,0.0)",
            backdropFilter: "blur(0px)",
            duration: 0.3,
          }),
      });

      gsap.from(specCanRef.current, {
        opacity: 0,
        x: -60,
        rotation: -8,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: specRef.current, start: "top 80%" },
      });

      gsap.from(specRef.current?.querySelectorAll(".spec-row") ?? [], {
        opacity: 0,
        x: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: specRef.current, start: "top 75%" },
      });

      const bentoCells =
        galleryRef.current?.querySelectorAll(".bento-cell") ?? [];
      bentoCells.forEach((cell, i) => {
        gsap.fromTo(
          cell,
          { y: GALLERY[i]?.scrubY ?? 60, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 90%",
              end: "center 30%",
              scrub: 2,
            },
          },
        );
      });

      gsap.from(ctaRef.current?.children ?? [], {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 80%" },
      });

      const el = canRef.current;
      const onEnter = () =>
        gsap.to(el, { rotation: 4, y: -10, duration: 0.4, ease: "power2.out" });
      const onLeave = () =>
        gsap.to(el, { rotation: 0, y: 0, duration: 0.5, ease: "power2.out" });
      el?.addEventListener("mouseenter", onEnter);
      el?.addEventListener("mouseleave", onLeave);

      return () => {
        el?.removeEventListener("mouseenter", onEnter);
        el?.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);
}
