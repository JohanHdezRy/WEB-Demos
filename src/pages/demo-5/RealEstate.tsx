import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ScrollTop } from '../../components/ScrollTop'
import RevealSection from '../../components/animations/RevealSection'
import CountUp from '../../Effects/CountUp'
import SpotlightCard from '../../Effects/SpotlightCard'

const properties = [
  { name: 'Modern Villa',       price: '$485,000', beds: 4, baths: 3, sqft: '2,400', type: 'For Sale',   img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80', location: 'Miami, FL' },
  { name: 'Downtown Loft',      price: '$2,800/mo', beds: 2, baths: 2, sqft: '1,100', type: 'For Rent',  img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80', location: 'Austin, TX' },
  { name: 'Suburban Family Home', price: '$320,000', beds: 3, baths: 2, sqft: '1,800', type: 'For Sale', img: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80', location: 'Denver, CO' },
  { name: 'Beach Cottage',      price: '$1,200/mo', beds: 2, baths: 1, sqft: '900',   type: 'For Rent',  img: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=600&q=80', location: 'Tampa, FL' },
  { name: 'Luxury Penthouse',   price: '$1,250,000', beds: 3, baths: 3, sqft: '3,200', type: 'For Sale', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', location: 'NYC, NY' },
  { name: 'Cozy Studio',        price: '$1,500/mo', beds: 1, baths: 1, sqft: '600',   type: 'For Rent',  img: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80', location: 'Portland, OR' },
]

const reasons = [
  { icon: '🏆', title: 'Top Rated Agency',   desc: 'Recognized as #1 real estate agency in customer satisfaction for 5 consecutive years.' },
  { icon: '🔍', title: 'Expert Market Knowledge', desc: 'Our agents know the local market inside and out, ensuring you get the best deal.' },
  { icon: '🤝', title: 'Personal Service',   desc: 'Dedicated agent from search to closing. We\'re with you every step of the way.' },
  { icon: '📊', title: 'Transparent Pricing', desc: 'No hidden fees. We believe in honest, straightforward real estate transactions.' },
]

export function RealEstate() {
  const [scrolled, setScrolled] = useState(false)
  const [filter, setFilter]     = useState<'All' | 'For Sale' | 'For Rent'>('All')
  const [search, setSearch]     = useState('')

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    window.scrollTo(0, 0)
    return () => window.removeEventListener('scroll', h)
  }, [])

  const filtered = properties.filter(p =>
    (filter === 'All' || p.type === filter) &&
    (search === '' || p.name.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="bg-white text-[#1A1A2E] font-[var(--font-inter)] overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 w-full z-[1000] px-6 md:px-14 flex items-center gap-4 transition-all duration-300 ${scrolled ? 'bg-white/97 shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <Link to="/" className={`text-[.72rem] tracking-[1px] mr-2 ${scrolled ? 'text-[#27AE60]' : 'text-white/80'}`}>← Demos</Link>
        <span className={`font-bold text-lg ${scrolled ? 'text-[#2C3E50]' : 'text-white'}`}>
          Home<span className={scrolled ? 'text-[#27AE60]' : 'text-[#27AE60]'}>Quest</span>
        </span>
        <div className="ml-auto hidden md:flex gap-6 items-center">
          {['Buy', 'Rent', 'Sell', 'Agents'].map(l => (
            <a key={l} href="#properties" className={`text-[.72rem] tracking-[1px] uppercase hover:text-[#27AE60] transition-colors ${scrolled ? 'text-[#2C3E50]' : 'text-white/85'}`}>{l}</a>
          ))}
          <a href="#contact" className="bg-[#27AE60] text-white text-[.72rem] tracking-[1px] uppercase px-5 py-2 rounded-full hover:bg-[#219150] transition-colors">
            Contact Agent
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2C3E50]/90 via-[#2C3E50]/70 to-transparent" />
        <div className="relative px-10 md:px-20 max-w-[800px] w-full">
          <p className="text-[.68rem] tracking-[5px] uppercase text-[#27AE60] mb-4">Your Trusted Real Estate Partner</p>
          <h1 className="text-[clamp(2.8rem,6vw,5rem)] font-bold text-white leading-[1.1] mb-6">
            Find Your<br />Perfect Home
          </h1>
          <p className="text-white/65 text-[.95rem] leading-[1.8] mb-8 max-w-md">
            Over 1,200 properties available across the country. From cozy studios to luxury estates — your dream home is here.
          </p>
          {/* Search bar */}
          <div className="bg-white rounded-2xl p-2 flex flex-wrap gap-2 max-w-[580px] shadow-xl">
            <input type="text" placeholder="City, neighborhood, or address..." value={search} onChange={e => setSearch(e.target.value)}
              className="flex-1 min-w-[180px] px-4 py-2 text-[.88rem] outline-none text-[#1A1A2E]" />
            <select className="px-4 py-2 text-[.88rem] outline-none text-[#666] bg-transparent border-l border-gray-100"
              value={filter} onChange={e => setFilter(e.target.value as typeof filter)}>
              <option>All</option>
              <option>For Sale</option>
              <option>For Rent</option>
            </select>
            <button className="bg-[#27AE60] text-white px-6 py-2 rounded-xl text-[.85rem] font-semibold hover:bg-[#219150] transition-colors">
              Search
            </button>
          </div>
        </div>
      </header>

      {/* STATS */}
      <div className="bg-[#2C3E50] text-white py-8 px-6">
        <div className="max-w-[1200px] mx-auto flex justify-around flex-wrap gap-4">
          {[
            { to: 1200, suffix: '+', label: 'Properties' },
            { to: 850,  suffix: '+', label: 'Happy Clients' },
            { to: 98,   suffix: '%', label: 'Satisfaction' },
            { to: 15,   suffix: '+', label: 'Years' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <p className="text-[1.8rem] font-bold text-[#27AE60]">
                <CountUp to={stat.to} suffix={stat.suffix} duration={2.2} delay={0.1} />
              </p>
              <p className="text-[.75rem] text-white/60 tracking-[1px]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PROPERTIES */}
      <section className="px-6 md:px-16 py-20 max-w-[1300px] mx-auto" id="properties">
        <RevealSection variant="fadeUp">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-[.65rem] tracking-[4px] uppercase text-[#27AE60] mb-1">Listings</p>
              <h2 className="text-[2rem] font-bold">Featured Properties</h2>
            </div>
            <div className="flex gap-2">
              {(['All', 'For Sale', 'For Rent'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-[.75rem] font-semibold transition-colors ${filter === f ? 'bg-[#27AE60] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <RevealSection key={i} variant="fadeUp" delay={i * 0.07}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className={`absolute top-3 left-3 text-[.65rem] px-3 py-1 rounded-full font-semibold ${p.type === 'For Sale' ? 'bg-[#2C3E50] text-white' : 'bg-[#27AE60] text-white'}`}>{p.type}</span>
                </div>
                <div className="p-5">
                  <p className="text-[.7rem] text-[#27AE60] mb-1">📍 {p.location}</p>
                  <h3 className="font-semibold text-[1rem] mb-1">{p.name}</h3>
                  <p className="font-bold text-[1.3rem] text-[#2C3E50] mb-3">{p.price}</p>
                  <div className="flex gap-4 text-[.78rem] text-gray-500 border-t border-gray-100 pt-3">
                    <span>🛏 {p.beds} Beds</span>
                    <span>🚿 {p.baths} Baths</span>
                    <span>📐 {p.sqft} sqft</span>
                  </div>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-[#F8FAFC] px-6 md:px-16 py-20">
        <RevealSection variant="fadeUp">
          <p className="text-[.65rem] tracking-[4px] uppercase text-[#27AE60] mb-2 text-center">Why HomeQuest</p>
          <h2 className="text-[2rem] font-bold text-center mb-12">The HomeQuest Difference</h2>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
          {reasons.map((r, i) => (
            <RevealSection key={i} variant="scale" delay={i * 0.08}>
              <SpotlightCard
                className="bg-white rounded-2xl p-6 shadow-sm text-center hover:shadow-md transition-shadow h-full"
                spotlightColor="rgba(39, 174, 96, 0.1)"
              >
                <span className="text-4xl mb-4 block">{r.icon}</span>
                <h3 className="font-semibold mb-2">{r.title}</h3>
                <p className="text-gray-500 text-[.82rem] leading-[1.7]">{r.desc}</p>
              </SpotlightCard>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 md:px-16 py-20 max-w-[700px] mx-auto" id="contact">
        <RevealSection variant="fadeUp">
          <p className="text-[.65rem] tracking-[4px] uppercase text-[#27AE60] mb-2 text-center">Get in Touch</p>
          <h2 className="text-[2rem] font-bold text-center mb-10">Talk to an Agent</h2>
          <form className="bg-[#F8FAFC] rounded-2xl p-8 space-y-4 shadow-sm" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="border border-gray-200 rounded-xl px-4 py-3 text-[.9rem] outline-none focus:border-[#27AE60] transition-colors" />
              <input type="text" placeholder="Last Name" className="border border-gray-200 rounded-xl px-4 py-3 text-[.9rem] outline-none focus:border-[#27AE60] transition-colors" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[.9rem] outline-none focus:border-[#27AE60] transition-colors" />
            <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[.9rem] outline-none focus:border-[#27AE60] transition-colors bg-white text-gray-600">
              <option>I want to Buy</option>
              <option>I want to Rent</option>
              <option>I want to Sell</option>
            </select>
            <textarea placeholder="Tell us more about what you're looking for..." rows={3}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[.9rem] outline-none focus:border-[#27AE60] transition-colors resize-none" />
            <button type="submit" className="w-full bg-[#27AE60] text-white py-3.5 rounded-full text-[.85rem] tracking-[1px] uppercase font-semibold hover:bg-[#219150] transition-colors">
              Contact an Agent
            </button>
          </form>
        </RevealSection>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2C3E50] text-white/50 px-6 md:px-16 py-10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-bold text-white text-xl">Home<span className="text-[#27AE60]">Quest</span></span>
          <p className="text-[.8rem]">123 Realty Blvd, Miami, FL · +1 (305) 555-0198</p>
          <p className="text-[.7rem]">Demo · React + TypeScript</p>
        </div>
      </footer>

      <ScrollTop bg="#27AE60" color="#fff" hoverBg="#2C3E50" />
    </div>
  )
}
