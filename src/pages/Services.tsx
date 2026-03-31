import { useBrand } from '@/components/BrandProvider'

export default function Services() {
  const brand = useBrand()
  const { primary: p } = brand.colors
  const gradTxt = "linear-gradient(135deg, #ffffff 0%, #a7f3d0 60%, #34d399 100%)"

  return (
    <div className="min-h-screen bg-[#050a05] text-white pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase"
            style={{ border: `1px solid ${p}4d`, background: `${p}1a`, color: p }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: p }} />
            What We Offer
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4"
            style={{ background: gradTxt, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Our Services
          </h1>
          <p className="text-white/40 max-w-md mx-auto text-lg">
            Comprehensive garden solutions tailored to your vision and lifestyle.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brand.services.map(({ icon, title, desc, features }) => (
            <div key={title} className="group p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
              style={{ background: "rgba(255,255,255,0.03)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = `${p}40`)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}>
              <div className="text-3xl mb-4">{icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-4">{desc}</p>
              <ul className="space-y-1.5">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-white/50">
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ backgroundColor: p }} />{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
