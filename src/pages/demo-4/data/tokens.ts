export const FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap";

// Values resolve from .theme-nightcity CSS variables in src/index.css.
export const C = {
  bg:        "var(--nc-bg)",
  bgLow:     "var(--nc-bgLow)",
  bgHigh:    "var(--nc-bgHigh)",
  text:      "var(--nc-text)",
  textMuted: "var(--nc-textMuted)",
  primary:   "var(--nc-primary)",
  accent:    "var(--nc-accent)",
  secondary: "var(--nc-secondary)",
  outline:   "var(--nc-outline)",
  onPrimary: "var(--nc-onPrimary)",
} as const;

export const FOLDER_SCALE = 2.6;
export const FOLDER_CELL_H = Math.round(80 * FOLDER_SCALE) + 80;
