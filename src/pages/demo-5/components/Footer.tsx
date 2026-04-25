import { Link } from "react-router-dom";
import { NAV_LINKS } from "../data/fashionData";

const SOCIAL_LINKS = ["Instagram", "Pinterest", "TikTok"];

export function Footer() {
  return (
    <footer className="bg-stone-900 text-white py-16 px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h3 className="font-[var(--font-cormorant)] text-4xl font-light mb-4">
            Maison
          </h3>
          <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
            Where timeless craft meets contemporary design. Every piece is made
            to last a lifetime.
          </p>
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-5">
            Navigate
          </p>
          <ul className="space-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="text-stone-300 text-sm hover:text-white transition-colors"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-stone-500 mb-5">
            Follow
          </p>
          <ul className="space-y-3">
            {SOCIAL_LINKS.map((s) => (
              <li key={s}>
                <a
                  href="#"
                  className="text-stone-300 text-sm hover:text-white transition-colors"
                >
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-stone-800 flex justify-between items-center">
        <p className="text-stone-600 text-xs">
          © 2025 Maison. All rights reserved.
        </p>
        <Link
          to="/"
          className="text-stone-500 text-xs hover:text-stone-300 transition-colors"
        >
          ← Back to demos
        </Link>
      </div>
    </footer>
  );
}
