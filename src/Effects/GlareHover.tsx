import React, { useRef } from 'react';

interface GlareHoverProps {
  children?: React.ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}

const GlareHover: React.FC<GlareHoverProps> = ({
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.4,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  className = '',
  style = {},
  onMouseEnter: externalMouseEnter,
  onMouseLeave: externalMouseLeave,
}) => {
  const hex = glareColor.replace('#', '');
  let rgba = glareColor;
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const overlayRef = useRef<HTMLDivElement>(null);

  const animateIn = () => {
    const el = overlayRef.current;
    if (!el) return;
    el.style.transition = 'none';
    el.style.backgroundPosition = '-100% -100%, 0 0';
    el.style.transition = `${transitionDuration}ms ease`;
    el.style.backgroundPosition = '100% 100%, 0 0';
  };

  const animateOut = () => {
    const el = overlayRef.current;
    if (!el) return;
    if (playOnce) {
      el.style.transition = 'none';
      el.style.backgroundPosition = '-100% -100%, 0 0';
    } else {
      el.style.transition = `${transitionDuration}ms ease`;
      el.style.backgroundPosition = '-100% -100%, 0 0';
    }
  };

  return (
    <div
      className={`relative overflow-hidden cursor-pointer ${className}`}
      style={style}
      onMouseEnter={e => { animateIn(); externalMouseEnter?.(e); }}
      onMouseLeave={e => { animateOut(); externalMouseLeave?.(e); }}
    >
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(${glareAngle}deg, hsla(0,0%,0%,0) 60%, ${rgba} 70%, hsla(0,0%,0%,0) 100%)`,
          backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '-100% -100%, 0 0',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      {children}
    </div>
  );
};

export default GlareHover;
