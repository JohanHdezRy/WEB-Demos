import { useRef, useEffect, useCallback, CSSProperties } from 'react'

export interface FuzzyTextProps {
  children: string
  fontSize?:       number | string
  fontWeight?:     number | string
  fontFamily?:     string
  color?:          string
  enableHover?:    boolean
  baseIntensity?:  number
  hoverIntensity?: number
  fuzzRange?:      number
  className?:      string
  style?:          CSSProperties
}

export function FuzzyText({
  children,
  fontSize       = 'clamp(3rem,8vw,8rem)',
  fontWeight     = 900,
  fontFamily     = "'Playfair Display', serif",
  color          = '#ffffff',
  enableHover    = true,
  baseIntensity  = 0.18,
  hoverIntensity = 0.5,
  fuzzRange      = 30,
  className,
  style,
}: FuzzyTextProps) {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const rafRef       = useRef<number>(0)
  const hoverRef     = useRef(false)
  const intensityRef = useRef(baseIntensity)

  // Resolve font size to px (only handles px / rem / number)
  const resolvePx = useCallback((value: number | string, el: HTMLElement): number => {
    if (typeof value === 'number') return value
    if (value.endsWith('px')) return parseFloat(value)
    if (value.endsWith('rem')) {
      const root = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
      return parseFloat(value) * root
    }
    // clamp() or other CSS — measure via a hidden span
    const probe = document.createElement('span')
    probe.style.cssText = `position:absolute;visibility:hidden;font-size:${value};`
    el.appendChild(probe)
    const size = parseFloat(getComputedStyle(probe).fontSize) || 64
    el.removeChild(probe)
    return size
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr     = Math.min(window.devicePixelRatio || 1, 2)
    const fsPx    = resolvePx(fontSize, canvas)
    const font    = `${fontWeight} ${fsPx}px ${fontFamily}`

    // Measure text
    ctx.font = font
    const metrics = ctx.measureText(children)
    const tw = Math.ceil(metrics.width)
    const th = Math.ceil(fsPx * 1.3)   // approx line height

    // Size canvas
    canvas.width  = (tw + fuzzRange * 2) * dpr
    canvas.height = (th + fuzzRange * 2) * dpr
    canvas.style.width  = `${tw + fuzzRange * 2}px`
    canvas.style.height = `${th + fuzzRange * 2}px`
    ctx.scale(dpr, dpr)

    // Draw source text offscreen
    const offscreen = document.createElement('canvas')
    offscreen.width  = canvas.width
    offscreen.height = canvas.height
    const oc = offscreen.getContext('2d')!
    oc.scale(dpr, dpr)
    oc.font = font
    oc.fillStyle = color
    oc.textBaseline = 'alphabetic'
    oc.fillText(children, fuzzRange, fsPx + fuzzRange * 0.35)

    const srcData = oc.getImageData(0, 0, offscreen.width, offscreen.height)

    let frameId = 0
    const draw = () => {
      const intensity = intensityRef.current
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)

      // For each row, shift it randomly by ±offset
      const tmp = ctx.createImageData(canvas.width, canvas.height)
      const src = srcData.data
      const dst = tmp.data
      const W   = canvas.width

      for (let row = 0; row < canvas.height; row++) {
        const shift = Math.round((Math.random() - 0.5) * 2 * fuzzRange * intensity * dpr)
        for (let col = 0; col < W; col++) {
          const srcCol = col - shift
          if (srcCol < 0 || srcCol >= W) continue
          const si = (row * W + srcCol) * 4
          const di = (row * W + col) * 4
          dst[di]     = src[si]
          dst[di + 1] = src[si + 1]
          dst[di + 2] = src[si + 2]
          dst[di + 3] = src[si + 3]
        }
      }
      ctx.putImageData(tmp, 0, 0)
      frameId = requestAnimationFrame(draw)
    }

    // Smoothly interpolate intensity toward target
    let animId = 0
    const tick = () => {
      const target = hoverRef.current ? hoverIntensity : baseIntensity
      intensityRef.current += (target - intensityRef.current) * 0.08
      animId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(draw)
    animId  = requestAnimationFrame(tick)
    rafRef.current = frameId

    return () => {
      cancelAnimationFrame(frameId)
      cancelAnimationFrame(animId)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, fontSize, fontWeight, fontFamily, color, baseIntensity, hoverIntensity, fuzzRange])

  const handleEnter = () => { if (enableHover) hoverRef.current = true }
  const handleLeave = () => { if (enableHover) hoverRef.current = false }

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', imageRendering: 'pixelated', cursor: enableHover ? 'default' : undefined, ...style }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    />
  )
}
