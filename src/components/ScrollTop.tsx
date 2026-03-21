import { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'

interface Props { bg: string; color: string; hoverBg?: string; hoverColor?: string }

export function ScrollTop({ bg, color, hoverBg, hoverColor }: Props) {
  const [show, setShow]       = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const h = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const style: CSSProperties = {
    position: 'fixed', bottom: 30, right: 30, width: 46, height: 46,
    background: hovered ? (hoverBg || color) : bg,
    color: hovered ? (hoverColor || bg) : color,
    border: 'none', cursor: 'pointer', fontSize: '1.2rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    opacity: show ? 1 : 0, transition: 'all .3s', zIndex: 999,
    borderRadius: '50%',
  }

  return (
    <button
      style={style}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >↑</button>
  )
}
