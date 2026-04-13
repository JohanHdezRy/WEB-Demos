# WEB Demo Collection

A curated portfolio of **6 production-quality web demos** exploring different design systems, animation techniques, and UI patterns — each targeting a distinct industry vertical. Built as a personal showcase of modern front-end development with React + TypeScript.

---

## Live Demos

| #   | Name          | Category            | Highlights                                                                                        |
| --- | ------------- | ------------------- | ------------------------------------------------------------------------------------------------- |
| 01  | **CloudX**    | SaaS Platform       | Dark minimal layout, GSAP stagger animations, glassmorphism cards, count-up metrics               |
| 02  | **Rinacita**  | Restaurant          | Editorial cream layout, gold serif typography, scroll-triggered menu cards, video hero            |
| 03  | **Red-Wolf**  | Energy Drink Brand  | Bold bento grid, berry-pink accents, GSAP clip-path reveals                                       |
| 04  | **NightCity** | Music · Vinyl Store | FuzzyText hero, vinyl roulette carousel, React Bits Folder grid, video manifesto, now-playing bar |
| 05  | **Maison**    | Fashion Brand       | Video hero, horizontal scroll lookbook, masonry gallery, BounceCards press section                |
| 06  | **DWIS·M**    | Analytics Dashboard | Multi-view dark dashboard, live charts, deletable notifications, interactive contacts             |

---

## Language & Framework

|                       |                                       |
| --------------------- | ------------------------------------- |
| **Language**          | TypeScript 5.x                        |
| **Framework**         | React 19                              |
| **Build tool**        | Vite 7                                |
| **Routing**           | React Router v7                       |
| **Styling**           | Tailwind CSS v4 (`@tailwindcss/vite`) |
| **Component library** | shadcn/ui (`base-nova` style)         |

---

## Libraries

| Library                                                                                              | Role                                                             |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [GSAP](https://greensock.com/gsap/)                                                                  | Core animation engine — timelines, ScrollTrigger, elastic easing |
| [Motion (Framer Motion)](https://motion.dev/)                                                        | Spring animations, scroll-velocity marquee, presence transitions |
| [Lenis](https://lenis.darkroom.engineering/)                                                         | Smooth scroll                                                    |
| [ogl](https://github.com/oframe/ogl)                                                                 | WebGL — custom shader backgrounds (FloatingLines)                |
| [React Three Fiber + Drei](https://docs.pmnd.rs/react-three-fiber)                                   | 3D scenes where needed                                           |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Conditional class composition via `cn()`                         |
| [tw-animate-css](https://github.com/imskyleen/tw-animate-css)                                        | Extended Tailwind animation utilities                            |
| [Lucide React](https://lucide.dev/)                                                                  | Icon set                                                         |

---

## Project Structure

```
src/
├── Effects/              # Reusable animation components
│   ├── FloatingLines.tsx
│   ├── FuzzyText.tsx
│   ├── InfiniteMenu.tsx
│   ├── CardSwap.tsx
│   ├── BounceCards.tsx
│   ├── AnimatedContent.tsx
│   ├── ScrollReveal.tsx
│   └── Masonry.tsx
├── Hooks/                # Custom hooks
│   ├── useFonts.ts
│   ├── useLenis.ts
│   ├── useInView.ts
│   ├── useVinylRoulette.ts
│   └── ...
├── components/
│   ├── ui/               # shadcn/ui components
│   └── Folder.tsx        # React Bits Folder
├── Resources/
│   └── img/              # Local image assets (vinyl covers, demo thumbnails)
└── pages/
    ├── Landing.tsx        # Portfolio index
    ├── demo-1/            # CloudX — SaaS
    ├── demo-2/            # Rinacita — Restaurant
    ├── demo-3/            # Red-Wolf — Energy Drink
    ├── demo-4/            # NightCity — Vinyl Store
    ├── demo-5/            # Maison — Fashion
    └── demo-6/            # DWIS·M — Dashboard
.github/
└── workflows/
    └── deploy.yml         # GitHub Actions → GitHub Pages
```

---

## Claude's Role in this Project

This project was developed with [Claude Code](https://claude.ai/claude-code) as the primary coding assistant.

**What Claude built or generated:**

- **README** — this file
- **GitHub Actions workflow** (`.github/workflows/deploy.yml`) — CI/CD pipeline for automatic deployment to GitHub Pages on every push to `main`

---

## Author

**JohanHdezRy**
