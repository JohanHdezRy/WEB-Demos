import { useState, useEffect } from 'react'

export function useNavbarScroll(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > threshold)
    h()
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [threshold])

  return scrolled
}
