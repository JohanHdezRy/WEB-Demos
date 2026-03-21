import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ScrollTop } from '../../components/ScrollTop'
import Threads from '../../Effects/Threads'
import SpotlightCard from '../../Effects/SpotlightCard'
import GlareHover from '../../Effects/GlareHover'
import CountUp from '../../Effects/CountUp'
import ShinyText from '../../Effects/ShinyText'
import ScrollVelocity from '../../Effects/ScrollVelocity'

// ─── Data ──────────────────────────────────────────────────────────────────────

const services = [
  {
    number: '01',
    title: 'Web Development',
    desc: 'High-performance, story-driven websites built to convert. We engineer experiences that feel native to the web and native to your brand.',
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    icon: '⬡',
  },
  {
    number: '02',
    title: 'Brand Identity',
    desc: 'Strategic identity systems engineered for premium positioning. From visual language to tone—we define how the world sees you.',
    tags: ['Strategy', 'Visual Identity', 'Typography', 'Guidelines'],
    icon: '◈',
  },
  {
    number: '03',
    title: 'AI & Software',
    desc: 'Custom intelligent solutions that replace manual processes. We build the software that gives your team an unfair advantage.',
    tags: ['LLM Integration', 'Automation', 'APIs', 'SaaS'],
    icon: '◎',
  },
  {
    number: '04',
    title: '3D & Motion',
    desc: 'Cinematic assets and immersive animations that elevate brand perception. We create visuals that stop the scroll and hold attention.',
    tags: ['Three.js', 'Blender', 'WebGL', 'GSAP'],
    icon: '⬢',
  },
]

const projects = [
  {
    name: 'AETHER',
    category: 'Fintech · Web App',
    desc: 'A zero-latency trading dashboard for institutional investors. Real-time data visualization at scale.',
    img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    year: '2025',
    accent: '#4DFFDA',
  },
  {
    name: 'SENTINEL',
    category: 'Cybersecurity · Platform',
    desc: 'Enterprise security intelligence platform processing billions of events. Clean UI for complex operations.',
    img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    year: '2024',
    accent: '#B4FF6C',
  },
  {
    name: 'CORTEX',
    category: 'AI · SaaS',
    desc: 'AI-powered analytics layer that turns raw data into strategic insight. Built for decision makers.',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    year: '2024',
    accent: '#FFB347',
  },
  {
    name: 'FLUX',
    category: 'E-Commerce · Rebrand',
    desc: 'Complete digital identity overhaul for a luxury fashion brand. Conversion up 340% post-launch.',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    year: '2025',
    accent: '#FF6B9D',
  },
]

const stats = [
  { value: 120, suffix: '+', label: 'Projects Delivered' },
  { value: 98,  suffix: '%', label: 'Client Retention' },
  { value: 340, suffix: '%', label: 'Avg. Conversion Lift' },
  { value: 12,  suffix: '',  label: 'Awwwards Honors' },
]

const techStack = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Figma',
  'Blender', 'Three.js', 'Vercel', 'AWS', 'Framer',
  'GSAP', 'Python', 'OpenAI', 'Tailwind CSS',
]

// ─── Grid Background ────────────────────────────────────────────────────────
function GridBg({ className = '' }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />
  )
}

