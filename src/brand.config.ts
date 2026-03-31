// ─────────────────────────────────────────────────────────────────────────────
// BRAND CONFIG — edit this file to white-label the site for any client.
// All components import from here; nothing else needs to change.
// ─────────────────────────────────────────────────────────────────────────────

export const brand = {
  // ── Identity ────────────────────────────────────────────────────────────────
  name: "Verdant",
  tagline: "Where Nature Becomes Art",
  description:
    "Bespoke garden design and landscaping crafted for every season. We transform outdoor spaces into living masterpieces.",

  // ── Colors (used as inline styles and CSS variables) ────────────────────────
  colors: {
    primary: "#10b981",    // emerald-500
    secondary: "#0ea5e9",  // sky-500
    accent: "#0d9488",     // teal-600
    dark: "#050a05",       // page background
  },

  // ── Typography ──────────────────────────────────────────────────────────────
  fonts: {
    heading: "Inter",   // Google Font name for headings
    body:    "Inter",   // Google Font name for body text
  },

  // ── Navigation ───────────────────────────────────────────────────────────────
  navLinks: [
    { label: "Home",     to: "/" },
    { label: "Services", to: "/services" },
    { label: "Gallery",  to: "/gallery" },
    { label: "About",    to: "/about" },
    { label: "Contact",  to: "/contact" },
  ],
  navCta: { label: "Get a Quote", to: "/contact" },

  // ── Hero Section ─────────────────────────────────────────────────────────────
  hero: {
    badge: "Premium Gardening Services",
    headline: ["Where Nature", "Becomes Art"],
    subtext:
      "Bespoke garden design and landscaping crafted for every season. We transform outdoor spaces into living masterpieces.",
    ctaPrimary:   { label: "Explore Our Work",    to: "/services" },
    ctaSecondary: { label: "Book Consultation →", to: "/contact" },
    stats: [
      { value: "500+", label: "Gardens Created" },
      { value: "12yr", label: "Experience" },
      { value: "98%",  label: "Client Satisfaction" },
    ],
  },

  // ── Home — Path Through Nature quotes ────────────────────────────────────────
  quotes: [
    { img: "/1.jfif", quote: "To plant a garden is to believe in tomorrow.",                                    author: "Audrey Hepburn", tag: "Garden Design" },
    { img: "/2.jfif", quote: "In every walk with nature, one receives far more than he seeks.",                 author: "John Muir",      tag: "Landscaping"  },
    { img: "/3.jfif", quote: "The love of gardening is a seed once sown that never dies.",                     author: "Gertrude Jekyll",tag: "Horticulture" },
    { img: "/4.jfif", quote: "A garden is a grand teacher. It teaches patience and careful watchfulness.",     author: "Gertrude Jekyll",tag: "Craftsmanship"},
  ],

  // ── Services Page ────────────────────────────────────────────────────────────
  services: [
    {
      icon: "🌿",
      title: "Garden Design",
      desc: "Custom conceptual designs that blend aesthetics with nature, crafted by expert landscape architects.",
      features: ["Site analysis & consultation", "3D concept renders", "Plant selection guide", "Seasonal planting plans"],
    },
    {
      icon: "✂️",
      title: "Maintenance",
      desc: "Year-round care plans to keep your garden thriving through every season with precision craftsmanship.",
      features: ["Weekly / fortnightly visits", "Pruning & shaping", "Fertilisation & soil care", "Pest & disease management"],
    },
    {
      icon: "💧",
      title: "Irrigation Systems",
      desc: "Smart water solutions that conserve resources while ensuring your plants always get what they need.",
      features: ["Drip & sprinkler systems", "Smart controller setup", "Water usage audits", "Rainwater harvesting"],
    },
    {
      icon: "🪨",
      title: "Hardscaping",
      desc: "Patios, pathways, retaining walls and pergolas — structures that define and elevate your outdoor space.",
      features: ["Paving & decking", "Retaining walls", "Pergolas & gazebos", "Lighting & electrics"],
    },
    {
      icon: "🌳",
      title: "Tree Surgery",
      desc: "Professional arborist services to keep mature trees healthy, safe and beautifully shaped.",
      features: ["Crown reduction", "Dead-wooding", "Stump removal", "Emergency storm work"],
    },
    {
      icon: "🌸",
      title: "Seasonal Planting",
      desc: "Vibrant colour through every month of the year with expertly curated seasonal planting schemes.",
      features: ["Spring bulb displays", "Summer bedding", "Autumn & winter interest", "Indoor planting"],
    },
  ],

  // ── Gallery Page ─────────────────────────────────────────────────────────────
  projects: [
    { title: "The Fern Retreat",   type: "Residential", tag: "Design & Build",    color: "from-emerald-900 to-teal-950",   emoji: "🌿", img: "/gallery_1.png" },
    { title: "Rosewood Estate",    type: "Commercial",  tag: "Maintenance",        color: "from-rose-950 to-stone-950",     emoji: "🌹", img: "/gallery_2.png" },
    { title: "Bamboo Sanctuary",   type: "Residential", tag: "Hardscaping",        color: "from-amber-950 to-stone-950",    emoji: "🎋", img: "/gallery_3.png" },
    { title: "The Water Garden",   type: "Residential", tag: "Irrigation",         color: "from-sky-950 to-teal-950",       emoji: "💧", img: "/gallery_4.png" },
    { title: "Oak Hill Manor",     type: "Estate",      tag: "Tree Surgery",       color: "from-stone-900 to-neutral-950",  emoji: "🌳", img: "/gallery_5.png" },
    { title: "Lavender Fields",    type: "Commercial",  tag: "Seasonal Planting",  color: "from-violet-950 to-purple-950",  emoji: "🌸", img: "/gallery_6.png" },
  ],

  // ── About Page ───────────────────────────────────────────────────────────────
  about: {
    headline: "Rooted in Passion",
    story:
      "Founded in 2012, Verdant was born from a simple belief — that every outdoor space has the potential to become something extraordinary. Over a decade later, we've turned that belief into 500+ transformed gardens across the region.",
    values: [
      { icon: "🌱", title: "Sustainability", desc: "Every project is designed with the environment in mind — from water conservation to native planting." },
      { icon: "🎨", title: "Craftsmanship", desc: "We treat every garden as a canvas, merging horticultural expertise with artistic vision." },
      { icon: "🤝", title: "Partnership",   desc: "We listen first. Your lifestyle, your preferences, your garden — we just bring it to life." },
    ],
    team: [
      { name: "Arjun Mehta",  role: "Lead Landscape Architect", emoji: "👨‍🌾" },
      { name: "Priya Sharma", role: "Senior Horticulturist",    emoji: "👩‍🌾" },
      { name: "Rohan Das",    role: "Irrigation Specialist",    emoji: "🧑‍🔧" },
    ],
  },

  // ── Contact Page ─────────────────────────────────────────────────────────────
  contact: {
    headline: "Let's Grow Together",
    subtext: "Tell us about your project and we'll be in touch within 24 hours.",
    address: "Bangalore, Karnataka",
    phone: "+91 98765 43210",
    email: "hello@verdant.in",
    serviceOptions: [
      { value: "design",       label: "Garden Design" },
      { value: "maintenance",  label: "Maintenance" },
      { value: "irrigation",   label: "Irrigation Systems" },
      { value: "hardscaping",  label: "Hardscaping" },
      { value: "trees",        label: "Tree Surgery" },
      { value: "planting",     label: "Seasonal Planting" },
    ],
  },
}
