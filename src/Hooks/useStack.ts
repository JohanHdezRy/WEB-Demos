import { useState, useEffect, useCallback, type ReactNode } from 'react'

export interface StackCard { id: number; content: ReactNode }

interface UseStackOptions {
  cards: ReactNode[]
  autoplay: boolean
  autoplayDelay: number
  mobileClickOnly: boolean
  sendToBackOnClick: boolean
  mobileBreakpoint: number
}

export function useStack({
  cards,
  autoplay,
  autoplayDelay,
  mobileClickOnly,
  sendToBackOnClick,
  mobileBreakpoint,
}: UseStackOptions) {
  const [isMobile, setIsMobile] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [stack, setStack] = useState<StackCard[]>(() =>
    cards.map((content, index) => ({ id: index + 1, content }))
  )

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < mobileBreakpoint)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [mobileBreakpoint])

  useEffect(() => {
    if (cards.length) setStack(cards.map((content, index) => ({ id: index + 1, content })))
  }, [cards])

  const sendToBack = useCallback((id: number) => {
    setStack(prev => {
      const newStack = [...prev]
      const index = newStack.findIndex(card => card.id === id)
      const [card] = newStack.splice(index, 1)
      newStack.unshift(card)
      return newStack
    })
  }, [])

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        sendToBack(stack[stack.length - 1].id)
      }, autoplayDelay)
      return () => clearInterval(interval)
    }
  }, [autoplay, autoplayDelay, stack, isPaused, sendToBack])

  const shouldDisableDrag = mobileClickOnly && isMobile
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag

  return { stack, isPaused, setIsPaused, sendToBack, shouldDisableDrag, shouldEnableClick }
}
