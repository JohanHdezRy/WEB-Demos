import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

/* ── Types ── */
interface MetricCard {
  label: string
  value: string
  change: string
  positive: boolean
  type?: 'donut'
  donutPct?: number
}

/* ── Data ── */
const metrics: MetricCard[] = [
  { label: 'Net Revenue', value: '$3,131,021', change: '+0.4%', positive: true },
  { label: 'ARR', value: '$1,511,121', change: '+32%', positive: true },
  { label: 'Revenue Goal', value: '71%', change: 'Quarterly', positive: true, type: 'donut', donutPct: 71 },
  { label: 'New Orders', value: '18,221', change: '+11%', positive: true },
]

const navItems = [
  { label: 'Overview', icon: '⊞', active: true, section: 'DASHBOARDS' },
  { label: 'eCommerce', icon: '🛒', active: false, section: '' },
  { label: 'Analytics', icon: '📊', active: false, section: '' },
  { label: 'Customers', icon: '👥', active: false, section: '' },
  { label: 'Messages', icon: '💬', active: false, section: 'SETTINGS' },
  { label: 'Reviews', icon: '⭐', active: false, section: '' },
  { label: 'Settings', icon: '⚙', active: false, section: '' },
  { label: 'Help Centre', icon: '❓', active: false, section: '' },
]

const customers = [
  { name: 'Nataniel Donowan', deals: 12, value: '$8,420' },
  { name: 'Sarah Mitchell', deals: 8, value: '$5,100' },
  { name: 'James Okonkwo', deals: 15, value: '$11,200' },
]

const notifications = [
  { icon: '🛒', text: 'New order #4521 received', time: '2m ago' },
  { icon: '💳', text: 'Payment confirmed $299', time: '14m ago' },
  { icon: '📦', text: 'Shipment delivered to NY', time: '1h ago' },
  { icon: '⚠️', text: 'Low stock: SKU-8821', time: '3h ago' },
]

const contacts = [
  { name: 'Nataniel Donowan', role: 'Sales Lead', highlight: true },
  { name: 'Priya Sharma', role: 'Account Mgr', highlight: false },
  { name: 'Marco Torres', role: 'Support', highlight: false },
  { name: 'Julia Chen', role: 'Marketing', highlight: false },
  { name: 'Amir Hassan', role: 'Dev Ops', highlight: false },
]

