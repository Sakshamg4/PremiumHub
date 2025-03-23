import React from 'react'

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="border-[1px] border-zinc-700 rounded-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center">Privacy Policy</h1>
          
          <div className="space-y-6 text-zinc-400">
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

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p className="mt-2">Email: privacy@premiumhub.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </section>

            <section className="text-sm">
              <p>Last updated: March 2024</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy