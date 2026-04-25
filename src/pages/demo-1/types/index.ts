export interface Stat {
  value: string;
  label: string;
}

export interface Quote {
  quote: string;
  name: string;
  role: string;
  stage: string;
}

export interface Feature {
  eyebrow: string;
  title: string;
  body: string;
  img: string;
}

export interface AudienceCard {
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  img: string;
}

export interface FooterLocation {
  city: string;
  addr: string;
}

export interface DesignTokens {
  bg: string;
  text: string;
  muted: string;
  muted2: string;
  border: string;
  borderHi: string;
  surface: string;
  glass: string;
  accentBg: string;
  accentTx: string;
}
