import { useState, useRef, useEffect } from 'react'

/**
 * Maneja el slide automático de imágenes en una tarjeta de menú.
 * Cicla entre imágenes con una transición slide-right animada.
 *
 * @param imageCount - Número total de imágenes en la tarjeta
 * @param idx        - Índice de la tarjeta (usado para desfasar el timer)
 */
export function useMenuCard(imageCount: number, idx: number) {
  const [current, setCurrent] = useState(idx % imageCount)
  const [incoming, setIncoming] = useState<number | null>(null)
  const [isSliding, setIsSliding] = useState(false)
  const [hovered, setHovered] = useState(false)
  const animating = useRef(false)
  const currentRef = useRef(idx % imageCount)

  useEffect(() => {
    const timer = setInterval(() => {
      if (animating.current) return
      animating.current = true

      const next = (currentRef.current + 1) % imageCount
      setIncoming(next)

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsSliding(true)
          setTimeout(() => {
            currentRef.current = next
            setCurrent(next)
            setIncoming(null)
            setIsSliding(false)
            animating.current = false
          }, 1100)
        })
      })
    }, 2000 + idx * 200)

    return () => clearInterval(timer)
  }, [imageCount, idx])

  return {
    current,
    incoming,
    isSliding,
    hovered,
    setHovered,
  }
}
