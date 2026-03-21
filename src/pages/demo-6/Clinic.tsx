import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ScrollTop } from '../../components/ScrollTop'
import RevealSection from '../../components/animations/RevealSection'

const TEAL   = '#00A896'
const ORANGE = '#F4A261'
const DARK   = '#0D1B2A'

const attractions = [
  {
    icon: '💧',
    name: 'Cenote Sagrado',
    desc: 'Swim in crystal-clear underground rivers formed millions of years ago beneath the Yucatan Peninsula.',
    badge: 'Most Popular',
  },
  {
    icon: '🦅',
    name: 'Tirolesas',
    desc: '14 zip-lines soaring through the jungle canopy, reaching speeds of up to 80 km/h.',
    badge: 'Adrenaline',
  },
  {
    icon: '🏛️',
    name: 'Zona Arqueológica',
    desc: 'Walk among authentic Mayan ruins and temples with guided cultural tours available in 5 languages.',
    badge: 'Cultural',
  },
  {
    icon: '🐢',
    name: 'Santuario de Tortugas',
    desc: 'Witness sea turtle nesting and hatching at our protected sanctuary. Release hatchlings into the sea.',
    badge: 'Conservation',
  },
  {
    icon: '🦩',
    name: 'Laguna Flamingo',
    desc: 'Hundreds of pink flamingos in their natural habitat. An unforgettable sight at sunrise and sunset.',
    badge: 'Wildlife',
  },
  {
    icon: '🎭',
    name: 'Espectáculo Maya',
    desc: 'Nightly show featuring traditional dances, fire performances, and the ancient Mayan ball game.',
    badge: 'Evening',
  },
  {
    icon: '🐟',
    name: 'Snorkel & Arrecife',
    desc: 'Explore a living coral reef teeming with tropical fish, rays, and sea turtles just offshore.',
    badge: 'Aquatic',
  },
  {
    icon: '🌿',
    name: 'Sendero Selvático',
    desc: 'A 3 km guided jungle trek through native flora and fauna with expert naturalist guides.',
    badge: 'Eco',
  },
]

const packages = [
  {
    name: 'Día Libre',
    price: '$89',
    period: 'USD / persona',
    features: [
      'Acceso a todos los cenotes',
      'Zona arqueológica',
      'Laguna Flamingo',
      'Shows diurnos',
      'Estacionamiento gratis',
    ],
    highlight: false,
    tag: '',
  },
  {
    name: 'Completo',
    price: '$149',
    period: 'USD / persona',
    features: [
      'Todo en Día Libre',
      'Show Nocturno Maya',
      'Snorkel en arrecife',
      'Sendero Selvático guiado',
      'Una tirolesa incluida',
      'Acceso a playa exclusiva',
    ],
    highlight: true,
    tag: 'Más vendido',
  },
  {
    name: 'VIP Experience',
    price: '$229',
    period: 'USD / persona',
    features: [
      'Todo en Completo',
      'Tirolesas ilimitadas',
      'Tour privado arqueológico',
      'Cena frente al mar',
      'Foto profesional incluida',
      'Acceso lounge VIP',
    ],
    highlight: false,
    tag: '',
  },
]

const visitInfo = [
  { icon: '🕖', label: 'Horario', value: 'Lun – Dom  8:00 AM – 10:00 PM' },
  { icon: '📍', label: 'Ubicación', value: 'Carretera Federal 307, Riviera Maya, QR' },
  { icon: '🚗', label: 'Cómo llegar', value: '20 min desde Playa del Carmen · 45 min desde Cancún' },
  { icon: '👨‍👩‍👧', label: 'Edad mínima', value: 'Niños desde 3 años (algunas actividades +12)' },
]

