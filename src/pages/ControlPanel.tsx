import { useCallback, useEffect, useRef, useState } from 'react'
import { brand as defaultBrand } from '@/brand.config'
import type { BrandConfig } from '@/components/BrandProvider'

// ── Cloudinary config ─────────────────────────────────────────────────────────
const CLD_CLOUD  = 'dqylyavyw'
const CLD_PRESET = 'vsyzprxi'

// Dynamically load the Cloudinary Upload Widget script once
function useCloudinaryWidget() {
  const ready = useRef(false)
  const load  = useCallback(() => new Promise<void>(resolve => {
    if ((window as unknown as Record<string, unknown>).cloudinary) { resolve(); return }
    if (ready.current) { resolve(); return }
    ready.current = true
    const s = document.createElement('script')
    s.src = 'https://upload-widget.cloudinary.com/global/all.js'
    s.onload = () => resolve()
    document.head.appendChild(s)
  }), [])
  return load
}

type CldResult = { secure_url: string; public_id: string }

function CloudinaryUploadButton({ onUploaded, accent }: { onUploaded: (url: string) => void; accent: string }) {
  const loadWidget = useCloudinaryWidget()
  const [busy, setBusy] = useState(false)

  const open = async () => {
    setBusy(true)
    await loadWidget()
    setBusy(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cld = (window as any).cloudinary
    const widget = cld.createUploadWidget(
      {
        cloudName:    CLD_CLOUD,
        uploadPreset: CLD_PRESET,
        sources:      ['local', 'url', 'camera'],
        multiple:     false,
        resourceType: 'image',
        cropping:     false,
        showPoweredBy: false,
        styles: {
          palette: {
            window:      '#0d1a0d',
            windowBorder:'#1a2e1a',
            tabIcon:     accent,
            menuIcons:   '#aaa',
            textDark:    '#dedede',
            textLight:   '#fff',
            link:        accent,
            action:      accent,
            inactiveTabIcon: '#555',
            error:       '#f44235',
            inProgress:  accent,
            complete:    '#20b832',
            sourceBg:    '#111811',
          },
          fonts: { default: null, "'Inter', sans-serif": { url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap', active: true } },
        },
      },
      (_err: unknown, result: { event: string; info: CldResult }) => {
        if (result.event === 'success') {
          onUploaded(result.info.secure_url)
          widget.close()
        }
      }
    )
    widget.open()
  }

  return (
    <button
      type="button"
      onClick={open}
      disabled={busy}
      className="w-full mt-1.5 py-2 rounded-lg border border-dashed text-xs font-medium transition-all flex items-center justify-center gap-1.5"
      style={{
        borderColor: `${accent}50`,
        color: busy ? 'rgba(255,255,255,0.25)' : accent,
        background: `${accent}0d`,
      }}
    >
      {busy ? '⏳ Loading…' : '☁ Upload from Device / URL'}
    </button>
  )
}

// ── helpers ──────────────────────────────────────────────────────────────────
function setDeep(obj: Record<string, unknown>, keys: string[], val: unknown): Record<string, unknown> {
  const [k, ...rest] = keys
  if (!rest.length) return { ...obj, [k]: val }
  return { ...obj, [k]: setDeep((obj[k] ?? {}) as Record<string, unknown>, rest, val) }
}

// ── small UI atoms ────────────────────────────────────────────────────────────
const inp = "w-full px-3 py-2 rounded-lg bg-white/[0.06] border border-white/[0.09] text-white text-sm focus:outline-none focus:border-emerald-500/60 transition-colors placeholder-white/20"
const lbl = "block text-[10px] text-white/35 uppercase tracking-widest mb-1.5 font-medium"

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className={lbl}>{label}</label>
      <input className={inp} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
    </div>
  )
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className={lbl}>{label}</label>
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={e => onChange(e.target.value)}
          className="w-9 h-9 rounded-md border border-white/10 cursor-pointer bg-transparent flex-shrink-0"
          style={{ padding: '2px' }} />
        <input className={inp} value={value} onChange={e => onChange(e.target.value)} placeholder="#10b981" />
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs text-white/25 uppercase tracking-widest mb-3 font-semibold">{title}</div>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

// ── tab content panels ────────────────────────────────────────────────────────
function IdentityTab({ cfg, upd }: { cfg: BrandConfig; upd: (p: string, v: unknown) => void }) {
  return (
    <div className="space-y-4">
      <Section title="Brand">
        <Field label="Brand Name" value={cfg.name} onChange={v => upd('name', v)} placeholder="Verdant" />
        <Field label="Tagline" value={cfg.tagline} onChange={v => upd('tagline', v)} />
        <Field label="Description" value={cfg.description} onChange={v => upd('description', v)} />
      </Section>
      <Section title="Nav CTA">
        <Field label="CTA Label" value={cfg.navCta.label} onChange={v => upd('navCta.label', v)} />
        <Field label="CTA Link" value={cfg.navCta.to} onChange={v => upd('navCta.to', v)} />
      </Section>
    </div>
  )
}

function ColorsTab({ cfg, upd }: { cfg: BrandConfig; upd: (p: string, v: unknown) => void }) {
  return (
    <div className="space-y-4">
      <Section title="Brand Colors">
        <ColorField label="Primary" value={cfg.colors.primary} onChange={v => upd('colors.primary', v)} />
        <ColorField label="Secondary" value={cfg.colors.secondary} onChange={v => upd('colors.secondary', v)} />
        <ColorField label="Accent" value={cfg.colors.accent} onChange={v => upd('colors.accent', v)} />
        <ColorField label="Dark (Background)" value={cfg.colors.dark} onChange={v => upd('colors.dark', v)} />
      </Section>
      <div className="mt-4 p-3 rounded-xl border border-white/5" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="text-[10px] text-white/30 uppercase tracking-widest mb-3">Preview</div>
        <div className="flex gap-2">
          {[cfg.colors.primary, cfg.colors.secondary, cfg.colors.accent, cfg.colors.dark].map((c, i) => (
            <div key={i} className="flex-1 h-8 rounded-lg border border-white/10" style={{ background: c }} title={c} />
          ))}
        </div>
      </div>
    </div>
  )
}

function HeroTab({ cfg, upd }: { cfg: BrandConfig; upd: (p: string, v: unknown) => void }) {
  const setArr = (path: string, i: number, v: string) => {
    const arr = [...(path.split('.').reduce((o: Record<string, unknown>, k) => (o[k] ?? {}) as Record<string, unknown>, cfg as unknown as Record<string, unknown>) as unknown as string[])]
    arr[i] = v
    upd(path, arr)
  }
  return (
    <div className="space-y-4">
      <Section title="Badge & Copy">
        <Field label="Badge Text" value={cfg.hero.badge} onChange={v => upd('hero.badge', v)} />
        <Field label="Headline Line 1" value={cfg.hero.headline[0]} onChange={v => setArr('hero.headline', 0, v)} />
        <Field label="Headline Line 2" value={cfg.hero.headline[1]} onChange={v => setArr('hero.headline', 1, v)} />
        <Field label="Subtext" value={cfg.hero.subtext} onChange={v => upd('hero.subtext', v)} />
      </Section>
      <Section title="CTAs">
        <Field label="Primary CTA Label" value={cfg.hero.ctaPrimary.label} onChange={v => upd('hero.ctaPrimary.label', v)} />
        <Field label="Secondary CTA Label" value={cfg.hero.ctaSecondary.label} onChange={v => upd('hero.ctaSecondary.label', v)} />
      </Section>
      <Section title="Stats">
        {cfg.hero.stats.map((stat, i) => (
          <div key={i} className="grid grid-cols-2 gap-2">
            <Field label={`Stat ${i + 1} Value`} value={stat.value} onChange={v => {
              const stats = cfg.hero.stats.map((s, j) => j === i ? { ...s, value: v } : s)
              upd('hero.stats', stats)
            }} />
            <Field label="Label" value={stat.label} onChange={v => {
              const stats = cfg.hero.stats.map((s, j) => j === i ? { ...s, label: v } : s)
              upd('hero.stats', stats)
            }} />
          </div>
        ))}
      </Section>
    </div>
  )
}

function AboutTab({ cfg, upd }: { cfg: BrandConfig; upd: (p: string, v: unknown) => void }) {
  return (
    <div className="space-y-4">
      <Section title="Content">
        <Field label="Headline" value={cfg.about.headline} onChange={v => upd('about.headline', v)} />
        <div>
          <label className={lbl}>Story</label>
          <textarea className={`${inp} resize-none`} rows={5} value={cfg.about.story} onChange={e => upd('about.story', e.target.value)} />
        </div>
      </Section>
    </div>
  )
}

function ContactTab({ cfg, upd }: { cfg: BrandConfig; upd: (p: string, v: unknown) => void }) {
  return (
    <div className="space-y-4">
      <Section title="Copy">
        <Field label="Headline" value={cfg.contact.headline} onChange={v => upd('contact.headline', v)} />
        <Field label="Subtext" value={cfg.contact.subtext} onChange={v => upd('contact.subtext', v)} />
      </Section>
      <Section title="Details">
        <Field label="Address" value={cfg.contact.address} onChange={v => upd('contact.address', v)} />
        <Field label="Phone" value={cfg.contact.phone} onChange={v => upd('contact.phone', v)} />
        <Field label="Email" value={cfg.contact.email} onChange={v => upd('contact.email', v)} />
      </Section>
    </div>
  )
}

// ── font options ─────────────────────────────────────────────────────────────
const FONT_OPTIONS = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Lato',
  'Poppins',
  'Montserrat',
  'Raleway',
  'Nunito',
  'Source Sans 3',
  'DM Sans',
  'Outfit',
  'Plus Jakarta Sans',
  'Figtree',
  'Manrope',
  'Syne',
  'Space Grotesk',
  'Geist',
  'Playfair Display',
  'Merriweather',
  'Lora',
  'Cormorant Garamond',
  'EB Garamond',
  'Libre Baskerville',
  'Crimson Text',
  'DM Serif Display',
  'Yeseva One',
  'Josefin Sans',
  'Bebas Neue',
  'Oswald',
  'Barlow',
]

function FontPicker({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className={lbl}>{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className={`${inp} appearance-none pr-8 cursor-pointer`}
          style={{ fontFamily: `'${value}', sans-serif` }}
        >
          {FONT_OPTIONS.map(f => (
            <option key={f} value={f} style={{ fontFamily: `'${f}', sans-serif`, background: '#0d1a0d', color: '#fff' }}>
              {f}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-white/30 text-xs">▾</div>
      </div>
      {/* Mini preview rendered in the chosen font */}
      <div
        className="mt-2 px-3 py-2 rounded-lg border border-white/[0.06] text-white/60 text-sm leading-snug"
        style={{ fontFamily: `'${value}', sans-serif`, background: 'rgba(255,255,255,0.02)' }}
      >
        The quick brown fox jumps over the lazy dog
      </div>
    </div>
  )
}

function FontsTab({ cfg, upd }: { cfg: BrandConfig; upd: (p: string, v: unknown) => void }) {
  return (
    <div className="space-y-4">
      <Section title="Typography">
        <FontPicker
          label="Heading Font"
          value={cfg.fonts.heading}
          onChange={v => upd('fonts.heading', v)}
        />
        <FontPicker
          label="Body Font"
          value={cfg.fonts.body}
          onChange={v => upd('fonts.body', v)}
        />
      </Section>

      {/* Combined live preview */}
      <div className="mt-2 p-4 rounded-xl border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
        <div className="text-[10px] text-white/30 uppercase tracking-widest mb-3">Page Preview</div>
        <div style={{ fontFamily: `'${cfg.fonts.heading}', sans-serif` }} className="text-white text-lg font-bold leading-tight mb-1">
          Premium Gardening Services
        </div>
        <div style={{ fontFamily: `'${cfg.fonts.body}', sans-serif` }} className="text-white/50 text-xs leading-relaxed">
          Bespoke garden design and landscaping crafted for every season. We transform outdoor spaces into living masterpieces.
        </div>
      </div>
    </div>
  )
}

// ── Services tab ─────────────────────────────────────────────────────────────
function ServicesTab({ cfg, upd }: { cfg: BrandConfig; upd: (p: string, v: unknown) => void }) {
  const addService = () => {
    upd('services', [
      ...cfg.services,
      { icon: '🌱', title: 'New Service', desc: 'Service description.', features: ['Feature 1'] },
    ])
  }
  const removeService = (i: number) => {
    upd('services', cfg.services.filter((_, j) => j !== i))
  }
  const updService = (i: number, key: string, val: unknown) => {
    upd('services', cfg.services.map((s, j) => j === i ? { ...s, [key]: val } : s))
  }
  const updFeature = (si: number, fi: number, val: string) => {
    const features = cfg.services[si].features.map((f, j) => j === fi ? val : f)
    updService(si, 'features', features)
  }
  const addFeature = (si: number) => {
    updService(si, 'features', [...cfg.services[si].features, 'New feature'])
  }
  const removeFeature = (si: number, fi: number) => {
    updService(si, 'features', cfg.services[si].features.filter((_, j) => j !== fi))
  }

  return (
    <div className="space-y-5">
      {cfg.services.map((svc, i) => (
        <div key={i} className="rounded-xl border border-white/[0.07] overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.02)' }}>
          {/* Card header */}
          <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-white/[0.05]">
            <span className="text-[10px] text-white/30 uppercase tracking-widest font-semibold">Service {i + 1}</span>
            <button onClick={() => removeService(i)}
              className="text-[10px] text-red-400/50 hover:text-red-400 transition-colors px-2 py-0.5 rounded">✕ Remove</button>
          </div>
          <div className="p-3.5 space-y-3">
            <div className="grid grid-cols-[60px_1fr] gap-2">
              <Field label="Icon" value={svc.icon} onChange={v => updService(i, 'icon', v)} placeholder="🌿" />
              <Field label="Title" value={svc.title} onChange={v => updService(i, 'title', v)} />
            </div>
            <div>
              <label className={lbl}>Description</label>
              <textarea className={`${inp} resize-none`} rows={2}
                value={svc.desc} onChange={e => updService(i, 'desc', e.target.value)} />
            </div>
            {/* Features */}
            <div>
              <div className="text-[10px] text-white/25 uppercase tracking-widest mb-2 font-semibold">Features</div>
              <div className="space-y-1.5">
                {svc.features.map((f, fi) => (
                  <div key={fi} className="flex gap-1.5">
                    <input className={`${inp} flex-1`} value={f}
                      onChange={e => updFeature(i, fi, e.target.value)} />
                    <button onClick={() => removeFeature(i, fi)}
                      className="px-2 text-white/20 hover:text-red-400/60 transition-colors text-sm">✕</button>
                  </div>
                ))}
                <button onClick={() => addFeature(i)}
                  className="text-[10px] text-white/30 hover:text-white/60 transition-colors mt-1 flex items-center gap-1">+ Add feature</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button onClick={addService}
        className="w-full py-2.5 rounded-xl border border-dashed border-white/10 text-xs text-white/30 hover:text-white/60 hover:border-white/20 transition-all">+ Add Service</button>
    </div>
  )
}

// ── Gallery tab ───────────────────────────────────────────────────────────────
const GRADIENT_OPTIONS = [
  { label: 'Emerald',  value: 'from-emerald-900 to-teal-950'    },
  { label: 'Rose',     value: 'from-rose-950 to-stone-950'      },
  { label: 'Amber',    value: 'from-amber-950 to-stone-950'     },
  { label: 'Sky',      value: 'from-sky-950 to-teal-950'        },
  { label: 'Stone',    value: 'from-stone-900 to-neutral-950'   },
  { label: 'Violet',   value: 'from-violet-950 to-purple-950'   },
  { label: 'Blue',     value: 'from-blue-950 to-indigo-950'     },
  { label: 'Lime',     value: 'from-lime-950 to-green-950'      },
]

function GalleryTab({ cfg, upd }: { cfg: BrandConfig; upd: (p: string, v: unknown) => void }) {
  const addProject = () => {
    upd('projects', [
      ...cfg.projects,
      { emoji: '🌿', title: 'New Project', type: 'Residential', tag: 'Design & Build', color: 'from-emerald-900 to-teal-950' },
    ])
  }
  const removeProject = (i: number) => {
    upd('projects', cfg.projects.filter((_, j) => j !== i))
  }
  const updProject = (i: number, key: string, val: unknown) => {
    upd('projects', cfg.projects.map((p, j) => j === i ? { ...p, [key]: val } : p))
  }

  return (
    <div className="space-y-5">
      {cfg.projects.map((proj, i) => (
        <div key={i} className="rounded-xl border border-white/[0.07] overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.02)' }}>
          {/* Card header with mini preview gradient */}
          <div className={`flex items-center justify-between px-3.5 py-2.5 border-b border-white/[0.05] bg-gradient-to-r ${proj.color}`}>
            <div className="flex items-center gap-2">
              <span className="text-xl">{proj.emoji}</span>
              <span className="text-[10px] text-white/60 font-semibold truncate max-w-[140px]">{proj.title}</span>
            </div>
            <button onClick={() => removeProject(i)}
              className="text-[10px] text-red-300/50 hover:text-red-300 transition-colors px-2 py-0.5 rounded">✕ Remove</button>
          </div>
          <div className="p-3.5 space-y-3">
            <div className="grid grid-cols-[60px_1fr] gap-2">
              <Field label="Emoji" value={proj.emoji} onChange={v => updProject(i, 'emoji', v)} placeholder="🌿" />
              <Field label="Title" value={proj.title} onChange={v => updProject(i, 'title', v)} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Type" value={proj.type} onChange={v => updProject(i, 'type', v)} placeholder="Residential" />
              <Field label="Tag" value={proj.tag} onChange={v => updProject(i, 'tag', v)} placeholder="Design & Build" />
            </div>
            {/* Image URL + Cloudinary upload */}
            <div>
              <Field
                label="Image URL"
                value={(proj as typeof proj & { img?: string }).img ?? ''}
                onChange={v => updProject(i, 'img', v)}
                placeholder="/gallery_1.png or https://res.cloudinary.com/…"
              />
              <CloudinaryUploadButton
                accent={cfg.colors.primary}
                onUploaded={url => updProject(i, 'img', url)}
              />
            </div>
            {/* Image preview */}
            {(proj as typeof proj & { img?: string }).img && (
              <div className="rounded-lg overflow-hidden border border-white/[0.07] relative group" style={{ height: 96 }}>
                <img
                  src={(proj as typeof proj & { img?: string }).img}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[10px] text-white/70 font-medium">Cloudinary ✓</span>
                </div>
              </div>
            )}
            {/* Gradient picker */}
            <div>
              <label className={lbl}>Card Gradient (fallback)</label>
              <div className="grid grid-cols-4 gap-1.5 mt-1">
                {GRADIENT_OPTIONS.map(opt => (
                  <button key={opt.value} title={opt.label}
                    onClick={() => updProject(i, 'color', opt.value)}
                    className={`h-8 rounded-lg bg-gradient-to-br ${opt.value} border-2 transition-all ${
                      proj.color === opt.value ? 'border-white/60 scale-105' : 'border-transparent hover:border-white/20'
                    }`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
      <button onClick={addProject}
        className="w-full py-2.5 rounded-xl border border-dashed border-white/10 text-xs text-white/30 hover:text-white/60 hover:border-white/20 transition-all">+ Add Project</button>
    </div>
  )
}

// ── main ─────────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'identity', label: 'Identity' },
  { id: 'colors',   label: 'Colors'   },
  { id: 'fonts',    label: 'Fonts'    },
  { id: 'hero',     label: 'Hero'     },
  { id: 'services', label: 'Services' },
  { id: 'gallery',  label: 'Gallery'  },
  { id: 'about',    label: 'About'    },
  { id: 'contact',  label: 'Contact'  },
]

const PAGES = ['/', '/services', '/gallery', '/about', '/contact']

export default function ControlPanel() {
  const [cfg, setCfg] = useState<BrandConfig>(() => {
    try {
      const raw = localStorage.getItem('brand-override')
      if (raw) {
        const stored = JSON.parse(raw) as Partial<BrandConfig>
        return {
          ...defaultBrand,
          ...stored,
          colors:   { ...defaultBrand.colors,   ...stored.colors   },
          fonts:    { ...defaultBrand.fonts,     ...stored.fonts    },
          hero:     { ...defaultBrand.hero,      ...stored.hero     },
          about:    { ...defaultBrand.about,     ...stored.about    },
          contact:  { ...defaultBrand.contact,   ...stored.contact  },
          services: stored.services ?? defaultBrand.services,
          projects: stored.projects ?? defaultBrand.projects,
          quotes:   stored.quotes   ?? defaultBrand.quotes,
        } as BrandConfig
      }
    } catch { /* ignore */ }
    return defaultBrand as BrandConfig
  })
  const [tab, setTab] = useState('identity')
  const [previewPage, setPreviewPage] = useState('/')
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const chRef = useRef<BroadcastChannel | null>(null)

  useEffect(() => {
    chRef.current = new BroadcastChannel('brand-updates')
    return () => chRef.current?.close()
  }, [])

  // Broadcast on every cfg change
  useEffect(() => {
    chRef.current?.postMessage(cfg)
    localStorage.setItem('brand-override', JSON.stringify(cfg))
  }, [cfg])

  const onIframeLoad = () => {
    // Small delay to ensure iframe's BroadcastChannel listener is set up
    setTimeout(() => chRef.current?.postMessage(cfg), 80)
  }

  const upd = (path: string, val: unknown) => {
    setCfg(prev => setDeep(prev as unknown as Record<string, unknown>, path.split('.'), val) as unknown as BrandConfig)
  }

  const reset = () => {
    localStorage.removeItem('brand-override')
    setCfg(defaultBrand as BrandConfig)
  }

  const p = cfg.colors.primary

  return (
    <div className="flex h-screen overflow-hidden bg-[#050a05] text-white">

      {/* ── LEFT PANEL ── */}
      <div className="w-[360px] flex-shrink-0 flex flex-col border-r border-white/[0.06] overflow-hidden"
        style={{ background: 'rgba(5,10,5,0.95)', backdropFilter: 'blur(24px)' }}>

        {/* Header */}
        <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
              style={{ background: `linear-gradient(135deg, ${p}, ${cfg.colors.secondary})` }}>
              ⚙
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Brand Editor</div>
              <div className="text-[10px] text-white/30">Live Preview Active</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-white/30">LIVE</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-3 pt-3 pb-0 flex gap-1 flex-wrap">
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150"
              style={{
                background: tab === t.id ? `${p}26` : 'transparent',
                color: tab === t.id ? p : 'rgba(255,255,255,0.4)',
                border: `1px solid ${tab === t.id ? `${p}40` : 'transparent'}`,
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {tab === 'identity' && <IdentityTab cfg={cfg} upd={upd} />}
          {tab === 'colors'   && <ColorsTab   cfg={cfg} upd={upd} />}
          {tab === 'fonts'    && <FontsTab    cfg={cfg} upd={upd} />}
          {tab === 'hero'     && <HeroTab     cfg={cfg} upd={upd} />}
          {tab === 'services' && <ServicesTab cfg={cfg} upd={upd} />}
          {tab === 'gallery'  && <GalleryTab  cfg={cfg} upd={upd} />}
          {tab === 'about'    && <AboutTab    cfg={cfg} upd={upd} />}
          {tab === 'contact'  && <ContactTab  cfg={cfg} upd={upd} />}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-white/[0.06] flex gap-2">
          <button onClick={reset}
            className="flex-1 py-2 rounded-lg text-xs font-medium text-white/40 border border-white/[0.08] hover:border-white/20 hover:text-white/70 transition-all">
            ↺ Reset Defaults
          </button>
          <a href="/" target="_blank" rel="noreferrer"
            className="flex-1 py-2 rounded-lg text-xs font-medium text-center text-white transition-all"
            style={{ background: `linear-gradient(135deg, ${p}, ${cfg.colors.accent})` }}>
            Open Site ↗
          </a>
        </div>
      </div>

      {/* ── RIGHT: iframe preview ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Preview nav bar */}
        <div className="flex items-center gap-1 px-3 py-2 border-b border-white/[0.06]"
          style={{ background: 'rgba(5,10,5,0.8)', backdropFilter: 'blur(12px)' }}>
          <div className="w-2 h-2 rounded-full bg-white/10 mr-1" />
          <div className="flex-1 flex items-center gap-1 overflow-x-auto">
            {PAGES.map(pg => (
              <button key={pg} onClick={() => setPreviewPage(pg)}
                className="px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all"
                style={{
                  background: previewPage === pg ? `${p}20` : 'transparent',
                  color: previewPage === pg ? p : 'rgba(255,255,255,0.35)',
                }}>
                {pg === '/' ? 'Home' : pg.slice(1).replace(/^\w/, c => c.toUpperCase())}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-white/15 ml-2 hidden sm:block">localhost:5173</span>
        </div>

        <iframe
          ref={iframeRef}
          src={previewPage}
          key={previewPage}
          onLoad={onIframeLoad}
          className="flex-1 border-0 w-full"
          title="Live Preview"
        />
      </div>
    </div>
  )
}
