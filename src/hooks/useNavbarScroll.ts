import { useState, useEffect } from 'react'

/**
 * Detects if the user has scrolled past a threshold.
 * Replaces the repeated scroll listener pattern in every demo page.
 */
export function useNavbarScroll(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > threshold)
    h() // check initial position
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [threshold])

  return scrolled
}
