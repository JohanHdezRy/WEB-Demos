import React from 'react'
import { useSpotlight } from '../Hooks/useSpotlight'

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string
  style?: React.CSSProperties
  spotlightColor?: string
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  style,
  spotlightColor = 'rgba(255, 255, 255, 0.15)',
}) => {
  const { ref, position, opacity, handlers } = useSpotlight()

  return (
    <div
      ref={ref}
      {...handlers}
      className={`relative overflow-hidden ${className}`}
      style={style}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  )
}

export default SpotlightCard
