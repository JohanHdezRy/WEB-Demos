import { useState, useLayoutEffect, type RefObject } from 'react'

export function useElementWidth<T extends HTMLElement>(ref: RefObject<T | null>): number {
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    function update() {
      if (ref.current) setWidth(ref.current.offsetWidth)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [ref])

  return width
}
