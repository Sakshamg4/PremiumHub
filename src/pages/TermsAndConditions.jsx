import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../Components/Button'

const TermsAndConditions = () => {
  const { pathname } = useLocation()

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const sections = [
    {
      title: "1. Services",
      content: "Premium Hub provides access to premium digital tools, AI software subscriptions, LinkedIn Premium upgrades, and OTT entertainment platforms at affordable prices.",
      type: "paragraph"
    },
    {
      title: "2. Payment & Subscription",
      content: [
        "All payments are one-time for the specific duration mentioned",
        "Prices are strictly non-negotiable",
        "Instant access is provided upon successful payment verification",
        "Subscription validity equals the warranty period designated for each product"
      ],
      type: "list"
    },
    {
      title: "3. User Responsibilities",
      content: [
        "Do not change details (Email/Password/Profiles) of shared accounts",
        "Use services for personal purposes only; resale is prohibited unless authorized",
        "Report issues immediately to support for quick resolution"
      ],
      type: "list"
    },
    {
      title: "4. Warranty & Refunds",
      content: [
        "We offer a full warranty for the duration of your plan",
        "If an account stops working, we provide a replacement immediately",
        "Refunds are only processed if we are unable to provide a working replacement",
        "No refunds for 'change of mind' after purchase"
      ],
      type: "list"
    },
    {
      title: "5. Intellectual Property",
      content: "All content provided remains the property of the respective service providers. Premium Hub acts as a reseller/facilitator.",
      type: "paragraph"
    },
    {
      title: "6. Service Availability",
      content: "While we strive for 100% uptime, occasional downtime from the primary service providers (e.g., LinkedIn, Netflix) is beyond our control.",
      type: "paragraph"
    },
    {
      title: "7. Termination",
      content: "Violation of terms, such as changing account credentials, will result in immediate termination of service without refund.",
      type: "paragraph"
    }
  ]

  return (
    <div className="min-h-screen py-18 md:py-24">
      <div className="container mx-auto px-4">
        <div className="border-[1px] border-[#bcccdc]/50 rounded-xl p-8 md:p-12 bg-[#f8fafc]/50 backdrop-blur-sm">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-[#1e293b]">Terms and Conditions</h1>
            <p className="text-[#64748b]">Last updated: December 2024</p>
          </div>

          {/* Terms Content */}
          <div className="space-y-8 text-[#64748b] max-w-4xl mx-auto">
            {sections.map((section, index) => (
              <section key={index} className="mb-8 hover:bg-[#d9eafd]/20 p-6 rounded-lg transition-colors">
                <h2 className="text-2xl font-semibold mb-4 text-[#1e293b]">{section.title}</h2>
                {section.type === "list" ? (
                  <ul className="list-disc pl-6 mt-2 space-y-2">
                    {section.content.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{section.content}</p>
                )}
              </section>
            ))}

            {/* Contact Section */}
            <section className="mb-8 bg-[#f8fafc]/50 p-6 rounded-lg border border-[#bcccdc]/50">
              <h2 className="text-2xl font-semibold mb-4 text-[#1e293b]">Contact Information</h2>
              <div className="space-y-4">
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#9aa6b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>premiumhubtools@gmail.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#9aa6b2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 9029151181</span>
                </p>
              </div>
            </section>

            {/* Support Button */}
            <div className="text-center pt-8">
              <Button
                variant="primary"
                href="https://wa.me/9029151181"
              >
                Questions? Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsAndConditions