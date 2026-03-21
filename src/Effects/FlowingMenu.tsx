import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import './FlowingMenu.css'

interface MenuItemData {
  link: string
  text: string
  image: string
}

interface FlowingMenuProps {
  items?: MenuItemData[]
  speed?: number
  textColor?: string
  bgColor?: string
  marqueeBgColor?: string
  marqueeTextColor?: string
  borderColor?: string
}

interface MenuItemProps extends MenuItemData {
  speed: number
  textColor: string
  marqueeBgColor: string
  marqueeTextColor: string
  borderColor: string
  isFirst: boolean
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({
  items = [],
  speed = 15,
  textColor = '#fff',
  bgColor = '#060010',
  marqueeBgColor = '#fff',
  marqueeTextColor = '#060010',
  borderColor = '#fff',
}) => (
  <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
    <nav className="menu">
      {items.map((item, idx) => (
        <MenuItem
          key={idx}
          {...item}
          speed={speed}
          textColor={textColor}
          marqueeBgColor={marqueeBgColor}
          marqueeTextColor={marqueeTextColor}
          borderColor={borderColor}
          isFirst={idx === 0}
        />
      ))}
    </nav>
  </div>
)

const MenuItem: React.FC<MenuItemProps> = ({
  link, text, image, speed, textColor, marqueeBgColor, marqueeTextColor, borderColor, isFirst,
}) => {
  const itemRef        = useRef<HTMLDivElement>(null)
  const marqueeRef     = useRef<HTMLDivElement>(null)
  const marqueeInnerRef = useRef<HTMLDivElement>(null)
  const animationRef   = useRef<gsap.core.Tween | null>(null)
  const [repetitions, setRepetitions] = useState(4)

  const defaults: gsap.TweenVars = { duration: 0.6, ease: 'expo' }

  const distMetric = (x: number, y: number, x2: number, y2: number) => {
    const dx = x - x2
    const dy = y - y2
    return dx * dx + dy * dy
  }

  const findClosestEdge = (mx: number, my: number, w: number, h: number): 'top' | 'bottom' =>
    distMetric(mx, my, w / 2, 0) < distMetric(mx, my, w / 2, h) ? 'top' : 'bottom'

  useEffect(() => {
    const calc = () => {
      if (!marqueeInnerRef.current) return
      const part = marqueeInnerRef.current.querySelector('.marquee__part') as HTMLElement
      if (!part) return
      const needed = Math.ceil(window.innerWidth / part.offsetWidth) + 2
      setRepetitions(Math.max(4, needed))
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [text, image])

  useEffect(() => {
    const setup = () => {
      if (!marqueeInnerRef.current) return
      const part = marqueeInnerRef.current.querySelector('.marquee__part') as HTMLElement
      if (!part || part.offsetWidth === 0) return
      animationRef.current?.kill()
      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -part.offsetWidth,
        duration: speed,
        ease: 'none',
        repeat: -1,
      })
    }
    const t = setTimeout(setup, 50)
    return () => { clearTimeout(t); animationRef.current?.kill() }
  }, [text, image, repetitions, speed])

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height)
    gsap.timeline({ defaults })
      .set(marqueeRef.current,      { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0)
  }

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return
    const rect = itemRef.current.getBoundingClientRect()
    const edge = findClosestEdge(ev.clientX - rect.left, ev.clientY - rect.top, rect.width, rect.height)
    gsap.timeline({ defaults })
      .to(marqueeRef.current,      { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
  }

  return (
    <div
      className="menu__item"
      ref={itemRef}
      style={{ borderColor, ...(isFirst ? { borderTop: 'none' } : {}) }}
    >
      <a
        className="menu__item-link"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ color: textColor }}
      >
        {text}
      </a>
      <div className="marquee" ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }}>
        <div className="marquee__inner-wrap">
          <div className="marquee__inner" ref={marqueeInnerRef} aria-hidden="true">
            {Array.from({ length: repetitions }).map((_, idx) => (
              <div className="marquee__part" key={idx} style={{ color: marqueeTextColor }}>
                <span>{text}</span>
                <div className="marquee__img" style={{ backgroundImage: `url(${image})` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FlowingMenu
