import type { DesignTokens } from "../types";

// Values resolve from .theme-cloudx CSS variables in src/index.css.
// Edit the colors there; this file just re-exports the semantic names.
export const T: DesignTokens = {
  bg:       "var(--cx-bg)",
  text:     "var(--cx-text)",
  muted:    "var(--cx-muted)",
  muted2:   "var(--cx-muted2)",
  border:   "var(--cx-border)",
  borderHi: "var(--cx-borderHi)",
  surface:  "var(--cx-surface)",
  glass:    "var(--cx-glass)",
  accentBg: "var(--cx-accentBg)",
  accentTx: "var(--cx-accentTx)",
};
