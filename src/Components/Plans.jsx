import React from 'react'

const Plans = () => {
  const pricingPlans = [
    {
      name: "Starter Plan",
      subtitle: "Best for individuals",
      price: "$29",
      period: "/month",
      features: [
        "Canva Premium Access",
        "OTT Apps Subscription",
        "Basic AI Tools",
        "24/7 Email Support",
        "Monthly Usage Reports"
      ],
      recommended: false
    },
    {
      name: "Pro Plan",
      subtitle: "For freelancers & creatives",
      price: "$99",
      period: "/month",
      features: [
        "Adobe Creative Suite",
        "Envato Elements Access",
        "Advanced AI Tools",
        "Canva Pro Features",
        "Autodesk Software"
      ],
      recommended: true
    },
    {
      name: "Business Plan",
      subtitle: "Ideal for teams & professionals",
      price: "$199",
      period: "/month",
      features: [
        "All Pro Plan Features",
        "LinkedIn Business Premium",
        "Recruiter Lite Access",
        "Ads Coupons ($150 value)",
        "Team Management Tools"
      ],
      recommended: false
    }
  ]

  return (
    <div className="min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="border-[1px] border-zinc-700 rounded-xl p-8 md:p-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Plans</h2>
            <p className="text-xl text-blue-500 font-semibold mb-2">
              Flexible. Affordable. Scalable.
            </p>
            <p className="text-lg text-zinc-400">
              Choose a plan that fits your needs
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`border ${plan.recommended ? 'border-blue-500' : 'border-zinc-700'} 
                  rounded-lg p-6 hover:border-blue-500 transition-colors duration-300
                  ${plan.recommended ? 'relative overflow-hidden' : ''}`}
              >
                {plan.recommended && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      Popular Choice
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-blue-500 mb-4">{plan.subtitle}</p>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-zinc-400 ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <span className="mr-2 text-blue-500">→</span>
                      <span className="text-zinc-400">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full mt-6 py-3 px-6 rounded-lg font-semibold
                  ${plan.recommended 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'border border-zinc-700 hover:border-blue-500'}`}>
                  Choose Plan
                </button>
              </div>
            ))}
          </div>

          {/* Custom Plan Section */}
          <div className="text-center border border-zinc-700 rounded-lg p-8 hover:border-blue-500 transition-colors duration-300">
            <h3 className="text-2xl font-bold mb-2">Custom Plans</h3>
            <p className="text-blue-500 mb-4">Tailored for your workflow</p>
            <p className="text-zinc-400 mb-6">Mix & match tools to create your perfect stack</p>
            <button className="px-8 py-3 border border-zinc-700 rounded-lg font-semibold hover:border-blue-500 transition-colors duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Plans