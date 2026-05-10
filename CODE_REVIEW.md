# WEB-Demos · Revisión de calidad y plan de optimización

Stack: React 19 + TS + Vite 7 + Tailwind v4 + GSAP 3.14 + Lenis + R3F/Three + OGL.
Auditados: 125 archivos / ~14.3k líneas, dist actual ~21 MB.

Leyenda: 🔴 alto impacto · 🟡 medio · 🟢 mejora opcional · ✅ implementado · ⏸️ parcial · ⏳ pendiente.

**Estado global (2026-05):** todos los 🔴 cubiertos · todos los 🟡 fáciles cubiertos · pendientes los refactors estructurales (5.1–5.4) y mejoras opcionales (2.5, 4.5, 5.5 prefijos).

---

## 1. Performance del bundle y assets

### ⏸️ 🔴 1.1 Video y PNGs sin optimizar inflan el dist a 21 MB
- `dist/assets/lupa-*.mp4` pesa **13.6 MB**. Sirvelo desde un CDN (Cloudflare R2, Bunny, Mux) o transcodifícalo a `webm` + fallback `mp4` con `bitrate ≤ 1.5 Mbps`. Ej: `ffmpeg -i lupa.mp4 -vf scale=1280:-2 -b:v 1200k -c:v libx264 -movflags +faststart lupa.mp4`.
- PNGs de demos pesan **1.0–1.7 MB cada uno** (`demo1.png`, `demo2.png`, `demo5.png`). Convertir a `.webp`/`.avif` con `cwebp -q 80` debería bajarlos a 80–200 KB.
- Mover los archivos pesados a `public/` y no importarlos como módulos para no inflar el grafo de Vite.

### ✅ 🔴 1.2 Falta `loading="lazy"` y `decoding="async"` en TODAS las `<img>`
Ningún `<img>` en `src/` tiene atributos de carga diferida (16 instancias). En particular son críticos:
- `src/pages/Landing.tsx:115` (grid de previews del landing)
- `src/components/animations/BounceCards.tsx:126`
- `src/pages/demo-1/components/AudienceCards.tsx:39`, `FeatureSections.tsx:26`
- `src/pages/demo-2/components/MenuCard.tsx:34,51` (2 imgs por tarjeta × N tarjetas)
- `src/pages/demo-3/components/HeroSection.tsx:182`, `GallerySection.tsx:82`, `LabSpecsSection.tsx:64`
- `src/pages/demo-4/components/VinylRoulette.tsx:64,87,151`, `NowPlayingBar.tsx:33`, `CitySessions.tsx:8`
- `src/pages/demo-5/components/ProductGrid.tsx:27`, `LooksSection.tsx:65`

**Acción**: agregar `loading="lazy" decoding="async"` salvo a la imagen LCP (primer fold de cada demo, que debe quedar `loading="eager" fetchpriority="high"`).

### ✅ 🔴 1.3 `<img>` sin `width`/`height` → CLS alto
Ninguna imagen declara dimensiones. Esto degrada Core Web Vitals (CLS). Definir el aspect-ratio nativo via `width`/`height` en el HTML (no solo CSS) en cada `<img>`. Ejemplo en `src/pages/demo-3/components/GallerySection.tsx:82`:
```tsx
<img src={item.src} alt={item.label} width={1200} height={1500} loading="lazy" decoding="async" />
```

### ✅ 🔴 1.4 `<video>` sin `preload="metadata"` ni dimensiones
- `src/pages/demo-1/components/Hero.tsx:32-46`
- `src/pages/demo-2/components/RinacitaHero.tsx:28-42`
- `src/pages/demo-3/components/HeroSection.tsx` (lupa.mp4 13 MB)
- `src/pages/demo-5/components/HeroSection.tsx:29` y `FullWidthVideo.tsx:7-13`

Actualmente el navegador descarga el video completo al montar. Usar:
```tsx
<video preload="metadata" poster={...} muted playsInline autoPlay loop width={1920} height={1080} />
```
y proveer `<source>` con `webm` antes del `mp4`.

