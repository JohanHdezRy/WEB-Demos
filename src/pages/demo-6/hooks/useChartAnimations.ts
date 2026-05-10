import { type RefObject } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Stroke-dash reveal for an SVG <path>. Used by Sparkline and LineChart.
 */
export function usePathDrawAnimation(
  ref: RefObject<SVGPathElement | null>,
  opts: { duration?: number; delay?: number } = {},
) {
  const { duration = 1.5, delay = 0.8 } = opts;
  useGSAP(() => {
    if (!ref.current) return;
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      const len = ref.current!.getTotalLength();
      gsap.fromTo(
        ref.current,
        { strokeDashoffset: len, strokeDasharray: len },
        { strokeDashoffset: 0, duration, delay, ease: "power2.out" },
      );
    });
  }, {});
}

/**
 * Donut percent fill via strokeDashoffset.
 */
export function useDonutAnimation(
  ref: RefObject<SVGCircleElement | null>,
  circ: number,
  dash: number,
) {
  useGSAP(
    () => {
      if (!ref.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(ref.current, { strokeDashoffset: circ - dash });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { strokeDashoffset: circ },
          {
            strokeDashoffset: circ - dash,
            duration: 1.5,
            delay: 0.4,
            ease: "power2.out",
          },
        );
      });
    },
    { dependencies: [circ, dash] },
  );
}

/**
 * Bars rising from 0 to their target height with stagger.
 */
export function useBarChartAnimation(
  barsRef: RefObject<(SVGRectElement | null)[]>,
  data: { value: number }[],
  max: number,
  height: number,
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => {
        barsRef.current.forEach((bar, i) => {
          if (!bar) return;
          const finalH = (data[i].value / max) * height;
          gsap.set(bar, { attr: { height: finalH, y: height - finalH } });
        });
      });
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        barsRef.current.forEach((bar, i) => {
          if (!bar) return;
          const finalH = (data[i].value / max) * height;
          gsap.fromTo(
            bar,
            { attr: { height: 0, y: height } },
            {
              attr: { height: finalH, y: height - finalH },
              duration: 0.8,
              delay: 0.3 + i * 0.07,
              ease: "power2.out",
            },
          );
        });
      });
    },
    { dependencies: [data, max, height] },
  );
}

/**
 * Counts a numeric metric from 0 to its target value, writing into `valRef`.
 */
export function useMetricCounterAnimation(
  valRef: RefObject<HTMLSpanElement | null>,
  value: string | number,
  prefix = "",
  suffix = "",
  donut?: number,
) {
  useGSAP(
    () => {
      if (donut || typeof value === "string") return;
      const target =
        typeof value === "number"
          ? value
          : parseFloat(String(value).replace(/[$,]/g, ""));
      const setFinal = () => {
        if (valRef.current)
          valRef.current.textContent =
            prefix +
            target.toLocaleString("en-US", { maximumFractionDigits: 0 }) +
            suffix;
      };
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: reduce)", () => setFinal());
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          delay: 0.4,
          ease: "power2.out",
          onUpdate: () => {
            if (valRef.current)
              valRef.current.textContent =
                prefix +
                obj.val.toLocaleString("en-US", { maximumFractionDigits: 0 }) +
                suffix;
          },
        });
      });
    },
    { dependencies: [value, prefix, suffix, donut] },
  );
}
