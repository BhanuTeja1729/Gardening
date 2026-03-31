import { useBrand } from '@/components/BrandProvider'

export default function About() {
  const brand = useBrand()
  const { primary: p } = brand.colors
  const { headline, story, values, team } = brand.about
  const gradTxt = "linear-gradient(135deg, #ffffff 0%, #a7f3d0 60%, #34d399 100%)"
  const card = { background: "rgba(255,255,255,0.03)" }

  return (
    <div className="min-h-screen bg-[#050a05] text-white pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase"
            style={{ border: `1px solid ${p}4d`, background: `${p}1a`, color: p }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: p }} />
            Our Story
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6"
            style={{ background: gradTxt, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {headline}
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto text-lg leading-relaxed">{story}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {values.map(({ icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl border border-white/5 transition-all duration-300" style={card}
              onMouseEnter={e => (e.currentTarget.style.borderColor = `${p}40`)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}>
              <div className="text-3xl mb-4">{icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Meet the Team</h2>
          <p className="text-white/40 text-sm">The people behind every perfect garden.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {team.map(({ name, role, emoji }) => (
            <div key={name} className="flex-1 max-w-xs text-center p-6 rounded-2xl border border-white/5 transition-all duration-300" style={card}
              onMouseEnter={e => (e.currentTarget.style.borderColor = `${p}40`)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}>
              <div className="text-5xl mb-4">{emoji}</div>
              <div className="text-white font-semibold">{name}</div>
              <div className="text-white/40 text-sm mt-1">{role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
