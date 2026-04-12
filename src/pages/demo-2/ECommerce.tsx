import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import Masonry, { type MasonryItem } from '../../Effects/Masonry'

gsap.registerPlugin(ScrollTrigger, SplitText)

// ── TOKENS ────────────────────────────────────────────────────────────────────
const C = {
  bg:     '#f7f4ef',
  dark:   '#1c1a16',
  gold:   '#b89a6a',
  muted:  'rgba(28,26,22,0.45)',
  muted2: 'rgba(28,26,22,0.22)',
  border: 'rgba(28,26,22,0.1)',
}

// ── MENU CARDS DATA ───────────────────────────────────────────────────────────
const MENU_CARDS = [
  {
    label:  'Desayunos',
    time:   '7:00 — 12:00',
    desc:   'Comenzamos el día con lo mejor de la cocina italiana.',
    images: [
      'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=1200&q=80',
      'https://images.unsplash.com/photo-1484723091739-30990ffd8a9e?w=1200&q=80',
      'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&q=80',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=80',
    ],
  },
  {
    label:  'Almuerzo',
    time:   '12:00 — 16:00',
    desc:   'Platos del mediodía con sabores auténticos de Italia.',
    images: [
      'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=1200&q=80',
      'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=1200&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80',
      'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=1200&q=80',
    ],
  },
  {
    label:  'Cena',
    time:   '19:00 — 23:30',
    desc:   'Una experiencia de fine dining que no olvidarás.',
    images: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=80',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
    ],
  },
  {
    label:  'Eventos',
    time:   'Bajo reserva',
    desc:   'Celebraciones privadas, bodas y cenas de empresa.',
    images: [
      'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200&q=80',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80',
      'https://images.unsplash.com/photo-1555244162-803834f70033?w=1200&q=80',
    ],
  },
]