### ✅ 🟡 1.5 Code splitting solo a nivel de página
`vite.config.ts` no define `build.rollupOptions.output.manualChunks`. Three.js + drei + R3F + GSAP + plugins (~600 KB minificado) podrían quedar en el chunk principal si algún demo los importa síncronamente. Sugerencia:
```ts
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        gsap: ['gsap', 'gsap/ScrollTrigger', 'gsap/SplitText'],
        three: ['three', '@react-three/fiber', '@react-three/drei'],
        ogl: ['ogl', 'gl-matrix'],
      },
    },
  },
},
```

### ✅ 🟡 1.6 Dependencias instaladas pero no usadas (peso muerto)
Verificar y, si no se usan, desinstalar. Una pasada con `grep -rn` indicó importadores nulos para algunos:
- `motion` (12.x): no encontré imports en `src/` — `npm uninstall motion`.
- `@react-three/drei`, `@react-three/fiber`, `three`: solo se usan a través de `InfiniteMenu` (que en realidad usa **OGL/gl-matrix**, no R3F). Si ningún demo monta R3F, eliminar drei/fiber/three quita varios MB.
- `lucide-react ^1.8.0` y `shadcn ^4.2.0`: confirmar uso real (no aparecen en imports). Si no se usan, fuera.
- `@base-ui/react`: idem, sin imports detectados.

Comando para confirmar:
```bash
npx depcheck
```

### ✅ 🟡 1.7 Fuentes — duplicación y bloqueo
- `index.html:11` carga 7 familias de Google Fonts (Pacifico, Dancing Script, Playfair, Inter, Poppins, DM Sans, Cormorant).
- `src/index.css:4` además importa `@fontsource-variable/geist`.
- `src/hooks/useFonts.ts` inyecta CSS de Google adicional en runtime por demo.

Resultado: hay 8+ familias compitiendo por bloquear el render. Recomendaciones:
1. Quedarse con **una** estrategia: o bien `@fontsource` para todas las fuentes (autohosted, mejor CWV), o bien `<link>` en HTML con `media="print" onload` para no bloquear.
2. Cargar solo subsets `latin` (a menos que necesites cyrillic-ext etc.).
3. Mover el CSS de `useFonts.ts` a `<link rel="preload" as="style">` en `index.html` por demo, o consolidar en `index.css`.
4. `useFonts.ts:8-14` no limpia el `<link>` cuando cambia `href` y permite múltiples links si la URL trae query strings — agregar cleanup o usar `Set` global.

---

## 2. Animaciones GSAP

### ✅ 🔴 2.1 Cero soporte de `prefers-reduced-motion`
No hay un solo `gsap.matchMedia()` ni `window.matchMedia('(prefers-reduced-motion: reduce)')` en el repo. WCAG 2.3.3 lo requiere para animaciones disparadas por scroll/hover.

Crear un hook compartido `src/hooks/useReducedMotion.ts` y aplicar en cada animación. Patrón sugerido (sustituye los `useEffect` con `gsap.context()` actuales por `gsap.matchMedia()`):
```ts
const mm = gsap.matchMedia();
mm.add({
  reduced: '(prefers-reduced-motion: reduce)',
  motion:  '(prefers-reduced-motion: no-preference)',
}, (ctx) => {
  const { reduced } = ctx.conditions!;
  if (reduced) {
    gsap.set(targets, { opacity: 1, y: 0, clearProps: 'all' });
    return;
  }
  gsap.from(targets, { y: 60, opacity: 0, scrollTrigger: { trigger: el } });
});
return () => mm.revert();
```

