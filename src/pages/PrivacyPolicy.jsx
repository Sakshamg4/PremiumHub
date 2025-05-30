import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../Components/Button'

const PrivacyPolicy = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const privacySections = [
    {
      title: "Information We Collect",
      content: [
        "Personal Information: This includes your name, email address, phone number, and other details you provide when filling out a form or contacting us.",
        "Usage Information: This includes data on how you interact with our website, such as browsing patterns, pages visited, and time spent on our site."
      ]
    },
    {
      title: "How We Use Your Information",
      content: [
        "To provide and improve our services",
        "To communicate with you regarding your inquiries or subscriptions",
        "To personalize your experience on our website",
        "To send promotional emails and updates (with your consent)",
        "To comply with legal obligations"
      ]
    },
    {
      title: "How We Protect Your Information",
      content: [
        "Encryption of sensitive data",
        "Secure servers and networks",
        "Restricting access to personal information to authorized personnel only"
      ]
    },
    {
      title: "Cookies",
      content: [
        "We use cookies to enhance your browsing experience. Cookies help us analyze website traffic and improve our services. You can control the use of cookies through your browser settings."
      ]
    },
    {
      title: "Your Rights",
      content: [
        "Access and update your personal information",
        "Request the deletion of your personal data",
        "Opt-out of receiving marketing communications at any time"
      ]
    }
  ]

  return (
    <div className="min-h-screen py-18 md:py-24">
      <div className="container mx-auto px-4">
        <div className="border-[1px] border-zinc-700 rounded-xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-zinc-400">Last updated: March 2024</p>
            <p className="mt-6 text-zinc-400 max-w-3xl mx-auto">
              At <span className="text-blue-500">Premium Hub</span>, we value your privacy and are committed to protecting your personal information. This privacy policy outlines the types of information we collect, how we use it, and the steps we take to ensure that your personal data remains secure.
            </p>
          </div>
          
          <div className="space-y-8 text-zinc-400 max-w-4xl mx-auto">
            {privacySections.map((section, index) => (
              <section key={index} className="mb-8 hover:bg-zinc-800/10 p-6 rounded-lg transition-colors">
                <h2 className="text-2xl font-semibold mb-4 text-white">{section.title}</h2>
                {Array.isArray(section.content) ? (
                  <ul className="list-disc pl-6 space-y-2">
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
              <h2 className="text-2xl font-semibold mb-4 text-white">Contact Us</h2>
              <p className="mb-4">If you have any questions regarding this privacy policy or wish to exercise your rights, please contact us:</p>
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

            {/* Support Button */}
            <div className="text-center pt-8">
              <Button
                variant="primary"
                href="https://wa.me/9029151181"
              >
                Need Help? Contact Support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy