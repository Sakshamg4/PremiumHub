import React from 'react'
import Button from './Button'

const Plans = () => {
  const pricingPlans = [
    {
      name: "Basic Suite",
      subtitle: "Essential Creative Tools",
      price: "$29",
      period: "/month",
      features: [
        "LinkedIn Premium Basic",
        "Canva Pro Access",
        "Basic AI Writing Tools",
        "ChatGPT Plus Access",
        "24/7 Support"
      ],
      recommended: false
    },
    {
      name: "Pro Creator",
      subtitle: "Complete Creative Suite",
      price: "$99",
      period: "/month",
      features: [
        "LinkedIn Premium Business",
        "Adobe Creative Cloud",
        "Midjourney & DALL-E",
        "Claude AI Pro Access",
        "Priority Support"
      ],
      recommended: true
    },
    {
      name: "Business Elite",
      subtitle: "Enterprise Solutions",
      price: "$199",
      period: "/month",
      features: [
        "LinkedIn Sales Navigator",
        "Full Adobe Enterprise",
        "Unlimited AI Access",
        "Team Management Tools",
        "Dedicated Account Manager"
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
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Premium Plans</h2>
            <p className="text-xl text-blue-500 font-semibold mb-2">
              All-in-One Creative Solutions
            </p>
            <p className="text-lg text-zinc-400">
              Get verified access to premium tools at unbeatable prices
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
                      Most Popular
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
                <Button 
                  variant="primary"
                  href="https://wa.me/9029151181"
                  className="w-full justify-center"
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>

          {/* Custom Plan Section */}
          <div className="text-center border border-zinc-700 rounded-lg p-8 hover:border-blue-500 transition-colors duration-300">
            <h3 className="text-2xl font-bold mb-2">Need a Custom Package?</h3>
            <p className="text-blue-500 mb-4">Tailored Enterprise Solutions</p>
            <p className="text-zinc-400 mb-6">Let's create a custom plan that fits your team's needs</p>
            <Button 
              variant="secondary"
              href="https://wa.me/9029151181"
              className="inline-flex"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Plans