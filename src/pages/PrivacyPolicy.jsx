import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../Components/Button'

const PrivacyPolicy = () => {
  const { pathname } = useLocation()

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="border-[1px] border-zinc-700 rounded-xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-zinc-400">Last updated: March 2024</p>
          </div>
          
          <div className="space-y-8 text-zinc-400 max-w-4xl mx-auto">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">Information We Collect</h2>
              <p>When you use our LinkedIn advertising services, we may collect:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Contact information (name, email, phone number)</li>
                <li>Business information</li>
                <li>LinkedIn profile data</li>
                <li>Campaign preferences and goals</li>
                <li>Website usage data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">How We Use Your Information</h2>
              <p>We use the collected information to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Optimize your LinkedIn advertising campaigns</li>
                <li>Provide customer support</li>
                <li>Send important updates about our services</li>
                <li>Improve our services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">Data Protection</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to data processing</li>
                <li>Request data portability</li>
              </ul>
            </section>

            {/* Contact Section with improved styling */}
            <section className="mb-8 bg-zinc-800/50 p-6 rounded-lg border border-zinc-700">
              <h2 className="text-2xl font-semibold mb-4 text-white">Contact Us</h2>
              <p className="mb-4">If you have any questions about this Privacy Policy, please contact us:</p>
              <div className="space-y-4">
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>officallinkedinseller@gmail.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 9029151181</span>
                </p>
              </div>
            </section>

            {/* Quick Support Button */}
            <div className="text-center pt-8">
              <Button
                variant="primary"
                href="https://wa.me/9029151181"
              >
                Need Quick Support?
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy