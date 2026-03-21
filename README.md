# WEB Demo Collection

A curated portfolio of **6 production-quality web demos** built with React 19, TypeScript, and modern animation libraries. Each demo targets a different industry vertical and showcases varied UI patterns, layouts, and interactive effects.

---

## Live Demos

| # | Demo | Category |
|---|------|----------|
| 01 | **La Cocina** | Restaurant & Food |
| 02 | **UrbanWear** | E-Commerce Store |
| 03 | **PixelCraft** | Creative Agency |
| 04 | **PRISM Studio** | Digital Agency · Premium |
| 05 | **HomeQuest** | Real Estate |
| 06 | **SELVA VERDE** | Adventure Park |

---

## Tech Stack

### Core
| Technology | Version | Role |
|------------|---------|------|
| [React](https://react.dev/) | 19 | UI framework |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type safety |
| [Vite](https://vitejs.dev/) | 7 | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | v4 | Utility-first styling |
| [React Router](https://reactrouter.com/) | v7 | Client-side routing |

### Animation & Effects
| Technology | Role |
|------------|------|
| [Motion (Framer Motion)](https://motion.dev/) | Spring animations, scroll velocity, gradient text, blur reveal |
| [GSAP](https://greensock.com/gsap/) | Elastic bounce cards, fade-in reveals |
| [ogl](https://github.com/oframe/ogl) | WebGL — 3D particle systems & shader threads background |

### Component Library
Selected components adapted from **[react-bits](https://github.com/DavidHDev/react-bits)** (ts-tailwind variants):

- **Particles** — 3D WebGL particle field with mouse interaction
- **Threads** — WebGL animated shader background
- **BlurText** — Word/letter blur-reveal animation
- **GradientText** — Animated cycling gradient text
- **ShinyText** — Shine sweep animation
- **ScrollVelocity** — Scroll-speed-responsive marquee
- **TiltedCard** — 3D perspective tilt on hover
- **BounceCards** — GSAP elastic stacked card gallery
- **SpotlightCard** — Mouse-following radial spotlight
- **GlareHover** — CSS glare sweep on hover
- **CountUp** — Animated number counter (IntersectionObserver triggered)

### Tooling
| Tool | Purpose |
|------|---------|
| [Puppeteer](https://pptr.dev/) | Headless screenshot generation for the landing page preview cards |

---

## Project Structure

```
src/
├── Effects/          # Reusable animation components (react-bits inspired)
│   ├── Particles.tsx
│   ├── Threads.tsx
│   ├── BlurText.tsx
│   ├── GradientText.tsx
│   ├── ShinyText.tsx
│   ├── ScrollVelocity.tsx
│   ├── TiltedCard.tsx
│   ├── BounceCards.tsx
│   ├── SpotlightCard.tsx
│   ├── GlareHover.tsx
│   └── CountUp.tsx
├── pages/
│   ├── Landing.tsx   # Portfolio index with screenshot previews
│   ├── demo-1/       # La Cocina — Mexican restaurant
│   ├── demo-2/       # UrbanWear — clothing e-commerce
│   ├── demo-3/       # PixelCraft — creative agency
│   ├── demo-4/       # PRISM Studio — premium digital agency
│   ├── demo-5/       # HomeQuest — real estate
│   └── demo-6/       # SELVA VERDE — adventure park
├── components/
│   ├── ScrollTop.tsx
│   └── animations/
│       └── RevealSection.tsx
public/
└── screenshots/      # Auto-generated via scripts/screenshot.mjs
scripts/
└── screenshot.mjs    # Puppeteer screenshot generator
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Generate landing page screenshots (requires running dev server)
npm run dev &
node scripts/screenshot.mjs
```

---

## Design Principles

- **Inline styles** as primary approach — no external CSS files, co-located styles
- **Dark-first** color palettes — each demo has a distinct accent color system
- **Scroll-triggered animations** — components animate on viewport entry
- **WebGL backgrounds** where maximum visual impact is needed (demos 4 & 6)
- **Mobile-responsive** — all demos include responsive layouts and mobile navigation

---

## Author

**JohanHdezRy**