### ⏸️ 🔴 2.2 `querySelectorAll` en lugar de refs (riesgo + lecturas innecesarias)
> Mitigado: ahora todos los `querySelectorAll` viven dentro de `gsap.matchMedia()` con scope, eliminando el riesgo de matchear nodos foráneos. Migración completa a refs aún pendiente como mejora.
Mucha animación apunta por clase (`.cx-inner`, `.intr-line`, `.menu-card`, `.story-el`, `.bento-cell`, `.spec-row`). Hallazgos:
- `src/pages/demo-1/hooks/useCloudXAnimations.ts:36,104`
- `src/pages/demo-2/hooks/useRinacitaAnimations.ts:85,95,105,122`
- `src/pages/demo-3/hooks/useLupaAnimations.ts:72,82`
- `src/pages/demo-6/components/NotificationsPanel.tsx:39,52,69`

Problemas:
- Si el árbol cambia (lazy-load, listas dinámicas) los nodos no se enganchan.
- Selectores fuera del scope del `gsap.context()` matchean nodos de otros componentes.
- Pierdes type-safety.

**Fix**: usar `useRef<HTMLDivElement[]>([])` y `ref={(el) => { if (el) refs.current[i] = el }}` o el helper `gsap.utils.toArray<HTMLElement>(el.querySelectorAll('.x'))` **dentro** del scope del context. Ya hay scope (`gsap.context(() => {...}, scopeRef)`) en algunos sitios, pero los selectores se siguen pasando como string global.

### ✅ 🟡 2.3 `ScrollTrigger.kill()` redundante o ausente
- `useRinacitaAnimations.ts:140` hace `ctx.revert()` **y** además mata ScrollTriggers manualmente: redundante (revert ya los mata si fueron creados dentro del scope).
- En cambio en `LooksSection.tsx:34` no hay kill explícito y el `ctx.revert()` cubre el caso, aceptable.
- Auditar y unificar: confiar en `ctx.revert()` siempre que el ScrollTrigger se creó dentro del context.

### ✅ 🟡 2.4 `AnimatedContent.tsx` reanima cada vez que cambia cualquier prop
`src/components/animations/AnimatedContent.tsx:70-81` lleva 10 dependencias en el `useEffect`. Si el padre re-renderiza con literales (`<AnimatedContent distance={60} ...>` con número inline está OK), pero cualquier objeto/función nuevo dispararía un revert + re-create. Aceptable en estado actual; documentar o migrar a `@gsap/react` `useGSAP({ revertOnUpdate: false })` para tener control explícito.

### ⏳ 🟡 2.5 Migrar al hook oficial `@gsap/react`
La convención del usuario menciona `useGSAP`, pero el paquete `@gsap/react` no está en `package.json`. Vale la pena instalarlo:
```bash
npm i @gsap/react
```
y cambiar el patrón `useEffect + gsap.context() + ctx.revert()` por:
```ts
useGSAP(() => { ... }, { scope: ref });
```
Beneficios: cleanup automático, detección de hot-reload en dev, soporte de `revertOnUpdate`.

### ✅ 🟡 2.6 `useLenis` mata `lagSmoothing(0)` globalmente
> `src/hooks/useLenis.ts` ahora restaura los defaults `(500, 33)` en cleanup.
`src/hooks/useLenis.ts:16` desactiva el lagSmoothing del ticker GSAP global, lo cual afecta a cualquier otro componente que monte después. No se restaura en cleanup. Restaurar el valor original:
```ts
const prev = gsap.ticker.lagSmoothing();  // [smoothingMS, adjustedLag]
gsap.ticker.lagSmoothing(0);
return () => {
  gsap.ticker.lagSmoothing(prev[0], prev[1]);
  ...
};
```

### ✅ 🟢 2.7 `gsap.registerPlugin(ScrollTrigger)` repetido
> Centralizado en `src/lib/gsap.ts`. Hooks/componentes importan `{ gsap, ScrollTrigger, SplitText }` desde ahí.
Se llama en cada hook/componente que lo usa. Centralizar en `src/lib/gsap.ts`:
```ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
```

---

## 3. Accesibilidad

