import { useRef, useState } from 'react'
import type { MouseEventHandler, FocusEventHandler } from 'react'

interface SpotlightHandlers {
  onMouseMove: MouseEventHandler<HTMLDivElement>
  onFocus: FocusEventHandler<HTMLDivElement>
  onBlur: FocusEventHandler<HTMLDivElement>
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handlers: SpotlightHandlers = {
    onMouseMove: e => {
      if (!ref.current || isFocused) return
      const rect = ref.current.getBoundingClientRect()
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    },
    onFocus: () => { setIsFocused(true); setOpacity(0.6) },
    onBlur: () => { setIsFocused(false); setOpacity(0) },
    onMouseEnter: () => setOpacity(0.6),
    onMouseLeave: () => setOpacity(0),
  }

  return { ref, position, opacity, handlers }
}
