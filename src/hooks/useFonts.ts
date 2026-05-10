import { useEffect } from "react";

const loaded = new Set<string>();

/**
 * Inyecta una hoja de Google Fonts en <head> sin bloquear el render
 * (truco media="print" + swap a "all" en onload). Se deduplica por href.
 */
export function useFonts(href: string): void {
  useEffect(() => {
    if (!href || loaded.has(href)) return;
    if (document.querySelector(`link[data-fonts="${href}"]`)) {
      loaded.add(href);
      return;
    }
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.media = "print";
    link.dataset.fonts = href;
    link.onload = () => { link.media = "all"; };
    document.head.appendChild(link);
    loaded.add(href);
  }, [href]);
}