### ✅ 🔴 3.1 Botones sin `aria-label` (≥10 instancias)
Interactivos solo con icono o glifo:
- Nav prev/next ←/→ en `src/pages/demo-3/components/GallerySection.tsx:55-56` y `src/pages/demo-4/components/VinylRoulette.tsx:121,134`.
- "Quick Add" en `src/pages/demo-5/components/ProductGrid.tsx:34` (texto genérico, no dice qué producto).
- Botones de Hero `CloudX` en `Hero.tsx:159,183`.
- Menú móvil: el hamburger SI tiene aria-label en varios demos, bien.

### ✅ 🔴 3.2 `alt` insuficiente
- `GallerySection.tsx:82` usa `alt={item.label}` (palabras sueltas). Cambiar por descripción o `alt=""` si es decorativa.
- `MenuCard.tsx:34,51` repiten alt = label.
- Imágenes decorativas con texto deberían usar `alt=""` y `role="presentation"`.

### ✅ 🟡 3.3 Contraste insuficiente
- `tokens.ts` de demos define textos `muted` con alpha ≤ 0.45 (`rgba(245,245,240,0.45)` en CloudX, `rgba(28,26,22,0.45)` en Rinacita). Sobre el fondo correspondiente quedan en 3.5–4 : 1, debajo del WCAG AA (4.5).
- Dashboard: `S.muted = #8B949E` sobre `#0D1117` ≈ 4.6, pasa AA pero apenas. Mantener.

### ✅ 🟡 3.4 No hay `:focus-visible` consistente
`src/index.css:18-28` solo aplica `outline-ring/50` global. Confirmar visualmente que cada botón/link en demos tiene un focus ring perceptible (los hover overlays oscuros de demo-4 y demo-1 lo ocultan).

### ✅ 🟡 3.5 No hay `lang` por demo ni `<title>` dinámico
`index.html:2` declara `lang="en"` y los demos no actualizan `document.title`. Agregar un componente o hook `useDocumentTitle(t)` por demo.

### ✅ 🟢 3.6 Sin `eslint-plugin-jsx-a11y`
> Instalado + configurado con reglas `recommended`. `anchor-is-valid`, `no-static-element-interactions` y `click-events-have-key-events` quedaron como `warn` (comunes en demos de scroll). Lint actual: 0 errors / 56 warnings preexistentes para limpieza incremental.
Instalar y configurar:
```bash
npm i -D eslint-plugin-jsx-a11y
```
y añadir al `eslint.config.js` para detectar automáticamente los puntos anteriores.

---

## 4. Hooks compartidos

### ✅ 🟡 4.1 `useFonts.ts` no se limpia ni soporta múltiples hojas
> Set global de dedupe + carga non-blocking (`media="print"` swap a `all` en `onload`).
- No quita el `<link>` al desmontar; si la app cambia de demo varias veces, el head acumula links.
- Si el href cambia, se inyecta uno nuevo sin borrar el anterior.
- Mejor: mantener un `Set<string>` global, devolver `boolean` si está cargada, o mover los preloads a `index.html`.

### ✅ 🟡 4.2 `useElementWidth.ts` solo escucha `resize`
No detecta cambios de layout cuando el contenedor padre cambia (sin reflow de window). Reemplazar por `ResizeObserver` (igual que `useMeasure.ts`) o consolidar ambos en un solo hook `useSize`.

### ✅ 🟡 4.3 `useMedia.ts` re-suscribe MQs cada render si el array cambia
`src/hooks/useMedia.ts:12` depende de `queries` (array). Si el caller pasa array literal (`useMedia(['(min-width:600px)'], ...)`), cada render crea un array nuevo y dispara `useEffect` → desuscribir/suscribir. `Masonry.tsx:64` lo invoca con literal, así que cada re-render del padre re-suscribe.

**Fix**: convertir a string-key dentro del hook o pedir al caller que estabilice con `useMemo`. Sugerencia:
```ts
const key = queries.join('|');
useEffect(() => { ... }, [key]);
```

### ⏳ 🟡 4.4 `useInView.ts` desconecta tras primer hit pero re-monta el observer si cambia threshold
Aceptable. Solo añadir `if (visible) return` para evitar reconfigurar después de visible.

