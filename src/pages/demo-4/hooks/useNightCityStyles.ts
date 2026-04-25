import { C } from "../data/tokens";

export function useNightCityStyles(): string {
  return `
    @keyframes nc-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes nc-pulse { 0%,100%{opacity:.3} 50%{opacity:1} }

    .nc-bg { position:fixed; inset:0; z-index:0; background:${C.bg}; }
    .nc-overlay { position:fixed; inset:0; z-index:1; background:rgba(19,19,19,.55); pointer-events:none; }
    .nc-content { position:relative; z-index:2; }

    .nc-hero {
      position:relative; height:100vh;
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      padding-top:5rem;
    }
    .nc-hero-sub {
      font-family:'Space Grotesk',sans-serif; font-size:.62rem;
      letter-spacing:.38em; color:${C.accent}; margin-top:1.5rem; text-transform:uppercase;
    }
    .nc-scroll-hint { margin-top:3rem; display:flex; flex-direction:column; align-items:center; gap:.5rem; }
    .nc-scroll-hint span { font-family:'Space Grotesk',monospace; font-size:.48rem; letter-spacing:.3em; color:rgba(255,255,255,.25); }
    .nc-scroll-line { width:1px; height:56px; background:linear-gradient(to bottom,rgba(0,229,255,.8),transparent); animation:nc-pulse 2s ease-in-out infinite; }
    .nc-hero-cta {
      margin-top:2.5rem;
      background:linear-gradient(135deg,${C.primary},${C.accent});
      color:${C.onPrimary}; font-family:'Space Grotesk',sans-serif; font-size:.7rem; font-weight:700;
      text-transform:uppercase; letter-spacing:.2em; border:none;
      padding:1.25rem 2.5rem; cursor:pointer;
      transition:box-shadow .3s,transform .2s;
      box-shadow:0 0 32px rgba(0,218,243,.2);
    }
    .nc-hero-cta:hover { box-shadow:0 0 48px rgba(0,218,243,.45); transform:translateY(-2px); }

    .nc-roulette-overlay {
      position:absolute; inset:0;
      background:rgba(0,0,0,.75); backdrop-filter:blur(2px);
      display:flex; flex-direction:column; justify-content:flex-end;
      padding:2.5rem; opacity:0; transition:opacity .5s;
    }
    .nc-roulette-overlay:hover { opacity:1 !important; }
    .nc-roulette-label { font-family:'Space Grotesk',sans-serif; font-size:.58rem; letter-spacing:.3em; text-transform:uppercase; color:${C.primary}; margin-bottom:.5rem; }
    .nc-roulette-title { font-family:'Space Grotesk',sans-serif; font-size:2rem; font-weight:700; color:${C.text}; margin:0; line-height:1.1; }
    .nc-roulette-artist { font-family:'Newsreader',serif; font-style:italic; font-size:1.2rem; color:${C.textMuted}; margin:.3rem 0 1.5rem; }
    .nc-roulette-cta {
      width:fit-content; font-family:'Space Grotesk',sans-serif; font-size:.62rem;
      text-transform:uppercase; letter-spacing:.2em; color:${C.primary};
      background:none; border:none; border-bottom:1px solid ${C.primary}; padding-bottom:2px; cursor:pointer;
    }
    .nc-spinning-badge {
      position:absolute; top:2rem; right:2rem; width:88px; height:88px;
      border-radius:50%; background:${C.primary};
      display:flex; align-items:center; justify-content:center; padding:.75rem;
      animation:nc-spin 12s linear infinite;
      box-shadow:0 0 20px rgba(0,218,243,.3);
    }
    .nc-badge-text { font-family:'Space Grotesk',sans-serif; font-size:.5rem; font-weight:700; text-transform:uppercase; letter-spacing:.05em; color:${C.onPrimary}; text-align:center; line-height:1.3; }
    .nc-arrow-btn {
      background:none; border:none; color:${C.textMuted}; font-size:1.5rem;
      cursor:pointer; transition:color .2s; line-height:1;
    }
    .nc-arrow-btn:hover { color:${C.primary}; }
    .nc-dot {
      display:inline-block; width:10px; height:10px; border-radius:50%;
      background:${C.outline}88; transition:all .3s; cursor:pointer;
    }
    .nc-dot-active { background:${C.primary}; box-shadow:0 0 8px rgba(0,218,243,.8); }

    .nc-folder-cell {
      display:flex; flex-direction:column; align-items:center; gap:1.25rem;
      padding:1.5rem; background:${C.bgHigh};
      border:1px solid transparent; transition:border-color .5s; cursor:pointer;
      overflow:visible;
    }
    .nc-folder-cell:hover { border-color:${C.accent}33; }

    .nc-outline-btn {
      padding:.75rem 2rem; border:1px solid ${C.outline}55; background:none;
      color:${C.text}; font-family:'Space Grotesk',sans-serif; font-size:.6rem;
      text-transform:uppercase; letter-spacing:.2em; font-weight:700;
      cursor:pointer; transition:border-color .3s;
    }
    .nc-outline-btn:hover { border-color:${C.primary}; }
    .nc-primary-btn {
      padding:1.25rem 3rem; border:1px solid ${C.primary}; background:none; color:${C.primary};
      font-family:'Space Grotesk',sans-serif; font-size:.75rem; text-transform:uppercase;
      letter-spacing:.2em; font-weight:700; cursor:pointer; transition:background .5s,color .5s;
    }
    .nc-primary-btn:hover { background:${C.primary}; color:${C.onPrimary}; }

    .nc-footer-link {
      font-family:'Space Grotesk',sans-serif; font-size:.8rem;
      color:${C.text}88; text-decoration:none; display:block; transition:color .2s;
    }
    .nc-footer-link:hover { color:${C.accent}; }
    .nc-footer-policy {
      font-family:'Space Grotesk',sans-serif; font-size:.58rem;
      text-transform:uppercase; letter-spacing:.2em; color:${C.text}44;
      cursor:pointer; transition:color .2s;
    }
    .nc-footer-policy:hover { color:${C.primary}; }

    .nc-play-btn {
      width:40px; height:40px; border-radius:50%; background:${C.primary};
      border:none; color:${C.onPrimary}; font-size:1.1rem; cursor:pointer;
      display:flex; align-items:center; justify-content:center; transition:transform .2s;
    }
    .nc-play-btn:hover { transform:scale(1.1); }
    .nc-ctrl-btn {
      background:none; border:none; color:${C.textMuted}; font-size:1rem;
      cursor:pointer; transition:color .2s;
    }
    .nc-ctrl-btn:hover { color:${C.primary}; }

    @media (max-width:900px) { .nc-folder-grid { grid-template-columns:repeat(2,1fr) !important; } }
    @media (max-width:580px) { .nc-folder-grid { grid-template-columns:1fr !important; } }
    @media (max-width:768px) {
      .nc-nav-links { display:none !important; }
      .nc-hamburger { display:flex !important; }
      .nc-nav-cart { display:none !important; }
    }
  `;
}
