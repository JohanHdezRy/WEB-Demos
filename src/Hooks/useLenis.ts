import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

type LenisOptions = ConstructorParameters<typeof Lenis>[0]

/**
 * Inicializa Lenis smooth scroll integrado con el ticker de GSAP.
 * Acepta las mismas opciones que el constructor de Lenis (ej. { lerp: 0.08 }).
 */
export function useLenis(options?: LenisOptions) {
  useEffect(() => {
    const lenis = new Lenis(options)
    const tick = gsap.ticker.add((t) => lenis.raf(t * 1000))
    gsap.ticker.lagSmoothing(0)
    lenis.on('scroll', ScrollTrigger.update)
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
    // options es un objeto literal — se pasa estable desde el caller
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