/* ── SVG Donut ── */
function DonutChart({ pct, size = 80, stroke = 10 }: { pct: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const dash = (pct / 100) * circ
  const circleRef = useRef<SVGCircleElement>(null)

  useEffect(() => {
    if (circleRef.current) {
      gsap.fromTo(circleRef.current,
        { strokeDashoffset: circ },
        { strokeDashoffset: circ - dash, duration: 1.5, delay: 0.5, ease: 'power2.out' }
      )
    }
  }, [circ, dash])

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#21262D" strokeWidth={stroke} />
      <circle
        ref={circleRef}
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#3FB950"
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={circ}
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ── Sparkline ── */
function Sparkline() {
  const pathRef = useRef<SVGPathElement>(null)
  const points = [10, 20, 12, 28, 18, 35, 25, 40, 30, 45]
  const w = 100
  const h = 40
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / (points.length - 1)) * w} ${h - p}`).join(' ')

  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength()
      gsap.fromTo(pathRef.current,
        { strokeDashoffset: len, strokeDasharray: len },
        { strokeDashoffset: 0, duration: 1.5, delay: 0.8, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <svg width="100" height="40" viewBox={`0 0 ${w} ${h}`}>
      <path ref={pathRef} d={d} fill="none" stroke="#3FB950" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── Line Chart ── */
function LineChart() {
  const pathRef = useRef<SVGPathElement>(null)
  const points = [30, 45, 35, 60, 50, 72, 58, 80, 65, 90, 70, 95]
  const w = 320
  const h = 100

  const d = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w
    const y = h - (p / 100) * h
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
  }).join(' ')

  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength()
      gsap.fromTo(pathRef.current,
        { strokeDashoffset: len, strokeDasharray: len },
        { strokeDashoffset: 0, duration: 2, delay: 0.5, ease: 'power2.out' }
      )
    }
  }, [])

  return (
    <svg width="100%" height="100" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3FB950" stopOpacity="0.3"/>
          <stop offset="100%" stopColor="#3FB950" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={`${d} L ${w} ${h} L 0 ${h} Z`} fill="url(#lineGrad)"/>
      <path ref={pathRef} d={d} fill="none" stroke="#3FB950" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ── Main Component ── */
export function Dashboard() {
  const sidebarItemsRef = useRef<HTMLDivElement>(null)
  const metricCardsRef = useRef<HTMLDivElement>(null)
  const rightPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Sidebar nav items stagger from left
      const sideItems = sidebarItemsRef.current?.querySelectorAll('.nav-item')
      if (sideItems) {
        gsap.from(sideItems, {
          x: -20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
        })
      }

      // 2. Metric cards stagger from y
      const cards = metricCardsRef.current?.querySelectorAll('.metric-card')
      if (cards) {
        gsap.from(cards, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.3,
          ease: 'power2.out',
        })
      }

      // 3. Numbers count up
      const countEls = metricCardsRef.current?.querySelectorAll('.count-val')
      countEls?.forEach(el => {
        const target = parseFloat(el.getAttribute('data-target') || '0')
        const obj = { val: 0 }
        gsap.to(obj, {
          val: target,
          duration: 1.5,
          delay: 0.5,
          ease: 'power2.out',
          onUpdate: () => {
            const prefix = el.getAttribute('data-prefix') || ''
            const suffix = el.getAttribute('data-suffix') || ''
            const decimals = el.getAttribute('data-decimals') || '0'
            el.textContent = `${prefix}${obj.val.toLocaleString('en-US', { maximumFractionDigits: parseInt(decimals) })}${suffix}`
          },
        })
      })

      // 4. Right panel items from right
      const rightItems = rightPanelRef.current?.querySelectorAll('.right-item')
      if (rightItems) {
        gsap.from(rightItems, {
          x: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.4,
          ease: 'power2.out',
        })
      }
    })

    return () => ctx.revert()
  }, [])

  // Styles
  const S = {
    bg: '#0D1117',
    surface: '#161B22',
    border: '#21262D',
    green: '#3FB950',
    text: '#E6EDF3',
    muted: '#8B949E',
  }

  return (
    <div style={{
      fontFamily: 'var(--font-poppins)',
      background: S.bg,
      minHeight: '100vh',
      display: 'flex',
      color: S.text,
      fontSize: '0.85rem',
    }}>

      {/* Sidebar */}
      <aside style={{
        width: 220,
        background: S.surface,
        borderRight: `1px solid ${S.border}`,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 0',
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: '0 20px 24px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ display: 'flex', gap: 3 }}>
            {[S.green, '#2EA043', '#1A7F37'].map((c, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '1px' }}>DWIS·M</span>
        </div>

        {/* Search */}
        <div style={{ padding: '0 12px 20px' }}>
          <div style={{
            background: S.bg,
            border: `1px solid ${S.border}`,
            borderRadius: 8,
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span style={{ color: S.muted, fontSize: '0.75rem' }}>🔍</span>
            <span style={{ color: S.muted, fontSize: '0.75rem' }}>Search...</span>
          </div>
        </div>

        {/* Nav items */}
        <div ref={sidebarItemsRef} style={{ flex: 1 }}>
          {navItems.map((item, i) => (
            <div key={i}>
              {item.section && (
                <p style={{
                  color: S.muted,
                  fontSize: '0.6rem',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  padding: '12px 20px 6px',
                  fontWeight: 600,
                }}>
                  {item.section}
                </p>
              )}
              <div
                className="nav-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '9px 20px',
                  cursor: 'pointer',
                  borderRadius: 6,
                  margin: '1px 8px',
                  background: item.active ? `${S.green}18` : 'transparent',
                  borderLeft: item.active ? `2px solid ${S.green}` : '2px solid transparent',
                  transition: 'background 0.2s',
                }}
              >
                <span style={{ fontSize: '0.85rem' }}>{item.icon}</span>
                <span style={{ color: item.active ? S.green : S.muted, fontSize: '0.8rem', fontWeight: item.active ? 600 : 400 }}>
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Demos */}
        <div style={{ padding: '16px 12px 0' }}>
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: S.muted,
            textDecoration: 'none',
            fontSize: '0.75rem',
            padding: '8px 12px',
            borderRadius: 6,
            border: `1px solid ${S.border}`,
          }}>
            ← Demos
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top bar */}
        <div style={{
          background: S.surface,
          borderBottom: `1px solid ${S.border}`,
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{ color: S.muted, fontSize: '0.78rem' }}>
            <span>Dashboards</span>
            <span style={{ margin: '0 6px', opacity: 0.4 }}>/</span>
            <span style={{ color: S.text, fontWeight: 600 }}>Overview</span>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
            <button style={{
              background: S.bg,
              border: `1px solid ${S.border}`,
              color: S.text,
              padding: '6px 14px',
              borderRadius: 6,
              fontSize: '0.75rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              Today ▾
            </button>
            {['🔔', '⚙', '👤'].map(icon => (
              <button key={icon} style={{
                background: S.bg,
                border: `1px solid ${S.border}`,
                color: S.text,
                width: 34,
                height: 34,
                borderRadius: 6,
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}>{icon}</button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>

          {/* Metric cards */}
          <div ref={metricCardsRef} style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            marginBottom: 24,
          }}>
            {metrics.map((m, i) => (
              <div
                key={i}
                className="metric-card"
                style={{
                  background: S.surface,
                  border: `1px solid ${S.border}`,
                  borderRadius: 10,
                  padding: '16px',
                }}
              >
                <p style={{ color: S.muted, fontSize: '0.72rem', marginBottom: 10 }}>{m.label}</p>
                {m.type === 'donut' ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <DonutChart pct={m.donutPct!} size={60} stroke={8} />
                    <div>
                      <p style={{ color: S.text, fontWeight: 700, fontSize: '1.4rem', lineHeight: 1 }}>{m.value}</p>
                      <p style={{ color: S.muted, fontSize: '0.65rem', marginTop: 4 }}>{m.change}</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <p style={{ color: S.text, fontWeight: 700, fontSize: '1.4rem', lineHeight: 1, marginBottom: 8 }}>
                      <span
                        className="count-val"
                        data-target={m.value.replace(/[$,]/g, '')}
                        data-prefix={m.value.startsWith('$') ? '$' : ''}
                        data-suffix=""
                        data-decimals="0"
                      >
                        {m.value}
                      </span>
                    </p>
                    <span style={{
                      color: m.positive ? S.green : '#F85149',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                    }}>
                      {m.change}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Charts row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>

            {/* Weekly visits donut */}
            <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 10, padding: '20px' }}>
              <p style={{ color: S.text, fontWeight: 600, marginBottom: 16 }}>Sales Overview</p>
              <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                <div style={{ position: 'relative' }}>
                  <DonutChart pct={68} size={100} stroke={14} />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <p style={{ color: S.text, fontWeight: 700, fontSize: '1.1rem', lineHeight: 1 }}>102k</p>
                    <p style={{ color: S.muted, fontSize: '0.58rem' }}>Weekly</p>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { label: 'Electronic', pct: 35, color: S.green },
                    { label: 'Furniture', pct: 28, color: '#58A6FF' },
                    { label: 'Clothes', pct: 22, color: '#F78166' },
                    { label: 'Shoes', pct: 15, color: '#D2A8FF' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
                      <span style={{ color: S.muted, fontSize: '0.72rem', flex: 1 }}>{item.label}</span>
                      <span style={{ color: S.text, fontSize: '0.72rem', fontWeight: 600 }}>{item.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Revenue stats */}
            <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 10, padding: '20px' }}>
              <p style={{ color: S.text, fontWeight: 600, marginBottom: 16 }}>Revenue Trend</p>
              <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
                <div>
                  <p style={{ color: S.muted, fontSize: '0.7rem' }}>New Customers</p>
                  <p style={{ color: S.text, fontWeight: 700, fontSize: '1.3rem' }}>862</p>
                </div>
                <div>
                  <p style={{ color: S.muted, fontSize: '0.7rem' }}>Total Profit</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <p style={{ color: S.text, fontWeight: 700, fontSize: '1.3rem' }}>$25.6k</p>
                    <Sparkline />
                  </div>
                </div>
              </div>
              <p style={{ color: S.text, fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>$136,755.77</p>
              <LineChart />
            </div>
          </div>

          {/* Customer table */}
          <div style={{ background: S.surface, border: `1px solid ${S.border}`, borderRadius: 10, padding: '20px' }}>
            <p style={{ color: S.text, fontWeight: 600, marginBottom: 16 }}>Top Customers</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Name', 'Deals', 'Total Deal Value'].map(h => (
                    <th key={h} style={{ textAlign: 'left', color: S.muted, fontSize: '0.7rem', fontWeight: 600, padding: '8px 12px', borderBottom: `1px solid ${S.border}`, letterSpacing: '1px', textTransform: 'uppercase' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {customers.map((c, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${S.border}` }}>
                    <td style={{ padding: '12px', fontSize: '0.82rem', color: S.text, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 30,
                        height: 30,
                        borderRadius: '50%',
                        background: `hsl(${i * 80 + 120},50%,40%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: '#fff',
                        flexShrink: 0,
                      }}>
                        {c.name[0]}
                      </div>
                      {c.name}
                    </td>
                    <td style={{ padding: '12px', fontSize: '0.82rem', color: S.muted }}>{c.deals}</td>
                    <td style={{ padding: '12px', fontSize: '0.82rem', color: S.green, fontWeight: 600 }}>{c.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Right panel */}
      <aside ref={rightPanelRef} style={{
        width: 280,
        background: S.surface,
        borderLeft: `1px solid ${S.border}`,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 0',
        overflowY: 'auto',
      }}>
        {/* Notifications */}
        <div style={{ padding: '0 16px 20px' }}>
          <p style={{ color: S.text, fontWeight: 600, marginBottom: 14, fontSize: '0.88rem' }}>Notifications</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {notifications.map((n, i) => (
              <div key={i} className="right-item" style={{
                display: 'flex',
                gap: 10,
                padding: '10px',
                background: S.bg,
                borderRadius: 8,
                border: `1px solid ${S.border}`,
              }}>
                <span style={{ fontSize: '1rem' }}>{n.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ color: S.text, fontSize: '0.72rem', lineHeight: 1.4 }}>{n.text}</p>
                  <p style={{ color: S.muted, fontSize: '0.62rem', marginTop: 3 }}>{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${S.border}`, padding: '16px 16px 20px' }}>
          <p style={{ color: S.text, fontWeight: 600, marginBottom: 14, fontSize: '0.88rem' }}>Activities</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Reviewed Q2 report', 'Updated pricing model', 'Team standup @ 9am'].map((a, i) => (
              <div key={i} className="right-item" style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: S.green, flexShrink: 0, marginTop: 5 }} />
                <p style={{ color: S.muted, fontSize: '0.75rem', lineHeight: 1.4 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${S.border}`, padding: '16px 16px 0' }}>
          <p style={{ color: S.text, fontWeight: 600, marginBottom: 14, fontSize: '0.88rem' }}>Contacts</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {contacts.map((c, i) => (
              <div key={i} className="right-item" style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 10px',
                borderRadius: 8,
                background: c.highlight ? `${S.green}14` : 'transparent',
                border: c.highlight ? `1px solid ${S.green}30` : '1px solid transparent',
              }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: c.highlight ? S.green : `hsl(${i * 60 + 200},40%,40%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#fff',
                  flexShrink: 0,
                }}>
                  {c.name[0]}
                </div>
                <div>
                  <p style={{ color: c.highlight ? S.green : S.text, fontSize: '0.75rem', fontWeight: c.highlight ? 600 : 400 }}>{c.name}</p>
                  <p style={{ color: S.muted, fontSize: '0.62rem' }}>{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
