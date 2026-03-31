import { useBrand } from '@/components/BrandProvider'

export default function Contact() {
  const brand = useBrand()
  const { primary: p, accent: a, dark: dk } = brand.colors
  const { headline, subtext, address, phone, email, serviceOptions } = brand.contact
  const gradTxt = "linear-gradient(135deg, #ffffff 0%, #a7f3d0 60%, #34d399 100%)"
  const gradBtn = `linear-gradient(135deg, #059669, ${a})`
  const inputCls = "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none transition-colors"

  return (
    <div className="min-h-screen bg-[#050a05] text-white pt-28 pb-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase"
            style={{ border: `1px solid ${p}4d`, background: `${p}1a`, color: p }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: p }} />
            Get in Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4"
            style={{ background: gradTxt, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {headline}
          </h1>
          <p className="text-white/40 text-lg">{subtext}</p>
        </div>
        <form className="space-y-5 p-5 sm:p-8 rounded-2xl border border-white/5"
          style={{ background: "rgba(255,255,255,0.03)" }} onSubmit={(e) => e.preventDefault()}>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">First Name</label>
              <input type="text" placeholder="Arjun" className={inputCls}
                onFocus={e => (e.target.style.borderColor = `${p}80`)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
            </div>
            <div>
              <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Last Name</label>
              <input type="text" placeholder="Mehta" className={inputCls}
                onFocus={e => (e.target.style.borderColor = `${p}80`)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
            </div>
          </div>
          <div>
            <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Email</label>
            <input type="email" placeholder="you@example.com" className={inputCls}
              onFocus={e => (e.target.style.borderColor = `${p}80`)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
          </div>
          <div>
            <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Service Needed</label>
            <select className={`${inputCls} text-white/60 appearance-none`}
              onFocus={e => (e.target.style.borderColor = `${p}80`)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}>
              <option value="" style={{ background: dk }}>Select a service…</option>
              {serviceOptions.map(({ value, label }) => (
                <option key={value} value={value} style={{ background: dk }}>{label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-white/50 uppercase tracking-widest mb-2">Message</label>
            <textarea rows={5} placeholder="Tell us about your outdoor space…" className={`${inputCls} resize-none`}
              onFocus={e => (e.target.style.borderColor = `${p}80`)} onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
          </div>
          <button type="submit" className="w-full py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:scale-[1.02]"
            style={{ background: gradBtn, boxShadow: `0 0 30px #05966959` }}>
            Send Enquiry
          </button>
        </form>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-center text-sm text-white/30">
          <div>📍 {address}</div>
          <div>📞 {phone}</div>
          <div>✉️ {email}</div>
        </div>
      </div>
    </div>
  )
}
