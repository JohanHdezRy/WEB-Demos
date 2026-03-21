import { useState, useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { ScrollTop } from '../../components/ScrollTop'
import RevealSection from '../../components/animations/RevealSection'
import Particles from '../../Effects/Particles'
import BlurText from '../../Effects/BlurText'
import GradientText from '../../Effects/GradientText'
import TiltedCard from '../../Effects/TiltedCard'
import BounceCards from '../../Effects/BounceCards'
import ScrollVelocity from '../../Effects/ScrollVelocity'
import SpotlightCard from '../../Effects/SpotlightCard'
import GlareHover from '../../Effects/GlareHover'
import CountUp from '../../Effects/CountUp'
import ShinyText from '../../Effects/ShinyText'

// ─── Color palette ────────────────────────────────────────────────────────────
const DARK   = '#081C15'
const GREEN  = '#1B4332'
const LIME   = '#74C69D'
const ORANGE = '#FF6B35'
const YELLOW = '#FFD60A'
const LIGHT  = '#D8F3DC'

// ─── Attractions data ─────────────────────────────────────────────────────────
const attractions = [
  {
    name: 'Radical Zip Line',
    badge: 'Adrenaline',
    img: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&q=80',
    desc: 'Fly at 80 km/h over treetops on our 800-meter zip line.',
  },
  {
    name: 'Aqua Park',
    badge: 'Aquatic',
    img: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=600&q=80',
    desc: 'Radical water slides, wave pools and lazy river in a fully covered area.',
  },
  {
    name: 'Tree Trekking',
    badge: 'Nature',
    img: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?w=600&q=80',
    desc: 'Suspended trails through ancient trees with varying difficulty levels.',
  },
  {
    name: 'Rappelling & Climbing',
    badge: 'Extreme',
    img: 'https://images.unsplash.com/photo-1606117331085-5760e3097277?w=600&q=80',
    desc: 'Walls up to 30 meters for climbing and rappelling with certified instructors.',
  },
  {
    name: 'Ecological Trails',
    badge: 'Eco',
    img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
    desc: 'Guided trails through 15 km of native forest with preserved wildlife and flora.',
  },
  {
    name: 'Premium Camping',
    badge: 'Overnight',
    img: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&q=80',
    desc: 'Glamping with full comfort in the heart of nature. Breakfast included.',
  },
]

// ─── Gallery images ───────────────────────────────────────────────────────────
const galleryImages = [
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80',
  'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400&q=80',
  'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?w=400&q=80',
  'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=400&q=80',
]

// ─── Ticket packages ──────────────────────────────────────────────────────────
const packages = [
  {
    name: 'Children',
    price: 59,
    tag: 'Up to 12 years',
    color: LIME,
    features: ['Basic attractions', 'Valid on weekends', 'Aqua Park included', 'Guided trail'],
    bestseller: false,
  },
  {
    name: 'Adult',
    price: 89,
    tag: 'Most Popular',
    color: ORANGE,
    features: ['All attractions', 'Full day', 'Zip line included', 'Tree trekking included', 'Rappelling included'],
    bestseller: true,
  },
  {
    name: 'Premium',
    price: 149,
    tag: 'VIP Experience',
    color: YELLOW,
    features: ['Everything in Adult', 'Restaurant included', 'Priority access', 'Parking', 'Optional camping'],
    bestseller: false,
  },
]

// ─── Nav link hover ────────────────────────────────────────────────────────────
function NavLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      style={{
        color: hovered ? LIME : 'rgba(255,255,255,0.85)',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontFamily: 'var(--font-poppins)',
        fontWeight: 500,
        transition: 'color 0.2s',
        letterSpacing: '0.03em',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </a>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function AdventurePark() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ background: DARK, minHeight: '100vh', fontFamily: 'var(--font-dm-sans)', overflowX: 'hidden' }}>

      {/* ── NAVIGATION ─────────────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? `${GREEN}ee` : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? `1px solid ${LIME}22` : 'none',
        transition: 'all 0.4s ease',
        padding: '0 2rem',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: 70,
        }}>
          {/* Logo */}
          <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: `linear-gradient(135deg, ${GREEN}, ${LIME})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem',
            }}>🌿</div>
            <span style={{
              fontFamily: 'var(--font-poppins)', fontWeight: 800,
              fontSize: '1.1rem', color: '#fff', letterSpacing: '-0.01em',
            }}>
              SELVA <span style={{ color: LIME }}>VERDE</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="hidden sm:flex">
            <NavLink label="Attractions" href="#attractions" />
            <NavLink label="Tickets" href="#tickets" />
            <NavLink label="Restaurant" href="#restaurant" />
            <NavLink label="How to Get There" href="#directions" />
          </div>

          {/* CTA */}
          <a
            href="#tickets"
            style={{
              background: ORANGE, color: '#fff',
              padding: '0.55rem 1.3rem',
              borderRadius: 8,
              fontFamily: 'var(--font-poppins)', fontWeight: 700,
              fontSize: '0.85rem', textDecoration: 'none',
              letterSpacing: '0.02em',
              transition: 'transform 0.15s, box-shadow 0.15s',
              boxShadow: `0 4px 16px ${ORANGE}55`,
            }}
            className="hidden sm:block"
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'
              ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 24px ${ORANGE}77`
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
              ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 4px 16px ${ORANGE}55`
            }}
          >
            Buy Tickets
          </a>

          {/* Mobile toggle */}
          <button
            className="sm:hidden"
            style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            background: `${GREEN}f5`, backdropFilter: 'blur(16px)',
            padding: '1rem 2rem 1.5rem',
            display: 'flex', flexDirection: 'column', gap: '1rem',
          }}>
            {[
              { label: 'Attractions', href: '#attractions' },
              { label: 'Tickets', href: '#tickets' },
              { label: 'Restaurant', href: '#restaurant' },
              { label: 'How to Get There', href: '#directions' },
            ].map(({ label, href }) => (
              <a key={label} href={href}
                style={{ color: '#fff', textDecoration: 'none', fontWeight: 500 }}
                onClick={() => setMobileOpen(false)}
              >{label}</a>
            ))}
            <a href="#tickets"
              style={{ background: ORANGE, color: '#fff', padding: '0.6rem 1.2rem', borderRadius: 8, textDecoration: 'none', fontWeight: 700, textAlign: 'center' }}
              onClick={() => setMobileOpen(false)}
            >Buy Tickets</a>
          </div>
        )}
      </nav>

      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          minHeight: 600,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Background image */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1448375240586-882707db888b?w=1600&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.45)',
        }} />

        {/* Green gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(180deg, ${DARK}88 0%, ${DARK}44 40%, ${DARK}cc 100%)`,
        }} />

        {/* Particles layer */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <Particles
            particleCount={180}
            particleSpread={12}
            speed={0.08}
            particleColors={[LIME, YELLOW, '#4ADE80', '#ffffff', ORANGE]}
            alphaParticles
            particleBaseSize={80}
            sizeRandomness={1.2}
            cameraDistance={22}
            moveParticlesOnHover
            particleHoverFactor={0.5}
          />
        </div>

        {/* Content */}
        <div style={{
          position: 'relative', zIndex: 2,
          textAlign: 'center',
          padding: '0 1.5rem',
          maxWidth: 800,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
        }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              background: `${GREEN}cc`,
              border: `1px solid ${LIME}55`,
              borderRadius: 100,
              padding: '0.4rem 1.2rem',
              backdropFilter: 'blur(8px)',
            }}
          >
            <ShinyText
              text="OPEN · EVERY DAY · 9AM TO 6PM"
              color={LIME}
              shineColor={YELLOW}
              speed={3}
              style={{ fontSize: '0.75rem', fontFamily: 'var(--font-poppins)', fontWeight: 600, letterSpacing: '0.12em' }}
            />
          </motion.div>

          {/* Main title */}
          <BlurText
            text="Brazil's Greatest Adventure"
            delay={120}
            animateBy="words"
            direction="bottom"
            className="justify-center"
            stepDuration={0.45}
            style={{
              fontSize: 'clamp(2.6rem, 7vw, 5.5rem)',
              fontFamily: 'var(--font-poppins)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              margin: 0,
            } as React.CSSProperties}
          />

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <GradientText
              colors={[LIME, YELLOW, ORANGE, LIME]}
              animationSpeed={5}
              className="text-lg sm:text-xl"
              style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)', fontFamily: 'var(--font-poppins)', fontWeight: 500 } as React.CSSProperties}
            >
              200 hectares of pure nature · 50+ thrilling attractions
            </GradientText>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.5rem' }}
          >
            <a
              href="#tickets"
              style={{
                background: ORANGE, color: '#fff',
                padding: '0.9rem 2.2rem',
                borderRadius: 10,
                fontFamily: 'var(--font-poppins)', fontWeight: 700,
                fontSize: '1rem', textDecoration: 'none',
                boxShadow: `0 6px 24px ${ORANGE}66`,
                transition: 'transform 0.15s, box-shadow 0.15s',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)'
                ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 12px 32px ${ORANGE}88`
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 6px 24px ${ORANGE}66`
              }}
            >
              Buy Tickets
            </a>
            <a
              href="#attractions"
              style={{
                background: 'transparent',
                border: `2px solid ${LIME}`,
                color: LIME,
                padding: '0.9rem 2.2rem',
                borderRadius: 10,
                fontFamily: 'var(--font-poppins)', fontWeight: 700,
                fontSize: '1rem', textDecoration: 'none',
                transition: 'background 0.2s, color 0.2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = LIME
                ;(e.currentTarget as HTMLAnchorElement).style.color = DARK
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
                ;(e.currentTarget as HTMLAnchorElement).style.color = LIME
              }}
            >
              Explore Attractions
            </a>
          </motion.div>

          {/* Floating ticket info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
            style={{
              marginTop: '0.5rem',
              background: `${GREEN}cc`,
              border: `1px solid ${LIME}44`,
              borderRadius: 14,
              padding: '0.8rem 2rem',
              backdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
            }}
          >
            <span style={{ fontSize: '1.4rem' }}>🎟️</span>
            <div style={{ textAlign: 'left' }}>
              <div style={{ color: LIME, fontSize: '0.72rem', fontFamily: 'var(--font-poppins)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Tickets available</div>
              <div style={{ color: '#fff', fontSize: '1.05rem', fontFamily: 'var(--font-poppins)', fontWeight: 800 }}>
                From <span style={{ color: ORANGE }}>R$ 89</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll arrow */}
        <motion.div
          style={{
            position: 'absolute', bottom: '2.5rem', left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
          }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => document.getElementById('velocity')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <span style={{ color: LIME, fontSize: '0.7rem', fontFamily: 'var(--font-poppins)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Scroll down</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12l7 7 7-7" stroke={LIME} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </section>

      {/* ── SCROLL VELOCITY MARQUEE ─────────────────────────────────────────── */}
      <section id="velocity" style={{ background: '#050e09', padding: '2rem 0', overflow: 'hidden' }}>
        <ScrollVelocity
          velocity={90}
          texts={[
            <span key="r1" style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: '1.5rem', color: ORANGE, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              ZIP LINE&nbsp;<span style={{ color: LIME }}>·</span>&nbsp;RAFTING&nbsp;<span style={{ color: LIME }}>·</span>&nbsp;CLIMBING&nbsp;<span style={{ color: LIME }}>·</span>&nbsp;RAPPELLING&nbsp;<span style={{ color: LIME }}>·</span>&nbsp;TREE TREKKING&nbsp;<span style={{ color: LIME }}>·</span>&nbsp;KAYAKING&nbsp;<span style={{ color: LIME }}>·</span>
            </span>,
            <span key="r2" style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: '1.5rem', color: LIME, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              HIKING&nbsp;<span style={{ color: ORANGE }}>·</span>&nbsp;AQUA PARK&nbsp;<span style={{ color: ORANGE }}>·</span>&nbsp;TUBING&nbsp;<span style={{ color: ORANGE }}>·</span>&nbsp;CANYONING&nbsp;<span style={{ color: ORANGE }}>·</span>&nbsp;CAMPING&nbsp;<span style={{ color: ORANGE }}>·</span>&nbsp;HIKING&nbsp;<span style={{ color: ORANGE }}>·</span>
            </span>,
          ]}
          parallaxStyle={{ padding: '0.6rem 0' }}
        />
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────────── */}
      <section style={{ background: GREEN, padding: '3.5rem 2rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
          }}>
            {[
              { to: 50, suffix: '+', label: 'Attractions', icon: '🎢' },
              { to: 200, suffix: 'ha', label: 'Nature', icon: '🌿' },
              { to: 500000, suffix: '+', separator: '.', label: 'Visitors', icon: '👥' },
              { to: 15, suffix: '+', label: 'Years', icon: '🏆' },
            ].map(({ to, suffix, label, separator, icon }) => (
              <RevealSection key={label} variant="scale" delay={0.1}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{icon}</div>
                  <div style={{
                    fontFamily: 'var(--font-poppins)', fontWeight: 900,
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    color: YELLOW,
                    lineHeight: 1,
                    marginBottom: '0.4rem',
                  }}>
                    <CountUp to={to} suffix={suffix} separator={separator ?? ''} duration={2.5} />
                  </div>
                  <div style={{ color: LIGHT, fontFamily: 'var(--font-dm-sans)', fontSize: '1rem', fontWeight: 500 }}>
                    {label}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── ATTRACTIONS ────────────────────────────────────────────────────── */}
      <section id="attractions" style={{ background: DARK, padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Header */}
          <RevealSection variant="fadeUp" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: `${GREEN}88`, border: `1px solid ${LIME}33`,
              borderRadius: 100, padding: '0.35rem 1rem', marginBottom: '1rem',
            }}>
              <span style={{ color: LIME, fontSize: '0.75rem', fontFamily: 'var(--font-poppins)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Our Attractions</span>
            </div>
            <GradientText
              colors={[LIME, YELLOW, ORANGE, '#4ADE80']}
              animationSpeed={7}
              className="block"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontFamily: 'var(--font-poppins)', fontWeight: 900, lineHeight: 1.1 } as React.CSSProperties}
            >
              Thrills Around Every Corner
            </GradientText>
            <p style={{ color: `${LIGHT}bb`, fontSize: '1.05rem', marginTop: '0.8rem', fontFamily: 'var(--font-dm-sans)', maxWidth: 560, margin: '0.8rem auto 0' }}>
              Over 50 attractions for all ages and thrill levels. Every visit brings a new discovery.
            </p>
          </RevealSection>

          {/* Cards grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {attractions.map((att, i) => (
              <RevealSection key={att.name} variant="fadeUp" delay={i * 0.1}>
                <div style={{ height: 340, borderRadius: 16, overflow: 'hidden' }}>
                  <TiltedCard
                    imageSrc={att.img}
                    altText={att.name}
                    captionText={att.name}
                    containerHeight="340px"
                    containerWidth="100%"
                    imageHeight="340px"
                    imageWidth="100%"
                    scaleOnHover={1.04}
                    rotateAmplitude={8}
                    displayOverlayContent
                    overlayContent={
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(8,28,21,0.92) 0%, rgba(8,28,21,0.3) 50%, transparent 100%)',
                        borderRadius: 15,
                        display: 'flex', flexDirection: 'column',
                        justifyContent: 'flex-end',
                        padding: '1.4rem',
                      }}>
                        <span style={{
                          background: `${LIME}33`, border: `1px solid ${LIME}66`,
                          color: LIME, fontSize: '0.7rem',
                          fontFamily: 'var(--font-poppins)', fontWeight: 700,
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          borderRadius: 100, padding: '0.25rem 0.7rem',
                          marginBottom: '0.5rem', display: 'inline-block', alignSelf: 'flex-start',
                        }}>
                          {att.badge}
                        </span>
                        <h3 style={{ color: '#fff', fontSize: '1.25rem', fontFamily: 'var(--font-poppins)', fontWeight: 800, margin: '0 0 0.3rem' }}>
                          {att.name}
                        </h3>
                        <p style={{ color: `${LIGHT}cc`, fontSize: '0.82rem', margin: '0 0 0.7rem', lineHeight: 1.4, fontFamily: 'var(--font-dm-sans)' }}>
                          {att.desc}
                        </p>
                        <span style={{ color: ORANGE, fontSize: '0.85rem', fontFamily: 'var(--font-poppins)', fontWeight: 700, cursor: 'pointer' }}>
                          Learn more →
                        </span>
                      </div>
                    }
                  />
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY / BOUNCE CARDS ─────────────────────────────────────────── */}
      <section style={{ background: GREEN, padding: '6rem 2rem', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}>
            {/* Left text */}
            <RevealSection variant="fadeLeft" style={{ maxWidth: 480 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: `${DARK}66`, border: `1px solid ${LIME}33`,
                borderRadius: 100, padding: '0.35rem 1rem', marginBottom: '1.25rem',
              }}>
                <span style={{ color: LIME, fontSize: '0.75rem', fontFamily: 'var(--font-poppins)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Unforgettable Moments</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-poppins)', fontWeight: 900,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#fff', lineHeight: 1.1, margin: '0 0 1rem',
              }}>
                Every visit is a new{' '}
                <span style={{ color: YELLOW }}>adventure</span>
              </h2>
              <p style={{ color: `${LIGHT}cc`, fontSize: '1.05rem', lineHeight: 1.7, margin: '0 0 2rem', fontFamily: 'var(--font-dm-sans)' }}>
                See the best moments lived by our visitors. Smiles, adrenaline and nature that stay in your memory forever.
              </p>
              <a
                href="#tickets"
                style={{
                  display: 'inline-block',
                  background: ORANGE, color: '#fff',
                  padding: '0.9rem 2rem',
                  borderRadius: 10,
                  fontFamily: 'var(--font-poppins)', fontWeight: 700,
                  fontSize: '0.95rem', textDecoration: 'none',
                  boxShadow: `0 6px 20px ${ORANGE}55`,
                  transition: 'transform 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-3px)'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'}
              >
                Get My Ticket
              </a>
            </RevealSection>

            {/* Right: BounceCards */}
            <RevealSection variant="fadeRight">
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <BounceCards
                  images={galleryImages}
                  containerWidth={480}
                  containerHeight={320}
                  animationDelay={0.4}
                  animationStagger={0.08}
                  easeType="elastic.out(1, 0.75)"
                  enableHover
                  transformStyles={[
                    'rotate(8deg) translate(-160px)',
                    'rotate(3deg) translate(-80px)',
                    'rotate(-2deg)',
                    'rotate(-9deg) translate(80px)',
                    'rotate(4deg) translate(160px)',
                  ]}
                />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── TICKETS / PACKAGES ─────────────────────────────────────────────── */}
      <section id="tickets" style={{ background: DARK, padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <RevealSection variant="fadeUp" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: `${GREEN}88`, border: `1px solid ${LIME}33`,
              borderRadius: 100, padding: '0.35rem 1rem', marginBottom: '1rem',
            }}>
              <span style={{ color: LIME, fontSize: '0.75rem', fontFamily: 'var(--font-poppins)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Tickets</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-poppins)', fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              color: '#fff', lineHeight: 1.1, margin: '0 0 0.8rem',
            }}>
              Choose Your Experience
            </h2>
            <p style={{ color: `${LIGHT}99`, fontSize: '1rem', fontFamily: 'var(--font-dm-sans)', maxWidth: 500, margin: '0 auto' }}>
              Options for the whole family. Buy online with a discount and skip the queue.
            </p>
          </RevealSection>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {packages.map((pkg, i) => (
              <RevealSection key={pkg.name} variant="fadeUp" delay={i * 0.12}>
                <GlareHover
                  glareColor={pkg.color}
                  glareOpacity={0.25}
                  glareSize={300}
                  style={{ borderRadius: 18, height: '100%' }}
                >
                  <SpotlightCard
                    spotlightColor={`${pkg.color}33`}
                    className="h-full"
                    style={{
                      background: `${GREEN}55`,
                      border: `1px solid ${pkg.color}44`,
                      borderRadius: 18,
                      padding: 0,
                      height: '100%',
                    } as React.CSSProperties}
                  >
                    <div style={{ padding: '2rem', position: 'relative' }}>
                      {/* Best seller badge */}
                      {pkg.bestseller && (
                        <div style={{
                          position: 'absolute', top: -1, left: '50%',
                          transform: 'translateX(-50%)',
                          background: ORANGE,
                          color: '#fff',
                          fontSize: '0.7rem',
                          fontFamily: 'var(--font-poppins)', fontWeight: 800,
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          padding: '0.3rem 1.2rem',
                          borderRadius: '0 0 10px 10px',
                          boxShadow: `0 4px 12px ${ORANGE}55`,
                        }}>
                          Best Seller
                        </div>
                      )}

                      {/* Header */}
                      <div style={{ textAlign: 'center', marginBottom: '1.5rem', paddingTop: pkg.bestseller ? '1rem' : 0 }}>
                        <div style={{
                          display: 'inline-block',
                          background: `${pkg.color}22`, border: `1px solid ${pkg.color}55`,
                          borderRadius: 8, padding: '0.3rem 0.8rem',
                          color: pkg.color, fontSize: '0.72rem',
                          fontFamily: 'var(--font-poppins)', fontWeight: 700,
                          letterSpacing: '0.08em', textTransform: 'uppercase',
                          marginBottom: '0.8rem',
                        }}>{pkg.tag}</div>
                        <h3 style={{ color: '#fff', fontSize: '1.5rem', fontFamily: 'var(--font-poppins)', fontWeight: 800, margin: '0 0 0.3rem' }}>{pkg.name}</h3>
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.2rem' }}>
                          <span style={{ color: `${LIGHT}88`, fontSize: '0.85rem', fontFamily: 'var(--font-poppins)' }}>R$</span>
                          <span style={{ color: pkg.color, fontSize: '3rem', fontFamily: 'var(--font-poppins)', fontWeight: 900, lineHeight: 1 }}>{pkg.price}</span>
                          <span style={{ color: `${LIGHT}88`, fontSize: '0.8rem', fontFamily: 'var(--font-poppins)' }}>/person</span>
                        </div>
                      </div>

                      {/* Dashed divider */}
                      <div style={{
                        borderTop: `2px dashed ${pkg.color}44`,
                        margin: '0 -2rem 1.5rem',
                        position: 'relative',
                      }}>
                        <div style={{
                          position: 'absolute', left: -1, top: '50%', transform: 'translateY(-50%)',
                          width: 16, height: 16, borderRadius: '50%',
                          background: DARK, border: `2px solid ${pkg.color}44`,
                        }} />
                        <div style={{
                          position: 'absolute', right: -1, top: '50%', transform: 'translateY(-50%)',
                          width: 16, height: 16, borderRadius: '50%',
                          background: DARK, border: `2px solid ${pkg.color}44`,
                        }} />
                      </div>

                      {/* Features */}
                      <ul style={{ listStyle: 'none', margin: '0 0 1.5rem', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {pkg.features.map(f => (
                          <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ color: pkg.color, fontSize: '0.85rem' }}>✓</span>
                            <span style={{ color: LIGHT, fontSize: '0.9rem', fontFamily: 'var(--font-dm-sans)' }}>{f}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <a
                        href="#"
                        style={{
                          display: 'block', textAlign: 'center',
                          background: pkg.bestseller ? ORANGE : `${pkg.color}22`,
                          border: `2px solid ${pkg.bestseller ? ORANGE : pkg.color}`,
                          color: pkg.bestseller ? '#fff' : pkg.color,
                          padding: '0.85rem',
                          borderRadius: 10,
                          fontFamily: 'var(--font-poppins)', fontWeight: 700,
                          fontSize: '0.95rem', textDecoration: 'none',
                          transition: 'all 0.2s',
                          boxShadow: pkg.bestseller ? `0 6px 20px ${ORANGE}44` : 'none',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLAnchorElement).style.background = pkg.bestseller ? '#e5602e' : pkg.color
                          ;(e.currentTarget as HTMLAnchorElement).style.color = pkg.bestseller ? '#fff' : DARK
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLAnchorElement).style.background = pkg.bestseller ? ORANGE : `${pkg.color}22`
                          ;(e.currentTarget as HTMLAnchorElement).style.color = pkg.bestseller ? '#fff' : pkg.color
                        }}
                      >
                        Buy Ticket
                      </a>
                    </div>
                  </SpotlightCard>
                </GlareHover>
              </RevealSection>
            ))}
          </div>

          <RevealSection variant="fade" delay={0.3} style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ color: `${LIGHT}66`, fontSize: '0.85rem', fontFamily: 'var(--font-dm-sans)' }}>
              🔒 Secure payment · Cancel up to 48h · Ticket valid for 30 days
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ── RESTAURANT ─────────────────────────────────────────────────────── */}
      <section id="restaurant" style={{ background: GREEN, padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}>
            {/* Text */}
            <RevealSection variant="fadeLeft">
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: `${DARK}66`, border: `1px solid ${LIME}33`,
                borderRadius: 100, padding: '0.35rem 1rem', marginBottom: '1.25rem',
              }}>
                <span style={{ color: LIME, fontSize: '0.75rem', fontFamily: 'var(--font-poppins)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Restaurant & Bar</span>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-poppins)', fontWeight: 900,
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                color: '#fff', lineHeight: 1.1, margin: '0 0 1.2rem',
              }}>
                Flavors of the forest<br />
                <span style={{ color: YELLOW }}>straight to you</span>
              </h2>
              <p style={{ color: `${LIGHT}cc`, fontSize: '1.05rem', lineHeight: 1.7, margin: '0 0 1.5rem', fontFamily: 'var(--font-dm-sans)' }}>
                Our restaurant offers high-quality regional cuisine in the heart of nature. Typical Brazilian dishes made with fresh, locally sourced ingredients.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
                {[
                  { icon: '🍽️', text: 'Regional and international menu' },
                  { icon: '🌿', text: 'Fresh, locally sourced ingredients' },
                  { icon: '🍹', text: 'Bar with tropical cocktails' },
                  { icon: '🎵', text: 'Live music on Saturday nights' },
                ].map(({ icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>{icon}</span>
                    <span style={{ color: LIGHT, fontFamily: 'var(--font-dm-sans)', fontSize: '0.95rem' }}>{text}</span>
                  </div>
                ))}
              </div>
              <a
                href="#"
                style={{
                  display: 'inline-block',
                  background: `${LIME}22`, border: `2px solid ${LIME}`,
                  color: LIME,
                  padding: '0.85rem 2rem',
                  borderRadius: 10,
                  fontFamily: 'var(--font-poppins)', fontWeight: 700,
                  fontSize: '0.95rem', textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = LIME
                  ;(e.currentTarget as HTMLAnchorElement).style.color = DARK
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = `${LIME}22`
                  ;(e.currentTarget as HTMLAnchorElement).style.color = LIME
                }}
              >
                View Menu
              </a>
            </RevealSection>

            {/* Image with TiltedCard */}
            <RevealSection variant="fadeRight">
              <div style={{ height: 460, borderRadius: 20, overflow: 'hidden' }}>
                <TiltedCard
                  imageSrc="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                  altText="Selva Verde Restaurant"
                  captionText="Selva Verde Restaurant"
                  containerHeight="460px"
                  containerWidth="100%"
                  imageHeight="460px"
                  imageWidth="100%"
                  scaleOnHover={1.04}
                  rotateAmplitude={7}
                  showTooltip
                />
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ── HOW TO GET THERE ───────────────────────────────────────────────── */}
      <section id="directions" style={{ background: DARK, padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          <RevealSection variant="fadeUp" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: `${GREEN}88`, border: `1px solid ${LIME}33`,
              borderRadius: 100, padding: '0.35rem 1rem', marginBottom: '1rem',
            }}>
              <span style={{ color: LIME, fontSize: '0.75rem', fontFamily: 'var(--font-poppins)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>How to Get There</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-poppins)', fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              color: '#fff', lineHeight: 1.1, margin: 0,
            }}>
              Come Visit Us
            </h2>
          </RevealSection>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
          }}>
            {/* Info cards */}
            {[
              {
                icon: '📍',
                title: 'Address',
                lines: ['Rod. BR-116, Km 242', 'Serra Verde - MG, 37540-000', '180 km from São Paulo'],
              },
              {
                icon: '🕘',
                title: 'Hours',
                lines: ['Monday to Sunday', '9:00am to 6:00pm', 'Open all year (365 days)'],
              },
              {
                icon: '📞',
                title: 'Contact',
                lines: ['(35) 9 9999-0001', 'contact@selvaverde.com', '@selvaverde on Instagram'],
              },
            ].map(card => (
              <RevealSection key={card.title} variant="fadeUp" delay={0.1}>
                <div style={{
                  background: `${GREEN}44`, border: `1px solid ${LIME}22`,
                  borderRadius: 16, padding: '1.75rem',
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{card.icon}</div>
                  <h3 style={{ color: LIME, fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1rem', margin: '0 0 0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{card.title}</h3>
                  {card.lines.map(l => (
                    <p key={l} style={{ color: LIGHT, fontFamily: 'var(--font-dm-sans)', fontSize: '0.95rem', margin: '0.2rem 0', lineHeight: 1.5 }}>{l}</p>
                  ))}
                </div>
              </RevealSection>
            ))}
          </div>

          {/* Map placeholder */}
          <RevealSection variant="fadeUp" delay={0.2} style={{ marginTop: '2rem' }}>
            <div style={{
              background: `${GREEN}55`, border: `1px solid ${LIME}22`,
              borderRadius: 20, height: 280,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: '1rem',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Decorative grid */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `linear-gradient(${LIME}11 1px, transparent 1px), linear-gradient(90deg, ${LIME}11 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }} />
              <div style={{
                position: 'relative', zIndex: 1,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', boxShadow: `0 0 0 8px ${ORANGE}33`,
                }}>📍</div>
                <p style={{ color: LIGHT, fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '1rem', margin: 0 }}>
                  SELVA VERDE Adventure Park
                </p>
                <p style={{ color: `${LIGHT}88`, fontFamily: 'var(--font-dm-sans)', fontSize: '0.85rem', margin: 0 }}>
                  Rod. BR-116, Km 242 · Serra Verde - MG
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    marginTop: '0.25rem',
                    background: LIME, color: DARK,
                    padding: '0.5rem 1.2rem', borderRadius: 8,
                    fontFamily: 'var(--font-poppins)', fontWeight: 700,
                    fontSize: '0.82rem', textDecoration: 'none',
                    transition: 'transform 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.04)'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)'}
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── CTA SECTION ────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', background: GREEN, padding: '7rem 2rem', overflow: 'hidden', textAlign: 'center' }}>
        {/* Particles background */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Particles
            particleCount={120}
            particleSpread={14}
            speed={0.06}
            particleColors={[LIME, YELLOW, ORANGE, '#ffffff']}
            alphaParticles
            particleBaseSize={60}
            sizeRandomness={1.5}
            cameraDistance={24}
            disableRotation={false}
          />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 700, margin: '0 auto' }}>
          <RevealSection variant="scale">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: `${DARK}88`, border: `1px solid ${LIME}44`,
              borderRadius: 100, padding: '0.35rem 1rem', marginBottom: '1.5rem',
            }}>
              <span style={{ color: LIME, fontSize: '0.75rem', fontFamily: 'var(--font-poppins)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Don't miss out</span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-poppins)', fontWeight: 900,
              fontSize: 'clamp(2.2rem, 6vw, 4rem)',
              color: '#fff', lineHeight: 1.08, margin: '0 0 1.25rem',
            }}>
              The adventure starts <span style={{ color: YELLOW }}>now</span>
            </h2>
            <p style={{ color: `${LIGHT}bb`, fontSize: '1.1rem', lineHeight: 1.7, margin: '0 0 2.5rem', fontFamily: 'var(--font-dm-sans)' }}>
              Buy your tickets online with a special discount. Limited spots on weekends — secure your unforgettable experience today!
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="#ingressos"
                style={{
                  background: ORANGE, color: '#fff',
                  padding: '1rem 2.5rem',
                  borderRadius: 12,
                  fontFamily: 'var(--font-poppins)', fontWeight: 800,
                  fontSize: '1.1rem', textDecoration: 'none',
                  boxShadow: `0 8px 28px ${ORANGE}66`,
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  display: 'inline-block',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-4px)'
                  ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 14px 36px ${ORANGE}88`
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'
                  ;(e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 28px ${ORANGE}66`
                }}
              >
                🎟️ Buy Tickets
              </a>
              <a
                href="tel:+553599990001"
                style={{
                  background: 'transparent', border: `2px solid #fff`,
                  color: '#fff',
                  padding: '1rem 2.5rem',
                  borderRadius: 12,
                  fontFamily: 'var(--font-poppins)', fontWeight: 700,
                  fontSize: '1.1rem', textDecoration: 'none',
                  transition: 'background 0.2s',
                  display: 'inline-block',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.15)'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'}
              >
                📞 Call Us
              </a>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
      <footer style={{ background: '#030d07', padding: '4rem 2rem 2rem', borderTop: `1px solid ${GREEN}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '3rem',
            marginBottom: '3rem',
          }}>
            {/* Brand */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: `linear-gradient(135deg, ${GREEN}, ${LIME})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem',
                }}>🌿</div>
                <span style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800, fontSize: '1.15rem', color: '#fff' }}>
                  SELVA <span style={{ color: LIME }}>VERDE</span>
                </span>
              </div>
              <p style={{ color: `${LIGHT}77`, fontSize: '0.9rem', lineHeight: 1.7, fontFamily: 'var(--font-dm-sans)', margin: '0 0 1.25rem' }}>
                Brazil's greatest adventure across 200 hectares of pure nature.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {['📸', '📘', '🐦', '▶️'].map((icon, i) => (
                  <a key={i} href="#" style={{
                    width: 36, height: 36,
                    background: `${GREEN}88`, border: `1px solid ${LIME}22`,
                    borderRadius: '50%', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '0.9rem', textDecoration: 'none',
                    transition: 'border-color 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = LIME}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.borderColor = `${LIME}22`}
                  >{icon}</a>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 style={{ color: LIME, fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 1rem' }}>
                Park
              </h4>
              {['Attractions', 'Tickets', 'Restaurant', 'How to Get There', 'Camping', 'Events'].map(l => (
                <a key={l} href="#" style={{
                  display: 'block', color: `${LIGHT}88`, fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.9rem', textDecoration: 'none', marginBottom: '0.5rem',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = LIME}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = `${LIGHT}88`}
                >{l}</a>
              ))}
            </div>

            {/* Info */}
            <div>
              <h4 style={{ color: LIME, fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 1rem' }}>
                Information
              </h4>
              {['Cancellation Policy', 'Safety', 'Accessibility', 'Groups & Companies', 'Press', 'Work With Us'].map(l => (
                <a key={l} href="#" style={{
                  display: 'block', color: `${LIGHT}88`, fontFamily: 'var(--font-dm-sans)',
                  fontSize: '0.9rem', textDecoration: 'none', marginBottom: '0.5rem',
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = LIME}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = `${LIGHT}88`}
                >{l}</a>
              ))}
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ color: LIME, fontFamily: 'var(--font-poppins)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 1rem' }}>
                Contact
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                  <span>📞</span>
                  <span style={{ color: `${LIGHT}88`, fontFamily: 'var(--font-dm-sans)', fontSize: '0.9rem' }}>(35) 9 9999-0001</span>
                </div>
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                  <span>✉️</span>
                  <span style={{ color: `${LIGHT}88`, fontFamily: 'var(--font-dm-sans)', fontSize: '0.9rem' }}>contact@selvaverde.com</span>
                </div>
                <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                  <span>🕘</span>
                  <span style={{ color: `${LIGHT}88`, fontFamily: 'var(--font-dm-sans)', fontSize: '0.9rem' }}>Mon–Sun · 9am to 6pm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: `1px solid ${LIME}22`,
            paddingTop: '1.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <p style={{ color: `${LIGHT}55`, fontFamily: 'var(--font-dm-sans)', fontSize: '0.82rem', margin: 0 }}>
              © 2026 Selva Verde Adventure Park. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Privacy', 'Terms', 'Cookies'].map(l => (
                <a key={l} href="#" style={{
                  color: `${LIGHT}55`, fontFamily: 'var(--font-dm-sans)', fontSize: '0.82rem',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = LIME}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = `${LIGHT}55`}
                >{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <ScrollTop bg={ORANGE} color={DARK} hoverBg={YELLOW} hoverColor={DARK} />
    </div>
  )
}
