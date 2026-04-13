import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedContent from "@/Effects/AnimatedContent";
import ScrollReveal from "@/Effects/ScrollReveal";
import Masonry, { type MasonryItem } from "@/Effects/Masonry";
import BounceCards from "@/Effects/BounceCards";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Collections", "Editorial", "About", "Contact"];

const HERO_VIDEO = "https://cdn.pixabay.com/video/2025/01/21/253877_large.mp4";

const FULLWIDTH_VIDEO = "https://www.pexels.com/es-es/download/video/6460106/";

const PRODUCTS = [
  {
    id: 1,
    src: "https://cdn.pixabay.com/photo/2024/08/25/13/49/woman-8996552_1280.jpg",
    label: "Evening Dress",
    price: "$890",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=800&h=1200&fit=crop",
    label: "Silk Blouse",
    price: "$340",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/9950902/pexels-photo-9950902.jpeg",
    label: "Tailored Coat",
    price: "$1,200",
  },
  {
    id: 4,
    src: "https://cdn.pixabay.com/photo/2019/08/07/07/05/woman-4390055_1280.jpg",
    label: "Wide Trousers",
    price: "$480",
  },
  {
    id: 5,
    src: "https://cdn.pixabay.com/photo/2024/11/08/05/28/man-9182458_1280.jpg",
    label: "Linen Suit",
    price: "$760",
  },
  {
    id: 6,
    src: "https://cdn.pixabay.com/photo/2021/08/12/13/39/woman-6540891_1280.jpg",
    label: "Draped Skirt",
    price: "$295",
  },
  {
    id: 7,
    src: "https://cdn.pixabay.com/photo/2026/04/06/08/06/08-06-52-345_1280.jpg",
    label: "Leather Jacket",
    price: "$980",
  },
  {
    id: 8,
    src: "https://cdn.pixabay.com/photo/2025/03/12/09/59/fashion-9464875_1280.jpg",
    label: "Satin Gown",
    price: "$1,450",
  },
  {
    id: 9,
    src: "https://cdn.pixabay.com/photo/2017/03/02/16/12/asian-2111681_1280.jpg",
    label: "Knit Cardigan",
    price: "$320",
  },
];

const LOOKS = [
  {
    id: 1,
    src: "https://cdn.pixabay.com/photo/2022/06/07/15/56/child-7248693_1280.jpg",
    label: "Look 01",
    desc: "Spring / Summer",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=700&h=1000&fit=crop",
    label: "Look 02",
    desc: "Resort Collection",
  },
  {
    id: 3,
    src: "https://cdn.pixabay.com/photo/2023/10/24/21/15/nature-8339115_1280.jpg",
    label: "Look 03",
    desc: "Autumn / Winter",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/1844012/pexels-photo-1844012.jpeg?auto=compress&cs=tinysrgb&w=700&h=1000&fit=crop",
    label: "Look 04",
    desc: "Capsule Edition",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=700&h=1000&fit=crop",
    label: "Look 05",
    desc: "Couture Line",
  },
];

const MASONRY_ITEMS: MasonryItem[] = [
  {
    id: "m1",
    img: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=600",
    url: "#",
    height: 900,
  },
  {
    id: "m2",
    img: "https://images.pexels.com/photos/2220316/pexels-photo-2220316.jpeg?auto=compress&cs=tinysrgb&w=600",
    url: "#",
    height: 740,
  },
  {
    id: "m3",
    img: "https://images.pexels.com/photos/3622608/pexels-photo-3622608.jpeg?auto=compress&cs=tinysrgb&w=600",
    url: "#",
    height: 820,
  },
  {
    id: "m4",
    img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=600",
    url: "#",
    height: 680,
  },
  {
    id: "m5",
    img: "https://cdn.pixabay.com/photo/2023/10/24/21/15/nature-8339115_1280.jpg",
    url: "#",
    height: 760,
  },
  {
    id: "m6",
    img: "https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=600",
    url: "#",
    height: 840,
  },
  {
    id: "m7",
    img: "https://cdn.pixabay.com/photo/2022/11/12/00/05/girl-7586011_1280.jpg",
    url: "#",
    height: 720,
  },
  {
    id: "m8",
    img: "https://cdn.pixabay.com/photo/2020/09/25/16/50/portrait-5601950_1280.jpg",
    url: "#",
    height: 860,
  },
  {
    id: "m9",
    img: "https://images.pexels.com/photos/1844012/pexels-photo-1844012.jpeg?auto=compress&cs=tinysrgb&w=600",
    url: "#",
    height: 780,
  },
  {
    id: "m10",
    img: "https://cdn.pixabay.com/photo/2025/07/31/20/00/woman-9747618_1280.jpg",
    url: "#",
    height: 700,
  },
  {
    id: "m11",
    img: "https://cdn.pixabay.com/photo/2024/04/16/23/00/young-8700870_1280.jpg",
    url: "#",
    height: 810,
  },
  {
    id: "m12",
    img: "https://images.pexels.com/photos/2220318/pexels-photo-2220318.jpeg?auto=compress&cs=tinysrgb&w=600",
    url: "#",
    height: 750,
  },
];

