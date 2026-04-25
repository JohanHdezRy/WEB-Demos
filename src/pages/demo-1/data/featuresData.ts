import type { Feature, AudienceCard } from "../types";

export const FEATURES: Feature[] = [
  {
    eyebrow: "Infrastructure",
    title: "Deploy anywhere.\nInstantly.",
    body: "One command sends your build to 20+ regions simultaneously. Automatic failover, zero-config CDN, and preview environments for every pull request.",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
  },
  {
    eyebrow: "Security",
    title: "Enterprise-grade\nby default.",
    body: "SOC 2 Type II, ISO 27001, zero-trust networking, RBAC and full audit logs — built in, not bolted on. Pass audits without slowing down.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80",
  },
];

export const AUDIENCE_CARDS: AudienceCard[] = [
  {
    eyebrow: "For developers",
    title: "Ship faster.\nBreak nothing.",
    body: "Git-push deploys, instant rollbacks, preview environments and a CLI that stays out of your way. Build the thing — we handle the rest.",
    cta: "Explore the platform",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80",
  },
  {
    eyebrow: "For enterprise",
    title: "Scale without\ncompromise.",
    body: "SOC 2 Type II, RBAC, dedicated SRE support, and SLAs that mean something. Production-grade reliability from day one.",
    cta: "Talk to sales",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80",
  },
];

export const BELIEFS: string[] = [
  "Infrastructure should disappear, not demand attention.",
  "Developer experience is a product decision, not an afterthought.",
  "Security and velocity are not a trade-off.",
  "Great cloud is invisible. You only notice it when it's gone.",
];

export const LOGOS: string[] = [
  "Stripe",
  "Vercel",
  "Linear",
  "Notion",
  "Figma",
  "Retool",
  "Supabase",
  "PlanetScale",
  "Loom",
  "Pitch",
];
