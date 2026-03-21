import React, { useCallback, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './StaggeredMenu.css'

export interface StaggeredMenuItem {
  label: string
  link: string
}

export interface StaggeredMenuSocialItem {
  label: string
  link: string
}

export interface StaggeredMenuProps {
  /** Top/right position of the toggle button (CSS string e.g. "24px") */
  top?: string
  right?: string
  /** Array of background colors for the layered panels (first = outermost) */
  colors?: string[]
  /** Last color is the main panel background */
  items?: StaggeredMenuItem[]
  socialItems?: StaggeredMenuSocialItem[]
  displaySocials?: boolean
  displayItemNumbering?: boolean
  /** Color of the text links inside the menu */
  accentColor?: string
  menuButtonColor?: string
  onMenuOpen?: () => void
  onMenuClose?: () => void
}

const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  top = '24px',
  right = '24px',
  colors = ['#1a1a1a', '#2a2a2a', '#1A1A1A'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  accentColor = '#FF4500',
  menuButtonColor = '#fff',
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false)

  const overlayRef    = useRef<HTMLDivElement>(null)
  const layerRefs     = useRef<HTMLDivElement[]>([])
  const panelRef      = useRef<HTMLDivElement>(null)
  const linkRefs      = useRef<HTMLAnchorElement[]>([])
  const socialsRef    = useRef<HTMLDivElement>(null)
  const busyRef       = useRef(false)

  const panelColor = colors[colors.length - 1]
  const layerColors = colors.slice(0, -1)

  const playOpen = useCallback(() => {
    if (busyRef.current) return
    busyRef.current = true
    setOpen(true)
    onMenuOpen?.()

    const tl = gsap.timeline({ onComplete: () => { busyRef.current = false } })

    // Stagger layers in
    layerRefs.current.forEach((layer, i) => {
      tl.to(layer, { y: '0%', duration: 0.55, ease: 'power3.inOut' }, i * 0.06)
    })
    // Slide in main panel
    tl.to(panelRef.current, { y: '0%', duration: 0.55, ease: 'power3.inOut' }, layerRefs.current.length * 0.06)

    // Stagger nav links
    linkRefs.current.forEach((link, i) => {
      tl.to(link, { y: '0%', duration: 0.5, ease: 'power3.out' }, `-=0.3${i === 0 ? '' : `+${i * 0.07}`}`)
    })

    // Fade in socials
    if (socialsRef.current && displaySocials) {
      tl.to(socialsRef.current, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3')
    }
  }, [displaySocials, onMenuOpen])

  const playClose = useCallback(() => {
    if (busyRef.current) return
    busyRef.current = true

    const tl = gsap.timeline({
      onComplete: () => {
        setOpen(false)
        busyRef.current = false
        onMenuClose?.()
        // Reset positions
        layerRefs.current.forEach(l => gsap.set(l, { y: '-100%' }))
        gsap.set(panelRef.current, { y: '-100%' })
        linkRefs.current.forEach(l => gsap.set(l, { y: '110%' }))
        if (socialsRef.current) gsap.set(socialsRef.current, { y: 40, opacity: 0 })
      }
    })

    if (socialsRef.current && displaySocials) {
      tl.to(socialsRef.current, { y: 40, opacity: 0, duration: 0.3, ease: 'power2.in' })
    }
    linkRefs.current.slice().reverse().forEach((link, i) => {
      tl.to(link, { y: '110%', duration: 0.35, ease: 'power2.in' }, i * 0.04)
    })
    tl.to(panelRef.current, { y: '-100%', duration: 0.5, ease: 'power3.inOut' }, '-=0.2')
    layerRefs.current.slice().reverse().forEach((layer, i) => {
      tl.to(layer, { y: '-100%', duration: 0.45, ease: 'power3.inOut' }, `-=0.4${i === 0 ? '' : `+${i * 0.05}`}`)
    })
  }, [displaySocials, onMenuClose])

  const toggleMenu = useCallback(() => {
    if (open) playClose(); else playOpen()
  }, [open, playClose, playOpen])

  // Set initial positions on mount
  useEffect(() => {
    layerRefs.current.forEach(l => gsap.set(l, { y: '-100%' }))
    gsap.set(panelRef.current, { y: '-100%' })
    linkRefs.current.forEach(l => gsap.set(l, { y: '110%' }))
    if (socialsRef.current) gsap.set(socialsRef.current, { y: 40, opacity: 0 })
  }, [])

  return (
    <>
      {/* Toggle button */}
      <button
        className={`staggered-toggle${open ? ' open' : ''}`}
        style={{ top, right, color: menuButtonColor }}
        onClick={toggleMenu}
        aria-label={open ? 'Close menu' : 'Open menu'}
      >
        <span className="staggered-toggle-icon">
          <span /><span /><span />
        </span>
        <span className="staggered-toggle-label">{open ? 'Close' : 'Menu'}</span>
      </button>

      {/* Overlay */}
      <div ref={overlayRef} className={`staggered-overlay${open ? ' open' : ''}`}>
        {/* Background layers */}
        {layerColors.map((color, i) => (
          <div
            key={i}
            ref={el => { if (el) layerRefs.current[i] = el }}
            className="staggered-layer"
            style={{ background: color }}
          />
        ))}

        {/* Main panel */}
        <div
          ref={panelRef}
          className="staggered-panel"
          style={{ background: panelColor }}
        >
          <nav>
            <ul className="staggered-nav-list">
              {items.map((item, i) => (
                <li key={i} className="staggered-nav-item">
                  <a
                    ref={el => { if (el) linkRefs.current[i] = el }}
                    className="staggered-nav-link"
                    href={item.link}
                    style={{ color: '#fff' }}
                    onClick={playClose}
                  >
                    {displayItemNumbering && (
                      <span className="staggered-num">0{i + 1}</span>
                    )}
                    <span style={{ color: '#fff' }}>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {displaySocials && socialItems.length > 0 && (
            <div ref={socialsRef} className="staggered-socials">
              {socialItems.map((s, i) => (
                <a
                  key={i}
                  className="staggered-social-link"
                  href={s.link}
                  style={{ color: accentColor }}
                >
                  {s.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default StaggeredMenu
