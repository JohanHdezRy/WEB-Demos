import { useState, useCallback } from 'react'

export function useCarousel(length: number) {
  const [index, setIndex] = useState(0)

  const next = useCallback(() => setIndex(i => (i + 1) % length), [length])
  const prev = useCallback(() => setIndex(i => (i - 1 + length) % length), [length])
  const goTo = useCallback((i: number) => setIndex(i), [])

  return { index, next, prev, goTo }
}
