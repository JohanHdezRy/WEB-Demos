import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useInView } from '../hooks/useInView'

// vite base path
const BASE = import.meta.env.BASE_URL

const demos = [
  {
    path: '/demo-1',
    name: 'La Cocina',
    category: 'Restaurant & Food',
    desc: 'Landing page for a Mexican restaurant with menu, gallery, and reservation form.',
    colors: ['#8B0000', '#D4A017', '#FFF8F0'],
    accent: '#D4A017',
    demo: '01',
    screenshot: `${BASE}screenshots/demo-1.png`,
  },
  {
    path: '/demo-2',
    name: 'UrbanWear',
    category: 'E-Commerce Store',
    desc: 'Modern clothing store with product grid, categories, cart CTA, and promo banners.',
    colors: ['#1A1A1A', '#FF4500', '#F5F5F5'],
    accent: '#FF4500',
    demo: '02',
    screenshot: `${BASE}screenshots/demo-2.png`,
  },
  {
    path: '/demo-3',
    name: 'PixelCraft',
    category: 'Creative Agency',
    desc: 'Portfolio site for a design/dev agency with services, work showcase, and contact.',
    colors: ['#0D0D0D', '#6C63FF', '#FFFFFF'],
    accent: '#6C63FF',
    demo: '03',
    screenshot: `${BASE}screenshots/demo-3.png`,
  },
  {
    path: '/demo-4',
    name: 'PRISM Studio',
    category: 'Digital Agency · Premium',
    desc: 'High-end digital studio with WebGL background, animated marquee, and spotlight cards.',
    colors: ['#070809', '#B4FF6C', '#F0F0F0'],
    accent: '#B4FF6C',
    demo: '04',
    screenshot: `${BASE}screenshots/demo-4.png`,
  },
  {
    path: '/demo-5',
    name: 'HomeQuest',
    category: 'Real Estate',
    desc: 'Property listing site with search, featured homes, and agent contact form.',
    colors: ['#2C3E50', '#27AE60', '#FFFFFF'],
    accent: '#27AE60',
    demo: '05',
    screenshot: `${BASE}screenshots/demo-5.png`,
  },
  {
    path: '/demo-6',
    name: 'SELVA VERDE',
    category: 'Parque de Aventura',
    desc: 'Adventure park con Particles WebGL, BlurText hero, TiltedCard de atracciones, BounceCards galería y sistema de ingressos.',
    colors: ['#081C15', '#FF6B35', '#FFD60A'],
    accent: '#FF6B35',
    demo: '06',
    screenshot: `${BASE}screenshots/demo-6.png`,
  },
]