// ── MASONRY ITEMS ─────────────────────────────────────────────────────────────
const GALLERY: MasonryItem[] = [
  { id: 'g1',  img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', url: '#', height: 800 },
  { id: 'g2',  img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',   url: '#', height: 560 },
  { id: 'g3',  img: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80', url: '#', height: 640 },
  { id: 'g4',  img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',   url: '#', height: 720 },
  { id: 'g5',  img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80', url: '#', height: 580 },
  { id: 'g6',  img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',   url: '#', height: 660 },
  { id: 'g7',  img: 'https://images.unsplash.com/photo-1484723091739-30990ffd8a9e?w=800&q=80', url: '#', height: 700 },
  { id: 'g8',  img: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80', url: '#', height: 600 },
  { id: 'g9',  img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80', url: '#', height: 740 },
  { id: 'g10', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', url: '#', height: 560 },
  { id: 'g11', img: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80', url: '#', height: 680 },
  { id: 'g12', img: 'https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=800&q=80', url: '#', height: 620 },
]

// ── MENU CARD — slide-right transition ────────────────────────────────────────
function MenuCard({ card, idx }: { card: typeof MENU_CARDS[0]; idx: number }) {
  const [current, setCurrent]       = useState(idx % card.images.length)
  const [incoming, setIncoming]     = useState<number | null>(null)
  const [isSliding, setIsSliding]   = useState(false)
  const animating                   = useRef(false)
  const currentRef                  = useRef(idx % card.images.length)
  const [hovered, setHovered]       = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      if (animating.current) return
      animating.current = true

      const next = (currentRef.current + 1) % card.images.length
      setIncoming(next)

      // tiny rAF delay so the incoming image renders at translateX(100%) before transition starts
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsSliding(true)
          setTimeout(() => {
            currentRef.current = next
            setCurrent(next)
            setIncoming(null)
            setIsSliding(false)
            animating.current = false
          }, 1100)
        })
      })
    }, 2000 + idx * 200)

    return () => clearInterval(timer)
  }, [card.images.length, idx])

  return (
    <div
      style={{ position: 'relative', overflow: 'hidden', height: 'clamp(380px,48vh,600px)', cursor: 'pointer', background: C.dark, borderRadius: 4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* slide keyframes */}
      <style>{`
        @keyframes rinSlideOut { from { transform: translateX(0) } to { transform: translateX(-100%) } }
        @keyframes rinSlideIn  { from { transform: translateX(100%) } to { transform: translateX(0) } }

      `}</style>

      {/* current image */}
      <img
        src={card.images[current]}
        alt={card.label}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', filter: 'brightness(0.68)',
          animation: isSliding ? 'rinSlideOut 1.1s cubic-bezier(0.76,0,0.24,1) forwards' : 'none',
        }}
      />

      {/* incoming image */}
      {incoming !== null && (
        <img
          src={card.images[incoming]}
          alt={card.label}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', filter: 'brightness(0.68)',
            animation: isSliding
              ? 'rinSlideIn 1.1s cubic-bezier(0.76,0,0.24,1) forwards'
              : 'none',
            transform: isSliding ? undefined : 'translateX(100%)',
          }}
        />
      )}

      {/* bottom info */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '48px 36px 36px',
        background: 'linear-gradient(to top, rgba(28,26,22,0.9) 0%, transparent 100%)',
        zIndex: 2,
      }}>
        <p style={{ margin: '0 0 6px', fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', color: C.gold, fontWeight: 500 }}>{card.time}</p>
        <h3 style={{ margin: '0 0 12px', fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 300, color: '#f7f4ef', letterSpacing: '-0.03em', lineHeight: 1.05 }}>{card.label}</h3>
        <p style={{
          margin: 0, fontSize: '0.85rem', color: 'rgba(247,244,239,0.65)', lineHeight: 1.6,
          maxHeight: hovered ? 60 : 0, overflow: 'hidden',
          transition: 'max-height 0.4s ease, opacity 0.4s ease',
          opacity: hovered ? 1 : 0,
        }}>{card.desc}</p>
      </div>

      {/* hover CTA */}
      <div style={{
        position: 'absolute', top: 24, right: 24, zIndex: 2,
        opacity: hovered ? 1 : 0,
        transform: hovered ? 'translateY(0)' : 'translateY(-8px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}>
        <span style={{
          display: 'inline-block',
          background: 'rgba(247,244,239,0.12)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(247,244,239,0.25)',
          color: '#f7f4ef', padding: '8px 18px', borderRadius: 9999,
          fontSize: '0.68rem', letterSpacing: '1.5px', textTransform: 'uppercase',
        }}>Ver menú</span>
      </div>

      {/* dots */}
      <div style={{ position: 'absolute', top: 20, left: 24, zIndex: 2, display: 'flex', gap: 5 }}>
        {card.images.map((_, i) => (
          <div key={i} style={{
            width: i === current ? 18 : 5, height: 5, borderRadius: 9999,
            background: i === current ? '#f7f4ef' : 'rgba(247,244,239,0.3)',
            transition: 'all 0.4s ease',
          }} />
        ))}
      </div>
    </div>
  )
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
export function ECommerce() {
  const navRef       = useRef<HTMLElement>(null)
  const heroVidRef   = useRef<HTMLVideoElement>(null)
  const heroTitleRef = useRef<HTMLHeadingElement>(null)
  const heroTagRef   = useRef<HTMLParagraphElement>(null)
  const heroCtaRef   = useRef<HTMLDivElement>(null)
  const intrRef      = useRef<HTMLElement>(null)
  const menuRef      = useRef<HTMLElement>(null)
  const storyRef     = useRef<HTMLElement>(null)
  const storyVidRef  = useRef<HTMLVideoElement>(null)
  const galleryRef   = useRef<HTMLElement>(null)

  // ── LENIS ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis()
    const tick  = gsap.ticker.add((t) => lenis.raf(t * 1000))
    gsap.ticker.lagSmoothing(0)
    lenis.on('scroll', ScrollTrigger.update)
    return () => { gsap.ticker.remove(tick); lenis.destroy() }
  }, [])

  // ── HERO ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.call(() => {
        if (heroVidRef.current)
          gsap.to(heroVidRef.current, { scale: 1.06, duration: 14, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      })
      if (heroTitleRef.current) {
        const split = SplitText.create(heroTitleRef.current, { type: 'chars' })
        tl.from(split.chars, { y: '110%', opacity: 0, stagger: 0.04, duration: 1.1, ease: 'power4.out' }, 0.3)
      }
      tl.from(heroTagRef.current, { opacity: 0, y: 16, duration: 0.8 }, '-=0.4')
      tl.from(heroCtaRef.current, { opacity: 0, y: 16, duration: 0.6 }, '-=0.5')
    })
    return () => ctx.revert()
  }, [])

  // ── SCROLL ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top -60',
        onEnter:     () => gsap.to(navRef.current, { background: 'rgba(247,244,239,0.9)', backdropFilter: 'blur(20px)', duration: 0.4 }),
        onLeaveBack: () => gsap.to(navRef.current, { background: 'transparent',           backdropFilter: 'blur(0px)',  duration: 0.3 }),
      })

      if (intrRef.current) {
        gsap.from(intrRef.current.querySelectorAll('.intr-line'), {
          opacity: 0, y: 28, stagger: 0.12, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: intrRef.current, start: 'top 80%' },
        })
      }
      if (menuRef.current) {
        gsap.from(menuRef.current.querySelectorAll('.menu-card'), {
          opacity: 0, y: 48, stagger: 0.1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: menuRef.current, start: 'top 78%' },
        })
      }
      if (storyRef.current) {
        gsap.from(storyRef.current.querySelectorAll('.story-el'), {
          opacity: 0, y: 32, stagger: 0.1, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: storyRef.current, start: 'top 78%' },
        })
        if (storyVidRef.current) {
          gsap.to(storyVidRef.current, {
            yPercent: -8, ease: 'none',
            scrollTrigger: { trigger: storyRef.current, scrub: true },
          })
        }
      }
      if (galleryRef.current) {
        gsap.from(galleryRef.current.querySelector('.gallery-header'), {
          opacity: 0, y: 24, duration: 0.8,
          scrollTrigger: { trigger: galleryRef.current, start: 'top 82%' },
        })
      }

      gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => {
        gsap.from(el, {
          opacity: 0, y: 32, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 82%' },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div style={{ background: C.bg, color: C.dark, overflowX: 'hidden', fontFamily: 'system-ui,-apple-system,sans-serif' }}>

      {/* ══ NAV ══════════════════════════════════════════════════════════════ */}
      <nav ref={navRef} style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '20px 48px',
        transition: 'background 0.4s, backdrop-filter 0.4s',
      }}>
        <Link to="/" style={{ color: C.muted, fontSize: '0.72rem', textDecoration: 'none', letterSpacing: '0.5px' }}>← Demos</Link>
        <span style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          fontSize: '1rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dark,
        }}>Rinacita</span>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {['Menú','Historia','Reservas'].map(l => (
            <a key={l} href="#" style={{ color: C.muted, fontSize: '0.78rem', textDecoration: 'none', letterSpacing: '0.5px', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = C.dark)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
            >{l}</a>
          ))}
          <button style={{
            background: C.dark, color: C.bg, border: 'none',
            padding: '9px 22px', borderRadius: 9999,
            fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', letterSpacing: '0.5px', transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.72')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >Reservar</button>
        </div>
      </nav>

      {/* ══ HERO ═════════════════════════════════════════════════════════════ */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'flex-end' }}>
        <video
          ref={heroVidRef}
          src="https://videos.pexels.com/video-files/6054010/6054010-uhd_2732_1440_25fps.mp4"
          autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transformOrigin: 'center center', filter: 'brightness(0.5)' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(28,26,22,0.88) 0%, rgba(28,26,22,0.05) 55%, transparent 100%)' }} />

        <div style={{ position: 'relative', zIndex: 2, padding: '0 64px 80px', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <p style={{ color: C.gold, fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', margin: '0 0 18px', fontWeight: 500 }}>Trattoria · Milano, 1987</p>
              <div style={{ overflow: 'hidden' }}>
                <h1 ref={heroTitleRef} style={{ margin: 0, fontSize: 'clamp(4rem,11vw,10rem)', fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 0.9, color: '#f7f4ef', fontStyle: 'italic' }}>Rinacita</h1>
              </div>
            </div>
            <div style={{ textAlign: 'right', maxWidth: 300 }}>
              <p ref={heroTagRef} style={{ color: 'rgba(247,244,239,0.6)', fontSize: '0.9rem', lineHeight: 1.75, margin: '0 0 24px' }}>
                Cucina italiana auténtica.<br />Cada plato, una historia.
              </p>
              <div ref={heroCtaRef} style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button style={{
                  background: '#f7f4ef', color: C.dark, border: 'none',
                  padding: '12px 28px', borderRadius: 9999, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >Reservar mesa</button>
                <button style={{
                  background: 'transparent', color: '#f7f4ef',
                  border: '1px solid rgba(247,244,239,0.35)',
                  padding: '12px 28px', borderRadius: 9999, fontSize: '0.82rem', cursor: 'pointer', transition: 'background 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(247,244,239,0.1)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >Ver carta</button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, transparent, rgba(247,244,239,0.35))' }} />
        </div>
      </div>

      {/* ══ INTRO ════════════════════════════════════════════════════════════ */}
      <section ref={intrRef} style={{ padding: '100px 64px', borderBottom: `1px solid ${C.border}`, maxWidth: 1060, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, alignItems: 'start' }}>
          <div>
            <p className="intr-line" style={{ color: C.muted, fontSize: '0.65rem', letterSpacing: '2.5px', textTransform: 'uppercase', margin: '0 0 10px', fontWeight: 500 }}>Nuestra filosofía</p>
            <p className="intr-line" style={{ color: C.gold, fontSize: '0.78rem', lineHeight: 1.6, margin: 0 }}>Desde 1987</p>
          </div>
          <div>
            {[
              'En Rinacita creemos que comer bien es un acto de amor.',
              'Cada ingrediente viene de productores locales con quienes compartimos valores.',
              'La cocina italiana no es una técnica. Es una conversación con la memoria.',
            ].map((line, i) => (
              <p key={i} className="intr-line" style={{
                margin: i === 2 ? 0 : '0 0 30px',
                fontSize: 'clamp(1rem,1.8vw,1.5rem)', fontWeight: 300, lineHeight: 1.5,
                letterSpacing: '-0.02em', color: C.dark,
                borderTop: i === 0 ? `1px solid ${C.border}` : 'none',
                paddingTop: i === 0 ? 30 : 0,
              }}>{line}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MENU CARDS — 2×2 grid ════════════════════════════════════════════ */}
      <section ref={menuRef} style={{ padding: '80px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', maxWidth: 1200, margin: '0 auto 44px' }}>
          <h2 className="reveal" style={{ margin: 0, fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 300, letterSpacing: '-0.03em', color: C.dark }}>Nuestra carta</h2>
          <a href="#" className="reveal" style={{ color: C.muted, fontSize: '0.78rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '0.5px', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = C.dark)}
            onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
          >
            Ver menú completo
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

        {/* 2×2 grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 1200, margin: '0 auto' }}>
          {MENU_CARDS.map((card, i) => (
            <div key={i} className="menu-card">
              <MenuCard card={card} idx={i} />
            </div>
          ))}
        </div>
      </section>

      {/* ══ STORY ════════════════════════════════════════════════════════════ */}
      <section ref={storyRef} style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        borderTop: `1px solid ${C.border}`, minHeight: 600, overflow: 'hidden',
      }}>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <video
            ref={storyVidRef}
            src="https://videos.pexels.com/video-files/4551832/4551832-hd_1920_1080_25fps.mp4"
            autoPlay muted loop playsInline
            style={{ width: '100%', height: '110%', objectFit: 'cover', display: 'block', filter: 'brightness(0.8)' }}
          />
        </div>
        <div style={{ padding: '80px 72px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderLeft: `1px solid ${C.border}` }}>
          <p className="story-el" style={{ color: C.muted, fontSize: '0.65rem', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 28, fontWeight: 500 }}>La historia</p>
          <h2 className="story-el" style={{ fontSize: 'clamp(1.8rem,3vw,2.8rem)', fontWeight: 300, letterSpacing: '-0.04em', lineHeight: 1.2, margin: '0 0 28px', color: C.dark }}>
            Una rinascita,<br /><span style={{ color: C.gold, fontStyle: 'italic' }}>un renacimiento.</span>
          </h2>
          <p className="story-el" style={{ color: C.muted, fontSize: '0.92rem', lineHeight: 1.85, maxWidth: 400, margin: '0 0 18px' }}>
            El restaurante nació en el barrio de Navigli en Milán. Antonella Russo, nuestra fundadora, quería crear un lugar donde la comida fuera memoria y conversación al mismo tiempo.
          </p>
          <p className="story-el" style={{ color: C.muted, fontSize: '0.92rem', lineHeight: 1.85, maxWidth: 400, margin: '0 0 40px' }}>
            Hoy, su nieta lleva la cocina con la misma filosofía: productos honestos, técnica italiana, y el calor de una mesa compartida.
          </p>
          <a href="#" className="story-el" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: C.dark, textDecoration: 'none', fontSize: '0.82rem', fontWeight: 500,
            width: 'fit-content', transition: 'opacity 0.2s',
            borderBottom: `1px solid ${C.muted2}`, paddingBottom: 2,
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Conocer más
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </section>

      {/* ══ STATS ════════════════════════════════════════════════════════════ */}
      <section style={{ borderTop: `1px solid ${C.border}`, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
        {[
          { n: '85+',  label: 'Platos en carta',  sub: 'Renovada cada temporada' },
          { n: '37',   label: 'Años de historia', sub: 'Tradición en cada bocado' },
          { n: '4.9',  label: 'Valoración media', sub: 'Más de 2.000 reseñas'    },
        ].map((item, i) => (
          <div key={i} className="reveal" style={{ padding: '56px 52px', borderRight: i < 2 ? `1px solid ${C.border}` : 'none' }}>
            <p style={{ margin: '0 0 8px', fontSize: 'clamp(2.4rem,4vw,3.4rem)', fontWeight: 300, letterSpacing: '-0.05em', color: C.dark }}>{item.n}</p>
            <p style={{ margin: '0 0 4px', fontSize: '0.88rem', fontWeight: 500, color: C.dark }}>{item.label}</p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: C.muted }}>{item.sub}</p>
          </div>
        ))}
      </section>

      {/* ══ MASONRY GALLERY ══════════════════════════════════════════════════ */}
      <section ref={galleryRef} style={{ borderTop: `1px solid ${C.border}`, padding: '80px 48px' }}>
        <div className="gallery-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', maxWidth: 1200, margin: '0 auto 48px' }}>
          <div>
            <p style={{ color: C.muted, fontSize: '0.65rem', letterSpacing: '2.5px', textTransform: 'uppercase', margin: '0 0 8px', fontWeight: 500 }}>Galería</p>
            <h2 style={{ margin: 0, fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 300, letterSpacing: '-0.03em', color: C.dark }}>Momentos en Rinacita</h2>
          </div>
          <a href="#" style={{ color: C.muted, fontSize: '0.78rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = C.dark)}
            onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
          >
            Ver todo
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Masonry
            items={GALLERY}
            columns={[5, 4, 3, 2, 1]}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.97}
            blurToFocus
            stagger={0.04}
          />
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════════════════════ */}
      <section style={{ borderTop: `1px solid ${C.border}`, padding: '120px 64px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <p style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          fontSize: 'clamp(6rem,18vw,16rem)', fontWeight: 700,
          color: 'rgba(28,26,22,0.04)', margin: 0, letterSpacing: '-0.05em',
          whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none', fontStyle: 'italic',
        }}>Rinacita</p>
        <p className="reveal" style={{ color: C.muted, fontSize: '0.65rem', letterSpacing: '2.5px', textTransform: 'uppercase', marginBottom: 24, fontWeight: 500 }}>Reservaciones</p>
        <h2 className="reveal" style={{ fontSize: 'clamp(2rem,5vw,4.5rem)', fontWeight: 300, letterSpacing: '-0.05em', lineHeight: 1.1, margin: '0 auto 20px', maxWidth: 700, color: C.dark }}>
          Una mesa para<br /><span style={{ fontStyle: 'italic', color: C.gold }}>una noche especial.</span>
        </h2>
        <p className="reveal" style={{ color: C.muted, fontSize: '1rem', lineHeight: 1.75, margin: '0 auto 48px', maxWidth: 420 }}>
          Reserva con antelación para garantizar tu lugar. Disponibles para grupos de 2 a 20 personas.
        </p>
        <div className="reveal" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button style={{
            background: C.dark, color: C.bg, border: 'none',
            padding: '16px 40px', borderRadius: 9999, fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.72')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >Reservar ahora</button>
          <button style={{
            background: 'transparent', color: C.dark, border: `1px solid ${C.border}`,
            padding: '16px 36px', borderRadius: 9999, fontSize: '0.9rem', cursor: 'pointer', transition: 'border-color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = C.muted)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}
          >Eventos privados</button>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════════════════════ */}
      <footer style={{
        borderTop: `1px solid ${C.border}`,
        display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
        gap: 48, padding: '64px 64px 48px',
      }}>
        <div>
          <p style={{ fontSize: '1rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 14px', color: C.dark }}>Rinacita</p>
          <p style={{ color: C.muted, fontSize: '0.82rem', lineHeight: 1.75, maxWidth: 220, margin: '0 0 24px' }}>
            Cucina italiana auténtica desde 1987.<br />Via Navigli 14, Milano.
          </p>
          <div style={{ display: 'flex', gap: 16 }}>
            {['ig','fb','tw','yt'].map(ic => (
              <a key={ic} href="#" style={{ color: C.muted2, fontSize: '0.7rem', fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.5px', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = C.muted)}
                onMouseLeave={e => (e.currentTarget.style.color = C.muted2)}
              >{ic}</a>
            ))}
          </div>
        </div>
        {[
          { title: 'Restaurante', links: ['Menú del día','Carta de vinos','Postres','Menú niños','Alérgenos'] },
          { title: 'Visítanos',   links: ['Reservar mesa','Eventos privados','Catering','Gift cards','Trabaja con nosotros'] },
          { title: 'Horarios',    links: ['Lun–Vie: 7–23:30','Sáb–Dom: 8–00:00','Cocina hasta las 23:00','Tel: +39 02 4829','hello@rinacita.it'] },
        ].map(col => (
          <div key={col.title}>
            <p style={{ color: C.muted2, fontSize: '0.62rem', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 20px', fontWeight: 500 }}>{col.title}</p>
            {col.links.map(l => (
              <a key={l} href="#" style={{ display: 'block', color: C.muted, fontSize: '0.82rem', textDecoration: 'none', marginBottom: 10, lineHeight: 1.4, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = C.dark)}
                onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
              >{l}</a>
            ))}
          </div>
        ))}
      </footer>

      <div style={{ borderTop: `1px solid ${C.border}`, padding: '16px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: C.muted2, fontSize: '0.7rem' }}>©2026 Rinacita Trattoria · Todos los derechos reservados</span>
        <div style={{ display: 'flex', gap: 20 }}>
          {['Privacidad','Cookies','Aviso legal'].map(l => (
            <a key={l} href="#" style={{ color: C.muted2, fontSize: '0.7rem', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = C.muted)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted2)}
            >{l}</a>
          ))}
        </div>
      </div>

    </div>
  )
}
