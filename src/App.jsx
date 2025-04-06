import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ReactLenis, useLenis } from 'lenis/react'
import Header from './Components/Header'
import Hero from './Components/Hero'
import Servies from './Components/Servies'
import Plans from './Components/Plans'
import Contact from './Components/Contact'
import About from './Components/About'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsAndConditions from './pages/TermsAndConditions'
import NotFound from './pages/NotFound'
import Footer from './Components/Footer'
import WhatsAppCards from './Components/WhatsAppCards'


// Lazy load the Analytics component
const Analytics = lazy(() => import('@vercel/analytics/react').then(mod => ({
  default: mod.Analytics
})))


const HomePage = () => (
  <main className="container mx-auto px-4 pt-20">
    <div id="home" className="w-full">
      <Hero />
    </div>
    <div id="services" className="w-full">
      <Servies />
    </div>
    <div id="pricing" className="w-full">
      <Plans />
    </div>
    <div id="contact" className="w-full">
      <Contact />
      <WhatsAppCards />
    </div>
    <div id="about" className="w-full">
      <About />
    </div>
  </main>
)

const App = () => {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  })

  return (
    <ReactLenis root>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      </ReactLenis>
  )
}

export default App