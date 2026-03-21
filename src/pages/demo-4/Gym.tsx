import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ScrollTop } from '../../components/ScrollTop'
import RevealSection from '../../components/animations/RevealSection'
import ScrollStack, { ScrollStackItem } from '../../Effects/ScrollStack'

const classes = [
  { name: 'HIIT Blast',      time: '6:00 AM', duration: '45 min', trainer: 'Carlos V.',  spots: 4,  tag: 'Popular' },
  { name: 'Strength & Power', time: '8:00 AM', duration: '60 min', trainer: 'Sara M.',    spots: 8,  tag: '' },
  { name: 'Yoga Flow',        time: '9:30 AM', duration: '50 min', trainer: 'Ana R.',     spots: 12, tag: '' },
  { name: 'Spin Cycle',       time: '12:00 PM', duration: '45 min', trainer: 'Miguel L.', spots: 2,  tag: 'Almost Full' },
  { name: 'Boxing Fundamentals', time: '5:00 PM', duration: '60 min', trainer: 'Luis P.', spots: 6, tag: '' },
  { name: 'Body Pump',        time: '7:00 PM', duration: '55 min', trainer: 'Gaby T.',   spots: 10, tag: 'New' },
]

const plans = [
  {
    name: 'Starter',   price: '$29', period: '/mo',
    features: ['Gym access (Mon–Fri)', '2 group classes/week', 'Locker room access', 'App access'],
    highlight: false,
  },
  {
    name: 'Pro',       price: '$59', period: '/mo',
    features: ['Unlimited gym access', 'Unlimited group classes', 'Personal trainer (2x/mo)', 'Nutrition guide', 'Guest passes (2/mo)'],
    highlight: true,
  },
  {
    name: 'Elite',     price: '$99', period: '/mo',
    features: ['Everything in Pro', 'Personal trainer (unlimited)', 'Priority class booking', 'Recovery & spa access', 'Dedicated coach'],
    highlight: false,
  },
]

