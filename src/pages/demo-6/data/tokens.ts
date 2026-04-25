import type { Contact } from "../types";

export const S = {
  bg: "#0D1117",
  surface: "#161B22",
  surface2: "#1C2128",
  border: "#21262D",
  green: "#3FB950",
  blue: "#58A6FF",
  orange: "#F0883E",
  red: "#F85149",
  purple: "#D2A8FF",
  yellow: "#E3B341",
  text: "#E6EDF3",
  muted: "#8B949E",
};

export const STATUS_COLOR: Record<Contact["status"], string> = {
  online: S.green,
  busy: S.red,
  away: S.yellow,
  offline: S.muted,
};
