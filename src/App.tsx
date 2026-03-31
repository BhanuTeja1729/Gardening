import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { BrandProvider } from "@/components/BrandProvider"
import Navbar from "@/components/Navbar"
import Home from "@/pages/Home"
import Services from "@/pages/Services"
import Gallery from "@/pages/Gallery"
import About from "@/pages/About"
import Contact from "@/pages/Contact"
import ControlPanel from "@/pages/ControlPanel"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "instant" }) }, [pathname])
  return null
}

// Hide the Navbar on the control panel page (it has its own chrome)
function Layout() {
  const { pathname } = useLocation()
  const isEditor = pathname === '/control-panel'
  return (
    <>
      {!isEditor && <Navbar />}
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/services"       element={<Services />} />
        <Route path="/gallery"        element={<Gallery />} />
        <Route path="/about"          element={<About />} />
        <Route path="/contact"        element={<Contact />} />
        <Route path="/control-panel"  element={<ControlPanel />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <BrandProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout />
      </BrowserRouter>
    </BrandProvider>
  )
}