const MAGAZINE_COVERS = [
  "https://media.vogue.es/photos/60f162af8cd5d756f8ca22c7/master/pass/SEPT_COVER01_SINCODIGO_page-0001.jpg",
  "https://www.yourcelebritymagazines.com/cdn/shop/files/juliagarner.webp?v=1757071255",
  "https://vanityfair.blob.core.windows.net/vanityfair20240601thumbnails/Spreads/0x600/1.jpg",
  "https://files.coverscdn.com/covers/191757/low/0000.jpg",
  "https://m.media-amazon.com/images/I/81hKsyzqlKL._AC_UF1000,1000_QL80_.jpg",
];

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 },
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6 mix-blend-difference"
    >
      <Link
        to="/"
        className="text-white text-xs tracking-[0.2em] uppercase hover:opacity-60 transition-opacity duration-300"
      >
        ← Demos
      </Link>
      <span className="text-white font-[var(--font-cormorant)] text-2xl tracking-widest uppercase">
        Maison
      </span>
      <ul className="flex gap-10">
        {NAV_LINKS.map((l) => (
          <li key={l}>
            <a
              href="#"
              className="text-white text-xs tracking-[0.2em] uppercase hover:opacity-60 transition-opacity duration-300"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-line",
        { yPercent: 110 },
        {
          yPercent: 0,
          duration: 1.4,
          ease: "power4.out",
          stagger: 0.12,
          delay: 0.8,
        },
      );
    }, titleRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

      <div
        ref={titleRef}
        className="absolute bottom-20 left-10 md:left-16 max-w-2xl"
      >
        <div className="overflow-hidden mb-2">
          <p className="hero-line text-white/60 text-xs tracking-[0.4em] uppercase">
            Spring / Summer 2025
          </p>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-line text-white font-[var(--font-cormorant)] text-[clamp(4rem,10vw,9rem)] leading-none font-light">
            Élégance
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-line text-white font-[var(--font-cormorant)] text-[clamp(4rem,10vw,9rem)] leading-none italic font-light">
            Intemporelle
          </h1>
        </div>
        <div className="overflow-hidden mt-6">
          <a
            href="#collection"
            className="hero-line inline-block text-white text-xs tracking-[0.3em] uppercase border-b border-white/40 pb-1 hover:border-white transition-colors duration-300"
          >
            Discover the Collection
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 right-10 flex flex-col items-center gap-2">
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">
          Scroll
        </span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 w-full h-1/2 bg-white animate-[slideDown_1.5s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}

// ─── Product Grid 3x3 ────────────────────────────────────────────────────────

function ProductGrid() {
  return (
    <section id="collection" className="bg-[#f5f3ef] py-24 px-6 md:px-16">
      <AnimatedContent distance={40} delay={0.1} className="mb-16 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-3">
          New Arrivals
        </p>
        <h2 className="font-[var(--font-cormorant)] text-5xl md:text-7xl text-stone-800 font-light">
          The Collection
        </h2>
      </AnimatedContent>

      <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
        {PRODUCTS.map((p, i) => (
          <AnimatedContent
            key={p.id}
            distance={50}
            delay={i * 0.07}
            duration={0.9}
            threshold={0.05}
          >
            <div className="group relative overflow-hidden cursor-pointer">
              <div className="relative aspect-[3/4.5] overflow-hidden bg-stone-200">
                <img
                  src={p.src}
                  alt={p.label}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <button className="w-full bg-white text-stone-800 text-xs tracking-[0.2em] uppercase py-3 hover:bg-stone-800 hover:text-white transition-colors duration-300">
                    Quick Add
                  </button>
                </div>
              </div>
              <div className="pt-3 pb-1 flex justify-between items-start">
                <p className="text-stone-700 text-sm tracking-wide">
                  {p.label}
                </p>
                <p className="text-stone-500 text-sm">{p.price}</p>
              </div>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </section>
  );
}

// ─── Subtitle / Quote ────────────────────────────────────────────────────────

function SubtitleSection() {
  return (
    <section className="bg-[#f5f3ef] py-20 px-6 md:px-20 max-w-8xl mx-auto">
      <ScrollReveal
        containerClassName="font-[var(--font-cormorant)] text-2xl md:text-3xl text-stone-700 font-light leading-relaxed text-center"
        enableBlur
        baseOpacity={0}
        blurStrength={6}
      >
        Crafted with intention, worn with grace. Each piece tells a story of
        quiet luxury — where simplicity meets the extraordinary.
      </ScrollReveal>
    </section>
  );
}

// ─── Full Width Video ────────────────────────────────────────────────────────

function FullWidthVideo() {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      <video
        className="w-full h-full object-cover"
        src={FULLWIDTH_VIDEO}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <AnimatedContent threshold={0.3} distance={30}>
          <div className="text-center">
            <p className="text-white/70 text-xs tracking-[0.5em] uppercase mb-4">
              Behind the Scenes
            </p>
            <h2 className="text-white font-[var(--font-cormorant)] text-5xl md:text-8xl font-light italic">
              The Atelier
            </h2>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}

// ─── Looks / Horizontal scroll ───────────────────────────────────────────────

function LooksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const totalWidth = track.scrollWidth - window.innerWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-stone-900 overflow-hidden">
      <div
        ref={trackRef}
        className="flex gap-6 px-10 py-20 h-screen items-center"
        style={{ width: "max-content" }}
      >
        <div className="flex-none w-[40vw] flex flex-col justify-center">
          <p className="text-stone-500 text-xs tracking-[0.4em] uppercase mb-4">
            Seasonal Looks
          </p>
          <h2 className="text-white font-[var(--font-cormorant)] text-[clamp(3rem,6vw,5rem)] font-light leading-tight">
            Curated
            <br />
            <em>Selections</em>
          </h2>
          <p className="text-stone-400 text-sm mt-6 max-w-xs leading-relaxed">
            Timeless silhouettes for the modern wardrobe. Each look is
            considered, every detail deliberate.
          </p>
        </div>

        {LOOKS.map((look) => (
          <div
            key={look.id}
            className="group flex-none w-[28vw] cursor-pointer"
          >
            <div className="relative aspect-[7/10] overflow-hidden rounded-sm">
              <img
                src={look.src}
                alt={look.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white/60 text-xs tracking-[0.3em] uppercase">
                  {look.desc}
                </p>
                <p className="text-white font-[var(--font-cormorant)] text-2xl mt-1">
                  {look.label}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="flex-none w-[20vw] flex items-center justify-center">
          <a
            href="#"
            className={cn(
              "text-white/60 text-xs tracking-[0.3em] uppercase",
              "border border-white/20 px-6 py-3",
              "hover:text-white hover:border-white transition-colors duration-300",
            )}
          >
            View All Looks
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Masonry Gallery ─────────────────────────────────────────────────────────

function MasonrySection() {
  return (
    <section className="bg-white py-24 px-4 md:px-10">
      <AnimatedContent distance={30} className="mb-16 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-3">
          The Edit
        </p>
        <h2 className="font-[var(--font-cormorant)] text-5xl md:text-7xl text-stone-800 font-light">
          Gallery
        </h2>
      </AnimatedContent>
      <div className="max-w-7xl mx-auto">
        <Masonry
          items={MASONRY_ITEMS}
          columns={[4, 3, 2, 2, 1]}
          animateFrom="bottom"
          scaleOnHover
          blurToFocus
          stagger={0.04}
        />
      </div>
    </section>
  );
}

// ─── Magazine / BounceCards ──────────────────────────────────────────────────

function MagazineSection() {
  return (
    <section className="bg-[#f5f3ef] py-28 px-6">
      <AnimatedContent distance={30} className="mb-16 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-stone-400 mb-3">
          As Seen In
        </p>
        <h2 className="font-[var(--font-cormorant)] text-5xl md:text-7xl text-stone-800 font-light">
          Press & Media
        </h2>
      </AnimatedContent>

      <div className="flex justify-center">
        <BounceCards
          images={MAGAZINE_COVERS}
          containerWidth={520}
          containerHeight={350}
          animationDelay={0.3}
          animationStagger={0.07}
          easeType="elastic.out(1, 0.7)"
          enableHover
          transformStyles={[
            "rotate(-14deg) translate(-160px, 20px)",
            "rotate(-7deg) translate(-80px, 10px)",
            "rotate(0deg)",
            "rotate(7deg) translate(80px, 10px)",
            "rotate(14deg) translate(160px, 20px)",
          ]}
        />
      </div>

      <div className="text-center mt-16">
        <ScrollReveal
          containerClassName="text-stone-400 text-sm tracking-[0.2em] uppercase"
          enableBlur={false}
          baseOpacity={0}
        >
          Vogue · Harper's Bazaar · Elle · Vanity Fair · W Magazine
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
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
            {["Instagram", "Pinterest", "TikTok"].map((s) => (
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

// ─── Page ────────────────────────────────────────────────────────────────────

export function Fashion() {
  return (
    <div className="bg-white">
      <style>{`
        @keyframes slideDown {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
      <Navbar />
      <HeroSection />
      <ProductGrid />
      <SubtitleSection />
      <FullWidthVideo />
      <LooksSection />
      <MasonrySection />
      <MagazineSection />
      <Footer />
    </div>
  );
}