export function Clinic() {
  const [scrolled, setScrolled] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', guests: '2', date: '', pkg: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    window.scrollTo(0, 0)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <div className="text-white overflow-x-hidden" style={{ background: DARK, fontFamily: 'var(--font-inter)' }}>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 w-full z-[1000] px-6 md:px-14 flex items-center gap-4 transition-all duration-300 ${scrolled ? 'py-3 shadow-lg' : 'py-5'}`}
        style={{ background: scrolled ? `${DARK}f7` : 'transparent' }}>
        <Link to="/" className="text-[.72rem] tracking-[1px] mr-2" style={{ color: TEAL }}>← Demos</Link>
        <span className="font-black text-xl uppercase tracking-widest">
          X<span style={{ color: TEAL }}>PLORA</span>
          <span className="text-white/30 font-light text-base ml-1">Park</span>
        </span>
        <div className="ml-auto hidden md:flex gap-6 items-center">
          {['Atracciones', 'Paquetes', 'Visita'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              className="text-[.72rem] tracking-[1px] uppercase transition-colors hover:text-white"
              style={{ color: 'rgba(255,255,255,0.55)' }}>{l}</a>
          ))}
          <a href="#reserva"
            className="text-[.72rem] tracking-[1px] uppercase px-5 py-2 rounded-full font-bold transition-colors"
            style={{ background: TEAL, color: '#000' }}>
            Reservar
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518638150340-f706e86654de?w=1800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center top' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,27,42,1) 0%, rgba(13,27,42,0.55) 50%, rgba(13,27,42,0.2) 100%)' }} />

        <div className="relative w-full px-8 md:px-20 pb-20 md:pb-28">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[.7rem] font-semibold tracking-wide mb-5"
            style={{ background: 'rgba(0,168,150,0.2)', color: TEAL, border: `1px solid ${TEAL}40` }}>
            ★ Parque #1 en la Riviera Maya · Más de 2 millones de visitantes
          </div>
          <h1 className="font-black uppercase leading-[0.92] mb-6"
            style={{ fontSize: 'clamp(3rem, 9vw, 8rem)' }}>
            La Aventura<br />
            <span style={{ color: TEAL }}>Te Espera</span>
          </h1>
          <p className="text-white/60 leading-[1.8] mb-10 max-w-lg"
            style={{ fontSize: '.95rem' }}>
            Cenotes, tirolesas, ruinas mayas, vida silvestre y espectáculos culturales en un solo lugar. Una experiencia que va más allá del turismo.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href="#reserva"
              className="px-9 py-4 rounded-full font-black uppercase tracking-[1px] transition-all hover:brightness-110"
              style={{ background: TEAL, color: '#000', fontSize: '.85rem' }}>
              Comprar Boletos
            </a>
            <a href="#atracciones"
              className="border-2 border-white/25 text-white px-9 py-4 rounded-full font-semibold uppercase tracking-[1px] transition-all"
              style={{ fontSize: '.85rem' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = TEAL; (e.currentTarget as HTMLElement).style.color = TEAL }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)'; (e.currentTarget as HTMLElement).style.color = '#fff' }}>
              Ver Atracciones
            </a>
          </div>
        </div>
      </header>

      {/* STATS STRIP */}
      <div style={{ background: TEAL }}>
        <div className="max-w-[1200px] mx-auto flex justify-around flex-wrap gap-4 py-6 px-6 md:px-16">
          {[['2M+', 'Visitantes/año'], ['80+', 'Actividades'], ['50', 'Años de historia'], ['3000', 'Especies de flora y fauna']].map(([n, l]) => (
            <div key={l} className="text-center text-black">
              <p className="text-[2rem] font-black leading-none">{n}</p>
              <p className="text-[.72rem] font-semibold tracking-[1px] uppercase mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ATTRACTIONS */}
      <section className="px-6 md:px-16 py-20 max-w-[1200px] mx-auto" id="atracciones">
        <RevealSection variant="fadeUp">
          <p className="text-[.65rem] tracking-[4px] uppercase mb-2" style={{ color: TEAL }}>Experiencias</p>
          <h2 className="text-[2.2rem] font-bold mb-3">Nuestras Atracciones</h2>
          <p className="text-white/40 text-[.9rem] mb-12 max-w-xl">Cada visita es única. Explora más de 80 actividades repartidas en 45 hectáreas de naturaleza pura.</p>
        </RevealSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {attractions.map((a, i) => (
            <RevealSection key={i} variant="fadeUp" delay={i * 0.06}>
              <div
                className="rounded-2xl p-6 border transition-all duration-300 cursor-default group"
                style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${TEAL}60`; (e.currentTarget as HTMLElement).style.background = 'rgba(0,168,150,0.07)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{a.icon}</span>
                  <span className="text-[.58rem] font-bold tracking-[1px] uppercase px-2 py-0.5 rounded-full"
                    style={{ background: `${TEAL}22`, color: TEAL }}>
                    {a.badge}
                  </span>
                </div>
                <h3 className="font-bold mb-2 text-[.95rem] group-hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.9)' }}>{a.name}</h3>
                <p className="text-[.8rem] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.45)' }}>{a.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <div className="relative overflow-hidden py-20 px-6 md:px-16 text-center"
        style={{ background: `linear-gradient(135deg, ${DARK} 0%, #0a2a3a 50%, ${DARK} 100%)` }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1400&q=60)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="relative max-w-[700px] mx-auto">
          <RevealSection variant="scale">
            <p className="text-[.65rem] tracking-[4px] uppercase mb-4" style={{ color: ORANGE }}>Oferta Especial</p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-black uppercase leading-[1] mb-5">
              Niños menores de<br /><span style={{ color: TEAL }}>5 años entran gratis</span>
            </h2>
            <p className="text-white/50 text-[.9rem] mb-8">Trae a tu familia y crea recuerdos que duran para siempre. Promoción válida todos los días del año.</p>
            <a href="#reserva"
              className="inline-block px-10 py-4 rounded-full font-black uppercase tracking-[1px] text-[.85rem] transition-all hover:brightness-110"
              style={{ background: ORANGE, color: '#000' }}>
              Reservar Ahora
            </a>
          </RevealSection>
        </div>
      </div>

      {/* PACKAGES */}
      <section className="px-6 md:px-16 py-20" id="paquetes" style={{ background: '#091521' }}>
        <RevealSection variant="fadeUp">
          <p className="text-[.65rem] tracking-[4px] uppercase mb-2 text-center" style={{ color: TEAL }}>Precios</p>
          <h2 className="text-[2.2rem] font-bold mb-12 text-center">Elige tu Paquete</h2>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1050px] mx-auto">
          {packages.map((p, i) => (
            <RevealSection key={i} variant="fadeUp" delay={i * 0.1}>
              <div className="rounded-2xl p-8 flex flex-col relative"
                style={{ background: p.highlight ? TEAL : 'rgba(255,255,255,0.05)', border: p.highlight ? 'none' : '1px solid rgba(255,255,255,0.1)', color: p.highlight ? '#000' : '#fff' }}>
                {p.tag && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[.6rem] font-bold tracking-[1px] uppercase px-4 py-1 rounded-full"
                    style={{ background: ORANGE, color: '#000' }}>
                    {p.tag}
                  </span>
                )}
                <p className="text-[.7rem] tracking-[2px] uppercase font-semibold mb-2 opacity-60">{p.name}</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-[3rem] font-black leading-none">{p.price}</span>
                </div>
                <p className="text-[.75rem] opacity-50 mb-6">{p.period}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-[.85rem]">
                      <span className="font-bold mt-0.5" style={{ color: p.highlight ? '#000' : TEAL }}>✓</span>
                      <span style={{ color: p.highlight ? 'rgba(0,0,0,0.75)' : 'rgba(255,255,255,0.65)' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#reserva"
                  className="py-3.5 rounded-full font-bold text-[.85rem] uppercase tracking-[1px] text-center transition-all hover:brightness-110"
                  style={{ background: p.highlight ? '#000' : TEAL, color: p.highlight ? TEAL : '#000' }}>
                  Seleccionar
                </a>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* GALLERY STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 h-[40vh]">
        {[
          'https://images.unsplash.com/photo-1518638150340-f706e86654de?w=600&q=80',
          'https://images.unsplash.com/photo-1552083375-1447ce886485?w=600&q=80',
          'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
          'https://images.unsplash.com/photo-1567449303078-57ad995bd17f?w=600&q=80',
        ].map((src, i) => (
          <div key={i} className="overflow-hidden relative group">
            <img src={src} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-60 transition-opacity duration-300" style={{ background: TEAL }} />
          </div>
        ))}
      </div>

      {/* VISIT INFO */}
      <section className="px-6 md:px-16 py-20 max-w-[1100px] mx-auto" id="visita">
        <RevealSection variant="fadeUp">
          <p className="text-[.65rem] tracking-[4px] uppercase mb-2" style={{ color: TEAL }}>Planea tu visita</p>
          <h2 className="text-[2.2rem] font-bold mb-10">Información General</h2>
        </RevealSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {visitInfo.map((v, i) => (
            <RevealSection key={i} variant="fadeLeft" delay={i * 0.07}>
              <div className="flex items-start gap-5 rounded-2xl p-6"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <span className="text-2xl">{v.icon}</span>
                <div>
                  <p className="text-[.65rem] tracking-[2px] uppercase font-semibold mb-1" style={{ color: TEAL }}>{v.label}</p>
                  <p className="text-white/70 text-[.9rem] leading-[1.6]">{v.value}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* BOOKING FORM */}
      <section className="px-6 md:px-16 py-20" id="reserva" style={{ background: TEAL }}>
        <RevealSection variant="fadeUp">
          <div className="max-w-[680px] mx-auto">
            <p className="text-[.65rem] tracking-[4px] uppercase text-black/50 mb-2 text-center">Reservaciones</p>
            <h2 className="text-[2rem] font-bold text-black text-center mb-10">Asegura tu Lugar</h2>
            {sent ? (
              <div className="text-center py-14 bg-white/20 rounded-2xl">
                <p className="text-4xl mb-4">🎉</p>
                <p className="text-black font-bold text-xl mb-2">¡Reserva recibida!</p>
                <p className="text-black/60">Te contactaremos pronto con los detalles de tu visita.</p>
              </div>
            ) : (
              <form className="bg-white rounded-2xl p-8 space-y-4 shadow-2xl" onSubmit={e => { e.preventDefault(); setSent(true) }}>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Nombre completo" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-[.9rem] outline-none transition-colors col-span-2 md:col-span-1"
                    style={{ color: DARK }}
                    onFocus={e => (e.target.style.borderColor = TEAL)} onBlur={e => (e.target.style.borderColor = '#e5e7eb')} />
                  <input type="email" placeholder="Correo electrónico" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-[.9rem] outline-none transition-colors col-span-2 md:col-span-1"
                    style={{ color: DARK }}
                    onFocus={e => (e.target.style.borderColor = TEAL)} onBlur={e => (e.target.style.borderColor = '#e5e7eb')} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <select value={form.pkg} onChange={e => setForm(f => ({ ...f, pkg: e.target.value }))}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-[.9rem] outline-none bg-white"
                    style={{ color: form.pkg ? DARK : '#9ca3af' }}
                    onFocus={e => (e.target.style.borderColor = TEAL)} onBlur={e => (e.target.style.borderColor = '#e5e7eb')}>
                    <option value="">Selecciona paquete</option>
                    {packages.map(p => <option key={p.name} value={p.name}>{p.name} — {p.price}</option>)}
                  </select>
                  <input type="number" min="1" max="50" placeholder="Número de personas"
                    value={form.guests} onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}
                    className="border border-gray-200 rounded-xl px-4 py-3 text-[.9rem] outline-none"
                    style={{ color: DARK }}
                    onFocus={e => (e.target.style.borderColor = TEAL)} onBlur={e => (e.target.style.borderColor = '#e5e7eb')} />
                </div>
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[.9rem] outline-none"
                  style={{ color: DARK }}
                  onFocus={e => (e.target.style.borderColor = TEAL)} onBlur={e => (e.target.style.borderColor = '#e5e7eb')} />
                <button type="submit"
                  className="w-full py-3.5 rounded-full text-[.85rem] tracking-[1px] uppercase font-bold transition-all hover:brightness-110"
                  style={{ background: DARK, color: TEAL }}>
                  Confirmar Reservación
                </button>
              </form>
            )}
          </div>
        </RevealSection>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#060e16', borderTop: '1px solid rgba(255,255,255,0.06)' }}
        className="px-6 md:px-16 py-10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-black text-xl uppercase tracking-widest">
            X<span style={{ color: TEAL }}>PLORA</span>
            <span className="text-white/25 font-light text-base ml-1">Park</span>
          </span>
          <p className="text-white/30 text-[.8rem]">Riviera Maya, Quintana Roo · México</p>
          <p className="text-white/20 text-[.7rem]">Demo · React + TypeScript</p>
        </div>
      </footer>

      <ScrollTop bg={TEAL} color="#000" hoverBg="#00c4b0" />
    </div>
  )
}