function Card({ demo, index }: { demo: typeof demos[0]; index: number }) {
  const [ref, vis] = useInView(0.08)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity .6s ease ${index * 0.08}s, transform .6s ease ${index * 0.08}s`,
      }}
    >
      <Link
        to={demo.path}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'block',
          background: '#161616',
          borderRadius: 14,
          overflow: 'hidden',
          textDecoration: 'none',
          border: `1px solid ${hovered ? demo.accent + '40' : 'rgba(255,255,255,0.06)'}`,
          transition: 'border-color .3s, transform .4s cubic-bezier(0.16,1,0.3,1), box-shadow .4s',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hovered ? `0 24px 60px rgba(0,0,0,.5), 0 0 0 1px ${demo.accent}20` : '0 2px 12px rgba(0,0,0,.2)',
        }}
      >
        {/* Screenshot preview */}
        <div style={{ position: 'relative', height: 200, overflow: 'hidden', background: '#0a0a0a' }}>
          <img
            src={demo.screenshot}
            alt={`${demo.name} preview`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'top',
              display: 'block',
              transition: 'transform .6s cubic-bezier(0.16,1,0.3,1)',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />

          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(22,22,22,0.95) 100%)',
            transition: 'opacity .3s',
          }} />

          {/* DEMO badge */}
          <div style={{
            position: 'absolute', top: 12, right: 12,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#fff',
            fontSize: '0.58rem',
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            padding: '4px 10px',
            borderRadius: 4,
            fontFamily: 'var(--font-dm-sans)',
            fontWeight: 500,
          }}>
            DEMO {demo.demo}
          </div>

          {/* Color palette */}
          <div style={{
            position: 'absolute', bottom: 12, left: 14,
            display: 'flex', gap: 6, alignItems: 'center',
          }}>
            {demo.colors.map((c, i) => (
              <div key={i} style={{
                width: 14, height: 14, borderRadius: '50%',
                background: c,
                border: '1.5px solid rgba(255,255,255,0.2)',
                boxShadow: '0 1px 4px rgba(0,0,0,.4)',
              }} />
            ))}
          </div>

          {/* Hover arrow */}
          <div style={{
            position: 'absolute', bottom: 12, right: 14,
            display: 'flex', alignItems: 'center', gap: 6,
            opacity: hovered ? 1 : 0,
            transform: hovered ? 'translateX(0)' : 'translateX(-8px)',
            transition: 'opacity .3s, transform .3s',
          }}>
            <span style={{ fontSize: '0.62rem', letterSpacing: '2px', color: demo.accent, textTransform: 'uppercase', fontFamily: 'var(--font-dm-sans)' }}>
              Ver Demo
            </span>
            <span style={{ color: demo.accent, fontSize: '0.9rem' }}>→</span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '18px 22px 22px' }}>
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.6rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: demo.accent,
            marginBottom: 6,
            opacity: 0.8,
          }}>
            {demo.category}
          </p>
          <h3 style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#f0f0f0',
            marginBottom: 8,
          }}>
            {demo.name}
          </h3>
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.78rem',
            color: '#555',
            lineHeight: 1.7,
          }}>
            {demo.desc}
          </p>
        </div>
      </Link>
    </div>
  )
}

export function Landing() {
  return (
    <div style={{ background: '#0e0e0e', minHeight: '100vh' }}>

      {/* Hero */}
      <header style={{
        padding: 'clamp(80px, 12vw, 120px) clamp(24px, 6vw, 60px) clamp(48px, 8vw, 72px)',
        textAlign: 'center',
        background: 'linear-gradient(to bottom, #080808, #0e0e0e)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle grid bg */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />
        {/* Glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500, height: 200,
          background: 'radial-gradient(ellipse, rgba(108,99,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative' }}>
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.65rem', letterSpacing: '6px', textTransform: 'uppercase',
            color: '#555', marginBottom: 16,
          }}>
            Portfolio de Demos
          </p>
          <h1 style={{
            fontFamily: 'var(--font-poppins)',
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 700,
            color: '#f0f0f0',
            lineHeight: 1.1,
            marginBottom: 16,
          }}>
            WEB Demo<br />
            <span style={{ color: '#6C63FF' }}>Collection</span>
          </h1>
          <div style={{ width: 48, height: 2, background: '#6C63FF', margin: '0 auto 16px' }} />
          <p style={{
            fontFamily: 'var(--font-dm-sans)',
            color: '#555', fontSize: '0.9rem',
            maxWidth: 480, margin: '0 auto 8px', lineHeight: 1.8,
          }}>
            {demos.length} demos de páginas web para los servicios más solicitados.
            Construidos con React 19 + TypeScript + Tailwind CSS.
          </p>
        </div>
      </header>

      {/* Grid */}
      <section style={{
        padding: '40px clamp(24px, 5vw, 60px) 96px',
        maxWidth: 1400, margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))',
          gap: 24,
        }}>
          {demos.map((d, i) => (
            <Card key={d.path} demo={d} index={i} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '24px 24px 32px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        fontFamily: 'var(--font-dm-sans)',
        fontSize: '0.72rem',
        color: '#333',
      }}>
        React 19 + TypeScript + Vite · Tailwind CSS v4 — {demos.length} Demos · JohanHdezRy
      </footer>

    </div>
  )
}
