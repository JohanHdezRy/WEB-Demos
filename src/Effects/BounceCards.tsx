import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface BounceCardsProps {
  className?: string;
  images?: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
}

export default function BounceCards({
  className = "",
  images = [],
  containerWidth = 400,
  containerHeight = 700,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = [
    "rotate(10deg) translate(-170px)",
    "rotate(5deg) translate(-85px)",
    "rotate(-3deg)",
    "rotate(-10deg) translate(85px)",
    "rotate(2deg) translate(170px)",
  ],
  enableHover = false,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".card",
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationDelay, animationStagger, easeType]);

  const getNoRotationTransform = (t: string) =>
    /rotate\([\s\S]*?\)/.test(t)
      ? t.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)")
      : `${t} rotate(0deg)`;

  const getPushedTransform = (base: string, offsetX: number) => {
    const m = base.match(/translate\(([-0-9.]+)px\)/);
    if (m)
      return base.replace(
        /translate\(([-0-9.]+)px\)/,
        `translate(${parseFloat(m[1]) + offsetX}px)`,
      );
    return base === "none"
      ? `translate(${offsetX}px)`
      : `${base} translate(${offsetX}px)`;
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    images.forEach((_, i) => {
      const sel = q(`.card-${i}`);
      gsap.killTweensOf(sel);
      if (i === hoveredIdx) {
        gsap.to(sel, {
          transform: getNoRotationTransform(transformStyles[i] || "none"),
          duration: 0.4,
          ease: "back.out(1.4)",
          overwrite: "auto",
        });
      } else {
        gsap.to(sel, {
          transform: getPushedTransform(
            transformStyles[i] || "none",
            i < hoveredIdx ? -160 : 160,
          ),
          duration: 0.4,
          ease: "back.out(1.4)",
          delay: Math.abs(hoveredIdx - i) * 0.05,
          overwrite: "auto",
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    images.forEach((_, i) => {
      gsap.to(q(`.card-${i}`), {
        transform: transformStyles[i] || "none",
        duration: 0.4,
        ease: "back.out(1.4)",
        overwrite: "auto",
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: containerWidth, height: containerHeight }}
    >
      {images.map((src, idx) => (
        <div
          key={idx}
          className={`card card-${idx} absolute w-[200px] aspect-square border-4 border-white rounded-[20px] overflow-hidden`}
          style={{
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            transform: transformStyles[idx] || "none",
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          <img
            className="w-full h-full object-cover"
            src={src}
            alt={`card-${idx}`}
          />
        </div>
      ))}
    </div>
  );
}
