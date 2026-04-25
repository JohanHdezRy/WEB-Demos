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

## Project Structure

```
├── src/
│   ├── main.tsx                 # Bootstrap de React + BrowserRouter
│   ├── App.tsx             # Rutas principales y lazy loading de demos
│   ├── index.css                # Estilos globales
│   ├── lib/
│   │   └── utils.ts             # Helpers compartidos
│   ├── hooks/                   # Hooks reutilizables entre demos
│   │   ├── useFonts.ts
│   │   ├── useInView.ts
│   │   ├── useLenis.ts
│   │   ├── useMedia.ts
│   │   ├── useMeasure.ts
│   │   ├── useElementWidth.ts
│   │   ├── useSpotlight.ts
│   │   ├── useVinylRoulette.ts
│   │   └── useMenuCard.ts
│   ├── components/
│   │   ├── Folder.tsx
│   │   ├── ui/                  # Componentes base de UI
│   │   │   └── button.tsx
│   │   └── animations/          # Piezas visuales reutilizables
│   │       ├── AnimatedContent.tsx
│   │       ├── BounceCards.tsx
│   │       ├── CardSwap.tsx
│   │       ├── FloatingLines.tsx
│   │       ├── FuzzyText.tsx
│   │       ├── InfiniteMenu.tsx
│   │       ├── Masonry.tsx
│   │       └── ScrollReveal.tsx
│   ├── styles/
│   │   ├── img/                 # Thumbnails y assets visuales
│   │   └── video/               # Videos locales usados por demos
│   └── pages/
│       ├── Landing.tsx        # Pantalla indice con acceso a las demos
│       ├── demo-1/              # CloudX
│       │   ├── CloudX.tsx
│       │   ├── components/
│       │   ├── data/
│       │   ├── hooks/
│       │   └── types/
│       ├── demo-2/              # Rinacita
│       │   ├── Rinacita.tsx
│       │   ├── components/
│       │   ├── data/
│       │   ├── hooks/
│       │   └── types/
│       ├── demo-3/              # Red-Wolf
│       │   ├── lupa.tsx
│       │   ├── components/
│       │   ├── data/
│       │   ├── hooks/
│       │   └── types/
│       ├── demo-4/              # NightCity
│       │   ├── NightCity.tsx
│       │   ├── components/
│       │   ├── data/
│       │   ├── hooks/
│       │   └── types/
│       ├── demo-5/              # Maison
│       │   ├── Fashion.tsx
│       │   ├── components/
│       │   ├── data/
│       │   └── types/
│       └── demo-6/              # DWIS·M
│           ├── Dashboard.tsx
│           ├── components/
│           ├── data/
│           ├── hooks/
│           └── types/
└── README.md
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
