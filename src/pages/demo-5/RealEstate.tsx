import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

export function RealEstate() {
  const cultureRef = useRef<HTMLDivElement>(null)
  const nfcTextRef = useRef<HTMLParagraphElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)
  const circleTextRef = useRef<HTMLDivElement>(null)
  const aiCardRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. "CULTURE" letters stagger from y:100
      const letters = cultureRef.current?.querySelectorAll('.culture-letter')
      if (letters) {
        gsap.from(letters, {
          y: 100,
          opacity: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
        })
      }

      // 2. "NON FUNGIBLE" fades in with delay
      gsap.from([nfcTextRef.current, descRef.current, ctaRef.current], {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.6,
        ease: 'power2.out',
      })

      // 3. Right panel clip-path reveal
      gsap.fromTo(rightPanelRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.2, delay: 0.2, ease: 'power3.inOut' }
      )

      // 4. Circular text rotates
      gsap.to(circleTextRef.current, {
        rotation: 360,
        repeat: -1,
        duration: 12,
        ease: 'none',
        transformOrigin: 'center center',
      })

      // 5. AI card slides up
      gsap.from(aiCardRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 1,
        ease: 'power3.out',
      })

      // 6. Tags stagger in with bounce
      const tags = tagsRef.current?.querySelectorAll('.nfc-tag')
      if (tags) {
        gsap.from(tags, {
          y: 10,
          opacity: 0,
          scale: 0.8,
          duration: 0.4,
          stagger: 0.07,
          delay: 1.2,
          ease: 'back.out(1.5)',
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const cultureletters = 'CULTURE'.split('')
  const tags = ['Pink', 'Woman', 'Coat', 'Rounded', 'Glasses', 'Techwear']

  return (
    <div style={{
      fontFamily: 'var(--font-poppins)',
      display: 'grid',
      gridTemplateColumns: '55% 45%',
      minHeight: '100vh',
      overflow: 'hidden',
    }}>

      {/* Left: Black panel */}
      <div style={{
        background: '#000000',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        overflow: 'hidden',
      }}>
        {/* Navbar */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          padding: '24px 40px',
          gap: 28,
          zIndex: 10,
          position: 'relative',
        }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', letterSpacing: '1px', textDecoration: 'none' }}>← Demos</Link>
          <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.2rem', letterSpacing: '2px' }}>NFC</span>
          <div style={{ display: 'flex', gap: 24, marginLeft: 16 }}>
            {['About', 'Collections', 'Delivery', 'Roadmap'].map(link => (
              <a key={link} href="#" style={{
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.78rem',
                textDecoration: 'none',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
              >
                {link}
              </a>
            ))}
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <button style={{
              background: '#fff',
              color: '#000',
              border: 'none',
              padding: '9px 20px',
              borderRadius: 50,
              fontSize: '0.78rem',
              cursor: 'pointer',
              fontWeight: 700,
            }}>
              Mint Now →
            </button>
          </div>
        </nav>

        {/* Content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '20px 40px 60px' }}>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '0.85rem',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            fontVariant: 'small-caps',
            marginBottom: 16,
          }}
            ref={nfcTextRef}
          >
            NON FUNGIBLE
          </p>

          {/* CULTURE big text */}
          <div ref={cultureRef} style={{ marginBottom: 28, lineHeight: 0.9 }}>
            {cultureletters.map((letter, i) => (
              <span
                key={i}
                className="culture-letter"
                style={{
                  display: 'inline-block',
                  fontSize: 'clamp(5rem, 8vw, 9rem)',
                  fontWeight: 900,
                  color: '#fff',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                }}
              >
                {letter}
              </span>
            ))}
          </div>

          <p ref={descRef} style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.82rem',
            lineHeight: 1.7,
            maxWidth: 380,
            marginBottom: 28,
          }}>
            Where luxury fashion meets the blockchain. Discover exclusive digital couture, own your style as a unique NFT.
          </p>

          <button
            ref={ctaRef}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.6)',
              color: '#fff',
              padding: '13px 32px',
              borderRadius: 50,
              fontSize: '0.85rem',
              cursor: 'pointer',
              fontWeight: 600,
              alignSelf: 'flex-start',
            }}
          >
            Discover Now →
          </button>
        </div>

        {/* Bottom-left: rotating text circle */}
        <div style={{
          position: 'absolute',
          bottom: 60,
          left: 40,
          width: 120,
          height: 120,
        }}>
          <div ref={circleTextRef} style={{ width: '100%', height: '100%' }}>
            <svg width="120" height="120" viewBox="0 0 120 120">
              <defs>
                <path id="circle-path" d="M 60,60 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"/>
              </defs>
              <text style={{ fontSize: '10px', fill: 'rgba(255,255,255,0.6)', letterSpacing: '2px' }}>
                <textPath href="#circle-path">The Realm Of Luxury Couture • </textPath>
              </text>
            </svg>
          </div>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 20,
            height: 20,
            borderRadius: '50%',
            background: '#C2185B',
          }} />
        </div>

        {/* AI Prompts floating card */}
        <div ref={aiCardRef} style={{
          position: 'absolute',
          bottom: 50,
          right: -20,
          background: 'rgba(20,20,20,0.9)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 16,
          padding: '14px 16px',
          width: 220,
          zIndex: 10,
        }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, overflow: 'hidden', background: '#C2185B' }}>
              <img
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=100"
                alt="thumbnail"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <p style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>Ai Prompts</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.62rem' }}>NFT Fashion</p>
            </div>
          </div>
          <div ref={tagsRef} style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {tags.map(tag => (
              <span
                key={tag}
                className="nfc-tag"
                style={{
                  background: '#1A1A1A',
                  color: '#fff',
                  fontSize: '0.6rem',
                  padding: '3px 8px',
                  borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Pink panel */}
      <div ref={rightPanelRef} style={{
        background: '#C2185B',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600"
          alt="Fashion model"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            display: 'block',
          }}
        />
        {/* Overlay tint */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(194,24,91,0.2), rgba(194,24,91,0.1))',
        }} />
      </div>
    </div>
  )
}
