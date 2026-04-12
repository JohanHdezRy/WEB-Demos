import { useScrollTop } from '../Hooks/useScrollTop'

interface Props { bg: string; color: string; hoverBg?: string; hoverColor?: string }

export function ScrollTop({ bg, color, hoverBg, hoverColor }: Props) {
  const { visible, hovered, scrollToTop, onMouseEnter, onMouseLeave } = useScrollTop()

  return (
    <button
      className="fixed bottom-[30px] right-[30px] w-[46px] h-[46px] border-0 cursor-pointer text-xl flex items-center justify-center rounded-full transition-all duration-300 z-[999]"
      style={{
        background: hovered ? (hoverBg || color) : bg,
        color: hovered ? (hoverColor || bg) : color,
        opacity: visible ? 1 : 0,
      }}
      onClick={scrollToTop}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      ↑
    </button>
  )
}