### ⏳ 🟢 4.5 Consolidar tokens en CSS variables globales
Cada demo tiene su propio `tokens.ts` (`T`, `C`, `S`, etc.). Migrar a CSS variables en `:root` con scope por clase de demo:
```css
.theme-cloudx { --bg: #09090b; --muted: rgba(245,245,240,0.45); ... }
```
Beneficios: uso desde Tailwind v4 (`text-[--muted]`), menos re-render por inline styles, menor superficie TS.

---

## 5. Convenciones de código y duplicación

### ⏳ 🟡 5.1 Mezcla de inline styles + Tailwind + CSS-in-JS
La convención del proyecto manda Tailwind primero (`memory/project_conventions.md`). Hay islas de inline styles:
- `src/pages/demo-3/lupa.tsx:54-84` — Link styling con objeto `style`.
- `src/pages/demo-1/CloudX.tsx:48-53`.
- `src/pages/demo-4/components/NightCity.tsx:26` (background, color en inline).
- `src/pages/demo-2/Rinacita.tsx:70-83` — `<style>` jsx con media queries.
- `useNightCityStyles.ts` inyecta CSS string en runtime.

**Acción**: pasar a clases Tailwind o, cuando sea CSS pesado y compartido, mover a `index.css` (ya existe el patrón de bloques `── BounceCards ──`, `── Masonry ──`, etc.).

### ⏳ 🟡 5.2 `GlobalStyles.tsx` por demo es inconsistente
Demo-1 y demo-3 tienen su propio componente `GlobalStyles.tsx`. Demo-2/4/5/6 no. Decidir un único patrón:
- Opción A: `index.css` global con secciones por demo (escalable, ya empezado).
- Opción B: archivo `.module.css` por demo en `pages/demo-N/styles.module.css`.

### ⏳ 🟡 5.3 Demo-6 — `OverviewSection` y `ECommerceSection` son ~95 % iguales
Estructura idéntica: KPIs + chart + tabla + footer. Extraer:
```tsx
<DashboardSection
  metrics={...}
  chart={<BarChart .../>}
  table={<Table .../>}
/>
```
y mover los datos a `data/`. Ahorra ~300 líneas y centraliza estilos.

### ⏳ 🟡 5.4 Componentes con lógica que debería estar en hook
Convención: componentes solo desestructuran hook + JSX. Excepciones:
- `src/pages/demo-5/components/HeroSection.tsx:8-22` — `useEffect` + GSAP en el componente.
- `src/pages/demo-5/components/LooksSection.tsx:13-34` — idem.
- `src/pages/demo-5/components/Navbar.tsx:10-16` — idem.
- `src/pages/demo-6/components/Sparkline.tsx:21`, `DonutChart.tsx:23`, `BarChart.tsx:17`, `LineChart.tsx:25`, `MetricCard.tsx:29` — todos animan en `useEffect` inline.

Mover a `pages/demo-N/hooks/use*.ts` (igual que demos 1, 2, 3, 4).

### ✅ 🟢 5.5 Naming inconsistente
> `lupa.tsx` → `Lupa.tsx`. Componentes de demo-2 sin prefijo `Rinacita` (`Hero`, `Nav`, `Story`, `Cta`, `Footer`, `Gallery`, `Intro`, `MenuSection`, `Stats`).
- `src/pages/demo-3/lupa.tsx` exporta `Lupa` pero el archivo es minúscula. Renombrar a `Lupa.tsx`.
- Componentes `RinacitaHero`, `RinacitaNav`, etc. tienen prefijo redundante (ya están bajo `demo-2/`). Renombrar a `Hero`, `Nav`. El demo-1 y demo-3 ya lo hacen (`Hero`, `NavBar`).

---

## 6. TypeScript y configuración

### ✅ 🟢 6.1 Sin `any` ni `as unknown as` detectados
Bien. Mantener.

