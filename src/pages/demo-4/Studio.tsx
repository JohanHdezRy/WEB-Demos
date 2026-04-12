import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

export function Studio() {
  const headphonesRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const bulletsRef = useRef<HTMLDivElement>(null)
  const priceRef = useRef<HTMLDivElement>(null)
  const [activeColor, setActiveColor] = useState<'tan' | 'dark'>('tan')

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Headphones image slides in
      gsap.from(headphonesRef.current, {
        rotation: -15,
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      })

      // 2. "Beats" title letters stagger from bottom
      const letters = titleRef.current?.querySelectorAll('.beats-letter')
      if (letters) {
        gsap.from(letters, {
          y: 60,
          opacity: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.3,
        })
      }

      // 3. Bullet points stagger from left
      const bullets = bulletsRef.current?.querySelectorAll('.bullet-item')
      if (bullets) {
        gsap.from(bullets, {
          x: -30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
          delay: 0.6,
          ease: 'power2.out',
        })
      }

      // 4. Price bounce in
      gsap.from(priceRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.7,
        delay: 0.9,
        ease: 'back.out(1.7)',
      })
    })

    return () => ctx.revert()
  }, [])

  const features = [
    'Up to 12 hours of battery life for all-day listening',
    'Block out the real world with dual-mode Adaptive Noise Cancelling',
    'No matter where you escape to, you can stay wireless with Bluetooth® technology',
  ]

  return (
    <div style={{
      fontFamily: 'var(--font-poppins)',
      background: '#FAFAF8',
      minHeight: '100vh',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* Decorative circles */}
      <div style={{
        position: 'absolute',
        bottom: -100,
        left: -100,
        width: 500,
        height: 500,
        borderRadius: '50%',
        background: '#D4C5A9',
        opacity: 0.35,
        pointerEvents: 'none',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute',
        top: -80,
        right: -80,
        width: 320,
        height: 320,
        borderRadius: '50%',
        background: '#E8E0D5',
        opacity: 0.4,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Navbar */}
      <nav style={{
        position: 'relative',
        zIndex: 100,
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '18px 48px',
        gap: 28,
        boxShadow: '0 1px 0 rgba(0,0,0,0.06)',
      }}>
        <Link to="/" style={{ color: '#888', fontSize: '0.72rem', letterSpacing: '1px', textDecoration: 'none', marginRight: 8 }}>← Demos</Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ color: '#999', fontSize: '1.1rem', cursor: 'pointer' }}>≡</span>
          {['HEADPHONES', 'EARPHONES', 'SPEAKERS', 'SUPPORT'].map((link, i) => (
            <a key={link} href="#" style={{
              color: i === 0 ? '#888' : '#1A1A1A',
              fontSize: '0.72rem',
              letterSpacing: '2px',
              textDecoration: 'none',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}>
              {link}
            </a>
          ))}
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', fontStyle: 'italic', color: '#C4A265', fontWeight: 700, letterSpacing: '1px' }}>
            Balmain Paris
          </span>
        </div>
      </nav>

      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1.5fr',
        minHeight: 'calc(100vh - 64px)',
        padding: '40px 48px',
        gap: 40,
        alignItems: 'center',
        maxWidth: 1400,
        margin: '0 auto',
      }}>
        {/* Left content */}
        <div>
          {/* Big title */}
          <div ref={titleRef} style={{ marginBottom: 4 }}>
            {'Beats'.split('').map((letter, i) => (
              <span
                key={i}
                className="beats-letter"
                style={{
                  display: 'inline-block',
                  fontSize: 'clamp(5rem, 8vw, 8rem)',
                  fontWeight: 900,
                  color: '#C4A265',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#C4A265', marginBottom: 6, lineHeight: 1.1 }}>
            Studio Wireless
          </h2>
          <p style={{ color: '#A89070', fontSize: '0.9rem', fontStyle: 'italic', marginBottom: 28 }}>in Khaki</p>

          {/* Features */}
          <div ref={bulletsRef} style={{ marginBottom: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {features.map((feat, i) => (
              <div key={i} className="bullet-item" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ color: '#C4A265', fontSize: '0.7rem', marginTop: 4 }}>•</span>
                <p style={{ color: '#555', fontSize: '0.82rem', lineHeight: 1.6 }}>{feat}</p>
              </div>
            ))}
          </div>

          {/* Thumbnails */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
            {[
              'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200',
              'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200',
              'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200',
            ].map((src, i) => (
              <div
                key={i}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 10,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: i === 1 ? '2px solid #C4A265' : '2px solid transparent',
                  transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = '#C4A265'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'scale(1)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = i === 1 ? '#C4A265' : 'transparent'
                }}
              >
                <img src={src} alt={`product ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>

          {/* Color swatches */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ color: '#888', fontSize: '0.72rem', marginRight: 4 }}>Color:</span>
            {[
              { key: 'tan' as const, bg: '#C4A265' },
              { key: 'dark' as const, bg: '#3D3520' },
            ].map(({ key, bg }) => (
              <div
                key={key}
                onClick={() => setActiveColor(key)}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: bg,
                  cursor: 'pointer',
                  border: activeColor === key ? '2px solid #1A1A1A' : '2px solid transparent',
                  outline: activeColor === key ? '2px solid #C4A265' : 'none',
                  outlineOffset: 2,
                  transition: 'outline 0.2s',
                }}
              />
            ))}
          </div>
        </div>

        {/* Right: headphones + price */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div ref={headphonesRef} style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700"
              alt="Beats headphones"
              style={{
                width: '100%',
                maxWidth: 600,
                height: 460,
                objectFit: 'contain',
                filter: activeColor === 'dark'
                  ? 'drop-shadow(0 20px 60px rgba(0,0,0,0.3)) hue-rotate(180deg) brightness(0.6)'
                  : 'drop-shadow(0 20px 60px rgba(196,162,101,0.3))',
                transition: 'filter 0.5s ease',
              }}
            />
          </div>

          {/* Price */}
          <div ref={priceRef} style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#1A1A1A' }}>£499.99</span>
            <button style={{
              background: '#1A1A1A',
              color: '#fff',
              border: 'none',
              padding: '9px 18px',
              borderRadius: 50,
              fontSize: '0.78rem',
              cursor: 'pointer',
              fontWeight: 600,
              letterSpacing: '1px',
            }}>
              BUY
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