// ─── Nav ────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        transition: 'all .4s ease',
        background: scrolled ? 'rgba(7,8,9,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        padding: scrolled ? '14px 40px' : '22px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span style={{
          fontFamily: 'var(--font-poppins)',
          fontWeight: 700,
          fontSize: '1.1rem',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: '#f0f0f0',
        }}>
          PRISM<span style={{ color: '#B4FF6C' }}>.</span>
        </span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex" style={{ gap: '36px', alignItems: 'center' }}>
        {['Work', 'Services', 'About', 'Contact'].map(item => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.8rem',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
              textDecoration: 'none',
              transition: 'color .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#f0f0f0')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
          >
            {item}
          </a>
        ))}
        <a
          href="#contact"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.75rem',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: '#070809',
            background: '#B4FF6C',
            padding: '10px 22px',
            borderRadius: '4px',
            textDecoration: 'none',
            fontWeight: 600,
            transition: 'opacity .2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Start Project
        </a>
      </div>

      {/* Mobile menu btn */}
      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{ width: 22, height: 1.5, background: '#f0f0f0', display: 'block', transition: 'all .3s' }} />
          ))}
        </div>
      </button>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(7,8,9,0.97)',
          zIndex: 200, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 32,
        }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position: 'absolute', top: 24, right: 24,
            background: 'none', border: 'none', color: '#f0f0f0',
            fontSize: '1.5rem', cursor: 'pointer',
          }}>✕</button>
          {['Work', 'Services', 'About', 'Contact'].map(item => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-poppins)',
                fontSize: '2rem',
                fontWeight: 600,
                color: '#f0f0f0',
                textDecoration: 'none',
                letterSpacing: '2px',
              }}
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t) }, [])

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#070809',
      overflow: 'hidden',
    }}>
      {/* Grid */}
      <GridBg />

      {/* Threads WebGL */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.55 }}>
        <Threads
          color={[0.706, 1.0, 0.424]} // #B4FF6C
          amplitude={1.2}
          distance={0.3}
          enableMouseInteraction
        />
      </div>

      {/* Radial vignette */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, #070809 80%)',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        textAlign: 'center',
        padding: '0 24px',
        maxWidth: 900,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          border: '1px solid rgba(180,255,108,0.3)',
          borderRadius: 100, padding: '6px 16px',
          marginBottom: 32,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#B4FF6C', display: 'inline-block' }} />
          <ShinyText
            text="Available for new projects · 2025"
            color="rgba(180,255,108,0.6)"
            shineColor="#B4FF6C"
            speed={3}
            style={{ fontSize: '0.7rem', letterSpacing: '1.5px', textTransform: 'uppercase' } as React.CSSProperties}
          />
        </div>

        <h1 style={{
          fontFamily: 'var(--font-poppins)',
          fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
          fontWeight: 700,
          lineHeight: 1.05,
          color: '#F0F0F0',
          marginBottom: 24,
          letterSpacing: '-1.5px',
        }}>
          We craft digital
          <br />
          <span style={{ color: '#B4FF6C' }}>identities</span> that
          <br />
          define your era.
        </h1>

        <p style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
          color: 'rgba(255,255,255,0.45)',
          maxWidth: 540,
          margin: '0 auto 40px',
          lineHeight: 1.8,
        }}>
          PRISM is a premium digital studio merging the precision of code
          with the power of design. Web, Branding, AI, Motion.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="#work"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.8rem',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: '#070809',
              background: '#B4FF6C',
              padding: '14px 32px',
              borderRadius: '4px',
              textDecoration: 'none',
              transition: 'opacity .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            View Work
          </a>
          <a
            href="#services"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.8rem',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              fontWeight: 600,
              color: '#f0f0f0',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '14px 32px',
              borderRadius: '4px',
              textDecoration: 'none',
              transition: 'border-color .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
          >
            Our Services
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 36, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: visible ? 0.4 : 0, transition: 'opacity 1.4s ease 0.8s',
      }}>
        <span style={{ fontSize: '0.6rem', letterSpacing: '3px', color: '#888', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(#888, transparent)' }} />
      </div>
    </section>
  )
}

// ─── Marquee ─────────────────────────────────────────────────────────────────
function MarqueeSection() {
  const separator = <span style={{ color: '#B4FF6C', margin: '0 18px' }}>✦</span>

  const row = techStack.map((t, i) => (
    <span key={i} style={{
      fontFamily: 'var(--font-poppins)',
      fontSize: '0.85rem',
      fontWeight: 600,
      letterSpacing: '3px',
      textTransform: 'uppercase',
      color: 'rgba(255,255,255,0.55)',
    }}>
      {t}{separator}
    </span>
  ))

  return (
    <div style={{
      background: '#070809',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '20px 0',
      overflow: 'hidden',
    }}>
      <ScrollVelocity
        texts={[<>{row}</>, <>{row}</>]}
        velocity={60}
        parallaxStyle={{ overflow: 'hidden' }}
        scrollerStyle={{ gap: 0 }}
      />
    </div>
  )
}

// ─── Services ────────────────────────────────────────────────────────────────
function Services() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="services" style={{
      background: '#070809',
      padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
      position: 'relative',
    }}>
      <GridBg className="opacity-50" />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div style={{ marginBottom: 64, display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.7rem', letterSpacing: '4px', color: '#B4FF6C', textTransform: 'uppercase', marginBottom: 12 }}>
              Our Services
            </p>
            <h2 style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.1, letterSpacing: '-1px' }}>
              What we do
              <br />
              <span style={{ color: 'rgba(255,255,255,0.25)' }}>exceptionally well.</span>
            </h2>
          </div>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.35)', maxWidth: 360, lineHeight: 1.8 }}>
            Four disciplines, one coherent vision. We build every layer of your digital presence with the same relentless attention to detail.
          </p>
        </div>

        {/* Service list */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          {services.map((svc, i) => (
            <SpotlightCard
              key={i}
              className=""
              spotlightColor="rgba(180,255,108,0.06)"
            >
              <div
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  cursor: 'pointer',
                  padding: '28px 0',
                  userSelect: 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '2px', width: 24 }}>
                      {svc.number}
                    </span>
                    <span style={{ fontSize: '1.4rem', color: '#B4FF6C', width: 28, textAlign: 'center' }}>{svc.icon}</span>
                    <h3 style={{
                      fontFamily: 'var(--font-poppins)',
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                      fontWeight: 600,
                      color: '#F0F0F0',
                      letterSpacing: '-0.5px',
                    }}>
                      {svc.title}
                    </h3>
                  </div>
                  <span style={{
                    width: 28, height: 28, borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '1rem', flexShrink: 0,
                    transition: 'transform .3s, border-color .3s',
                    transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>
                    +
                  </span>
                </div>

                {/* Expanded content */}
                <div style={{
                  overflow: 'hidden',
                  maxHeight: open === i ? 200 : 0,
                  transition: 'max-height .4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}>
                  <div style={{ paddingTop: 20, paddingLeft: 72 }}>
                    <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.95rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginBottom: 16 }}>
                      {svc.desc}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {svc.tags.map(tag => (
                        <span key={tag} style={{
                          fontFamily: 'var(--font-dm-sans)',
                          fontSize: '0.65rem',
                          letterSpacing: '1.5px',
                          textTransform: 'uppercase',
                          color: '#B4FF6C',
                          border: '1px solid rgba(180,255,108,0.25)',
                          padding: '4px 12px',
                          borderRadius: 3,
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Work / Portfolio ────────────────────────────────────────────────────────
function Work() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  return (
    <section id="work" style={{
      background: '#0a0b0c',
      padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
      position: 'relative',
    }}>
      <GridBg className="opacity-30" />
      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.7rem', letterSpacing: '4px', color: '#B4FF6C', textTransform: 'uppercase', marginBottom: 12 }}>
            Selected Work
          </p>
          <h2 style={{ fontFamily: 'var(--font-poppins)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#F0F0F0', lineHeight: 1.1, letterSpacing: '-1px' }}>
            Projects that moved
            <br />
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>the needle.</span>
          </h2>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 520px), 1fr))',
          gap: 2,
        }}>
          {projects.map((p, i) => (
            <GlareHover
              key={i}
              glareColor={p.accent}
              glareOpacity={0.12}
              glareSize={300}
              transitionDuration={700}
              className="group"
              style={{
                borderRadius: 0,
                border: 'none',
                overflow: 'hidden',
              }}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                {/* Image */}
                <div style={{ overflow: 'hidden', aspectRatio: '16/10' }}>
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform .7s cubic-bezier(0.16, 1, 0.3, 1)',
                      transform: hoveredIdx === i ? 'scale(1.05)' : 'scale(1)',
                      display: 'block',
                    }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(7,8,9,0.9) 0%, rgba(7,8,9,0.2) 60%, transparent 100%)',
                  }} />
                </div>

                {/* Info */}
                <div style={{ padding: '28px 32px 32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.65rem', letterSpacing: '3px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: 6 }}>
                        {p.category}
                      </p>
                      <h3 style={{ fontFamily: 'var(--font-poppins)', fontSize: '1.4rem', fontWeight: 700, color: '#F0F0F0', letterSpacing: '-0.5px' }}>
                        {p.name}
                      </h3>
                    </div>
                    <span style={{
                      fontFamily: 'monospace', fontSize: '0.7rem',
                      color: 'rgba(255,255,255,0.2)', letterSpacing: '2px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      padding: '4px 8px', borderRadius: 2,
                    }}>
                      {p.year}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.88rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
                    {p.desc}
                  </p>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    marginTop: 20,
                    opacity: hoveredIdx === i ? 1 : 0,
                    transform: hoveredIdx === i ? 'translateX(0)' : 'translateX(-8px)',
                    transition: 'all .3s ease',
                  }}>
                    <span style={{ width: 24, height: 1, background: p.accent }} />
                    <span style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: p.accent }}>
                      View Case Study
                    </span>
                  </div>
                </div>
              </div>
            </GlareHover>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Stats ───────────────────────────────────────────────────────────────────
function Stats() {
  return (
    <section style={{
      background: '#070809',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 40,
        textAlign: 'center',
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <p style={{
              fontFamily: 'var(--font-poppins)',
              fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
              fontWeight: 700,
              color: '#F0F0F0',
              lineHeight: 1,
              letterSpacing: '-1.5px',
            }}>
              <CountUp to={s.value} duration={2.5} delay={0.2} suffix={s.suffix} />
            </p>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.75rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Testimonial ─────────────────────────────────────────────────────────────
function Testimonial() {
  return (
    <section style={{
      background: '#070809',
      padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Large decorative quote */}
      <div style={{
        position: 'absolute', top: 20, left: 40,
        fontFamily: 'Georgia, serif', fontSize: '20rem',
        color: 'rgba(180,255,108,0.04)', lineHeight: 1, pointerEvents: 'none',
        userSelect: 'none',
      }}>
        "
      </div>
      <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-poppins)',
          fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
          fontWeight: 500,
          color: '#F0F0F0',
          lineHeight: 1.6,
          letterSpacing: '-0.3px',
          marginBottom: 40,
        }}>
          "Working with PRISM was a paradigm shift. They didn't just build
          our website — they engineered a complete digital system that
          generated <span style={{ color: '#B4FF6C' }}>$2.4M in pipeline</span> within the first quarter."
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'linear-gradient(135deg, #B4FF6C, #4DFFDA)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, color: '#070809', fontSize: '0.9rem',
            fontFamily: 'var(--font-poppins)',
          }}>
            SO
          </div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.85rem', fontWeight: 600, color: '#F0F0F0' }}>
              Shaun Olson
            </p>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '1px' }}>
              CEO · Cobe Construction Inc.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CTA() {
  const [hovered, setHovered] = useState(false)

  return (
    <section id="contact" style={{
      background: '#0a0b0c',
      padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <GridBg />
      {/* Accent glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 300,
        background: 'radial-gradient(ellipse, rgba(180,255,108,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <ShinyText
          text="READY TO BUILD?"
          color="rgba(180,255,108,0.5)"
          shineColor="#B4FF6C"
          speed={4}
          style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.7rem', letterSpacing: '6px', display: 'block', marginBottom: 24 } as React.CSSProperties}
        />
        <h2 style={{
          fontFamily: 'var(--font-poppins)',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 700,
          color: '#F0F0F0',
          lineHeight: 1.05,
          letterSpacing: '-2px',
          marginBottom: 24,
        }}>
          Let's create something
          <br />
          <span style={{ color: '#B4FF6C' }}>extraordinary.</span>
        </h2>
        <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '1rem', color: 'rgba(255,255,255,0.35)', maxWidth: 480, margin: '0 auto 48px', lineHeight: 1.8 }}>
          We take on a limited number of projects each quarter to ensure every client gets our full attention.
        </p>
        <a
          href="mailto:hello@prismstudio.com"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            fontFamily: 'var(--font-dm-sans)',
            fontSize: '0.85rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontWeight: 600,
            color: '#070809',
            background: '#B4FF6C',
            padding: '18px 44px',
            borderRadius: '4px',
            textDecoration: 'none',
            transition: 'all .3s ease',
            transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
            boxShadow: hovered ? '0 12px 40px rgba(180,255,108,0.3)' : '0 0 0 rgba(180,255,108,0)',
          }}
        >
          Start a Project
          <span style={{ fontSize: '1rem', transition: 'transform .3s', transform: hovered ? 'translateX(4px)' : 'translateX(0)' }}>→</span>
        </a>
        <p style={{ marginTop: 20, fontFamily: 'var(--font-dm-sans)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '1px' }}>
          Average response time: 2 business hours
        </p>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  const links = ['Work', 'Services', 'About', 'Process', 'Careers', 'Contact']
  const social = ['Twitter', 'LinkedIn', 'Instagram', 'Dribbble']

  return (
    <footer style={{
      background: '#070809',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 80px) 32px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 40, marginBottom: 60 }}>
          {/* Brand */}
          <div style={{ maxWidth: 300 }}>
            <div style={{
              fontFamily: 'var(--font-poppins)',
              fontWeight: 700, fontSize: '1.3rem',
              letterSpacing: '4px', color: '#F0F0F0',
              marginBottom: 16,
            }}>
              PRISM<span style={{ color: '#B4FF6C' }}>.</span>
            </div>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.8 }}>
              Premium digital studio. We engineer brand experiences that last a decade.
            </p>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.65rem', letterSpacing: '3px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: 20 }}>
              Navigation
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {links.map(l => (
                <a key={l} href="#" style={{
                  fontFamily: 'var(--font-dm-sans)', fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
                  transition: 'color .2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f0f0f0')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.65rem', letterSpacing: '3px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: 20 }}>
              Follow
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {social.map(s => (
                <a key={s} href="#" style={{
                  fontFamily: 'var(--font-dm-sans)', fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
                  transition: 'color .2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#B4FF6C')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.65rem', letterSpacing: '3px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', marginBottom: 20 }}>
              Contact
            </p>
            <a href="mailto:hello@prismstudio.com" style={{
              fontFamily: 'var(--font-dm-sans)', fontSize: '0.85rem',
              color: 'rgba(255,255,255,0.4)', textDecoration: 'none', display: 'block', marginBottom: 8,
            }}>
              hello@prismstudio.com
            </a>
            <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.25)' }}>
              Los Angeles, CA · Remote
            </p>
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 12,
          paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)' }}>
            © 2025 PRISM Studio. All rights reserved.
          </p>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.15)' }}>
            Built with React 19 + TypeScript + Tailwind CSS · JohanHdezRy
          </p>
          <Link to="/" style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', textDecoration: 'none' }}>
            ← Back to Demos
          </Link>
        </div>
      </div>
    </footer>
  )
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export function Studio() {
  return (
    <div style={{ background: '#070809', minHeight: '100vh', color: '#F0F0F0' }}>
      <Nav />
      <Hero />
      <MarqueeSection />
      <Services />
      <Work />
      <Stats />
      <Testimonial />
      <CTA />
      <Footer />
      <ScrollTop bg="#B4FF6C" color="#070809" hoverBg="#9adf50" />
    </div>
  )
}
