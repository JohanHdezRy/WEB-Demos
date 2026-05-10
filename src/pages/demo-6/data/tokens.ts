import type { Contact } from "../types";

// Values resolve from .theme-noc CSS variables in src/index.css.
export const S = {
  bg:       "var(--noc-bg)",
  surface:  "var(--noc-surface)",
  surface2: "var(--noc-surface2)",
  border:   "var(--noc-border)",
  green:    "var(--noc-green)",
  blue:     "var(--noc-blue)",
  orange:   "var(--noc-orange)",
  red:      "var(--noc-red)",
  purple:   "var(--noc-purple)",
  yellow:   "var(--noc-yellow)",
  text:     "var(--noc-text)",
  muted:    "var(--noc-muted)",
};

export const STATUS_COLOR: Record<Contact["status"], string> = {
  online: S.green,
  busy: S.red,
  away: S.yellow,
  offline: S.muted,
};
