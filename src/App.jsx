import React, { Suspense, lazy, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ReactLenis } from 'lenis/react'

// Only import the Header and Footer directly since they're critical UI
import LoadingFallback from './Components/LoadingFallback.jsx'
import ScrollToTop from './Components/ScrollToTop'
import Header from './Components/Header'
import Footer from './Components/Footer'
import PopupForm from './Components/PopupForm'

// Lazy load all other components
import Hero from './Components/Hero'
import LinkedInPlans from './Components/LinkedInPlans'
const Testimonials = lazy(() => import('./Components/Testimonials'))

// Lazy load all other components
const Services = lazy(() => import('./Components/Services'))
const Plans = lazy(() => import('./Components/Plans'))
const Contact = lazy(() => import('./Components/Contact'))
const About = lazy(() => import('./Components/About'))
const WhatsAppCards = lazy(() => import('./Components/WhatsAppCards'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Blog = lazy(() => import('./pages/Blog'))
const SingleBlog = lazy(() => import('./pages/SingleBlog'))
const Analytics = lazy(() => import('@vercel/analytics/react').then(mod => ({
  default: mod.Analytics
})))


// Using memo for HomePage to prevent unnecessary re-renders
const HomePage = React.memo(() => (
  <main className="container mx-auto px-4 pt-20">
    <div id="home" className="w-full">
      <Hero />
    </div>
    <div id="linkedin-plans" className="w-full">
      <LinkedInPlans />
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
    <div id="testimonials" className="w-full">
      <Suspense fallback={<LoadingFallback />}>
        <Testimonials />
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
        <ScrollToTop />
        <div className="min-h-screen bg-[#f8fafc] text-[#334155] selection:bg-[#bcccdc] selection:text-[#1e293b] flex flex-col">
          {/* Background Effects */}
          <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03]">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#f8fafc,#d9eafd)]" />

            {/* Subtle noise texture */}
            <div className="absolute inset-0 opacity-[0.4]" />

            {/* Accent colors */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(154,166,178,0.1),transparent_40%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(188,204,220,0.1),transparent_40%)]" />
            </div>
          </div>


          {/* Content */}
          <div className="relative">
            <PopupForm />
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
                path="/blog"
                element={
                  <MainLayout>
                    <Suspense fallback={<LoadingFallback />}>
                      <Blog />
                    </Suspense>
                  </MainLayout>
                }
              />
              <Route
                path="/blog/:id"
                element={
                  <MainLayout>
                    <Suspense fallback={<LoadingFallback />}>
                      <SingleBlog />
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