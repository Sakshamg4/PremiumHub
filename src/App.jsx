import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Hero from './Components/Hero'
import Servies from './Components/Servies'
import Plans from './Components/Plans'
import Contact from './Components/Contact'
import About from './Components/About'
import PrivacyPolicy from './page/privacypolicy'
import TermsAndConditions from './page/tremandcontion'
import NotFound from './page/NotFound'
import Footer from './Components/Footer'

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
    </div>
    <div id="about" className="w-full">
      <About />
    </div>
  </main>
)

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
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
  )
}

export default App