const trainers = [
  { name: 'Carlos V.',  role: 'HIIT & Cardio',    img: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&q=80' },
  { name: 'Sara M.',    role: 'Strength Coach',   img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80' },
  { name: 'Ana R.',     role: 'Yoga & Mindfulness', img: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80' },
  { name: 'Luis P.',    role: 'Boxing & MMA',     img: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&q=80' },
]

const trainingAreas = [
  {
    name: 'Cardio Zone',
    desc: 'More than 40 machines including treadmills, ellipticals, rowing machines, and cycling bikes. Track your metrics in real time.',
    detail: '40+ Machines · Open 24/7',
    color: '#F5A623',
    img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=900&q=80',
  },
  {
    name: 'Free Weights',
    desc: 'Full range of dumbbells (2–100 kg), barbells, and Olympic lifting platforms. Built for serious strength athletes.',
    detail: '2 kg – 100 kg · 5 Platforms',
    color: '#e55039',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=900&q=80',
  },
  {
    name: 'Functional Training',
    desc: 'Battle ropes, TRX suspension systems, kettlebells, and open floor space for dynamic full-body conditioning.',
    detail: '200 m² · All Levels Welcome',
    color: '#2980b9',
    img: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900&q=80',
  },
  {
    name: 'Group Studios',
    desc: 'Three dedicated studios for yoga, spin, HIIT, boxing, and dance. Over 30 weekly classes led by certified instructors.',
    detail: '3 Studios · 30+ Classes / Week',
    color: '#27ae60',
    img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=900&q=80',
  },
  {
    name: 'Recovery Zone',
    desc: 'Foam rollers, stretching mats, massage guns, infrared sauna, and cold plunge tubs to help you train harder, recover faster.',
    detail: 'Sauna · Ice Bath · Massage Guns',
    color: '#8e44ad',
    img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=900&q=80',
  },
]

export function Gym() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    window.scrollTo(0, 0)
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <div className="bg-[#111] text-white font-[var(--font-poppins)] overflow-x-hidden">
      <style>{`
        .gym-areas-stack .scroll-stack-inner { padding: 12vh 1.5rem 35rem; }
        .gym-areas-stack .scroll-stack-card  { padding: 0; height: 28rem; box-shadow: 0 12px 50px rgba(0,0,0,0.5); overflow: hidden; }
      `}</style>

      {/* NAV */}
      <nav className={`fixed top-0 left-0 w-full z-[1000] px-6 md:px-14 flex items-center gap-4 transition-all duration-300 ${scrolled ? 'bg-[#111]/97 shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <Link to="/" className="text-[.72rem] tracking-[1px] text-[#F5A623] mr-2">← Demos</Link>
        <span className="font-black text-xl uppercase tracking-widest">Fit<span className="text-[#F5A623]">Life</span></span>
        <div className="ml-auto hidden md:flex gap-6 items-center">
          {['Classes', 'Trainers', 'Areas', 'Plans', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[.72rem] tracking-[1px] uppercase text-white/60 hover:text-[#F5A623] transition-colors">{l}</a>
          ))}
          <a href="#plans" className="bg-[#F5A623] text-black text-[.72rem] tracking-[1px] uppercase px-5 py-2 rounded-full font-bold hover:bg-[#d4891f] transition-colors">
            Join Now
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
        <div className="relative px-10 md:px-20 max-w-[800px]">
          <p className="text-[.68rem] tracking-[6px] uppercase text-[#F5A623] mb-5">No Limits. Just Results.</p>
          <h1 className="text-[clamp(3.5rem,8vw,7rem)] font-black uppercase leading-[0.95] mb-8">
            Push Your<br />
            <span className="text-[#F5A623]">Limits</span>
          </h1>
          <p className="text-white/60 text-[.95rem] leading-[1.8] mb-10 max-w-md">
            State-of-the-art equipment, elite trainers, and a community built to push you beyond what you thought possible.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href="#plans" className="bg-[#F5A623] text-black px-9 py-4 rounded-full text-[.85rem] font-black uppercase tracking-[1px] hover:bg-[#d4891f] transition-colors">
              Start Free Trial
            </a>
            <a href="#classes" className="border-2 border-white/30 text-white px-9 py-4 rounded-full text-[.85rem] font-semibold uppercase tracking-[1px] hover:border-[#F5A623] hover:text-[#F5A623] transition-all">
              View Classes
            </a>
          </div>
        </div>
      </header>

      {/* STATS STRIP */}
      <div className="bg-[#F5A623] py-6 px-6 md:px-16">
        <div className="max-w-[1200px] mx-auto flex justify-around flex-wrap gap-4">
          {[['500+', 'Members'], ['20+', 'Classes/Week'], ['10+', 'Elite Trainers'], ['5★', 'Rating']].map(([n, l]) => (
            <div key={l} className="text-center text-black">
              <p className="text-[2rem] font-black leading-none">{n}</p>
              <p className="text-[.75rem] font-semibold tracking-[1px] uppercase mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CLASSES */}
      <section className="px-6 md:px-16 py-20 max-w-[1200px] mx-auto" id="classes">
        <RevealSection variant="fadeUp">
          <p className="text-[.65rem] tracking-[4px] uppercase text-[#F5A623] mb-2">Schedule</p>
          <h2 className="text-[2.2rem] font-bold mb-10">Today's Classes</h2>
        </RevealSection>
        <div className="space-y-3">
          {classes.map((c, i) => (
            <RevealSection key={i} variant="fadeLeft" delay={i * 0.06}>
              <div className="flex items-center gap-5 bg-white/5 border border-white/8 rounded-xl p-5 hover:border-[#F5A623]/40 hover:bg-white/8 transition-all">
                <div className="text-center min-w-[70px]">
                  <p className="font-bold text-[#F5A623] text-[.85rem]">{c.time}</p>
                  <p className="text-white/40 text-[.7rem]">{c.duration}</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-semibold">{c.name}</p>
                    {c.tag && <span className={`text-[.58rem] px-2 py-0.5 rounded-full font-semibold ${c.tag === 'Almost Full' ? 'bg-red-500/20 text-red-400' : 'bg-[#F5A623]/20 text-[#F5A623]'}`}>{c.tag}</span>}
                  </div>
                  <p className="text-white/45 text-[.78rem]">with {c.trainer}</p>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-[.72rem] text-white/40">{c.spots} spots left</p>
                </div>
                <button className="bg-[#F5A623] text-black text-[.72rem] font-bold px-5 py-2 rounded-full hover:bg-[#d4891f] transition-colors whitespace-nowrap">
                  Book
                </button>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* TRAINERS */}
      <section className="px-6 md:px-16 py-10 pb-20 max-w-[1200px] mx-auto" id="trainers">
        <RevealSection variant="fadeUp">
          <p className="text-[.65rem] tracking-[4px] uppercase text-[#F5A623] mb-2">The Team</p>
          <h2 className="text-[2.2rem] font-bold mb-10">Our Trainers</h2>
        </RevealSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {trainers.map((t, i) => (
            <RevealSection key={i} variant="scale" delay={i * 0.08}>
              <div className="group text-center">
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F5A623]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="font-bold">{t.name}</p>
                <p className="text-[#F5A623] text-[.8rem]">{t.role}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* TRAINING AREAS */}
      <section className="bg-[#0a0a0a] pt-20 pb-4" id="areas">
        <RevealSection variant="fadeUp">
          <p className="text-[.65rem] tracking-[4px] uppercase text-[#F5A623] mb-2 text-center px-6">Facilities</p>
          <h2 className="text-[2.2rem] font-bold mb-2 text-center px-6">Training Areas</h2>
          <p className="text-white/35 text-[.85rem] text-center mb-0 px-6">Scroll through to explore every zone</p>
        </RevealSection>
        <div style={{ height: '80vh' }}>
          <ScrollStack
            className="gym-areas-stack"
            itemDistance={140}
            itemScale={0.04}
            itemStackDistance={22}
            stackPosition="16%"
            scaleEndPosition="7%"
            baseScale={0.9}
            rotationAmount={1}
            blurAmount={1.5}
          >
            {trainingAreas.map((area, i) => (
              <ScrollStackItem key={i}>
                <div style={{ position: 'relative', height: '100%', borderRadius: 'inherit', overflow: 'hidden' }}>
                  {/* Background image */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${area.img})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                  }} />
                  {/* Gradient overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.15) 100%)',
                  }} />
                  {/* Top badge */}
                  <div style={{
                    position: 'absolute', top: '1.6rem', right: '1.8rem',
                    background: area.color, color: '#000',
                    fontSize: '.65rem', fontWeight: 700, letterSpacing: '1.5px',
                    textTransform: 'uppercase', padding: '.35rem .9rem', borderRadius: '999px',
                  }}>
                    {String(i + 1).padStart(2, '0')} / {String(trainingAreas.length).padStart(2, '0')}
                  </div>
                  {/* Text content */}
                  <div style={{ position: 'absolute', bottom: '2rem', left: '2.2rem', right: '2.2rem' }}>
                    <p style={{ color: area.color, fontSize: '.65rem', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700, marginBottom: '.5rem' }}>
                      {area.detail}
                    </p>
                    <h3 style={{ color: '#fff', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, marginBottom: '.75rem' }}>
                      {area.name}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '.85rem', lineHeight: 1.7, maxWidth: '560px' }}>
                      {area.desc}
                    </p>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </section>

      {/* PLANS */}
      <section className="px-6 md:px-16 py-20 bg-[#0a0a0a]" id="plans">
        <RevealSection variant="fadeUp">
          <p className="text-[.65rem] tracking-[4px] uppercase text-[#F5A623] mb-2 text-center">Pricing</p>
          <h2 className="text-[2.2rem] font-bold mb-12 text-center">Membership Plans</h2>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
          {plans.map((p, i) => (
            <RevealSection key={i} variant="fadeUp" delay={i * 0.1}>
              <div className={`rounded-2xl p-8 flex flex-col ${p.highlight ? 'bg-[#F5A623] text-black' : 'bg-white/5 border border-white/10'}`}>
                <p className="text-[.72rem] tracking-[2px] uppercase font-semibold mb-2 opacity-70">{p.name}</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-[3rem] font-black leading-none">{p.price}</span>
                  <span className="text-[.85rem] opacity-60 mb-2">{p.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-2 text-[.85rem]">
                      <span className={`mt-0.5 ${p.highlight ? 'text-black' : 'text-[#F5A623]'}`}>✓</span>
                      <span className={p.highlight ? 'text-black' : 'text-white/70'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className={`py-3.5 rounded-full font-bold text-[.85rem] uppercase tracking-[1px] transition-colors ${p.highlight ? 'bg-black text-[#F5A623] hover:bg-[#222]' : 'bg-[#F5A623] text-black hover:bg-[#d4891f]'}`}>
                  Get Started
                </button>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] border-t border-white/8 px-6 md:px-16 py-8 flex flex-col md:flex-row justify-between items-center gap-3 text-white/30 text-[.75rem]">
        <span className="font-black text-white text-xl uppercase tracking-widest">Fit<span className="text-[#F5A623]">Life</span></span>
        <span>Open 5 AM – 11 PM · 7 Days a Week</span>
        <span>Demo · React + TypeScript</span>
      </footer>

      <ScrollTop bg="#F5A623" color="#111" hoverBg="#d4891f" />
    </div>
  )
}
