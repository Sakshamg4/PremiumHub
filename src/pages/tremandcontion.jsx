import React from 'react'

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="border-[1px] border-zinc-700 rounded-xl p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 text-center">Terms and Conditions</h1>
          
          <div className="space-y-6 text-zinc-400">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">1. Services</h2>
              <p>Premium Hub provides LinkedIn advertising and marketing services. By using our services, you agree to comply with and be bound by these terms.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">2. Payment Terms</h2>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>All fees are payable in advance</li>
                <li>Refunds are subject to our refund policy</li>
                <li>Late payments may result in service suspension</li>
                <li>Prices are subject to change with notice</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">3. Client Responsibilities</h2>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Provide accurate campaign information</li>
                <li>Maintain active LinkedIn accounts</li>
                <li>Respond to service-related communications</li>
                <li>Comply with LinkedIn's advertising policies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">4. Service Limitations</h2>
              <p>We do not guarantee specific results from advertising campaigns. Results may vary based on multiple factors including market conditions, target audience, and campaign content.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">5. Intellectual Property</h2>
              <p>All materials, strategies, and content created by Premium Hub remain our intellectual property unless explicitly stated otherwise in writing.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">6. Termination</h2>
              <p>Either party may terminate services with 30 days written notice. Prepaid fees may be refundable according to our refund policy.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">7. Limitation of Liability</h2>
              <p>Premium Hub's liability shall be limited to the amount paid for services in the previous 12 months.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">Contact Information</h2>
              <p>For questions about these terms, please contact us at:</p>
              <p className="mt-2">Email: legal@premiumhub.com</p>
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

export default TermsAndConditions