### ⏸️ 🟡 6.2 Activar reglas estrictas adicionales en `tsconfig.app.json`
> `noImplicitOverride` activo. `noPropertyAccessFromIndexSignature` y `exactOptionalPropertyTypes` quedan pendientes (pueden romper código actual).
```json
{
  "compilerOptions": {
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "exactOptionalPropertyTypes": true
  }
}
```
La última puede romper código actual; aplicar primero `noImplicitOverride`.

### ✅ 🟢 6.3 ESLint mínimo
> `eslint-plugin-import` instalado con `no-cycle` (error) y `order` (warn). `no-console` activo (warn, permite `console.warn` y `console.error`).
`eslint.config.js` solo extiende `recommended` + react-hooks + react-refresh. Falta:
- `eslint-plugin-jsx-a11y` (a11y, ver §3.6).
- `eslint-plugin-import` con regla `no-cycle` y orden.
- regla `no-console` (warn) — actualmente hay 2 `console.error` en `InfiniteMenu.tsx:337,366` aceptables, pero no hay barrera para nuevos.

### ✅ 🟡 6.4 React Router en GitHub Pages
> `public/404.html` con redirect SPA implementado.
`vite.config.ts:8` usa `base: '/WEB-Demos/'` y `main.tsx` usa `BrowserRouter basename='/WEB-Demos'`. Si se hostea en GitHub Pages, una URL directa a `/WEB-Demos/demo-3` dará 404 al servidor estático. Soluciones:
- Crear `public/404.html` que redirige al `index.html` con la ruta original.
- Cambiar a `HashRouter`.

---

## 7. Plan de acción priorizado

| # | Acción | Tiempo | Impacto |
|---|--------|--------|---------|
| 1 | Comprimir `lupa.mp4` y convertir PNGs a WebP | 30 min | dist 21 MB → ~3 MB |
| 2 | Añadir `loading/decoding/width/height` a las 16 `<img>` | 25 min | CLS, LCP |
| 3 | `aria-label` en botones icónicos + `alt` decentes | 20 min | a11y, WCAG |
| 4 | Implementar `useReducedMotion` + `gsap.matchMedia` en hooks | 45 min | a11y |
| 5 | Auditar deps con `npx depcheck` y desinstalar (`motion`, `three`, `drei`, `fiber` si no se usan) | 15 min | bundle |
| 6 | Centralizar `src/lib/gsap.ts` y migrar a `@gsap/react` `useGSAP` | 1 h | mantenibilidad |
| 7 | Refactor `OverviewSection` ↔ `ECommerceSection` a wrapper común | 1 h | -300 LOC |
| 8 | Mover GSAP de `useEffect` inline (demo-5, demo-6) a hooks | 45 min | convención |
| 9 | Consolidar `useFonts` + `index.html` y eliminar dobles cargas | 30 min | LCP |
| 10 | Añadir `manualChunks` GSAP/Three en `vite.config.ts` | 10 min | TTI |
| 11 | Instalar `eslint-plugin-jsx-a11y` y arreglar warnings | 30 min | a11y duradero |
| 12 | Crear `public/404.html` para rutas directas en Pages | 5 min | UX deploy |

Total: ~6 h de trabajo bien encajable; los puntos 1–4 son ~2 h y entregan el grueso del valor.

---

## 8. Mejoras opcionales / ideas

- Añadir un `LightHouse` script en CI: `npm run build && lhci autorun` con presupuestos de bundle.
- Añadir `react-router` data routes con `loader` y prefetch en hover sobre las cards del Landing (`onMouseEnter -> import()`).
- Service worker con Workbox para cachear assets de demos visitados.
- Reemplazar `Lenis + ScrollTrigger.update` por la opción nativa de ScrollTrigger 3.13+ con `ScrollSmoother` (pago) o por `Lenis 1.4` que ya integra mejor.
- Usar `view-transition` API del navegador (Chrome ≥126) para transiciones entre demos.
- Snapshot tests visuales con `@playwright/test` por demo (puppeteer ya está como dep).
