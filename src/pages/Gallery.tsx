import { useState } from 'react'
import { useBrand } from '@/components/BrandProvider'

export default function Gallery() {
  const brand = useBrand()
  const { primary: p } = brand.colors
  const gradTxt = "linear-gradient(135deg, #ffffff 0%, #a7f3d0 60%, #34d399 100%)"
  const [lightbox, setLightbox] = useState<null | typeof brand.projects[0]>(null)

  return (
    <div className="min-h-screen bg-[#050a05] text-white pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase"
            style={{ border: `1px solid ${p}4d`, background: `${p}1a`, color: p }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: p }} />
            Our Portfolio
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4"
            style={{ background: gradTxt, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Featured Projects
          </h1>
          <p className="text-white/40 max-w-md mx-auto text-lg">
            A selection of spaces we've transformed across residential, commercial and estate properties.
          </p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {brand.projects.map((proj) => {
            const { title, type, tag, color, emoji, img } = proj as typeof proj & { img?: string }
            return (
              <div
                key={title}
                onClick={() => setLightbox(proj)}
                className="group relative rounded-2xl overflow-hidden border border-white/5 cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{ minHeight: 260 }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${p}50`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
              >
                {/* Photo or gradient fallback */}
                {img ? (
                  <img
                    src={img}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${color}`} />
                )}

                {/* Dark gradient scrim — stronger at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/60 transition-all duration-300" />

                {/* Hover shimmer line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Emoji watermark (only when no image) */}
                {!img && (
                  <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-15 group-hover:opacity-25 transition-all duration-300 select-none">{emoji}</div>
                )}

                {/* Caption */}
                <div className="relative z-10 p-6 flex flex-col justify-end h-full" style={{ minHeight: 260 }}>
                  <div className="mt-auto">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs border border-white/25 text-white/70 mb-3 backdrop-blur-sm"
                      style={{ background: 'rgba(0,0,0,0.3)' }}>
                      {tag}
                    </span>
                    <h3 className="text-white font-semibold text-lg leading-tight">{title}</h3>
                    <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">{type}</p>
                  </div>
                  {/* View arrow */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-white/80 text-sm">
                    ↗
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (() => {
        const { title, type, tag, color, emoji, img } = lightbox as typeof lightbox & { img?: string }
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
            onClick={() => setLightbox(null)}
          >
            <div
              className="relative rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl border border-white/10"
              style={{ maxHeight: '85vh' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Image or gradient */}
              {img ? (
                <img src={img} alt={title} className="w-full object-cover" style={{ maxHeight: '65vh' }} />
              ) : (
                <div className={`w-full bg-gradient-to-br ${color} flex items-center justify-center text-9xl`} style={{ height: '65vh' }}>
                  {emoji}
                </div>
              )}

              {/* Info strip */}
              <div className="p-5" style={{ background: 'rgba(5,10,5,0.97)' }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs border border-white/20 text-white/50 mb-2">{tag}</span>
                    <h2 className="text-white text-xl font-semibold">{title}</h2>
                    <p className="text-white/35 text-xs mt-1 uppercase tracking-widest">{type}</p>
                  </div>
                  <button
                    onClick={() => setLightbox(null)}
                    className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/30 transition-all flex items-center justify-center text-sm"
                  >✕</button>
                </div>
              </div>
            </div>
          </div>
        )
      })()}
    </div>
  )
}
