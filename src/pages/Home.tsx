import MagicRings from "@/components/MagicRings"
import { Link } from "react-router-dom"
import { useBrand } from '@/components/BrandProvider'

function QuoteCard({ img, quote, author, tag, index }: { img: string; quote: string; author: string; tag: string; index: number }) {
  const { colors: { primary: p, secondary: s, dark: dk } } = useBrand()
  const isEven = index % 2 === 0
  return (
    <div className="flex flex-col md:flex-row items-stretch"
      style={{ flexDirection: isEven ? undefined : "row-reverse" as const }}>
      <div className="path-img w-full md:w-1/2 relative overflow-hidden p-8 md:p-14"
        style={{ minHeight: 340, transformOrigin: isEven ? "left center" : "right center" }}>
        <img src={img} alt={tag} className="w-full h-full object-cover"
          style={{ minHeight: 340, maxHeight: 440, borderRadius: "1.5rem" }} />
        <div className="absolute bottom-0 inset-x-0 h-1/3 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${dk}a6, transparent)` }} />
        <div className="absolute top-20 left-20 px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase"
          style={{ border: `1px solid ${p}66`, background: `${dk}80`, backdropFilter: "blur(10px)", color: p }}>
          {tag}
        </div>
      </div>
      <div className="path-quote w-full md:w-1/2 flex items-center justify-center p-8 md:p-14">
        <div className="relative rounded-2xl p-8 w-full max-w-md"
          style={{ background: `${p}0d`, border: `1px solid ${p}2e`, backdropFilter: "blur(24px)", boxShadow: "0 8px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)" }}>
          <div className="text-8xl font-serif select-none mb-1"
            style={{ background: `linear-gradient(135deg, ${p}, ${s})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
            "
          </div>
          <p className="text-white/85 text-lg md:text-xl leading-relaxed font-light mb-6 italic">{quote}</p>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${p}80, transparent)` }} />
            <span className="text-sm font-medium" style={{ color: p }}>— {author}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function PathSection() {
  const brand = useBrand()
  const { primary: p, secondary: s } = brand.colors
  return (
    <div className="relative">
      <div className="path-line hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, transparent, ${p}66 15%, ${p}66 85%, transparent)` }} />
      <div className="space-y-8 md:space-y-6">
        {brand.quotes.map((q, i) => (
          <div key={i} className="relative">
            <div className="path-dot hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-10"
              style={{ background: `linear-gradient(135deg, ${p}, ${s})`, boxShadow: `0 0 14px ${p}cc` }} />
            <QuoteCard {...q} index={i} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const brand = useBrand()
  const { primary: p, secondary: s, accent: a, dark: dk } = brand.colors
  const { badge, headline, subtext, ctaPrimary, ctaSecondary, stats } = brand.hero
  const grad = `linear-gradient(135deg, ${p}, ${s})`
  const gradTxt = "linear-gradient(135deg, #ffffff 0%, #a7f3d0 40%, #6ee7b7 70%, #34d399 100%)"

  return (
    <div style={{ backgroundColor: dk, color: "white" }}>
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <MagicRings color={p} colorTwo={s} speed={0.6} ringCount={7} attenuation={6} lineThickness={2.5}
            baseRadius={0.28} radiusStep={0.08} scaleRate={0.18} opacity={0.85} blur={0} noiseAmount={0.04}
            ringGap={1.4} fadeIn={0.6} fadeOut={0.5} followMouse mouseInfluence={0.15} hoverScale={1.15}
            parallax={0.04} clickBurst />
        </div>
        <div className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, ${dk}bf 70%, ${dk}f5 100%)` }} />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase"
            style={{ border: `1px solid ${p}4d`, background: `${p}1a`, color: p }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: p }} />
            {badge}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight"
            style={{ background: gradTxt, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {headline[0]}<br />{headline[1]}
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">{subtext}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={ctaPrimary.to} className="px-8 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:scale-105"
              style={{ background: `linear-gradient(135deg, #059669, ${a})`, boxShadow: `0 0 30px ${p}73, 0 4px 20px rgba(0,0,0,0.4)` }}>
              {ctaPrimary.label}
            </Link>
            <Link to={ctaSecondary.to} className="px-8 py-3.5 rounded-full font-semibold text-sm text-white/70 border border-white/15 hover:text-white transition-all duration-300 hover:scale-105">
              {ctaSecondary.label}
            </Link>
          </div>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 text-center">
            {stats.map(({ value, label }) => (
              <div key={label}>
                <div className="text-3xl font-bold"
                  style={{ background: grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {value}
                </div>
                <div className="text-xs text-white/40 uppercase tracking-widest mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs tracking-widest text-white uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white to-transparent animate-pulse" />
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="absolute top-0 inset-x-0 h-32 pointer-events-none"
          style={{ background: `linear-gradient(to bottom, ${dk}, transparent)` }} />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase"
              style={{ border: `1px solid ${p}4d`, background: `${p}1a`, color: p }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: p }} />
              Our Philosophy
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4"
              style={{ background: gradTxt, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              A Path Through Nature
            </h2>
            <p className="text-white/40 max-w-md mx-auto">Every garden tells a story. Here's what guides ours.</p>
          </div>
          <PathSection />
        </div>
      </section>

      <section className="py-24 px-6 text-center relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 80% at 50% 50%, ${p}0d 0%, transparent 70%)` }} />
        <div className="relative max-w-xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to transform your garden?</h2>
          <p className="text-white/40 mb-8">Book a free consultation with our expert team today.</p>
          <Link to="/contact" className="inline-flex px-10 py-4 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:scale-105"
            style={{ background: `linear-gradient(135deg, #059669, ${a})`, boxShadow: `0 0 40px ${p}66` }}>
            Get a Free Quote →
          </Link>
        </div>
      </section>
    </div>
  )
}
