import React, { Suspense, lazy, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'

// Only import the Header and Footer directly since they're critical UI
import Header from './Components/Header'
import Footer from './Components/Footer'

// Lazy load all other components
const Hero = lazy(() => import('./Components/Hero'))
const Services = lazy(() => import('./Components/Services'))
const Plans = lazy(() => import('./Components/Plans'))
const Contact = lazy(() => import('./Components/Contact'))
const About = lazy(() => import('./Components/About'))
const WhatsAppCards = lazy(() => import('./Components/WhatsAppCards'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Analytics = lazy(() => import('@vercel/analytics/react').then(mod => ({
  default: mod.Analytics
})))

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center p-8 min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-1 border-blue-500" />
  </div>
)

// Using memo for HomePage to prevent unnecessary re-renders
const HomePage = React.memo(() => (
  <main className="container mx-auto px-4 pt-20">
    <div id="home" className="w-full">
      <Suspense fallback={<LoadingFallback />}>
        <Hero />
      </Suspense>
    </div>
    <div id="services" className="w-full">
      <Suspense fallback={<LoadingFallback />}>
        <Services />
      </Suspense>
    </div>
    <div id="pricing" className="w-full">
      <Suspense fallback={<LoadingFallback />}>
        <Plans />
      </Suspense>
    </div>
    <div id="contact" className="w-full">
      <Suspense fallback={<LoadingFallback />}>
        <Contact />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <WhatsAppCards />
      </Suspense>
    </div>
    <div id="about" className="w-full">
      <Suspense fallback={<LoadingFallback />}>
        <About />
      </Suspense>
    </div>
  </main>
))

// Layout component for pages with header and footer
const MainLayout = ({ children }) => (
  <>
    <Header />
    <div className="flex-grow">{children}</div>
    <Footer />
  </>
)

// Layout for full-screen pages without header/footer
const FullScreenLayout = ({ children }) => (
  <div className="flex-grow">{children}</div>
)

const App = () => {
  const handleScroll = useCallback(({ scroll }) => {
    // called every scroll - keep this function light
  }, [])

  return (
    <ReactLenis root onScroll={handleScroll}>
      <Router>
        <div className="min-h-screen flex flex-col bg-black selection:bg-blue-500/30 selection:text-white">
          {/* Background Effects */}
          <div className="fixed inset-0 pointer-events-none will-change-transform">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0A0A0A,#000000)]" />
            
            {/* Subtle noise texture - preloaded in head for performance */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02]" />
            
            {/* Accent colors */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,100,255,0.05),transparent_40%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(0,200,100,0.05),transparent_40%)]" />
            </div>
          </div>

          {/* Content */}
          <div className="relative">
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>
            <Routes>
              <Route
                path="/"
                element={
                  <MainLayout>
                    <HomePage />
                  </MainLayout>
                }
              />
              <Route
                path="/privacy-policy"
                element={
                  <MainLayout>
                    <Suspense fallback={<LoadingFallback />}>
                      <PrivacyPolicy />
                    </Suspense>
                  </MainLayout>
                }
              />
              <Route
                path="/terms-and-conditions"
                element={
                  <MainLayout>
                    <Suspense fallback={<LoadingFallback />}>
                      <TermsAndConditions />
                    </Suspense>
                  </MainLayout>
                }
              />
              <Route
                path="*"
                element={
                  <FullScreenLayout>
                    <Suspense fallback={<LoadingFallback />}>
                      <NotFound />
                    </Suspense>
                  </FullScreenLayout>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </ReactLenis>
  )
}

export default React.memo(App)