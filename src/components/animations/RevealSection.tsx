import { useRef, type ReactNode, type CSSProperties } from 'react'
import { motion, useInView } from 'motion/react'

type RevealVariant = 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'fade'

interface RevealSectionProps {
  children: ReactNode
  variant?: RevealVariant
  delay?: number
  duration?: number
  threshold?: number
  once?: boolean
  className?: string
  style?: CSSProperties
}

type VariantState = Record<string, string | number>
const variants: Record<RevealVariant, { hidden: VariantState; visible: VariantState }> = {
  fadeUp:    { hidden: { opacity: 0, y: 48, filter: 'blur(4px)' },    visible: { opacity: 1, y: 0, filter: 'blur(0px)' } },
  fadeLeft:  { hidden: { opacity: 0, x: -48, filter: 'blur(4px)' },   visible: { opacity: 1, x: 0, filter: 'blur(0px)' } },
  fadeRight: { hidden: { opacity: 0, x: 48, filter: 'blur(4px)' },    visible: { opacity: 1, x: 0, filter: 'blur(0px)' } },
  scale:     { hidden: { opacity: 0, scale: 0.88, filter: 'blur(4px)' }, visible: { opacity: 1, scale: 1, filter: 'blur(0px)' } },
  fade:      { hidden: { opacity: 0 },                                  visible: { opacity: 1 } },
}

export default function RevealSection({
  children, variant = 'fadeUp', delay = 0, duration = 0.7,
  threshold = 0.12, once = true, className, style,
}: RevealSectionProps) {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: threshold, once })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}
