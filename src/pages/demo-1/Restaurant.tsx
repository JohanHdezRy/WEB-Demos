import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ScrollTop } from '../../components/ScrollTop'
import RevealSection from '../../components/animations/RevealSection'
import Masonry, { type MasonryItem } from '../../Effects/Masonry'
import ScrollVelocity from '../../Effects/ScrollVelocity'

/* ── Colores ─────────────────────────────── */
const TERRA   = '#B5451B'
const DARK    = '#1a1208'
const CARD_BG = '#1e1408'

/* ── Datos ───────────────────────────────── */
const products = [
  { name: 'Tacos al Pastor',  price: '$12', img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80' },
  { name: 'Pan de Cazón',     price: '$14', img: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e7?w=400&q=80' },
  { name: 'Enchiladas Rojas', price: '$13', img: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=400&q=80' },
  { name: 'Guacamole Fresco', price: '$9',  img: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&q=80' },
  { name: 'Chiles en Nogada', price: '$18', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80' },
  { name: 'Tres Leches Cake', price: '$8',  img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80' },
]

type Category = 'All' | 'Tacos' | 'Antojitos' | 'Sopas' | 'Postres' | 'Bebidas'
const categories: Category[] = ['All', 'Tacos', 'Antojitos', 'Sopas', 'Postres', 'Bebidas']

// height = valor que Masonry divide entre 2 para el render (p.ej. 400 → 200px, 500 → 250px)
const allGallery: (MasonryItem & { cat: Category })[] = [
  { id: 'g1',  img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80', url: '#', height: 480, cat: 'Tacos'     },
  { id: 'g2',  img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80', url: '#', height: 560, cat: 'Postres'   },
  { id: 'g3',  img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80', url: '#', height: 400, cat: 'Antojitos' },
  { id: 'g4',  img: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=600&q=80', url: '#', height: 520, cat: 'Antojitos' },
  { id: 'g5',  img: 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=600&q=80', url: '#', height: 440, cat: 'Tacos'     },
  { id: 'g6',  img: 'https://images.unsplash.com/photo-1604467794349-0b74285de7e7?w=600&q=80', url: '#', height: 500, cat: 'Sopas'     },
  { id: 'g7',  img: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&q=80', url: '#', height: 460, cat: 'Bebidas'    },
  { id: 'g8',  img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', url: '#', height: 540, cat: 'Postres'   },
  { id: 'g9',  img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80', url: '#', height: 420, cat: 'Sopas'     },
  { id: 'g10', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', url: '#', height: 500, cat: 'Bebidas'    },
  { id: 'g11', img: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80', url: '#', height: 460, cat: 'Antojitos' },
  { id: 'g12', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&q=80', url: '#', height: 480, cat: 'Sopas'     },
]

/* ── Componente ──────────────────────────── */
export function Restaurant() {
  const [scrolled, setScrolled]   = useState(false)
  const [cart, setCart]           = useState(0)
  const [activeTab, setActiveTab] = useState<Category>('All')

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    window.scrollTo(0, 0)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const masonryItems = useMemo<MasonryItem[]>(() =>
    activeTab === 'All'
      ? allGallery
      : allGallery.filter(g => g.cat === activeTab),
    [activeTab]
  )

  return (
    <div className="overflow-x-hidden" style={{ fontFamily: 'var(--font-poppins)', background: '#f9f5f0', color: '#1a1208' }}>

      {/* ══ NAV ═══════════════════════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 w-full z-[1000] flex items-center px-6 md:px-14 gap-5 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(26,18,8,0.97)' : 'transparent',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,.3)' : 'none',
          padding: scrolled ? '12px 56px' : '20px 56px',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ color: TERRA, fontSize: '.72rem', letterSpacing: '1px', marginRight: 4 }}>← Demos</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '1.4rem' }}>🌮</span>
          <span style={{ fontFamily: 'var(--font-pacifico)', color: '#fff', fontSize: '1.25rem', letterSpacing: 1 }}>
            La Cocina
          </span>
        </div>
        <div className="ml-auto hidden md:flex gap-7 items-center">
          {['Home', 'Menu', 'Gallery', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ color: 'rgba(255,255,255,.8)', fontSize: '.75rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 500, transition: 'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = TERRA)}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.8)')}
            >{l}</a>
          ))}
          <a href="#contact"
            style={{ background: TERRA, color: '#fff', fontSize: '.75rem', letterSpacing: '1px', textTransform: 'uppercase', padding: '9px 22px', borderRadius: 4, fontWeight: 600 }}>
            Reserve
          </a>
        </div>
      </nav>

      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <header id="home" style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', background: DARK, overflow: 'hidden' }}>
        {/* Imagen de fondo */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.45,
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(26,18,8,.92) 45%, rgba(26,18,8,.3))' }} />

        {/* Texto */}
        <div style={{ position: 'relative', padding: '0 5vw', maxWidth: 640 }}>
          <p style={{ color: TERRA, fontSize: '.75rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 14, fontWeight: 600 }}>
            Authentic Mexican Cuisine
          </p>
          <h1 style={{ fontFamily: 'var(--font-dancing)', color: '#fff', fontSize: 'clamp(3.2rem, 7vw, 6rem)', lineHeight: 1.1, marginBottom: 24 }}>
            Sweet Flavors,<br />Perfect Bites
          </h1>
          <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '.95rem', lineHeight: 1.85, marginBottom: 36, maxWidth: 440 }}>
            Three generations of tradition, passion, and bold Mexican flavors — crafted fresh every day from the heart of Oaxaca.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#menu" style={{ background: TERRA, color: '#fff', padding: '12px 28px', borderRadius: 4, fontSize: '.82rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700, display: 'inline-block' }}>
              Shop Now
            </a>
            <a href="#gallery" style={{ background: 'transparent', color: '#fff', padding: '12px 28px', borderRadius: 4, fontSize: '.82rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600, border: '1px solid rgba(255,255,255,.4)', display: 'inline-block' }}>
              Learn More
            </a>
          </div>
        </div>
      </header>

      {/* ══ MARQUEE ═══════════════════════════════════════════ */}
      <div style={{ background: DARK, borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 0', overflow: 'hidden' }}>
        <ScrollVelocity
          velocity={50}
          texts={[
            <>{'Tacos al Pastor · Guacamole Fresco · Chiles en Nogada · Enchiladas Rojas · Mole Poblano · Pozole · Tres Leches ·'}</>,
            <>{'Pan de Cazón · Tamales Oaxaqueños · Sopa de Lima · Horchata · Agua de Jamaica · Churros con Chocolate ·'}</>,
          ]}
          scrollerStyle={{ fontFamily: 'var(--font-dancing)', fontSize: '1.1rem', color: `${TERRA}cc`, letterSpacing: '1px' }}
        />
      </div>

      {/* ══ TOP PRODUCTS ═══════════════════════════════════════ */}
      <section id="menu" style={{ background: '#f9f5f0', padding: '80px 5vw' }}>
        <RevealSection variant="fadeUp">
          <h2 style={{ fontFamily: 'var(--font-dancing)', textAlign: 'center', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: 50, color: '#1a1208' }}>
            Top Products
          </h2>
        </RevealSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20, maxWidth: 1200, margin: '0 auto' }}>
          {products.map((p, i) => (
            <RevealSection key={i} variant="fadeUp" delay={i * 0.07}>
              <div
                style={{ background: CARD_BG, borderRadius: 12, overflow: 'hidden', cursor: 'pointer', transition: 'transform .25s, box-shadow .25s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 40px rgba(0,0,0,.4)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
              >
                {/* Imagen */}
                <div style={{ height: 180, overflow: 'hidden' }}>
                  <img src={p.img} alt={p.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                </div>
                {/* Info */}
                <div style={{ padding: '12px 14px 14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ color: '#fff', fontSize: '.88rem', fontWeight: 600 }}>{p.price}</span>
                    <button style={{ width: 26, height: 26, borderRadius: '50%', border: '1px solid rgba(255,255,255,.25)', background: 'transparent', color: 'rgba(255,255,255,.5)', fontSize: '.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>ℹ</button>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,.75)', fontSize: '.82rem', marginBottom: 10 }}>{p.name}</p>
                  <button
                    onClick={() => setCart(c => c + 1)}
                    style={{ background: TERRA, color: '#fff', border: 'none', padding: '7px 18px', borderRadius: 4, fontSize: '.75rem', fontWeight: 700, letterSpacing: '1px', cursor: 'pointer', textTransform: 'uppercase', transition: 'background .2s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#8b3214')}
                    onMouseLeave={e => (e.currentTarget.style.background = TERRA)}
                  >
                    Add {cart > 0 && <span style={{ background: 'rgba(255,255,255,.2)', padding: '1px 6px', borderRadius: 10, fontSize: '.65rem' }}>{cart}</span>}
                  </button>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ══ PROMO BANNER ═══════════════════════════════════════ */}
      <RevealSection variant="fade">
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 280 }}>
          {/* Texto */}
          <div style={{ background: '#f0e8dc', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '50px 6vw' }}>
            <h2 style={{ fontFamily: 'var(--font-dancing)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: TERRA, lineHeight: 1.15, marginBottom: 14 }}>
              20% Off Your<br />First Order
            </h2>
            <p style={{ color: '#666', fontSize: '.88rem', lineHeight: 1.8, marginBottom: 24, maxWidth: 340 }}>
              Try our most beloved dishes at a special price. Use code <strong style={{ color: TERRA }}>COCINA20</strong> at checkout. Valid for first-time orders only.
            </p>
            <a href="#contact"
              style={{ background: TERRA, color: '#fff', padding: '10px 24px', borderRadius: 4, fontSize: '.78rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700, display: 'inline-block', alignSelf: 'flex-start' }}>
              Learn More
            </a>
          </div>
          {/* Imagen */}
          <div style={{ overflow: 'hidden' }}>
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
              alt="Promo"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </section>
      </RevealSection>

      {/* ══ EXPLORE MORE (tabs + gallery) ═════════════════════ */}
      <section id="gallery" style={{ background: '#fff', padding: '80px 5vw' }}>
        <RevealSection variant="fadeUp">
          <h2 style={{ fontFamily: 'var(--font-dancing)', textAlign: 'center', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: 28, color: '#1a1208' }}>
            Explore More
          </h2>
          {/* Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 36 }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                style={{
                  padding: '6px 18px', borderRadius: 20, fontSize: '.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all .2s',
                  background: activeTab === cat ? TERRA : 'transparent',
                  color: activeTab === cat ? '#fff' : '#888',
                  border: activeTab === cat ? `1px solid ${TERRA}` : '1px solid #ddd',
                }}
              >{cat}</button>
            ))}
          </div>
        </RevealSection>

        {/* Masonry gallery */}
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
          <Masonry
            key={activeTab}
            items={masonryItems}
            animateFrom="bottom"
            stagger={0.06}
            blurToFocus
            scaleOnHover
            hoverScale={0.97}
            columns={[4, 3, 3, 2, 1]}
          />
        </div>
      </section>

      {/* ══ CONTACT / RESERVATION ═════════════════════════════ */}
      <section id="contact" style={{ background: DARK, padding: '80px 5vw', color: '#fff' }}>
        <RevealSection variant="fadeUp">
          <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
            <p style={{ color: TERRA, fontSize: '.7rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: 10, fontWeight: 600 }}>
              Book a Table
            </p>
            <h2 style={{ fontFamily: 'var(--font-dancing)', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: 40 }}>
              Make a Reservation
            </h2>
            <form
              onSubmit={e => e.preventDefault()}
              style={{ display: 'grid', gap: 14 }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <input type="text" placeholder="Your Name"
                  style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 6, padding: '13px 16px', color: '#fff', fontSize: '.9rem', outline: 'none' }} />
                <input type="email" placeholder="Email Address"
                  style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 6, padding: '13px 16px', color: '#fff', fontSize: '.9rem', outline: 'none' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                <input type="date"
                  style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 6, padding: '13px 16px', color: '#aaa', fontSize: '.9rem', outline: 'none' }} />
                <select style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 6, padding: '13px 16px', color: '#aaa', fontSize: '.9rem', outline: 'none' }}>
                  {['6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'].map(t => <option key={t} style={{ background: '#1a1208' }}>{t}</option>)}
                </select>
                <select style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 6, padding: '13px 16px', color: '#aaa', fontSize: '.9rem', outline: 'none' }}>
                  {['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5+'].map(g => <option key={g} style={{ background: '#1a1208' }}>{g}</option>)}
                </select>
              </div>
              <button type="submit"
                style={{ background: TERRA, color: '#fff', border: 'none', padding: '14px', borderRadius: 6, fontSize: '.85rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', marginTop: 4 }}
                onMouseEnter={e => (e.currentTarget.style.background = '#8b3214')}
                onMouseLeave={e => (e.currentTarget.style.background = TERRA)}
              >
                Confirm Reservation
              </button>
            </form>
          </div>
        </RevealSection>
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════ */}
      <footer style={{ background: '#0e0a04', color: 'rgba(255,255,255,.35)', padding: '24px 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-pacifico)', color: TERRA, fontSize: '1.1rem' }}>La Cocina</span>
        <p style={{ fontSize: '.78rem' }}>123 Main St, Cancún, México · +52 998 123 4567</p>
        <p style={{ fontSize: '.7rem' }}>Demo · React + TypeScript</p>
      </footer>

      <ScrollTop bg={TERRA} color="#fff" hoverBg="#8b3214" />
    </div>
  )
}
