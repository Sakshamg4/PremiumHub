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
      content: "Premium Hub provides LinkedIn advertising and marketing services. By using our services, you agree to comply with and be bound by these terms.",
      type: "paragraph"
    },
    {
      title: "2. Payment Terms",
      content: [
        "All fees are payable in advance",
        "Refunds are subject to our refund policy",
        "Late payments may result in service suspension",
        "Prices are subject to change with notice"
      ],
      type: "list"
    },
    {
      title: "3. Client Responsibilities",
      content: [
        "Provide accurate campaign information",
        "Maintain active LinkedIn accounts",
        "Respond to service-related communications",
        "Comply with LinkedIn's advertising policies"
      ],
      type: "list"
    },
    {
      title: "4. Service Limitations",
      content: "We do not guarantee specific results from advertising campaigns. Results may vary based on multiple factors including market conditions, target audience, and campaign content.",
      type: "paragraph"
    },
    {
      title: "5. Intellectual Property",
      content: "All materials, strategies, and content created by Premium Hub remain our intellectual property unless explicitly stated otherwise in writing.",
      type: "paragraph"
    },
    {
      title: "6. Termination",
      content: "Either party may terminate services with 30 days written notice. Prepaid fees may be refundable according to our refund policy.",
      type: "paragraph"
    },
    {
      title: "7. Limitation of Liability",
      content: "Premium Hub's liability shall be limited to the amount paid for services in the previous 12 months.",
      type: "paragraph"
    }
  ]

  return (
    <div className="min-h-screen py-18 md:py-24">
      <div className="container mx-auto px-4">
        <div className="border-[1px] border-zinc-700 rounded-xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Terms and Conditions</h1>
            <p className="text-zinc-400">Last updated: March 2024</p>
          </div>
          
          {/* Terms Content */}
          <div className="space-y-8 text-zinc-400 max-w-4xl mx-auto">
            {sections.map((section, index) => (
              <section key={index} className="mb-8 hover:bg-zinc-800/10 p-6 rounded-lg transition-colors">
                <h2 className="text-2xl font-semibold mb-4 text-white">{section.title}</h2>
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
            <section className="mb-8 bg-zinc-800/50 p-6 rounded-lg border border-zinc-700">
              <h2 className="text-2xl font-semibold mb-4 text-white">Contact Information</h2>
              <div className="space-y-4">
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>premiumhubtools@gmail.com</span>
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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