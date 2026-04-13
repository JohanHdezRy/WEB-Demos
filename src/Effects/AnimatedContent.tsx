import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedContentProps {
  children: ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  className?: string;
}

export default function AnimatedContent({
  children,
  distance = 60,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  className = "",
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const axis = direction === "horizontal" ? "x" : "y";
    const offset = reverse ? -distance : distance;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          [axis]: offset,
          opacity: animateOpacity ? initialOpacity : 1,
          scale,
        },
        {
          [axis]: 0,
          opacity: 1,
          scale: 1,
          duration,
          ease,
          delay,
          scrollTrigger: {
            trigger: el,
            start: `top ${(1 - threshold) * 100}%`,
            once: true,
          },
        },
      );
    });

    return () => ctx.revert();
  }, [
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
  ]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
