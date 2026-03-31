import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { useBrand } from '@/components/BrandProvider'

export default function Navbar() {
  const brand = useBrand()
  const { primary: p, accent: a, dark: dk } = brand.colors
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const close = () => setMenuOpen(false)
  const ctaStyle = { background: `linear-gradient(135deg, ${p}, ${a})`, boxShadow: `0 0 20px ${p}59` }

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: scrolled || menuOpen ? `${dk}eb` : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled || menuOpen ? `1px solid ${p}1a` : "none",
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <NavLink to="/" onClick={close} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
              style={{ background: `linear-gradient(135deg, ${p}, ${brand.colors.secondary})`, boxShadow: `0 4px 12px ${p}4d` }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22V12" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" />
                <path d="M8 6c0-2.76 1.79-5 4-5s4 2.24 4 5" /><path d="M6 12c0-3.31 2.69-6 6-6s6 2.69 6 6" />
              </svg>
            </div>
            <span className="font-semibold tracking-wide text-white text-lg">{brand.name}</span>
          </NavLink>

          <div className="hidden md:flex items-center gap-8">
            {brand.navLinks.map(({ label, to }) => (
              <NavLink key={to} to={to}
                className={({ isActive }) => `text-sm tracking-wide transition-colors duration-200 ${isActive ? "font-medium" : "text-white/60 hover:text-white"}`}
                style={({ isActive }) => isActive ? { color: p } : {}}>
                {label}
              </NavLink>
            ))}
          </div>

          <NavLink to={brand.navCta.to}
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white transition-all duration-300 hover:scale-105"
            style={ctaStyle}>
            {brand.navCta.label}
          </NavLink>

          <button onClick={() => setMenuOpen(v => !v)} aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-[5px] focus:outline-none">
            <span className="block w-6 h-0.5 bg-white rounded-full transition-all duration-300 origin-center"
              style={{ transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
            <span className="block w-6 h-0.5 bg-white rounded-full transition-all duration-300" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="block w-6 h-0.5 bg-white rounded-full transition-all duration-300 origin-center"
              style={{ transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
      </nav>

      <div onClick={close} className="md:hidden fixed inset-0 z-40 bg-black/60 transition-opacity duration-300"
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none" }} />

      <div className="md:hidden fixed top-0 right-0 bottom-0 z-40 w-72 flex flex-col transition-transform duration-300 ease-in-out"
        style={{ background: `${dk}f7`, backdropFilter: "blur(24px)", borderLeft: `1px solid ${p}1f`, transform: menuOpen ? "translateX(0)" : "translateX(100%)" }}>
        <div className="h-[72px]" />
        <nav className="flex flex-col px-6 pt-6 gap-1 flex-1">
          {brand.navLinks.map(({ label, to }, i) => (
            <NavLink key={to} to={to} onClick={close}
              className={({ isActive }) => `px-4 py-3 rounded-xl text-base font-medium tracking-wide transition-all duration-200 ${isActive ? "bg-white/5" : "text-white/70 hover:text-white hover:bg-white/5"}`}
              style={({ isActive }) => ({ color: isActive ? p : undefined, transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" })}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="px-6 pb-10">
          <NavLink to={brand.navCta.to} onClick={close}
            className="flex items-center justify-center w-full py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
            style={ctaStyle}>
            {brand.navCta.label}
          </NavLink>
        </div>
      </div>
    </>
  )
}
