import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: number;
  wordAnimationEnd?: string;
  as?: ElementType;
}

export default function ScrollReveal({
  children,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = 0,
  wordAnimationEnd = "bottom 85%",
  as: Tag = "p",
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  const text = typeof children === "string" ? children : "";

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>(".word");

    const ctx = gsap.context(() => {
      words.forEach((word) => {
        gsap.fromTo(
          word,
          {
            opacity: baseOpacity,
            rotationX: baseRotation,
            ...(enableBlur && { filter: `blur(${blurStrength}px)` }),
          },
          {
            opacity: 1,
            rotationX: rotationEnd,
            ...(enableBlur && { filter: "blur(0px)" }),
            ease: "power2.out",
            duration: 0.6,
            scrollTrigger: {
              trigger: word,
              start: "top 90%",
              end: wordAnimationEnd,
              scrub: false,
              once: true,
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, [
    baseOpacity,
    baseRotation,
    blurStrength,
    enableBlur,
    rotationEnd,
    wordAnimationEnd,
  ]);

  if (typeof children !== "string") {
    return (
      <Tag ref={containerRef} className={`${containerClassName}`}>
        {children}
      </Tag>
    );
  }

  const wordList = text.split(" ");

  return (
    <Tag
      ref={containerRef}
      className={`overflow-hidden ${containerClassName}`}
      style={{ perspective: "400px" }}
    >
      {wordList.map((word, i) => (
        <span
          key={i}
          className={`word inline-block will-change-[opacity,transform,filter] ${textClassName}`}
          style={{ transformOrigin: "bottom center" }}
        >
          {word}
          {i < wordList.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
}
