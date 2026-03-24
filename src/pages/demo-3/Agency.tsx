import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavbarScroll } from '../../hooks/useNavbarScroll'
import { ScrollTop } from '../../components/ScrollTop'
import RevealSection from '../../components/animations/RevealSection'
import SpotlightCard from '../../Effects/SpotlightCard'
import ShinyText from '../../Effects/ShinyText'

const services = [
  { icon: '🎨', title: 'UI/UX Design',       desc: 'Beautiful, user-centered interfaces that convert visitors into customers.' },
  { icon: '💻', title: 'Web Development',     desc: 'Fast, scalable web apps built with modern frameworks and best practices.' },
  { icon: '📱', title: 'Mobile Apps',         desc: 'Cross-platform mobile experiences with React Native.' },
  { icon: '🚀', title: 'Brand Identity',      desc: 'Logos, color systems, and brand guidelines that make you stand out.' },
  { icon: '📈', title: 'SEO & Analytics',     desc: 'Data-driven strategies to grow your organic traffic and visibility.' },
  { icon: '☁️', title: 'Cloud & DevOps',      desc: 'Deployment, CI/CD pipelines, and infrastructure for scale.' },
]

const works = [
  { title: 'Bloom Finance App',    tag: 'UI/UX + Dev',   img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
  { title: 'Nexus E-Commerce',     tag: 'Full Stack',    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80' },
  { title: 'Prism Brand Identity', tag: 'Branding',      img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80' },
  { title: 'Stride Mobile App',    tag: 'Mobile',        img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80' },
  { title: 'Vault Dashboard',      tag: 'Dashboard',     img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' },
  { title: 'Solaris Landing',      tag: 'Web Design',    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80' },
]

export function Agency() {
  const scrolled = useNavbarScroll(60)
  const [email, setEmail]       = useState('')

  return (
    <div className="bg-[#0D0D0D] text-white font-[var(--font-inter)] overflow-x-hidden">

      {/* NAV */}
      <nav className={`fixed top-0 left-0 w-full z-[1000] px-6 md:px-14 flex items-center gap-4 transition-all duration-300 ${scrolled ? 'bg-[#0D0D0D]/95 shadow-[0_1px_0_rgba(255,255,255,0.06)] py-3' : 'bg-transparent py-5'}`}>
        <Link to="/" className="text-[.72rem] tracking-[1px] text-[#6C63FF] mr-2">← Demos</Link>
        <span className="font-bold text-lg">Pixel<span className="text-[#6C63FF]">Craft</span></span>
        <div className="ml-auto hidden md:flex gap-6 items-center">
          {['Work', 'Services', 'About', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-[.72rem] tracking-[1px] uppercase text-white/65 hover:text-white transition-colors">{l}</a>
          ))}
          <a href="#contact" className="bg-[#6C63FF] text-white text-[.72rem] tracking-[1px] uppercase px-5 py-2 rounded-full hover:bg-[#5a52d5] transition-colors">
            Get a Quote
          </a>
        </div>
      </nav>

      {/* HERO */}
      <header className="min-h-screen flex flex-col justify-center px-6 md:px-20 pt-28 pb-20 relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'linear-gradient(#6C63FF 1px, transparent 1px), linear-gradient(90deg, #6C63FF 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6C63FF]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-[900px]">
          <p className="text-[.68rem] tracking-[5px] uppercase mb-6">
            <ShinyText text="Digital Design & Development" color="#6C63FF" shineColor="#a78bfa" speed={3} />
          </p>
          <h1 className="text-[clamp(3rem,7vw,6rem)] font-bold leading-[1.02] mb-8">
            We build<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C63FF] to-[#a78bfa]">digital experiences</span><br />
            that matter.
          </h1>
          <p className="text-white/55 text-[1rem] leading-[1.8] mb-10 max-w-[540px]">
            PixelCraft is a boutique agency crafting memorable brands, fast websites, and stunning apps for startups and growing businesses.
          </p>
          <div className="flex gap-4 flex-wrap">
            <a href="#work" className="bg-[#6C63FF] text-white px-9 py-3.5 rounded-full text-[.85rem] font-semibold hover:bg-[#5a52d5] transition-colors">
              See Our Work
            </a>
            <a href="#contact" className="border border-white/20 text-white px-9 py-3.5 rounded-full text-[.85rem] hover:border-[#6C63FF] hover:text-[#6C63FF] transition-all">
              Start a Project
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="relative mt-20 flex gap-12 flex-wrap">
          {[['150+', 'Projects'], ['8+', 'Years'], ['98%', 'Satisfaction'], ['40+', 'Clients']].map(([n, l]) => (
            <div key={l}>
              <p className="text-[2rem] font-bold text-[#6C63FF]">{n}</p>
              <p className="text-white/50 text-[.8rem] tracking-[1px]">{l}</p>
            </div>
          ))}
        </div>
      </header>

      {/* SERVICES */}
      <section className="px-6 md:px-16 py-20 max-w-[1300px] mx-auto" id="services">
        <RevealSection variant="fadeUp">
          <p className="text-[.65rem] tracking-[4px] uppercase text-[#6C63FF] mb-2">What We Do</p>
          <h2 className="text-[2.2rem] font-bold mb-12">Our Services</h2>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <RevealSection key={i} variant="fadeUp" delay={i * 0.07}>
              <SpotlightCard
                className="border border-white/8 rounded-2xl p-7 h-full transition-all duration-300 group"
                spotlightColor="rgba(108, 99, 255, 0.12)"
              >
                <span className="text-3xl mb-5 block">{s.icon}</span>
                <h3 className="font-semibold text-[1rem] mb-2 group-hover:text-[#6C63FF] transition-colors">{s.title}</h3>
                <p className="text-white/50 text-[.85rem] leading-[1.7]">{s.desc}</p>
              </SpotlightCard>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section className="px-6 md:px-16 py-10 pb-20 max-w-[1300px] mx-auto" id="work">
        <RevealSection variant="fadeUp">
          <div className="flex justify-between items-center mb-12">
            <div>
              <p className="text-[.65rem] tracking-[4px] uppercase text-[#6C63FF] mb-1">Portfolio</p>
              <h2 className="text-[2.2rem] font-bold">Selected Work</h2>
            </div>
            <a href="#" className="text-[.8rem] text-[#6C63FF] hover:underline hidden md:block">View All Projects →</a>
          </div>
        </RevealSection>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {works.map((w, i) => (
            <RevealSection key={i} variant="scale" delay={i * 0.07}>
              <div className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer">
                <img src={w.img} alt={w.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-[.65rem] text-[#a78bfa] tracking-[2px] uppercase mb-1">{w.tag}</p>
                  <p className="font-semibold text-white">{w.title}</p>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 md:px-16 py-20 border-t border-white/8" id="contact">
        <RevealSection variant="fadeUp">
          <div className="max-w-[700px] mx-auto text-center">
            <p className="text-[.65rem] tracking-[4px] uppercase text-[#6C63FF] mb-3">Let's Talk</p>
            <h2 className="text-[2.4rem] font-bold mb-4">Start Your Project</h2>
            <p className="text-white/50 mb-10 leading-[1.8]">Ready to build something great? Drop your email and we'll get back to you within 24 hours.</p>
            <form className="flex gap-3 flex-wrap justify-center" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
                className="flex-1 min-w-[260px] bg-white/5 border border-white/15 rounded-full px-6 py-3.5 text-[.9rem] outline-none focus:border-[#6C63FF] transition-colors text-white placeholder-white/30" />
              <button type="submit" className="bg-[#6C63FF] text-white px-8 py-3.5 rounded-full text-[.85rem] font-semibold hover:bg-[#5a52d5] transition-colors whitespace-nowrap">
                Get a Quote →
              </button>
            </form>
          </div>
        </RevealSection>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-16 py-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-3 text-white/30 text-[.75rem]">
        <span className="font-bold text-white text-base">Pixel<span className="text-[#6C63FF]">Craft</span></span>
        <span>© 2026 PixelCraft Agency</span>
        <span>Demo · React + TypeScript</span>
      </footer>

      <ScrollTop bg="#6C63FF" color="#fff" hoverBg="#5a52d5" />
    </div>
  )
}
