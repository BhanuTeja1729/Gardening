import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { brand as defaultBrand } from '@/brand.config'

export type BrandConfig = typeof defaultBrand

const BrandCtx = createContext<BrandConfig>(defaultBrand)

const STORAGE_KEY = 'brand-override'

/** Inject a Google Fonts stylesheet for a given font name, deduplicated by id. */
function loadGoogleFont(fontName: string) {
  const id = `gf-${fontName.replace(/\s+/g, '-').toLowerCase()}`
  if (document.getElementById(id)) return
  const link = document.createElement('link')
  link.id   = id
  link.rel  = 'stylesheet'
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:wght@300;400;500;600;700;800&display=swap`
  document.head.appendChild(link)
}

export function BrandProvider({ children }: { children: ReactNode }) {
  const [brand, setBrand] = useState<BrandConfig>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const stored = JSON.parse(raw) as Partial<BrandConfig>
        // Merge each top-level section so newly-added fields are never undefined
        return {
          ...defaultBrand,
          ...stored,
          colors:   { ...defaultBrand.colors,   ...stored.colors   },
          fonts:    { ...defaultBrand.fonts,     ...stored.fonts    },
          hero:     { ...defaultBrand.hero,      ...stored.hero     },
          about:    { ...defaultBrand.about,     ...stored.about    },
          contact:  { ...defaultBrand.contact,   ...stored.contact  },
          services: stored.services  ?? defaultBrand.services,
          projects: stored.projects  ?? defaultBrand.projects,
          quotes:   stored.quotes    ?? defaultBrand.quotes,
        } as BrandConfig
      }
    } catch { /* ignore */ }
    return defaultBrand
  })

  // Receive live updates from the ControlPanel via BroadcastChannel
  useEffect(() => {
    const ch = new BroadcastChannel('brand-updates')
    ch.onmessage = ({ data }: MessageEvent<BrandConfig>) => {
      setBrand(data)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
    return () => ch.close()
  }, [])

  // Inject CSS color vars whenever colors change
  useEffect(() => {
    const r = document.documentElement
    r.style.setProperty('--brand-primary',   brand.colors.primary)
    r.style.setProperty('--brand-secondary', brand.colors.secondary)
    r.style.setProperty('--brand-accent',    brand.colors.accent)
    r.style.setProperty('--brand-dark',      brand.colors.dark)
  }, [brand.colors])

  // Inject Google Fonts + CSS font vars whenever fonts change
  useEffect(() => {
    const { heading, body } = brand.fonts
    loadGoogleFont(heading)
    if (body !== heading) loadGoogleFont(body)
    const r = document.documentElement
    r.style.setProperty('--brand-font-heading', `'${heading}', sans-serif`)
    r.style.setProperty('--brand-font-body',    `'${body}', sans-serif`)
  }, [brand.fonts])

  return <BrandCtx.Provider value={brand}>{children}</BrandCtx.Provider>
}

/** Use inside any component to get the live brand config */
export function useBrand(): BrandConfig {
  return useContext(BrandCtx)
}
