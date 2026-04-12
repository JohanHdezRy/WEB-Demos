import { useState, useEffect, useCallback } from 'react'

export function useScrollTop(threshold = 600) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const h = () => setVisible(window.scrollY > threshold)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [threshold])

  const scrollToTop = useCallback(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [])
  const onMouseEnter = useCallback(() => setHovered(true), [])
  const onMouseLeave = useCallback(() => setHovered(false), [])

  return { visible, hovered, scrollToTop, onMouseEnter, onMouseLeave }
}
