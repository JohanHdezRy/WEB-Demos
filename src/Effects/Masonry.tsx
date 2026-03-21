import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'
import './Masonry.css'

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue
  const [value, setValue] = useState<number>(get)
  useEffect(() => {
    const handler = () => setValue(get)
    queries.forEach(q => matchMedia(q).addEventListener('change', handler))
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler))
  }, [queries])
  return value
}

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  useLayoutEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })
    ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  return [ref, size] as const
}

const preloadImages = async (urls: string[]): Promise<void> => {
  await Promise.all(
    urls.map(src => new Promise<void>(resolve => {
      const img = new Image()
      img.src = src
      img.onload = img.onerror = () => resolve()
    }))
  )
}

export interface MasonryItem {
  id: string
  img: string
  url: string
  height: number
}

interface GridItem extends MasonryItem {
  x: number; y: number; w: number; h: number
}

interface MasonryProps {
  items: MasonryItem[]
  ease?: string
  duration?: number
  stagger?: number
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random'
  scaleOnHover?: boolean
  hoverScale?: number
  blurToFocus?: boolean
  colorShiftOnHover?: boolean
  columns?: [number, number, number, number, number] // [≥1500, ≥1000, ≥600, ≥400, default]
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  columns = [5, 4, 3, 2, 1],
}) => {
  const cols = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [columns[0], columns[1], columns[2], columns[3]],
    columns[4]
  )

  const [containerRef, { width }] = useMeasure<HTMLDivElement>()
  const [imagesReady, setImagesReady] = useState(false)

  const getInitialPosition = (item: GridItem) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return { x: item.x, y: item.y }
    let dir = animateFrom
    if (dir === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right']
      dir = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom
    }
    switch (dir) {
      case 'top':    return { x: item.x, y: -200 }
      case 'bottom': return { x: item.x, y: window.innerHeight + 200 }
      case 'left':   return { x: -200, y: item.y }
      case 'right':  return { x: window.innerWidth + 200, y: item.y }
      case 'center': return { x: rect.width / 2 - item.w / 2, y: rect.height / 2 - item.h / 2 }
      default:       return { x: item.x, y: item.y + 100 }
    }
  }

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true))
  }, [items])

  const grid = useMemo<GridItem[]>(() => {
    if (!width) return []
    const colHeights = new Array(cols).fill(0)
    const colWidth   = width / cols
    return items.map(child => {
      const col    = colHeights.indexOf(Math.min(...colHeights))
      const x      = colWidth * col
      const height = child.height / 2
      const y      = colHeights[col]
      colHeights[col] += height
      return { ...child, x, y, w: colWidth, h: height }
    })
  }, [cols, items, width])

  // Computed container height
  const containerHeight = useMemo(() => {
    if (!grid.length) return 0
    return Math.max(...grid.map(g => g.y + g.h))
  }, [grid])

  const hasMounted = useRef(false)

  useLayoutEffect(() => {
    if (!imagesReady) return
    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`
      const target = { x: item.x, y: item.y, width: item.w, height: item.h }
      if (!hasMounted.current) {
        const init = getInitialPosition(item)
        gsap.fromTo(selector,
          { opacity: 0, x: init.x, y: init.y, width: item.w, height: item.h, ...(blurToFocus && { filter: 'blur(10px)' }) },
          { opacity: 1, ...target, ...(blurToFocus && { filter: 'blur(0px)' }), duration: 0.8, ease: 'power3.out', delay: index * stagger }
        )
      } else {
        gsap.to(selector, { ...target, duration, ease, overwrite: 'auto' })
      }
    })
    hasMounted.current = true
  }, [grid, imagesReady])

  const handleMouseEnter = (e: React.MouseEvent, item: GridItem) => {
    const el = e.currentTarget as HTMLElement
    if (scaleOnHover) gsap.to(`[data-key="${item.id}"]`, { scale: hoverScale, duration: 0.3, ease: 'power2.out' })
    if (colorShiftOnHover) {
      const overlay = el.querySelector('.color-overlay') as HTMLElement
      if (overlay) gsap.to(overlay, { opacity: 0.3, duration: 0.3 })
    }
  }

  const handleMouseLeave = (e: React.MouseEvent, item: GridItem) => {
    const el = e.currentTarget as HTMLElement
    if (scaleOnHover) gsap.to(`[data-key="${item.id}"]`, { scale: 1, duration: 0.3, ease: 'power2.out' })
    if (colorShiftOnHover) {
      const overlay = el.querySelector('.color-overlay') as HTMLElement
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 })
    }
  }

  return (
    <div ref={containerRef} className="list" style={{ height: containerHeight }}>
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className="item-wrapper"
          onClick={() => item.url !== '#' && window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={e => handleMouseEnter(e, item)}
          onMouseLeave={e => handleMouseLeave(e, item)}
        >
          <div className="item-img" style={{ backgroundImage: `url(${item.img})` }}>
            {colorShiftOnHover && (
              <div
                className="color-overlay"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(45deg, rgba(255,0,150,.5), rgba(0,150,255,.5))',
                  opacity: 0, pointerEvents: 'none', borderRadius: 8,
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Masonry
