import { useState, useLayoutEffect, type RefObject } from "react";

export function useElementWidth<T extends HTMLElement>(
  ref: RefObject<T | null>,
): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.offsetWidth);
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentBoxSize?.[0]?.inlineSize ?? entry.contentRect.width;
        setWidth(Math.round(w));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return width;
}
