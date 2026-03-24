import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavbarScroll } from '../../hooks/useNavbarScroll'
import { ScrollTop } from '../../components/ScrollTop'
import RevealSection from '../../components/animations/RevealSection'
import Stack from '../../Effects/Stack'
import CardSwap, { Card } from '../../Effects/CardSwap'
import FlowingMenu from '../../Effects/FlowingMenu'
import StaggeredMenu from '../../Effects/StaggeredMenu'
import GlareHover from '../../Effects/GlareHover'

/* ── Data ─────────────────────────────────────────────────── */
const heroImages = [
  'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
  'https://cdn.pixabay.com/photo/2025/04/13/21/14/woman-9532283_1280.jpg',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
]

const trendingCards = [
  { img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80', name: 'Urban Jacket', price: '$89' },
  { img: 'https://cdn.pixabay.com/photo/2025/08/26/16/58/guy-9798371_1280.png', name: 'Street Hoodie', price: '$65' },
  { img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', name: 'Canvas Sneakers', price: '$79' },
  { img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', name: 'Classic Tee', price: '$29' },
]

const flowingCategories = [
  { text: 'Jackets', link: '#', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80' },
  { text: 'Tops', link: '#', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80' },
  { text: 'Bottoms', link: '#', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&q=80' },
  { text: 'Footwear', link: '#', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  { text: 'Sale', link: '#', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80' },
]

const staggeredNavItems = [
  { label: 'Men', link: '#' },
  { label: 'Women', link: '#' },
  { label: 'Sale', link: '#' },
  { label: 'About', link: '#' },
  { label: 'Contact', link: '#' },
]

const staggeredSocials = [
  { label: 'Instagram', link: '#' },
  { label: 'TikTok', link: '#' },
  { label: 'Pinterest', link: '#' },
]

const products = [
  { name: 'Urban Jacket', price: '$89', badge: 'New', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80' },
  { name: 'Slim Chinos', price: '$55', badge: '', img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80' },
  { name: 'Classic Tee', price: '$29', badge: 'Sale', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80' },
  { name: 'Street Hoodie', price: '$65', badge: '', img: 'https://cdn.pixabay.com/photo/2025/08/26/16/58/guy-9798371_1280.png' },
  { name: 'Canvas Sneakers', price: '$79', badge: 'New', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
  { name: 'Cargo Shorts', price: '$45', badge: '', img: 'https://cdn.pixabay.com/photo/2024/04/10/08/06/ai-generated-8687492_1280.jpg' },
]

/* ── Component ────────────────────────────────────────────── */
export function ECommerce() {
  const scrolled = useNavbarScroll(60)
  const [cart, setCart] = useState(0)

  /* Stack cards */
  const stackCards = heroImages.map((src, i) => (
    <img key={i} src={src} alt={`look-${i}`} className="w-full h-full object-cover" />
  ))

  return (
    <div className="bg-white text-[#1A1A1A] font-[var(--font-dm)] overflow-x-hidden">

      {/* ══ NAV ══════════════════════════════════════════════ */}
      <nav className={`fixed top-0 left-0 w-full z-[1000] px-6 md:px-14 flex items-center gap-4 transition-all duration-300 ${scrolled ? 'bg-white/97 shadow-sm py-3' : 'bg-black py-5'}`}>
        <Link to="/" className={`text-[.72rem] tracking-[1px] mr-2 ${scrolled ? 'text-[#FF4500]' : 'text-white/70'}`}>← Demos</Link>
        <span className={`font-bold text-lg tracking-widest uppercase ${scrolled ? 'text-[#1A1A1A]' : 'text-white'}`}>UrbanWear</span>

      </nav>

      {/* ── Carrito (fixed, al lado del menu) ── */}
      <button
        onClick={() => setCart(c => c + 1)}
        className="relative bg-[#FF4500] text-white rounded-full flex items-center justify-center hover:bg-[#cc3700] transition-colors"
        style={{ position: 'fixed', top: '12px', right: '140px', zIndex: 10000, width: 46, height: 46, fontSize: '1.1rem' }}
      >
        🛒
        {cart > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-[#FF4500] text-[.55rem] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-[#FF4500]">{cart}</span>
        )}
      </button>

      {/* ── StaggeredMenu — único menú de navegación ── */}
      <StaggeredMenu
        top="12px"
        right="16px"
        colors={['#FF4500', '#cc3700', '#1A1A1A']}
        items={staggeredNavItems}
        socialItems={staggeredSocials}
        accentColor="#FF4500"
        menuButtonColor={scrolled ? '#1A1A1A' : '#fff'}
      />

      {/* ══ HERO — Stack effect (left text + right Stack) ══ */}
      <header className="relative min-h-screen flex items-center bg-black text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'url(https://cdn.pixabay.com/photo/2015/08/25/11/50/shop-906722_1280.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />

        {/* Text */}
        <div className="relative px-10 md:px-20 max-w-2xl z-10">
          <p className="text-[.68rem] tracking-[5px] uppercase text-[#FF4500] mb-4">New Collection 2026</p>
          <h1 className="text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[1.05] mb-6">
            Wear Your<br />Own Story
          </h1>
          <p className="text-white/65 leading-[1.8] mb-8 max-w-md text-[.95rem]">
            Premium streetwear for those who define their own style. Bold cuts, clean lines, everyday quality.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href="#products" className="bg-[#FF4500] text-white px-8 py-3 rounded-full text-[.82rem] tracking-[1px] uppercase font-semibold hover:bg-[#cc3700] transition-colors">
              Shop Now
            </a>
            <a href="#categories" className="border border-white/40 text-white px-8 py-3 rounded-full text-[.82rem] tracking-[1px] uppercase hover:bg-white hover:text-black transition-all">
              Browse Catalog
            </a>
          </div>
        </div>

        {/* ── Stack effect — product images ── */}
        <div className="absolute right-[5vw] top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center"
          style={{ width: 320, height: 420 }}>
          <Stack
            cards={stackCards}
            width={300}
            height={400}
            autoplay
            autoplayDelay={2800}
            pauseOnHover
            randomRotation
            sendToBackOnClick
          />
        </div>
      </header>

      {/* ── Promo strip ── */}
      <div className="bg-[#FF4500] text-white text-center py-3 text-[.78rem] tracking-[2px] uppercase font-semibold">
        Free shipping on orders over $75 · Use code: URBAN10 for 10% off
      </div>

      {/* ══ CATEGORIES — FlowingMenu ══════════════════════ */}
      <section id="categories" style={{ height: 400 }}>
        <FlowingMenu
          items={flowingCategories}
          bgColor="#1A1A1A"
          textColor="#ffffff"
          marqueeBgColor="#FF4500"
          marqueeTextColor="#ffffff"
          borderColor="#333"
          speed={12}
        />
      </section>

      {/* ══ TRENDING — CardSwap ═══════════════════════════ */}
      <section className="px-6 md:px-16 py-20 bg-[#F5F5F5]">
        <RevealSection variant="fadeUp">
          <div className="flex justify-between items-center mb-14">
            <div>
              <p className="text-[.65rem] tracking-[4px] uppercase text-[#FF4500] mb-1">Hot Right Now</p>
              <h2 className="text-[1.9rem] font-bold">Trending Picks</h2>
            </div>
            <p className="text-[.78rem] text-gray-400 hidden md:block">Click a card to swap →</p>
          </div>
        </RevealSection>

        <div className="flex flex-col lg:flex-row gap-24 items-center justify-center">
          {/* CardSwap — wrapper con tamaño fijo para contener el overflow de las cartas */}
          <div className="flex-shrink-0 relative" style={{ width: 420, height: 420, overflow: 'hidden' }}>
            <CardSwap
              width={300}
              height={380}
              cardDistance={55}
              verticalDistance={65}
              delay={3500}
              pauseOnHover
              easing="elastic"
            >
              {trendingCards.map((c, i) => (
                <Card key={i} customClass="overflow-hidden">
                  <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                </Card>
              ))}
            </CardSwap>
          </div>

          {/* Info panel beside cards */}
          <RevealSection variant="fadeRight" className="max-w-[340px]">
            <p className="text-[.65rem] tracking-[4px] uppercase text-[#FF4500] mb-3">Featured Styles</p>
            <h3 className="text-[2rem] font-bold mb-4 leading-tight">This Season's Must-Haves</h3>
            <p className="text-gray-500 leading-[1.8] mb-6 text-[.9rem]">
              Our curated selection of the hottest pieces this season. From statement jackets to everyday essentials — built for those who lead.
            </p>
            <div className="space-y-3 mb-8">
              {trendingCards.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[.88rem]">{c.name}</p>
                  </div>
                  <p className="font-bold text-[#FF4500]">{c.price}</p>
                </div>
              ))}
            </div>
            <a href="#products" className="inline-block bg-[#1A1A1A] text-white px-8 py-3 rounded-full text-[.82rem] font-semibold hover:bg-[#FF4500] transition-colors">
              Shop All →
            </a>
          </RevealSection>
        </div>
      </section>

      {/* ══ PRODUCTS ═══════════════════════════════════════ */}
      <section className="px-6 md:px-16 py-10 pb-20 max-w-[1300px] mx-auto" id="products">
        <RevealSection variant="fadeUp">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-[1.8rem] font-bold">Featured Products</h2>
            <a href="#" className="text-[.8rem] text-[#FF4500] font-semibold hover:underline">View All →</a>
          </div>
        </RevealSection>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {products.map((p, i) => (
            <RevealSection key={i} variant="fadeUp" delay={i * 0.07}>
              <GlareHover
                glareColor="#FF4500"
                glareOpacity={0.08}
                glareSize={280}
                transitionDuration={600}
                className="rounded-xl bg-white shadow-sm border border-gray-100 group"
                style={{ width: '100%', height: '100%', borderRadius: 12 }}
              >
                <div className="relative aspect-square overflow-hidden rounded-t-xl">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-[#FF4500] text-white text-[.6rem] px-2 py-0.5 rounded-full font-semibold">{p.badge}</span>
                  )}
                  <button
                    onClick={() => setCart(c => c + 1)}
                    className="absolute bottom-3 right-3 bg-black text-white text-[.7rem] px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FF4500]"
                  >
                    + Add
                  </button>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-[.9rem]">{p.name}</p>
                  <p className="text-[#FF4500] font-bold mt-1">{p.price}</p>
                </div>
              </GlareHover>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── Sale CTA ── */}
      <RevealSection variant="fade">
        <section className="mx-6 md:mx-16 mb-20 rounded-3xl overflow-hidden relative min-h-[280px] flex items-center bg-[#1A1A1A]">
          <div
            className="absolute inset-0 opacity-30"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative px-10 md:px-16 text-white">
            <p className="text-[.7rem] tracking-[4px] uppercase text-[#FF4500] mb-3">Limited Time</p>
            <h2 className="text-[2rem] md:text-[2.8rem] font-bold mb-4">Sale Up to 40% Off</h2>
            <a href="#" className="inline-block bg-[#FF4500] text-white px-8 py-3 rounded-full text-[.82rem] tracking-[1px] uppercase font-semibold hover:bg-[#cc3700] transition-colors">
              Shop the Sale
            </a>
          </div>
        </section>
      </RevealSection>

      {/* ── Footer ── */}
      <footer className="bg-[#1A1A1A] text-white/50 px-6 md:px-16 py-10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-bold text-white text-xl tracking-widest uppercase">UrbanWear</p>
          <div className="flex gap-6 text-[.78rem]">
            {['Shop', 'About', 'FAQ', 'Returns', 'Contact'].map(l => (
              <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
            ))}
          </div>
          <p className="text-[.7rem]">Demo · React + TypeScript</p>
        </div>
      </footer>

      <ScrollTop bg="#FF4500" color="#fff" hoverBg="#1A1A1A" />
    </div>
  )
}
